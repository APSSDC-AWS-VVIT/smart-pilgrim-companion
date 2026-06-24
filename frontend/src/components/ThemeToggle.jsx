export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="theme-button inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-temple-deep text-white">
        {isDark ? 'D' : 'L'}
      </span>
      <span>{isDark ? 'Dark mode' : 'Light mode'}</span>
    </button>
  );
}