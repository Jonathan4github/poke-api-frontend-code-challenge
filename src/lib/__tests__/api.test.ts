import MockAdapter from "axios-mock-adapter";
import { pokeApi, fetchAllTypes, fetchType, fetchPokemon } from "@/lib/api";

const mock = new MockAdapter(pokeApi);

afterEach(() => mock.reset());

const typeListFixture = {
  count: 2,
  results: [
    { name: "fire", url: "https://pokeapi.co/api/v2/type/10/" },
    { name: "water", url: "https://pokeapi.co/api/v2/type/11/" },
  ],
};

const fireTypeFixture = {
  id: 10,
  name: "fire",
  pokemon: [{ pokemon: { name: "charmander", url: "..." }, slot: 1 }],
};

const pikachuFixture = {
  id: 25,
  name: "pikachu",
  height: 4,
  weight: 60,
  base_experience: 112,
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    back_default: null,
    front_shiny: null,
    other: { "official-artwork": { front_default: null }, dream_world: { front_default: null } },
  },
  stats: [],
  abilities: [],
  types: [{ slot: 1, type: { name: "electric", url: "..." } }],
};

describe("fetchAllTypes", () => {
  it("calls GET /type?limit=100 and returns data", async () => {
    mock.onGet("/type?limit=100").reply(200, typeListFixture);
    const result = await fetchAllTypes();
    expect(result.count).toBe(2);
    expect(result.results).toHaveLength(2);
    expect(result.results[0].name).toBe("fire");
  });

  it("throws when the API returns an error", async () => {
    mock.onGet("/type?limit=100").reply(500);
    await expect(fetchAllTypes()).rejects.toThrow();
  });
});

describe("fetchType", () => {
  it("calls GET /type/{name} and returns type data", async () => {
    mock.onGet("/type/fire").reply(200, fireTypeFixture);
    const result = await fetchType("fire");
    expect(result.name).toBe("fire");
    expect(result.pokemon).toHaveLength(1);
    expect(result.pokemon[0].pokemon.name).toBe("charmander");
  });

  it("throws on 404 for unknown type", async () => {
    mock.onGet("/type/faketype").reply(404);
    await expect(fetchType("faketype")).rejects.toThrow();
  });
});

describe("fetchPokemon", () => {
  it("calls GET /pokemon/{name} and returns pokemon data", async () => {
    mock.onGet("/pokemon/pikachu").reply(200, pikachuFixture);
    const result = await fetchPokemon("pikachu");
    expect(result.id).toBe(25);
    expect(result.name).toBe("pikachu");
    expect(result.types[0].type.name).toBe("electric");
  });

  it("throws on 404 for unknown pokemon", async () => {
    mock.onGet("/pokemon/notapokemon").reply(404);
    await expect(fetchPokemon("notapokemon")).rejects.toThrow();
  });
});