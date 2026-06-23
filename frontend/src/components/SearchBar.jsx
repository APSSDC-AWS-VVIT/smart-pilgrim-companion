export default function SearchBar({ value, onChange, placeholder = 'Search temples, locations, or attractions' }) {
  return (
    <label className="flex w-full items-center gap-3 rounded-2xl border border-amber-100 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-temple-gold/30">
      <span className="text-xl text-temple-gold">⌕</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
      />
    </label>
  );
}