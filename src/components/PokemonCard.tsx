import Link from "next/link";
import Image from "next/image";
import { TypeBadge } from "./TypeBadge";

interface PokemonCardProps {
  name: string;
  id: number;
  imageUrl: string | null;
  types: string[];
}

export function PokemonCard({ name, id, imageUrl, types }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${name}`}>
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl border border-gray-100 dark:border-neutral-700">
        <span className="text-gray-400 text-xs font-mono self-end">#{String(id).padStart(4, "0")}</span>
        <div className="relative w-24 h-24">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-contain drop-shadow-md"
              sizes="96px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">❓</div>
          )}
        </div>
        <span className="font-semibold capitalize text-gray-800 dark:text-gray-100">{name}</span>
        <div className="flex gap-1 flex-wrap justify-center">
          {types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </div>
      </div>
    </Link>
  );
}
