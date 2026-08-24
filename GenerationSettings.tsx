"use client";

import { Mode } from "./ModeToggle";

const RATIOS = ["1:1", "4:5", "9:16", "16:9"] as const;
const QUALITIES = [
  { id: "draft", label: "Draft", hint: "Fast" },
  { id: "standard", label: "Standard", hint: "Balanced" },
  { id: "high", label: "High", hint: "Slower" },
] as const;

interface GenerationSettingsProps {
  mode: Mode;
  aspectRatio: string;
  quality: string;
  durationSec: number;
  onAspectRatioChange: (v: string) => void;
  onQualityChange: (v: string) => void;
  onDurationChange: (v: number) => void;
}

export default function GenerationSettings({
  mode,
  aspectRatio,
  quality,
  durationSec,
  onAspectRatioChange,
  onQualityChange,
  onDurationChange,
}: GenerationSettingsProps) {
  const isVideo = mode !== "TEXT_TO_IMAGE";

  return (
    <div className="panel p-4 sm:p-5">
      <span className="label-eyebrow">Generation settings</span>

      <div className="mt-3">
        <span className="mb-1.5 block text-xs text-ink-muted">Aspect ratio</span>
        <div className="flex flex-wrap gap-2">
          {RATIOS.map((r) => (
            <button
              key={r}
              onClick={() => onAspectRatioChange(r)}
              aria-pressed={aspectRatio === r}
              className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition ${
                aspectRatio === r
                  ? "border-cyan bg-cyan/10 text-ink"
                  : "border-line bg-raised text-ink-muted hover:text-ink"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <span className="mb-1.5 block text-xs text-ink-muted">Quality</span>
        <div className="flex gap-2">
          {QUALITIES.map((q) => (
            <button
              key={q.id}
              onClick={() => onQualityChange(q.id)}
              aria-pressed={quality === q.id}
              className={`flex-1 rounded-lg border px-3 py-2 text-left transition ${
                quality === q.id
                  ? "border-brass bg-brass/10"
                  : "border-line bg-raised hover:border-brass-dim"
              }`}
            >
              <div className="text-sm text-ink">{q.label}</div>
              <div className="text-[11px] text-ink-faint">{q.hint}</div>
            </button>
          ))}
        </div>
      </div>

      {isVideo && (
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-ink-muted">Clip duration</span>
            <span className="font-mono text-xs text-ink-muted">{durationSec}s</span>
          </div>
          <input
            type="range"
            min={2}
            max={12}
            step={1}
            value={durationSec}
            onChange={(e) => onDurationChange(Number(e.target.value))}
            className="w-full accent-brass"
          />
        </div>
      )}
    </div>
  );
}
