"use client";

export const STYLES = [
  { id: "editorial", label: "Editorial" },
  { id: "cinematic", label: "Cinematic" },
  { id: "product", label: "Product" },
  { id: "fantasy", label: "Fantasy" },
  { id: "architecture", label: "Architecture" },
  { id: "nature", label: "Nature" },
  { id: "abstract", label: "Abstract" },
  { id: "vintage-film", label: "Vintage film" },
] as const;

interface StyleSelectorProps {
  value: string;
  onChange: (v: string) => void;
}

export default function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="panel p-4 sm:p-5">
      <span className="label-eyebrow">Style</span>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STYLES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onChange(s.id)}
            aria-pressed={value === s.id}
            className={`rounded-lg border px-3 py-2 text-sm transition ${
              value === s.id
                ? "border-brass bg-brass/10 text-ink"
                : "border-line bg-raised text-ink-muted hover:border-brass-dim hover:text-ink"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
