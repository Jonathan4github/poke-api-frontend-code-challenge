import axios from "axios";
import type { Pokemon, PokemonType, TypeListResponse } from "@/types/pokemon";

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

export async function fetchAllTypes(): Promise<TypeListResponse> {
  const { data } = await pokeApi.get<TypeListResponse>("/type?limit=100");
  return data;
}

export async function fetchType(name: string): Promise<PokemonType> {
  const { data } = await pokeApi.get<PokemonType>(`/type/${name}`);
  return data;
}

export async function fetchPokemon(name: string): Promise<Pokemon> {
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);
  return data;
}
