import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Lock, ChevronRight, Zap } from 'lucide-react';
import XPBadge from './XPBadge';

export default function ModuleCard({ module, index, isCompleted, isLocked }) {
  const isAvailable = !isCompleted && !isLocked;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`group relative border-b border-zinc-900 transition-all duration-300 ${
        isLocked ? 'opacity-30' : 'hover:bg-zinc-950'
      }`}
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center py-12 px-2">
        {/* Module Number/Status */}
        <div className="flex-shrink-0 w-24 flex flex-col mb-4 md:mb-0">
          <span className="text-zinc-800 font-black text-4xl italic leading-none group-hover:text-zinc-700 transition-colors">
            {index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>
          {isCompleted && <span className="text-[10px] font-black text-primary-500 uppercase mt-2 tracking-widest">Done</span>}
        </div>
        
        <div className="flex-1 pr-10">
          <div className="flex items-center gap-4 mb-3">
            <h3 className={`text-3xl font-black uppercase italic tracking-tighter ${isLocked ? 'text-zinc-600' : 'text-white'}`}>
              {module.title}
            </h3>
            {!isLocked && (
              <div className="flex items-center gap-1 text-[10px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-800 px-2 py-0.5">
                 <Zap className="w-3 h-3 fill-zinc-500" /> {module.xp} XP
              </div>
            )}
          </div>
          <p className="text-zinc-500 text-lg font-medium leading-tight max-w-2xl">
            {module.description}
          </p>
        </div>

        <div className="w-full md:w-auto mt-8 md:mt-0 flex items-center justify-end">
          {isLocked ? (
            <div className="p-4 bg-zinc-900/50">
              <Lock className="w-6 h-6 text-zinc-800" />
            </div>
          ) : (
            <Link 
              to={`/lesson/${module.id}`} 
              className={`flex items-center gap-4 px-10 py-5 transition-all ${
                isCompleted 
                ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800' 
                : 'bg-white text-black hover:bg-primary-500 font-black italic uppercase tracking-tighter shadow-[5px_5px_0px_rgba(255,255,255,0.1)]'
              }`}
            >
              <span>{isCompleted ? 'Review' : 'Go for it'}</span>
              <ChevronRight className={`w-6 h-6 ${!isCompleted && 'group-hover:translate-x-1 transition-transform'}`} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
