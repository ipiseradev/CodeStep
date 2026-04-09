import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target,
  LayoutDashboard,
  BarChart3,
  User,
  CheckCircle2,
  ChevronRight,
  Lock,
  Flame,
  Trophy,
  Sparkles,
  Radar,
} from 'lucide-react';

import modulesData from '../data/modules.js';
import { useProgress } from '../context/ProgressContext';

// ---------------- ANIMACIONES ----------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 14 },
  },
};

const cardHover = {
  hover: {
    y: -6,
    transition: { type: 'spring', stiffness: 220, damping: 18 },
  },
};

// ---------------- HELPERS ----------------
const getModuleState = ({ index, modules, progress }) => {
  const current = progress?.[modules[index].id]?.percentage || 0;
  const prevModule = index > 0 ? modules[index - 1] : null;
  const prevProgress = prevModule ? progress?.[prevModule.id]?.percentage || 0 : 100;

  const isCompleted = current >= 100;
  const isLocked = index !== 0 && prevProgress < 100;
  const isActive = !isLocked && current > 0 && current < 100;
  const isAvailable = !isLocked && current === 0;

  return {
    current,
    isCompleted,
    isLocked,
    isActive,
    isAvailable,
  };
};

const getOverallStats = (modules, progress) => {
  const safeProgress = progress || {};
  const totalModules = modules.length;

  const percentages = modules.map((m) => safeProgress[m.id]?.percentage || 0);
  const completedModules = percentages.filter((p) => p >= 100).length;
  const totalProgress = percentages.reduce((acc, val) => acc + val, 0);
  const overallPercentage = totalModules
    ? Math.round(totalProgress / totalModules)
    : 0;

  const activeIndex = modules.findIndex((module, index) => {
    const state = getModuleState({ index, modules, progress: safeProgress });
    return state.isActive || state.isAvailable;
  });

  const activeModule =
    activeIndex !== -1 ? modules[activeIndex] : modules[modules.length - 1];

  const totalXp = modules.reduce((acc, mod) => {
    const percentage = safeProgress[mod.id]?.percentage || 0;
    if (percentage >= 100) return acc + (mod.xp || 250);
    return acc;
  }, 0);

  return {
    completedModules,
    overallPercentage,
    activeModule,
    totalXp,
    streak: Math.max(1, completedModules + 1),
  };
};

const getModuleMeta = (index) => {
  const meta = [
    { difficulty: 'Inicial', duration: '10 min' },
    { difficulty: 'Inicial', duration: '12 min' },
    { difficulty: 'Inicial', duration: '14 min' },
    { difficulty: 'Media', duration: '18 min' },
    { difficulty: 'Media', duration: '20 min' },
    { difficulty: 'Media', duration: '22 min' },
    { difficulty: 'Alta', duration: '25 min' },
  ];

  return meta[index] || { difficulty: 'Media', duration: '15 min' };
};

// ---------------- UI CHUNKS ----------------
const SidebarLink = ({ to, icon: Icon, label }) => {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      className={`group relative flex items-center gap-4 px-6 py-4 transition-all duration-300 ${
        active ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
      }`}
    >
      {active && (
        <motion.div
          layoutId="activeSide"
          className="absolute left-0 h-7 w-1 rounded-r-full bg-primary-500 shadow-[0_0_18px_#8bfe06]"
        />
      )}

      <Icon
        className={`h-5 w-5 transition-colors ${
          active ? 'text-primary-500' : 'group-hover:text-primary-500'
        }`}
      />

      <span className="text-[10px] font-black uppercase tracking-[0.24em]">
        {label}
      </span>
    </Link>
  );
};

const TopStatCard = ({ icon: Icon, label, value, hint }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-5 backdrop-blur-xl"
    >
      <motion.div variants={cardHover}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary-500/20 bg-primary-500/10">
            <Icon className="h-5 w-5 text-primary-500" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">
            {label}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-3xl font-black italic tracking-tight text-white">
            {value}
          </h3>
          <p className="text-sm text-zinc-500">{hint}</p>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
    </motion.div>
  );
};

const ActiveMissionCard = ({ module, progressValue }) => {
  const percentage = progressValue || 0;

  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-3xl border border-primary-500/15 bg-gradient-to-br from-primary-500/10 via-zinc-950 to-black p-8 lg:p-10"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-primary-500/10 blur-3xl" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-primary-500">
              Misión Activa
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">
              Próximo paso recomendado
            </span>
          </div>

          <h2 className="mb-3 max-w-3xl text-4xl font-black italic uppercase tracking-tight text-white lg:text-5xl">
            {module?.title || 'Sin misión activa'}
          </h2>

          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-zinc-400 lg:text-base">
            {module?.description ||
              'Todavía no hay una misión activa disponible.'}
          </p>

          <div className="mb-8 flex flex-wrap gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                Recompensa
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                +{module?.xp || 250} XP
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                Dificultad
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                {getModuleMeta(0).difficulty}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                Duración
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                {getModuleMeta(0).duration}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">
              <span>Avance actual</span>
              <span className="text-white">{percentage}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-primary-500 shadow-[0_0_20px_rgba(139,254,6,0.45)]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 rounded-2xl border border-white/8 bg-black/40 p-6">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">
              Estado de misión
            </p>
            <h3 className="mb-3 text-2xl font-black italic uppercase tracking-tight text-white">
              Lista para avanzar
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              Seguí con esta misión para desbloquear el siguiente módulo y
              aumentar tu nivel dentro de la plataforma.
            </p>
          </div>

          <Link
            to={module ? `/lesson/${module.id}` : '#'}
            className="flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-black transition-all duration-300 hover:bg-primary-500 hover:shadow-[0_0_24px_rgba(139,254,6,0.35)]"
          >
            Continuar misión
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const MissionCard = ({ module, index, progressData, isLocked, isCompleted, isActive }) => {
  const currentProgress = progressData?.percentage || 0;
  const meta = getModuleMeta(index);

  const cardState = isCompleted
    ? {
        badge: 'Completada',
        badgeClass:
          'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
      }
    : isActive
    ? {
        badge: 'Activa',
        badgeClass:
          'border-primary-500/20 bg-primary-500/10 text-primary-500',
      }
    : isLocked
    ? {
        badge: 'Bloqueada',
        badgeClass: 'border-white/10 bg-white/[0.03] text-zinc-500',
      }
    : {
        badge: 'Disponible',
        badgeClass: 'border-sky-500/20 bg-sky-500/10 text-sky-400',
      };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={!isLocked ? 'hover' : undefined}
      className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
        isLocked
          ? 'border-white/6 bg-zinc-950/40 opacity-50'
          : isActive
          ? 'border-primary-500/20 bg-gradient-to-b from-primary-500/[0.08] to-zinc-950'
          : isCompleted
          ? 'border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.05] to-zinc-950'
          : 'border-white/8 bg-white/[0.03] hover:border-primary-500/20'
      }`}
    >
      <motion.div variants={cardHover} className="relative z-10">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.26em] text-zinc-500">
                Módulo {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={`rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] ${cardState.badgeClass}`}
              >
                {cardState.badge}
              </span>
            </div>

            <h3 className="max-w-[16ch] text-2xl font-black italic uppercase tracking-tight leading-none text-white transition-colors group-hover:text-primary-500">
              {module.title}
            </h3>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-right">
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-500">
              Reward
            </p>
            <p className="mt-1 text-sm font-bold text-white">
              +{module.xp || 250} XP
            </p>
          </div>
        </div>

        <p className="mb-6 min-h-[48px] text-sm leading-relaxed text-zinc-400">
          {module.description}
        </p>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/8 bg-black/30 p-3">
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-500">
              Dificultad
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {meta.difficulty}
            </p>
          </div>

          <div className="rounded-xl border border-white/8 bg-black/30 p-3">
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-500">
              Duración
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {meta.duration}
            </p>
          </div>
        </div>

        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">
            <span>Progreso</span>
            <span className={isCompleted ? 'text-emerald-400' : 'text-white'}>
              {isCompleted ? '100% · Completado' : `${currentProgress}%`}
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentProgress}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                isCompleted
                  ? 'bg-emerald-500'
                  : isLocked
                  ? 'bg-zinc-700'
                  : 'bg-primary-500 shadow-[0_0_16px_rgba(139,254,6,0.4)]'
              }`}
            />
          </div>
        </div>

        <Link
          to={isLocked ? '#' : `/lesson/${module.id}`}
          className={`flex w-full items-center justify-center gap-3 rounded-xl py-4 text-[11px] font-black uppercase tracking-[0.22em] transition-all duration-300 ${
            isCompleted
              ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black'
              : isLocked
              ? 'cursor-not-allowed border border-white/6 bg-zinc-950 text-zinc-700'
              : isActive
              ? 'bg-primary-500 text-black hover:shadow-[0_0_24px_rgba(139,254,6,0.35)]'
              : 'bg-white text-black hover:bg-primary-500'
          }`}
        >
          {isCompleted ? (
            <>
              Repasar misión
              <CheckCircle2 className="h-4 w-4" />
            </>
          ) : isLocked ? (
            <>
              Misión bloqueada
              <Lock className="h-4 w-4" />
            </>
          ) : isActive ? (
            <>
              Seguir misión
              <ChevronRight className="h-4 w-4" />
            </>
          ) : (
            <>
              Empezar misión
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Link>
      </motion.div>

      {!isLocked && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      )}
    </motion.div>
  );
};

// ---------------- MAIN ----------------
export default function Missions() {
  const { progress } = useProgress();
  const safeProgress = progress || {};

  const {
    completedModules,
    overallPercentage,
    activeModule,
    totalXp,
    streak,
  } = getOverallStats(modulesData, safeProgress);

  const activeProgress = activeModule
    ? safeProgress[activeModule.id]?.percentage || 0
    : 0;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary-500/30">
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,254,6,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(139,254,6,0.05),transparent_22%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden h-screen w-72 shrink-0 border-r border-white/6 bg-black/60 backdrop-blur-3xl lg:flex lg:flex-col">
          <div className="border-b border-white/6 px-10 py-10">
            <h1 className="text-2xl font-black italic uppercase tracking-tight">
              CODE<span className="text-primary-500">STEP</span>
            </h1>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-zinc-500">
              Learning System
            </p>
          </div>

          <nav className="mt-8 flex flex-col gap-1 px-4">
            <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <SidebarLink to="/misiones" icon={Target} label="Misiones" />
            <SidebarLink to="/progreso" icon={BarChart3} label="Progreso" />
            <SidebarLink to="/profile" icon={User} label="Perfil" />
          </nav>

          <div className="mt-auto p-6">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">
                Nivel actual
              </p>
              <h3 className="mt-2 text-2xl font-black italic uppercase tracking-tight text-white">
                Explorer
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Seguí completando misiones para desbloquear nuevos módulos.
              </p>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="relative mx-auto flex-1 px-6 py-10 sm:px-8 lg:px-14 lg:py-14 xl:px-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto flex w-full max-w-[1500px] flex-col gap-10"
          >
            {/* HEADER */}
            <motion.header
              variants={itemVariants}
              className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
            >
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-12 bg-primary-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.45em] text-primary-500">
                    Misiones disponibles
                  </span>
                </div>

                <h1 className="text-5xl font-black italic uppercase tracking-tight leading-[0.9] sm:text-6xl lg:text-7xl">
                  Tus <br />
                  <span className="font-outline text-transparent">Misiones</span>
                </h1>
              </div>

              <div className="max-w-md rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                  Sistema de progreso
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Completá módulos, ganá XP, desbloqueá contenido y hacé que
                  aprender se sienta como avanzar dentro de un juego.
                </p>
              </div>
            </motion.header>

            {/* STATS */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <TopStatCard
                icon={Trophy}
                label="XP total"
                value={totalXp}
                hint="Experiencia ganada hasta ahora"
              />
              <TopStatCard
                icon={Target}
                label="Completadas"
                value={`${completedModules}/${modulesData.length}`}
                hint="Misiones finalizadas"
              />
              <TopStatCard
                icon={Radar}
                label="Progreso"
                value={`${overallPercentage}%`}
                hint="Avance general del sistema"
              />
              <TopStatCard
                icon={Flame}
                label="Racha"
                value={`${streak} días`}
                hint="Constancia actual del usuario"
              />
            </section>

            {/* ACTIVE MISSION */}
            <ActiveMissionCard module={activeModule} progressValue={activeProgress} />

            {/* LIST */}
            <motion.section variants={itemVariants} className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">
                    Roadmap de aprendizaje
                  </p>
                  <h2 className="mt-2 text-2xl font-black italic uppercase tracking-tight text-white">
                    Todas las misiones
                  </h2>
                </div>

                <div className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500 md:flex">
                  <Sparkles className="h-4 w-4 text-primary-500" />
                  Diseñado para motivar
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {modulesData.map((module, index) => {
                  const moduleProgress = safeProgress[module.id] || { percentage: 0 };
                  const { isLocked, isCompleted, isActive } = getModuleState({
                    index,
                    modules: modulesData,
                    progress: safeProgress,
                  });

                  return (
                    <MissionCard
                      key={module.id}
                      module={module}
                      index={index}
                      progressData={moduleProgress}
                      isLocked={isLocked}
                      isCompleted={isCompleted}
                      isActive={isActive}
                    />
                  );
                })}
              </div>
            </motion.section>
          </motion.div>
        </main>
      </div>

      <style>{`
        .font-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,0.22);
        }
      `}</style>
    </div>
  );
}