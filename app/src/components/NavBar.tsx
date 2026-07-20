import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-bold uppercase tracking-wide transition-colors ${
    isActive ? 'text-danger' : 'text-ink/70 hover:text-ink'
  }`;

export default function NavBar() {
  return (
    <header className="border-b border-gray-light-3 bg-white/95 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="font-black text-lg tracking-tight text-dark">
          Dangerous by Design <span className="text-danger">2026</span>
        </NavLink>
        <nav className="flex items-center gap-6">
          <NavLink to="/rankings" className={linkClass}>
            Rankings
          </NavLink>
          <NavLink to="/anatomy" className={linkClass}>
            Street Anatomy
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
