"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  fallbackHref?: string;
  label?: string;
}

export function BackButton({ fallbackHref = "/", label = "← Back" }: BackButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors"
    >
      {label}
    </button>
  );
}