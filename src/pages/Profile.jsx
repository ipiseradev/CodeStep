import { motion } from 'framer-motion';
import {
  User,
  BookOpen,
  Flame,
  Zap,
  ShieldCheck,
  Activity,
  ChevronRight,
  Target,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ui/ProgressBar';
import PerformanceCard from '../components/ui/PerformanceCard';

export default function Profile() {
  const { xp, completedModules, getPercentageCompleted, totalModules } = useProgress();
  const navigate = useNavigate();

  const getRank = (xp) => {
    if (xp < 100) return { title: 'Ignacio Pisera', color: 'text-zinc-300', badge: '01' };
    if (xp < 300) return { title: 'Administrador', color: 'text-white', badge: '02' };
    if (xp < 600) return { title: 'ATLETA ELITE', color: 'text-primary-500', badge: '03' };
    return { title: 'HALL OF FAME', color: 'text-primary-500', badge: 'MAX' };
  };

  const rank = getRank(xp);
  const level = Math.floor(xp / 100) + 1;
  const levelProgress = xp % 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  return (
    <div className="w-full flex-1 bg-black py-14 md:py-20 px-6 grid-bg noise-overlay">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1180px] mx-auto"
      >
        {/* Header */}
        <section className="mb-16 md:mb-20">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end border border-white/5 bg-[#050505]/70 px-6 md:px-8 lg:px-10 py-8 md:py-10">
            <div className="lg:col-span-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div className="relative shrink-0 group">
                <div className="w-28 h-28 md:w-36 md:h-36 bg-zinc-950 border border-white/10 flex items-center justify-center relative overflow-hidden">
                  <User className="w-14 h-14 md:w-20 md:h-20 text-zinc-800 transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="absolute -bottom-3 -right-3 w-12 h-12 md:w-14 md:h-14 bg-primary-500 text-black flex items-center justify-center text-lg md:text-xl font-black italic shadow-[8px_8px_0px_rgba(255,255,255,0.04)]">
                  {level}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 text-primary-500 font-black uppercase tracking-[0.28em] text-[10px] mb-4">
                  <div className="w-2 h-2 bg-primary-700" />
                  Rango #{rank.badge}
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.92]">
                  <span className={rank.color}>{rank.title}</span>
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] md:text-xs font-black uppercase tracking-[0.18em]">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary-500" />
                    Dominio global · {getPercentageCompleted()}%
                  </span>
                  <span className="text-zinc-600">Nivel actual · {level}</span>
                  <span className="text-zinc-600">XP total · {xp}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="border border-white/5 bg-zinc-950/70 p-5 md:p-6">
                <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                  <span className="text-zinc-500">Progreso del nivel</span>
                  <span className="text-white">{levelProgress}%</span>
                </div>

                <ProgressBar progress={levelProgress} className="h-2.5 rounded-none bg-zinc-900" />

                <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] font-black">
                  <span className="text-zinc-600">Inicio</span>
                  <span className="text-primary-500">En progreso</span>
                  <span className="text-zinc-600">100 XP</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/5 mb-16 md:mb-20">
          <PerformanceCard
            label="XP TOTAL"
            value={`${xp}`}
            subtext="ENERGÍA ACUMULADA EN ENTRENAMIENTO"
            icon={Zap}
            delay={0.1}
          />
          <PerformanceCard
            label="MISIONES COMPLETADAS"
            value={`${completedModules.length}/${totalModules}`}
            subtext="DESAFÍOS RESUELTOS CON ÉXITO"
            icon={BookOpen}
            color="text-white"
            delay={0.2}
          />
          <PerformanceCard
            label="RACHA ACTIVA"
            value="12 DÍAS"
            subtext="DÍAS DE EJECUCIÓN CONSTANTE"
            icon={Flame}
            delay={0.3}
          />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-4">
          {/* Left */}
          <div className="lg:col-span-8 bg-[#050505] p-7 md:p-10 border border-white/5 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-primary-500" />
                  <h3 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">
                    Maestría técnica
                  </h3>
                </div>

                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">
                  Tracks activos · 4
                </div>
              </div>

              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                <MiniStat
                  title="Track recomendado"
                  value={
                    completedModules.length === 0
                      ? 'Sintaxis & Variables'
                      : completedModules.length === 1
                        ? 'Lógica condicional'
                        : completedModules.length === 2
                          ? 'Bucles & repetición'
                          : 'Programación modular'
                  }
                />
                <MiniStat
                  title="Estado general"
                  value={completedModules.length > 0 ? 'Progresando' : 'Aún sin iniciar'}
                  highlight={completedModules.length > 0}
                />
              </div>

              <div className="space-y-8">
                <SkillRow
                  label="SINTAXIS & VARIABLES"
                  progress={completedModules.length >= 1 ? 100 : 0}
                />
                <SkillRow
                  label="LÓGICA CONDICIONAL"
                  progress={completedModules.length >= 2 ? 100 : 0}
                />
                <SkillRow
                  label="BUCLES & REPETICIÓN"
                  progress={completedModules.length >= 3 ? 100 : 0}
                />
                <SkillRow
                  label="PROGRAMACIÓN MODULAR"
                  progress={completedModules.length >= 4 ? 100 : 0}
                />
              </div>
            </div>

            <div className="absolute top-4 right-0 p-8 opacity-[0.03] pointer-events-none">
              <LayoutDashboard className="w-48 h-48 md:w-56 md:h-56 -rotate-12" />
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-zinc-950 p-7 md:p-8 border border-white/5 flex flex-col gap-8">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.28em] border-b border-white/5 pb-4">
                <span className="text-zinc-500">Centro táctico</span>
                <span className="flex items-center gap-2 text-primary-500">
                  <div className="w-1.5 h-1.5 bg-primary-500 shadow-[0_0_8px_rgba(226,251,24,0.6)]" />
                  Online
                </span>
              </div>

              <div className="space-y-4">
                <div className="border border-white/5 bg-black/30 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    Diagnóstico
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                    {completedModules.length > 0
                      ? 'Tu progreso ya está activo. Mantené la constancia y consolidá la base técnica.'
                      : 'Todavía no registrás actividad. Tu mejor ventaja ahora es empezar y sostener una primera racha.'}
                  </p>
                </div>

                <div className="border border-white/5 bg-black/30 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-3">
                    Últimos ciclos
                  </div>

                  <div className="space-y-3">
                    {completedModules.length > 0 ? (
                      completedModules.slice(-3).reverse().map((mid, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-primary-500" />
                          <span className="text-sm font-bold uppercase tracking-tight">
                            Ciclo_0{idx + 1} · Deployed
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-zinc-600 text-xs italic font-black uppercase tracking-wide">
                        Sin actividad registrada todavía.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => navigate('/dashboard')}
                className="group flex items-center justify-between border border-white/5 bg-black/30 px-4 py-4 text-white hover:text-primary-500 hover:border-primary-500/20 transition-colors"
              >
                <span className="text-xs font-black uppercase tracking-[0.18em] italic">
                  Volver al entrenamiento
                </span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate('/dashboard')}
              className="bg-primary-500 p-6 md:p-7 flex items-center justify-between group cursor-pointer overflow-hidden relative text-left"
            >
              <div className="relative z-10">
                <div className="text-black font-black text-[10px] uppercase tracking-widest mb-1">
                  Siguiente misión
                </div>
                <div className="text-black font-black text-xl md:text-2xl italic uppercase tracking-tight">
                  Continuar entrenamiento
                </div>
              </div>

              <div className="bg-black text-primary-500 p-3 group-hover:scale-110 transition-transform relative z-10">
                <ArrowRight className="w-6 h-6" />
              </div>

              <ShieldCheck className="absolute -bottom-4 -right-4 w-24 h-24 text-black opacity-10 -rotate-12" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SkillRow({ label, progress }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3">
        <div>
          <div
            className={`text-[10px] font-black uppercase tracking-[0.22em] ${progress === 100 ? 'text-white' : 'text-zinc-500'
              }`}
          >
            {label}
          </div>
          <div className="mt-1 text-xs text-zinc-700 uppercase tracking-wide">
            {progress === 100 ? 'Track completado' : 'Aún sin dominar'}
          </div>
        </div>

        <span
          className={`text-[10px] font-black uppercase tracking-[0.2em] ${progress === 100 ? 'text-primary-500' : 'text-zinc-700'
            }`}
        >
          {progress === 100 ? 'OPTIMIZADO' : 'PENDIENTE'}
        </span>
      </div>

      <div className="h-2 w-full bg-zinc-900 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className={`h-full ${progress === 100
              ? 'bg-primary-500 shadow-[0_0_10px_rgba(226,251,24,0.3)]'
              : 'bg-zinc-800'
            }`}
        />
      </div>
    </div>
  );
}

function MiniStat({ title, value, highlight = false }) {
  return (
    <div className="border border-white/5 bg-black/30 p-4">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">
        {title}
      </div>
      <div className={`text-sm font-bold uppercase tracking-tight ${highlight ? 'text-primary-500' : 'text-white'}`}>
        {value}
      </div>
    </div>
  );
}

function ArrowRight({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}