import { TypeCard } from "@/components/TypeCard";
import { fetchAllTypes } from "@/lib/api";

export const metadata = {
  title: "Pokédex | Browse by Type",
  description: "Explore Pokémon by their types",
};

export default async function HomePage() {
  const { results } = await fetchAllTypes();
  const types = results.filter((t) => t.name !== "shadow");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <header className="bg-red-600 text-white py-10 px-4 shadow-lg">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-md">Pokédex</h1>
          <p className="mt-2 text-red-100 text-lg">Choose a type to explore its Pokémon</p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-6">
          All Types <span className="text-base font-normal text-gray-400">({types.length})</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {types.map((type) => (
            <TypeCard key={type.name} name={type.name} />
          ))}
        </div>
      </section>
    </main>
  );
}