const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SP.ATK",
  "special-defense": "SP.DEF",
  speed: "SPD",
};

const STAT_COLORS: Record<string, string> = {
  hp: "bg-red-400",
  attack: "bg-orange-400",
  defense: "bg-yellow-400",
  "special-attack": "bg-blue-400",
  "special-defense": "bg-green-400",
  speed: "bg-pink-400",
};

interface StatBarProps {
  name: string;
  value: number;
  max?: number;
}

export function StatBar({ name, value, max = 255 }: StatBarProps) {
  const label = STAT_LABELS[name] ?? name;
  const color = STAT_COLORS[name] ?? "bg-gray-400";
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </span>
      <span className="w-8 text-sm font-bold text-gray-700 dark:text-gray-200">{value}</span>
      <div className="flex-1 bg-gray-200 dark:bg-neutral-700 rounded-full h-2.5 overflow-hidden">
        <div
          className={`${color} h-full rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
