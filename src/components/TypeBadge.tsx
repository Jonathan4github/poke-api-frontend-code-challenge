import Link from "next/link";
import { getTypeColors } from "@/lib/typeColors";

interface TypeBadgeProps {
  type: string;
  linkable?: boolean;
}

export function TypeBadge({ type, linkable = false }: TypeBadgeProps) {
  const colors = getTypeColors(type);
  const className = `inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${colors.bg} ${colors.text}`;

  if (linkable) {
    return (
      <Link href={`/type/${type}`} className={className}>
        {type}
      </Link>
    );
  }

  return <span className={className}>{type}</span>;
}
