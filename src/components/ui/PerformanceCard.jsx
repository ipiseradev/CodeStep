import { motion } from 'framer-motion';

export default function PerformanceCard({ label, value, subtext, icon: Icon, color = "text-primary-500", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden border border-white/5 bg-[#0a0a0a] p-8 transition-all hover:bg-[#0c0c0c] hover:border-white/10"
    >
      {/* Background Accent */}
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary-500/5 blur-3xl transition-opacity group-hover:opacity-100`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] font-black uppercase tracking-[2.5px] text-zinc-500 group-hover:text-zinc-400 transition-colors">
            {label}
          </span>
          <div className={`p-2 bg-zinc-900/50 group-hover:bg-zinc-800/50 transition-colors`}>
            <Icon className={`w-4 h-4 ${color}`} />
          </div>
        </div>
        
        <div className="flex items-baseline gap-1">
          <div className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none group-hover:scale-[1.02] transition-transform origin-left">
            {value}
          </div>
        </div>
        
        {subtext && (
          <div className="mt-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            {subtext}
          </div>
        )}
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary-500 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}
