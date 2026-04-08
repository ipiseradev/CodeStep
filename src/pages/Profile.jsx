import { motion } from 'framer-motion';
import { User, Trophy, BookOpen, Flame, Star, Zap, ShieldCheck, Activity } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import ProgressBar from '../components/ui/ProgressBar';

export default function Profile() {
  const { xp, completedModules, getPercentageCompleted, totalModules } = useProgress();

  const getRank = (xp) => {
    if (xp < 100) return { title: "Entry Level", color: "text-zinc-600" };
    if (xp < 300) return { title: "Pro Athlete", color: "text-white" };
    if (xp < 600) return { title: "Elite Runner", color: "text-primary-500" };
    return { title: "Hall of Fame", color: "text-primary-500 underline" };
  };

  const rank = getRank(xp);
  const level = Math.floor(xp / 100) + 1;

  return (
    <div className="w-full flex-1 bg-black py-24 px-6 grid-bg noise-overlay">
      <div className="max-w-7xl mx-auto">
        
        {/* Performance Header */}
        <div className="flex flex-col md:flex-row gap-16 items-start mb-40">
          <div className="relative">
            <div className="w-64 h-64 bg-zinc-950 border-8 border-zinc-900 flex items-center justify-center rotate-3">
              <User className="w-32 h-32 text-zinc-800" />
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary-500 text-black flex items-center justify-center text-4xl font-black italic -rotate-6">
                L{level}
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="text-zinc-500 font-black uppercase text-xs tracking-[0.4em] mb-4">Official Performance Report</div>
            <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-6 leading-none">
              STATUS:<br />
              <span className={rank.color}>{rank.title}</span>
            </h1>
            <div className="flex items-center gap-4 text-2xl font-black italic text-zinc-500">
                <Activity className="w-6 h-6" /> Total Progression: {getPercentageCompleted()}%
            </div>
          </div>
        </div>

        {/* Hard Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-1 bg-zinc-900 p-1">
          <StatBox label="Energy Accumulated" value={`${xp} XP`} icon={<Zap className="w-6 h-6 fill-primary-500 text-primary-500" />} />
          <StatBox label="Missions Exceuted" value={`${completedModules.length}/${totalModules}`} icon={<BookOpen className="w-6 h-6" />} />
          <StatBox label="Current Streak" value="01 Day" icon={<Flame className="w-6 h-6" />} />
        </div>

        {/* Detailed Breakdown */}
        <div className="grid md:grid-cols-12 gap-1 bg-zinc-900">
            <div className="md:col-span-8 bg-black p-16 border border-zinc-900">
                <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-12">Capacidades Técnicas</h3>
                <div className="space-y-12">
                    <div>
                        <div className="flex justify-between items-end mb-4 font-black uppercase italic italic text-xs tracking-widest">
                            <span className="text-zinc-500">Mastery Level</span>
                            <span className="text-white">Active</span>
                        </div>
                        <ProgressBar progress={getPercentageCompleted()} className="h-4" />
                    </div>
                </div>
            </div>
            <div className="md:col-span-4 bg-zinc-950 p-16 border border-zinc-900 flex flex-col justify-between">
                <div>
                    <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-10 border-b border-zinc-900 pb-4">Completed Cycles</h4>
                    <ul className="space-y-6">
                        {completedModules.length > 0 ? (
                            completedModules.map((mid, idx) => (
                                <li key={idx} className="flex items-center justify-between group">
                                    <span className="text-xl font-black text-zinc-300 uppercase italic italic">Cycle_{idx + 1}</span>
                                    <span className="text-primary-500 font-black tracking-widest text-[10px] uppercase group-hover:block">Deployed</span>
                                </li>
                            ))
                        ) : (
                            <li className="text-zinc-700 italic font-black uppercase">No cycles Deployed.</li>
                        )}
                    </ul>
                </div>
                <div className="mt-20">
                    <ShieldCheck className="w-12 h-12 text-zinc-900" />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

function StatBox({ label, value, icon }) {
  return (
    <div className="bg-black p-12 hover:bg-zinc-950 transition-colors">
      <div className="flex items-center gap-3 mb-8 text-zinc-700">
        {icon} <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">{value}</div>
    </div>
  );
}
