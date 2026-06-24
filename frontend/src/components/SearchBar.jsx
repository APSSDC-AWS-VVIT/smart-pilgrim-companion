export default function SearchBar({ value, onChange, placeholder = 'Search temples, locations, or attractions', onSubmit }) {
  function handleKeyDown(event) {
    if (event.key === 'Enter' && onSubmit) {
      event.preventDefault();
      onSubmit();
    }
  }

  return (
    <label className="input-shell focus-ring flex w-full items-center gap-3 rounded-2xl px-4 py-3 shadow-sm">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-temple-warm text-lg font-semibold text-temple-saffron">⌕</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--app-muted)]"
      />
    </label>
  );
}