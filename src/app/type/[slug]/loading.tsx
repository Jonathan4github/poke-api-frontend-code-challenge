export default function TypeLoading() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <header className="bg-gray-400 py-10 px-4 shadow-lg animate-pulse">
        <div className="max-w-6xl mx-auto">
          <div className="h-4 w-24 bg-white/30 rounded mb-4" />
          <div className="h-10 w-48 bg-white/30 rounded mb-2" />
          <div className="h-4 w-32 bg-white/20 rounded" />
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        {/* Search skeleton */}
        <div className="h-11 w-full max-w-md bg-gray-200 dark:bg-neutral-700 rounded-xl animate-pulse" />

        {/* Count skeleton */}
        <div className="h-4 w-40 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse" />

        {/* Grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-4 flex flex-col items-center gap-2 border border-gray-100 dark:border-neutral-700 animate-pulse"
            >
              <div className="w-8 h-3 bg-gray-200 dark:bg-neutral-700 rounded self-end" />
              <div className="w-24 h-24 bg-gray-200 dark:bg-neutral-700 rounded-full" />
              <div className="w-20 h-4 bg-gray-200 dark:bg-neutral-700 rounded" />
              <div className="w-14 h-5 bg-gray-200 dark:bg-neutral-700 rounded-full" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}