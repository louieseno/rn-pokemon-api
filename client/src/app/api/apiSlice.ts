import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { AuthFormType } from 'src/screens/auth/types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  prepareHeaders: async (headers) => {
    return headers;
  },
});

const mapPokemonDetails = (pokemonDetails: Array<Record<string, any>>) => {
  return pokemonDetails.map((details) => {
    const { data } = details;
    const { id, name, sprites, types, weight, height, base_experience } = data;
    return {
      id,
      name,
      types,
      weight: `${(Number(weight) * 100).toFixed(2)} g`,
      height: `${(Number(height) * 3.937007874).toFixed(2)} in`,
      base_experience,
      image: sprites['other']['official-artwork']['front_default'],
    };
  });
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user: AuthFormType) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user: AuthFormType) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),
    pokemons: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const pokemonResult: any = await fetchWithBQ(
          _arg ?? 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'
        );
        if (pokemonResult.error) {
          return { error: pokemonResult.error as FetchBaseQueryError };
        }
        const results: Array<{ name: string; url: string }> =
          pokemonResult.data.results;
        let pokemonDetails: Array<Record<string, any>> = await Promise.all(
          results.map((pokemon: { name: string; url: string }) =>
            fetchWithBQ(pokemon.url)
          )
        );
        pokemonDetails = mapPokemonDetails(pokemonDetails);
        return {
          data: {
            pokemons: pokemonDetails,
            next: pokemonResult.data.next,
            previous: pokemonResult.data.previous,
          },
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLazyPokemonsQuery } =
  apiSlice;
