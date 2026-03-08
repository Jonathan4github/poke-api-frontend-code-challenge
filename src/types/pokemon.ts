export interface NamedResource {
  name: string;
  url: string;
}

export interface TypeListResponse {
  count: number;
  results: NamedResource[];
}

export interface TypePokemonEntry {
  pokemon: NamedResource;
  slot: number;
}

export interface PokemonType {
  id: number;
  name: string;
  pokemon: TypePokemonEntry[];
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedResource;
}

export interface PokemonAbility {
  ability: NamedResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonTypeSlot {
  slot: number;
  type: NamedResource;
}

export interface PokemonSprites {
  front_default: string | null;
  back_default: string | null;
  front_shiny: string | null;
  other: {
    "official-artwork": {
      front_default: string | null;
    };
    dream_world: {
      front_default: string | null;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  types: PokemonTypeSlot[];
}
