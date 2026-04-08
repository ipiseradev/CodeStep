
import { Link, useLocation } from 'react-router-dom';
import { Code2, User, Zap } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export default function Navbar() {
  const { xp } = useProgress();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <span className="font-black text-2xl tracking-[-0.08em] text-white uppercase italic">
            CODE<span className="text-primary-650">STEP</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {!isHome && (
            <div className="hidden md:flex items-center gap-10">
              <Link
                to="/dashboard"
                className={`text-xs font-black uppercase tracking-[0.15em] transition-colors ${location.pathname === '/dashboard'
                  ? 'text-primary-500'
                  : 'text-zinc-500 hover:text-white'
                  }`}
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                className={`text-xs font-black uppercase tracking-[0.15em] transition-colors ${location.pathname === '/profile'
                  ? 'text-primary-500'
                  : 'text-zinc-500 hover:text-white'
                  }`}
              >
                Progreso
              </Link>
            </div>
          )}

          <div className="flex items-center gap-4 pl-6 border-l border-white/10">
          
            {isHome ? (
              <Link
                to="/dashboard"
                className="h-11 px-5 bg-white text-black flex items-center justify-center text-xs font-black uppercase tracking-[0.12em] hover:bg-primary-500 transition-colors"
              >
                Entrar al Dashboard
              </Link>
            ) : (
              <Link
                to="/profile"
                className="w-10 h-10 bg-white flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <User className="w-5 h-5 text-black" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}