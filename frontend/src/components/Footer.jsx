export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--app-border)] bg-[color:var(--app-bg-elevated)]">
      <div className="section-shell py-10 text-sm text-app-muted">
        <div className="grid gap-6 sm:grid-cols-[1.2fr_0.8fr] sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-temple-deep">Smart Pilgrim Companion</p>
            <p className="mt-2 leading-7">Cloud-based spiritual travel and temple assistance platform built from repository data, with frontend UI tuned for demo-ready clarity and responsive navigation.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:justify-end">
            <span className="rounded-full bg-white px-3 py-2 text-temple-deep">Home</span>
            <span className="rounded-full bg-white px-3 py-2 text-temple-deep">Temples</span>
            <span className="rounded-full bg-white px-3 py-2 text-temple-deep">Planner</span>
            <span className="rounded-full bg-white px-3 py-2 text-temple-deep">Explore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}