import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchPokemon } from "@/lib/api";
import { TypeBadge } from "@/components/TypeBadge";
import { StatBar } from "@/components/StatBar";
import { BackButton } from "@/components/BackButton";
import { typeHexColors } from "@/lib/typeColors";

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { name } = await params;
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return { title: `${displayName} | Pokédex` };
}

export default async function PokemonPage({ params }: Props) {
  const { name } = await params;

  let pokemon;
  try {
    pokemon = await fetchPokemon(name);
  } catch {
    notFound();
  }

  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const headerColor = typeHexColors[primaryType] ?? "#A8A878";
  const artwork =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Header */}
      <header className="text-white py-10 px-4 shadow-lg" style={{ backgroundColor: headerColor }}>
        <div className="max-w-4xl mx-auto">
          <BackButton />
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            {artwork && (
              <div className="relative w-40 h-40 drop-shadow-2xl">
                <Image
                  src={artwork}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                  sizes="160px"
                  priority
                />
              </div>
            )}
            <div>
              <p className="text-white/70 font-mono text-lg">
                #{String(pokemon.id).padStart(4, "0")}
              </p>
              <h1 className="text-5xl font-extrabold capitalize tracking-tight drop-shadow">
                {pokemon.name}
              </h1>
              <div className="flex gap-2 mt-3 flex-wrap">
                {pokemon.types.map((t) => (
                  <TypeBadge key={t.type.name} type={t.type.name} linkable />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info card */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-700 space-y-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Info</h2>

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-400 uppercase text-xs tracking-wide">Height</dt>
              <dd className="font-semibold text-gray-800 dark:text-gray-100 mt-1">
                {(pokemon.height / 10).toFixed(1)} m
              </dd>
            </div>
            <div>
              <dt className="text-gray-400 uppercase text-xs tracking-wide">Weight</dt>
              <dd className="font-semibold text-gray-800 dark:text-gray-100 mt-1">
                {(pokemon.weight / 10).toFixed(1)} kg
              </dd>
            </div>
            <div>
              <dt className="text-gray-400 uppercase text-xs tracking-wide">Base Exp</dt>
              <dd className="font-semibold text-gray-800 dark:text-gray-100 mt-1">
                {pokemon.base_experience ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-gray-400 uppercase text-xs tracking-wide">Total Stats</dt>
              <dd className="font-semibold text-gray-800 dark:text-gray-100 mt-1">{totalStats}</dd>
            </div>
          </dl>

          <div>
            <h3 className="text-gray-400 uppercase text-xs tracking-wide mb-2">Abilities</h3>
            <ul className="flex flex-wrap gap-2">
              {pokemon.abilities.map((a) => (
                <li
                  key={a.ability.name}
                  className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 rounded-full text-sm capitalize text-gray-700 dark:text-gray-300"
                >
                  {a.ability.name}
                  {a.is_hidden && (
                    <span className="ml-1 text-xs text-gray-400">(hidden)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Sprites */}
          <div>
            <h3 className="text-gray-400 uppercase text-xs tracking-wide mb-2">Sprites</h3>
            <div className="flex gap-2 flex-wrap">
              {[
                pokemon.sprites.front_default,
                pokemon.sprites.back_default,
                pokemon.sprites.front_shiny,
              ]
                .filter(Boolean)
                .map((src, i) => (
                  <div key={i} className="relative w-16 h-16 bg-gray-100 dark:bg-neutral-700 rounded-lg">
                    <Image
                      src={src!}
                      alt={`${pokemon.name} sprite ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Stats card */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-700 space-y-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Base Stats</h2>
          <div className="space-y-3">
            {pokemon.stats.map((s) => (
              <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
            ))}
          </div>
          <p className="text-right text-xs text-gray-400 mt-2">max per stat: 255</p>
        </div>
      </section>
    </main>
  );
}