import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function XPBadge({ xp, size = 'md' }) {
  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-6 py-2 text-xl'
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 font-black italic uppercase tracking-tighter text-white
        ${sizes[size]}
      `}
    >
      <Zap className="w-3.5 h-3.5 text-primary-500 fill-primary-500" />
      <span>{xp} XP</span>
    </motion.div>
  );
}
