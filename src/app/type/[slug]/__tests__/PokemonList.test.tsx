import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PokemonList, type PokemonListItem } from "@/app/type/[slug]/PokemonList";

function makePokemon(count: number): PokemonListItem[] {
  return Array.from({ length: count }, (_, i) => ({
    name: `pokemon-${i + 1}`,
    id: i + 1,
    imageUrl: null,
    types: ["normal"],
  }));
}

describe("PokemonList", () => {
  it("renders all pokemon cards when list has ≤25 items", () => {
    render(<PokemonList pokemon={makePokemon(10)} />);
    expect(screen.getAllByRole("link")).toHaveLength(10);
  });

  it("renders only 25 cards on the first page when list has more", () => {
    render(<PokemonList pokemon={makePokemon(30)} />);
    // 25 pokemon cards + pagination buttons, just check cards by name
    expect(screen.getByText("pokemon-1")).toBeInTheDocument();
    expect(screen.queryByText("pokemon-26")).not.toBeInTheDocument();
  });

  it("does not render Pagination when all items fit on one page", () => {
    render(<PokemonList pokemon={makePokemon(20)} />);
    expect(screen.queryByRole("navigation", { name: /pagination/i })).not.toBeInTheDocument();
  });

  it("renders Pagination when there are more than 25 items", () => {
    render(<PokemonList pokemon={makePokemon(26)} />);
    expect(screen.getByRole("navigation", { name: /pagination/i })).toBeInTheDocument();
  });

  it("filters cards by search term", async () => {
    const user = userEvent.setup();
    const pokemon: PokemonListItem[] = [
      { name: "pikachu", id: 25, imageUrl: null, types: ["electric"] },
      { name: "charmander", id: 4, imageUrl: null, types: ["fire"] },
      { name: "pidgey", id: 16, imageUrl: null, types: ["normal"] },
    ];
    render(<PokemonList pokemon={pokemon} />);
    await user.type(screen.getByRole("searchbox"), "pi");
    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("pidgey")).toBeInTheDocument();
    expect(screen.queryByText("charmander")).not.toBeInTheDocument();
  });

  it("search is case-insensitive", async () => {
    const user = userEvent.setup();
    const pokemon: PokemonListItem[] = [
      { name: "pikachu", id: 25, imageUrl: null, types: ["electric"] },
    ];
    render(<PokemonList pokemon={pokemon} />);
    await user.type(screen.getByRole("searchbox"), "PIKA");
    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  it("shows empty state when search has no matches", async () => {
    const user = userEvent.setup();
    render(<PokemonList pokemon={makePokemon(5)} />);
    await user.type(screen.getByRole("searchbox"), "zzznomatch");
    expect(screen.getByText(/no pokémon found/i)).toBeInTheDocument();
  });

  it("resets to page 1 when search changes", async () => {
    const user = userEvent.setup();
    const pokemon = makePokemon(60);
    render(<PokemonList pokemon={pokemon} />);

    // Go to page 2
    await user.click(screen.getByRole("button", { name: "2" }));
    expect(screen.getByText(/page 2/i)).toBeInTheDocument();

    // Type in search — should reset to page 1
    await user.type(screen.getByRole("searchbox"), "pokemon");
    expect(screen.getByText(/page 1/i)).toBeInTheDocument();
  });

  it("shows filtered count in summary text", async () => {
    const user = userEvent.setup();
    const pokemon: PokemonListItem[] = [
      { name: "pikachu", id: 25, imageUrl: null, types: ["electric"] },
      { name: "charmander", id: 4, imageUrl: null, types: ["fire"] },
      { name: "pidgey", id: 16, imageUrl: null, types: ["normal"] },
    ];
    render(<PokemonList pokemon={pokemon} />);
    await user.type(screen.getByRole("searchbox"), "pi");
    expect(screen.getByText(/2 of 3/i)).toBeInTheDocument();
  });
});