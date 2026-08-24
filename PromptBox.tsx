"use client";

interface PromptBoxProps {
  prompt: string;
  negativePrompt: string;
  onPromptChange: (v: string) => void;
  onNegativePromptChange: (v: string) => void;
}

export default function PromptBox({
  prompt,
  negativePrompt,
  onPromptChange,
  onNegativePromptChange,
}: PromptBoxProps) {
  return (
    <div className="panel p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between">
        <span className="label-eyebrow">Prompt</span>
        <span className="label-eyebrow text-ink-faint">
          {prompt.length}/2000
        </span>
      </div>
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value.slice(0, 2000))}
        placeholder="Describe the scene — subject, lighting, camera angle, mood…"
        rows={4}
        className="control-input w-full resize-none px-3 py-2.5 text-sm placeholder:text-ink-faint"
      />

      <details className="mt-3 group">
        <summary className="label-eyebrow cursor-pointer select-none list-none text-ink-faint hover:text-ink-muted">
          + Exclude from the result
        </summary>
        <textarea
          value={negativePrompt}
          onChange={(e) => onNegativePromptChange(e.target.value.slice(0, 1000))}
          placeholder="Things to avoid — e.g. blurry, extra limbs, watermark…"
          rows={2}
          className="control-input mt-2 w-full resize-none px-3 py-2 text-sm placeholder:text-ink-faint"
        />
      </details>
    </div>
  );
}
