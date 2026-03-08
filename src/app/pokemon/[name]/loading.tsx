export default function PokemonLoading() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <header className="bg-gray-400 py-10 px-4 shadow-lg animate-pulse">
        <div className="max-w-4xl mx-auto">
          <div className="h-4 w-16 bg-white/30 rounded mb-4" />
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <div className="w-40 h-40 bg-white/20 rounded-full" />
            <div className="space-y-3">
              <div className="h-4 w-20 bg-white/20 rounded" />
              <div className="h-12 w-48 bg-white/30 rounded" />
              <div className="flex gap-2">
                <div className="h-7 w-20 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info card skeleton */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-gray-100 dark:border-neutral-700 space-y-4 animate-pulse">
          <div className="h-6 w-16 bg-gray-200 dark:bg-neutral-700 rounded" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 w-12 bg-gray-200 dark:bg-neutral-700 rounded" />
                <div className="h-5 w-16 bg-gray-200 dark:bg-neutral-700 rounded" />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-3 w-20 bg-gray-200 dark:bg-neutral-700 rounded" />
            <div className="flex gap-2">
              <div className="h-7 w-24 bg-gray-200 dark:bg-neutral-700 rounded-full" />
              <div className="h-7 w-20 bg-gray-200 dark:bg-neutral-700 rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-14 bg-gray-200 dark:bg-neutral-700 rounded" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-16 h-16 bg-gray-200 dark:bg-neutral-700 rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Stats card skeleton */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-gray-100 dark:border-neutral-700 space-y-4 animate-pulse">
          <div className="h-6 w-24 bg-gray-200 dark:bg-neutral-700 rounded" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-20 h-3 bg-gray-200 dark:bg-neutral-700 rounded" />
                <div className="w-8 h-4 bg-gray-200 dark:bg-neutral-700 rounded" />
                <div className="flex-1 h-2.5 bg-gray-200 dark:bg-neutral-700 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}