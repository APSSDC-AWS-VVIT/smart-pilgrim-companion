export default function Loader() {
  return (
    <div className="surface-panel grid place-items-center rounded-3xl p-10 text-center text-app-muted">
      <div className="h-10 w-10 animate-pulse rounded-full bg-gradient-to-br from-temple-gold to-temple-saffron" />
      <p className="mt-4 text-sm font-medium">Loading pilgrimage data...</p>
      <div className="mt-6 grid w-full max-w-sm gap-3">
        <div className="h-4 rounded-full bg-black/5 dark:bg-white/10" />
        <div className="h-4 w-5/6 rounded-full bg-black/5 dark:bg-white/10" />
        <div className="h-4 w-2/3 rounded-full bg-black/5 dark:bg-white/10" />
      </div>
    </div>
  );
}