import Link from "next/link";
import { typeHexColors } from "@/lib/typeColors";

const TYPE_ICONS: Record<string, string> = {
  normal: "⚪",
  fire: "🔥",
  water: "💧",
  grass: "🌿",
  electric: "⚡",
  ice: "❄️",
  fighting: "🥊",
  poison: "☠️",
  ground: "🌍",
  flying: "🦅",
  psychic: "🔮",
  bug: "🐛",
  rock: "🪨",
  ghost: "👻",
  dark: "🌑",
  dragon: "🐉",
  steel: "⚙️",
  fairy: "🧚",
  stellar: "⭐",
  unknown: "❓",
};

interface TypeCardProps {
  name: string;
}

export function TypeCard({ name }: TypeCardProps) {
  const color = typeHexColors[name] ?? "#A8A878";
  const icon = TYPE_ICONS[name] ?? "❓";

  return (
    <Link href={`/type/${name}`}>
      <div
        className="relative rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl flex flex-col items-center gap-3 select-none"
        style={{ backgroundColor: color }}
      >
        <span className="text-4xl">{icon}</span>
        <span className="text-white font-bold text-lg capitalize tracking-wide drop-shadow">
          {name}
        </span>
      </div>
    </Link>
  );
}
