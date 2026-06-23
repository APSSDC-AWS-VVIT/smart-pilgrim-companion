export default function Footer() {
  return (
    <footer className="mt-16 border-t border-amber-100 bg-white">
      <div className="section-shell py-10 text-sm text-slate-600">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>Smart Pilgrim Companion uses repository data as the source of truth for temple discovery and trip planning.</p>
          <p className="font-medium text-temple-deep">Temporary frontend transforms only. Backend APIs can replace them later.</p>
        </div>
      </div>
    </footer>
  );
}