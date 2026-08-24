"use client";

export type Mode = "TEXT_TO_IMAGE" | "TEXT_TO_VIDEO" | "IMAGE_TO_VIDEO";

const MODES: { id: Mode; label: string }[] = [
  { id: "TEXT_TO_IMAGE", label: "Image" },
  { id: "TEXT_TO_VIDEO", label: "Video" },
  { id: "IMAGE_TO_VIDEO", label: "Animate image" },
];

interface ModeToggleProps {
  value: Mode;
  onChange: (m: Mode) => void;
}

export default function ModeToggle({ value, onChange }: ModeToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Generation mode"
      className="inline-flex rounded-lg border border-line bg-raised p-1"
    >
      {MODES.map((m) => (
        <button
          key={m.id}
          role="tab"
          aria-selected={value === m.id}
          onClick={() => onChange(m.id)}
          className={`rounded-md px-3 py-1.5 text-sm transition ${
            value === m.id
              ? "bg-brass text-base font-medium"
              : "text-ink-muted hover:text-ink"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
