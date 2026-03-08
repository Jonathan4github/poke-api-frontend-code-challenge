"use client";

import { useState, useMemo } from "react";
import { PokemonCard } from "@/components/PokemonCard";
import { Pagination } from "@/components/Pagination";

const PAGE_SIZE = 25;

export interface PokemonListItem {
  name: string;
  id: number;
  imageUrl: string | null;
  types: string[];
}

interface PokemonListProps {
  pokemon: PokemonListItem[];
}

export function PokemonList({ pokemon }: PokemonListProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? pokemon.filter((p) => p.name.includes(q)) : pokemon;
  }, [search, pokemon]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="search"
          placeholder="Search by name…"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {filtered.length === pokemon.length
          ? `${pokemon.length} Pokémon`
          : `${filtered.length} of ${pokemon.length} Pokémon`}
        {totalPages > 1 && ` — Page ${page} of ${totalPages}`}
      </p>

      {/* Grid */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {paginated.map((p) => (
            <PokemonCard
              key={p.name}
              name={p.name}
              id={p.id}
              imageUrl={p.imageUrl}
              types={p.types}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">😔</p>
          <p className="text-lg">No Pokémon found for &ldquo;{search}&rdquo;</p>
        </div>
      )}

      {/* Pagination */}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}