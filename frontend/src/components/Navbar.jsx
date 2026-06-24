import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const linkClass = ({ isActive }) =>
  [
    'nav-chip rounded-full px-4 py-2 text-sm font-medium',
    isActive ? 'bg-temple-deep text-white shadow-glow' : 'text-temple-ink',
  ].join(' ');

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    return window.localStorage.getItem('smart-pilgrim-theme') || 'light';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('smart-pilgrim-theme', theme);
  }, [theme]);

  const navigationItems = [
    { to: '/', label: 'Home' },
    { to: '/temples', label: 'Temples' },
    { to: '/planner', label: 'Planner' },
    { to: '/explore', label: 'Explore' },
    { to: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--app-border)] bg-[color:var(--app-bg-elevated)] backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between gap-4 py-4">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--app-border)] bg-white shadow-glow">
            <img src="/assets/images/SmartPiligrimCompanionLogo.png" alt="Smart Pilgrim Companion logo" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="display-font truncate text-lg font-bold tracking-wide text-temple-deep">Smart Pilgrim Companion</p>
            <p className="truncate text-xs uppercase tracking-[0.25em] text-app-muted">Temple travel assistant</p>
          </div>
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <nav className="flex items-center gap-2">
            {navigationItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <ThemeToggle theme={theme} onToggle={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle theme={theme} onToggle={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="theme-button inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? '×' : '≡'}
          </button>
        </div>
      </div>

      <div className={`section-shell pb-4 lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <nav className="surface-panel grid gap-2 rounded-3xl p-3">
          {navigationItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}