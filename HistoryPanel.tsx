"use client";

export interface HistoryJob {
  id: string;
  prompt: string;
  mode: string;
  status: string;
  createdAt: string;
  creations: { id: string; url: string; type: string }[];
}

interface HistoryPanelProps {
  jobs: HistoryJob[];
  onReuse: (prompt: string) => void;
}

const STATUS_STYLES: Record<string, string> = {
  COMPLETE: "text-cyan",
  REJECTED: "text-danger",
  FAILED: "text-danger",
  GENERATING: "text-brass",
  MODERATING: "text-ink-muted",
  PENDING: "text-ink-muted",
};

export default function HistoryPanel({ jobs, onReuse }: HistoryPanelProps) {
  return (
    <div className="panel p-4 sm:p-5">
      <span className="label-eyebrow">History</span>

      {jobs.length === 0 ? (
        <p className="mt-3 text-sm text-ink-faint">
          Past generations will appear here.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-line">
          {jobs.map((job) => (
            <li key={job.id} className="flex items-center gap-3 py-2.5">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-raised">
                {job.creations[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={job.creations[0].url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-ink">{job.prompt}</p>
                <p className="label-eyebrow">
                  <span className={STATUS_STYLES[job.status] ?? "text-ink-muted"}>
                    {job.status.toLowerCase()}
                  </span>
                </p>
              </div>
              <button
                onClick={() => onReuse(job.prompt)}
                className="shrink-0 rounded-md border border-line px-2 py-1 text-xs text-ink-muted hover:border-brass-dim hover:text-ink"
              >
                Reuse
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
