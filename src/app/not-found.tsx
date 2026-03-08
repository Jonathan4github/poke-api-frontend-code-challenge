import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-900 flex flex-col items-center justify-center gap-6 text-center px-4">
      <p className="text-8xl">😵</p>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">404 — Not Found</h1>
      <p className="text-gray-500 text-lg">That page doesn&apos;t exist in the Pokédex.</p>
      <Link
        href="/"
        className="mt-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
}