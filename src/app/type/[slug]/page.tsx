import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchType, fetchPokemon } from "@/lib/api";
import { typeHexColors } from "@/lib/typeColors";
import { PokemonList, type PokemonListItem } from "./PokemonList";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)}-type Pokémon | Pokédex`,
  };
}

export default async function TypePage({ params }: Props) {
  const { slug } = await params;

  let typeData;
  try {
    typeData = await fetchType(slug);
  } catch {
    notFound();
  }

  // Fetch details for all Pokémon in this type in parallel (batched)
  const pokemonEntries = typeData.pokemon;
  const BATCH_SIZE = 20;
  const results: PokemonListItem[] = [];

  for (let i = 0; i < pokemonEntries.length; i += BATCH_SIZE) {
    const batch = pokemonEntries.slice(i, i + BATCH_SIZE);
    const settled = await Promise.allSettled(
      batch.map((entry) => fetchPokemon(entry.pokemon.name))
    );
    settled.forEach((result) => {
      if (result.status === "fulfilled") {
        const p = result.value;
        results.push({
          name: p.name,
          id: p.id,
          imageUrl:
            p.sprites.other["official-artwork"].front_default ??
            p.sprites.front_default,
          types: p.types.map((t) => t.type.name),
        });
      }
    });
  }

  // Sort by ID
  results.sort((a, b) => a.id - b.id);

  const color = typeHexColors[slug] ?? "#A8A878";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <header className="text-white py-10 px-4 shadow-lg" style={{ backgroundColor: color }}>
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors"
          >
            ← Back to Types
          </Link>
          <h1 className="text-4xl font-extrabold capitalize tracking-tight drop-shadow">
            {slug} Pokémon
          </h1>
          <p className="mt-1 text-white/80">{results.length} Pokémon in this type</p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <PokemonList pokemon={results} />
      </section>
    </main>
  );
}