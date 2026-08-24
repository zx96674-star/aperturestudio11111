import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="iris h-6 w-6 shrink-0" aria-hidden />
          <span className="font-display text-lg font-semibold tracking-tight">
            Aperture
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="rounded-lg px-3 py-1.5 text-sm text-ink-muted transition hover:bg-panel hover:text-ink"
          >
            Studio
          </Link>
          <Link
            href="/gallery"
            className="rounded-lg px-3 py-1.5 text-sm text-ink-muted transition hover:bg-panel hover:text-ink"
          >
            Gallery
          </Link>
          <button className="ml-1 rounded-lg border border-line px-3 py-1.5 text-sm text-ink-muted transition hover:border-brass-dim hover:text-ink">
            Account
          </button>
        </nav>
      </div>
    </header>
  );
}
