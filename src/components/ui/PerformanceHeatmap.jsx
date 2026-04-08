import { motion } from 'framer-motion';

export default function PerformanceHeatmap() {
  // Mock data for 30 days of training
  const days = Array.from({ length: 30 }, (_, i) => ({
    active: Math.random() > 0.4,
    intensity: Math.floor(Math.random() * 4) // 0 to 3
  }));

  const intensityColors = {
    0: 'bg-zinc-900',
    1: 'bg-primary-500/20',
    2: 'bg-primary-500/50',
    3: 'bg-primary-500'
  };

  return (
    <div className="bg-zinc-950/50 border border-white/5 p-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Intensidad de Entrenamiento</span>
        <div className="flex gap-1">
            {[0, 1, 2, 3].map(lvl => (
                <div key={lvl} className={`w-2 h-2 ${intensityColors[lvl]}`} />
            ))}
        </div>
      </div>
      
      <div className="grid grid-flow-col grid-rows-7 gap-1.5 h-32">
        {days.map((day, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.01 }}
            className={`w-4 md:w-5 h-4 md:h-5 ${intensityColors[day.intensity]} hover:ring-1 hover:ring-white/20 transition-all`}
            title={`Día ${i + 1}: Nivel ${day.intensity}`}
          />
        ))}
      </div>
      
      <div className="mt-8 flex justify-between text-[10px] font-black text-zinc-600 uppercase italic">
        <span>Ciclo_Anterior</span>
        <span>Hoy</span>
      </div>
    </div>
  );
}
