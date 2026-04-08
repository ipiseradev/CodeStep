import { Link, useLocation } from 'react-router-dom';
import { Code2, User, LayoutDashboard, Zap } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { xp } = useProgress();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/[0.03] bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-white p-2 rounded-none transition-transform group-hover:-rotate-6">
            <Code2 className="w-5 h-5 text-black" />
          </div>
          <span className="font-black text-2xl tracking-[-0.08em] text-white uppercase italic">
            CODE<span className="text-primary-500">STEP</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {!isHome && (
            <div className="hidden md:flex items-center gap-10">
                <Link to="/dashboard" className={`text-xs font-black uppercase tracking-[0.15em] transition-colors ${location.pathname === '/dashboard' ? 'text-primary-500' : 'text-zinc-500 hover:text-white'}`}>
                    Dashboard
                </Link>
                <Link to="/profile" className={`text-xs font-black uppercase tracking-[0.15em] transition-colors ${location.pathname === '/profile' ? 'text-primary-500' : 'text-zinc-500 hover:text-white'}`}>
                    Performance
                </Link>
            </div>
          )}

          <div className="flex items-center gap-6 pl-8 border-l border-white/10">
            <div className="flex items-center gap-2 bg-zinc-900 border border-white/5 py-1 px-3">
              <Zap className="w-3.5 h-3.5 text-primary-500 fill-primary-500" />
              <span className="text-sm font-black text-white italic">{xp}</span>
            </div>
            
            <Link 
                to={isHome ? "/dashboard" : "/profile"} 
                className="w-10 h-10 bg-white items-center justify-center flex hover:bg-primary-500 transition-colors"
            >
              {isHome ? <LayoutDashboard className="w-5 h-5 text-black" /> : <User className="w-5 h-5 text-black" />}
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
}
