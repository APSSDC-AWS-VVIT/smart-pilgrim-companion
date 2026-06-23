export default function Loader() {
  return (
    <div className="grid place-items-center rounded-3xl border border-dashed border-amber-200 bg-white/80 p-10 text-center text-slate-500">
      <div className="h-10 w-10 animate-pulse rounded-full bg-gradient-to-br from-temple-gold to-temple-saffron" />
      <p className="mt-4 text-sm font-medium">Loading pilgrimage data...</p>
    </div>
  );
}