type Pokemons = {
  id: number;
  name: string;
  types: Array<{ slot: number; type: { name: string; url: string } }>;
  weight: number;
  height: number;
  base_experience: number;
  image: string;
};
