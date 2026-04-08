import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { modules } from '../data/modules';
import ProgressBar from '../components/ui/ProgressBar';
import ModuleCard from '../components/ui/ModuleCard';
import PerformanceHeatmap from '../components/ui/PerformanceHeatmap';
import { LayoutGrid, Zap, TrendingUp, ChevronRight, Target, Shield, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { isModuleCompleted, isModuleLocked, getPercentageCompleted, xp } = useProgress();

  const nextModule = modules.find(m => !isModuleCompleted(m.id) && !isModuleLocked(m.id))
    || modules[modules.length - 1];

  const getRank = () => {
    if (xp > 500) return "Logic Architect";
    if (xp > 200) return "Syntax Ninja";
    return "Script Novato";
  };

  const stats = [
    { label: "XP TOTAL", value: xp, icon: Zap, color: "text-primary-500" },
    { label: "RANGO", value: getRank(), icon: Shield, color: "text-white" },
    { label: "RACHA", value: "12 DÍAS", icon: Target, color: "text-primary-500" },
  ];

  return (
    <div className="w-full flex-1 bg-black py-12 md:py-20 px-6 grid-bg noise-overlay">
      <div className="max-w-7xl mx-auto">

        {/* Athlete Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b-4 border-zinc-900 pb-12"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 text-primary-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
              <div className="w-2 h-2 bg-primary-500" /> Tus Estadísticas
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white italic leading-[0.85] uppercase tracking-tighter">
              HOLA<br />IGNACIO
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
            <div className="min-w-[200px] flex flex-col items-start lg:items-end">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl md:text-5xl font-black italic text-white">{getPercentageCompleted()}</span>
                <span className="text-xl font-black italic text-zinc-700">%</span>
              </div>
              <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px] mb-4 text-left lg:text-right">Nivel del Lenguaje</p>
              <div className="w-full lg:w-48 h-1 bg-zinc-900 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getPercentageCompleted()}%` }}
                  className="h-full bg-primary-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-8 mb-24">
          {/* Tactical Stats & Recommendation */}
          <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-zinc-900 border border-zinc-900 p-1">
              {stats.map((stat, i) => (
                <div key={i} className="bg-black p-8 flex flex-col items-center justify-center text-center group hover:bg-zinc-950 transition-colors">
                  <stat.icon className={`w-5 h-5 mb-4 ${stat.color}`} />
                  <span className="text-[10px] font-black text-zinc-600 tracking-widest uppercase mb-1">{stat.label}</span>
                  <span className="text-xl font-black text-white italic uppercase tracking-tighter">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Next Mission Banner */}
            {nextModule && !isModuleCompleted(nextModule.id) && (
              <div className="relative group overflow-hidden bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row">
                <div className="flex-1 p-10 z-10">
                  <div className="text-primary-500 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" /> Listo Para Resolver?
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase italic tracking-tighter line-clamp-1">{nextModule.title}</h2>
                  <p className="text-zinc-500 text-sm font-medium max-w-lg mb-8 line-clamp-2">
                    {nextModule.description}
                  </p>
                  <Link to={`/lesson/${nextModule.id}`} className="inline-flex items-center gap-4 text-xs font-black uppercase italic tracking-widest text-white group-hover:text-primary-500 transition-colors">
                    Ejecutar Desafío <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="md:w-64 bg-zinc-950 border-l border-zinc-900 flex flex-col items-center justify-center p-8 text-center">
                  <Award className="w-10 h-10 text-zinc-800 mb-4" />
                  <span className="text-[10px] font-black text-zinc-600 tracking-widest uppercase mb-1">RECOMPENSA</span>
                  <span className="text-primary-500 font-black italic">+{nextModule.xp} XP</span>
                </div>
                {/* Decorative Background Icon */}
                <Target className="absolute -bottom-10 -right-10 w-48 h-48 text-white/[0.02] -rotate-12 group-hover:scale-110 transition-transform duration-1000" />
              </div>
            )}
          </div>

          {/* Consistency Heatmap */}
          <div className="lg:col-span-12 xl:col-span-4">
            <PerformanceHeatmap />
          </div>
        </div>

        {/* Mission List */}
        <div className="space-y-0">
          <div className="flex items-center gap-3 mb-8 border-b border-zinc-900 pb-4 uppercase font-black italic tracking-widest text-zinc-700 text-[10px]">
            <LayoutGrid className="w-3 h-3" />
          </div>

          <div className="flex flex-col">
            {modules.map((module, index) => {
              const isCompleted = isModuleCompleted(module.id);
              const isLocked = isModuleLocked(module.id);

              return (
                <ModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                  isCompleted={isCompleted}
                  isLocked={isLocked}
                />
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
