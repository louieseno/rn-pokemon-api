import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

const initialState = {
  next: "",
  prev: "",
  pokemons: [],
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    appendList(state, action) {
        state.pokemons = [...action.payload.list, ...state.pokemons] as any;
        state.next = action.payload.next;
        state.prev = action.payload.prev;
    },
    clearList(state) {
        state.pokemons = [];
        state.next = "";
        state.prev = "";
    },
  },
});

export const { appendList, clearList } = pokemonSlice.actions;

export const pokemonSelectors = {
  getPokemons: (state: RootState) => state.pokemon.pokemons,
  getNext: (state: RootState) => state.pokemon.next,
};

export default pokemonSlice.reducer;
