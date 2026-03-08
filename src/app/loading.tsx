export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <header className="bg-red-600 text-white py-10 px-4 shadow-lg">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-md">Pokédex</h1>
          <p className="mt-2 text-red-100 text-lg">Choose a type to explore its Pokémon</p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="h-8 w-32 bg-gray-200 dark:bg-neutral-700 rounded-lg mb-6 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl h-28 bg-gray-200 dark:bg-neutral-700 animate-pulse"
            />
          ))}
        </div>
      </section>
    </main>
  );
}