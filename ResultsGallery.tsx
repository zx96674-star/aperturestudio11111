"use client";

export interface ResultItem {
  id: string;
  type: "IMAGE" | "VIDEO";
  url: string;
  thumbnailUrl?: string | null;
  saved?: boolean;
}

interface ResultsGalleryProps {
  items: ResultItem[];
  isGenerating: boolean;
  error?: string | null;
  onSaveToggle: (id: string, saved: boolean) => void;
}

function IrisLoader() {
  return (
    <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-panel border border-line bg-panel">
      <div className="iris h-12 w-12 animate-iris-spin" aria-hidden />
      <span className="label-eyebrow">Generating…</span>
    </div>
  );
}

export default function ResultsGallery({
  items,
  isGenerating,
  error,
  onSaveToggle,
}: ResultsGalleryProps) {
  const isEmpty = items.length === 0 && !isGenerating && !error;

  return (
    <div className="panel p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="label-eyebrow">Results</span>
        {items.length > 0 && (
          <span className="label-eyebrow text-ink-faint">{items.length} shown</span>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2.5 text-sm text-danger">
          {error}
        </div>
      )}

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-panel border border-dashed border-line py-16 text-center">
          <span className="iris h-8 w-8 opacity-40" aria-hidden />
          <p className="text-sm text-ink-muted">Nothing generated yet.</p>
          <p className="text-xs text-ink-faint">
            Write a prompt and press Generate to see results here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {isGenerating && <IrisLoader />}
          {items.map((item) => (
            <figure
              key={item.id}
              className="group relative overflow-hidden rounded-panel border border-line bg-raised animate-fade-up"
            >
              {item.type === "IMAGE" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt="Generated result"
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <video
                  src={item.url}
                  poster={item.thumbnailUrl ?? undefined}
                  className="aspect-square w-full object-cover"
                  controls
                  muted
                  loop
                />
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-base/90 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={() => onSaveToggle(item.id, !item.saved)}
                  className="rounded-md border border-line bg-base/80 px-2 py-1 text-xs text-ink hover:border-brass-dim"
                >
                  {item.saved ? "Saved ✓" : "Save"}
                </button>
                <a
                  href={item.url}
                  download
                  className="rounded-md border border-line bg-base/80 px-2 py-1 text-xs text-ink hover:border-cyan"
                >
                  Download
                </a>
              </div>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
