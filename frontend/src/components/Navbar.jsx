import { NavLink, Link } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition',
    isActive ? 'bg-temple-deep text-white shadow-glow' : 'text-temple-deep hover:bg-white hover:text-temple-gold',
  ].join(' ');

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-100/80 bg-white/90 backdrop-blur">
      <div className="section-shell flex flex-wrap items-center justify-between gap-3 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-temple-gold to-temple-saffron text-lg font-bold text-white shadow-glow">
            SP
          </div>
          <div>
            <p className="display-font text-lg font-bold tracking-wide text-temple-deep">Smart Pilgrim Companion</p>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Temple travel assistant</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/temples" className={linkClass}>Temples</NavLink>
          <NavLink to="/planner" className={linkClass}>Planner</NavLink>
          <NavLink to="/explore" className={linkClass}>Explore</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </nav>
      </div>
    </header>
  );
}