import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  CheckCircle2,
  ChevronRight,
  TerminalSquare,
  Sparkles,
  Trophy,
  ShieldCheck,
  Code2,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { useProgress } from '../context/ProgressContext';
import { useParams, useNavigate } from 'react-router-dom';
import modulesData from '../data/modules.js';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 14 },
  },
};

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { markModuleCompleted, isModuleCompleted, xp, progress } = useProgress();

  // Compatibilidad por si tu data está exportada distinto
  const modules = Array.isArray(modulesData)
    ? modulesData
    : modulesData?.modules || [];

  const currentModule = modules.find((m) => m.id === id) || modules[0];

  const currentProgress = progress?.[currentModule?.id]?.percentage || 0;
  const completed = currentModule ? isModuleCompleted(currentModule.id) : false;

  const [userCode, setUserCode] = useState(`// Escribí tu solución acá
const edad = 18;

if (edad >= 18) {
  console.log("Podés entrar");
}`);

  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'info', text: '> Consola lista para procesar...' },
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const lessonMeta = useMemo(
    () => ({
      difficulty: 'Inicial',
      duration: '10 min',
      reward: currentModule?.xp || 50,
      objective:
        'Validar si el usuario puede acceder según su edad usando una estructura condicional.',
      hint: 'Usá if para comprobar si la edad es mayor o igual a 18.',
      concept: 'Condicionales',
    }),
    [currentModule]
  );

  const handleExecute = async () => {
    setIsRunning(true);

    setTerminalOutput([
      { type: 'info', text: '> Iniciando validación del sistema...' },
      { type: 'info', text: '> Analizando estructura del código...' },
    ]);

    await new Promise((resolve) => setTimeout(resolve, 700));

    const logs = [];
    const mockConsole = {
      log: (msg) => logs.push(String(msg)),
    };

    try {
      const runCode = new Function('console', userCode);
      runCode(mockConsole);

      const normalized = userCode.toLowerCase();
      const hasIf = normalized.includes('if');
      const checksAge = normalized.includes('edad');
      const hasComparison =
        normalized.includes('>= 18') ||
        normalized.includes('> 18') ||
        normalized.includes('18 <=');
      const hasCorrectLog = logs.some((msg) =>
        msg.toLowerCase().includes('podés entrar') ||
        msg.toLowerCase().includes('podes entrar')
      );

      if (hasIf && checksAge && hasComparison && hasCorrectLog) {
        setTerminalOutput([
          { type: 'info', text: '> Iniciando validación del sistema...' },
          { type: 'success', text: '> VALIDACIÓN EXITOSA' },
          { type: 'success', text: '> Estructura condicional detectada correctamente.' },
          { type: 'success', text: `> Output verificado: "${logs[0] || 'Sin salida'}"` },
          { type: 'reward', text: `> Recompensa obtenida: +${lessonMeta.reward} XP` },
          { type: 'success', text: '> Módulo completado y progreso actualizado.' },
        ]);

        if (currentModule?.id) {
          markModuleCompleted(currentModule.id);
        }
      } else {
        const feedback = [];

        if (!hasIf) {
          feedback.push('> ERROR: Falta una estructura if.');
        }
        if (!checksAge) {
          feedback.push('> ERROR: No se está usando la variable "edad".');
        }
        if (!hasComparison) {
          feedback.push('> ERROR: Falta validar la condición de acceso con 18 años.');
        }
        if (!hasCorrectLog) {
          feedback.push('> ERROR: El sistema no detectó el mensaje esperado en consola.');
        }

        setTerminalOutput([
          { type: 'info', text: '> Iniciando validación del sistema...' },
          { type: 'error', text: '> VALIDACIÓN FALLIDA' },
          ...feedback.map((text) => ({ type: 'error', text })),
          {
            type: 'hint',
            text: '> PISTA: revisá la condición y el mensaje que mostrás en consola.',
          },
        ]);
      }
    } catch (err) {
      setTerminalOutput([
        { type: 'info', text: '> Iniciando validación del sistema...' },
        { type: 'error', text: '> SYSTEM_ERROR: No se pudo ejecutar el código.' },
        { type: 'error', text: `> Detalle: ${err.message}` },
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="border border-white/10 bg-zinc-950/60 p-8 rounded-2xl">
          <h2 className="text-2xl font-black italic uppercase mb-2">Módulo no encontrado</h2>
          <p className="text-zinc-400 mb-6">
            No se encontró la misión que intentaste abrir.
          </p>
          <button
            onClick={() => navigate('/misiones')}
            className="bg-white text-black px-5 py-3 font-black uppercase text-xs tracking-widest hover:bg-primary-500 transition-all"
          >
            Volver a misiones
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,254,6,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(139,254,6,0.05),transparent_20%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden xl:flex w-80 border-r border-white/10 bg-black/60 backdrop-blur-2xl flex-col p-8">
          <div className="mb-12">
            <h1 className="text-2xl font-black italic uppercase tracking-tighter">
              CODE<span className="text-primary-500">STEP</span>
            </h1>
            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
              Interactive Lesson
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary-500 font-black mb-2">
                Módulo actual
              </p>
              <h2 className="text-2xl font-black italic uppercase leading-none">
                {currentModule.title}
              </h2>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                {currentModule.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-black mb-2">
                  Tu energía
                </p>
                <p className="text-2xl font-black italic">{xp} XP</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-black mb-2">
                  Recompensa
                </p>
                <p className="text-2xl font-black italic text-primary-500">
                  +{lessonMeta.reward}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-black mb-2">
                  Objetivo
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {lessonMeta.objective}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-black mb-2">
                  Pista
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {lessonMeta.hint}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-black">
                  Estado
                </span>
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] font-black px-2 py-1 rounded-full border ${
                    completed
                      ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                      : 'border-primary-500/20 bg-primary-500/10 text-primary-500'
                  }`}
                >
                  {completed ? 'Completado' : 'En progreso'}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] font-black text-zinc-500">
                  <span>Progreso</span>
                  <span className="text-white">{completed ? '100%' : `${currentProgress}%`}</span>
                </div>
                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completed ? 100 : currentProgress}%` }}
                    className={`h-full rounded-full ${
                      completed ? 'bg-emerald-500' : 'bg-primary-500'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <button
              onClick={() => navigate('/misiones')}
              className="w-full border border-white/10 bg-white/[0.03] text-white py-4 rounded-xl font-black uppercase text-[11px] tracking-[0.22em] hover:bg-white hover:text-black transition-all"
            >
              Volver a misiones
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 px-5 py-6 md:px-8 lg:px-10 xl:px-12 xl:py-10">
          <motion.div
            initial="hidden"
            animate="visible"
            className="grid gap-8 xl:grid-cols-[0.9fr_1.4fr]"
          >
            {/* LEFT PANEL */}
            <motion.section
              variants={fadeUp}
              className="rounded-3xl border border-white/10 bg-zinc-950/60 p-7 lg:p-8 h-fit"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-primary-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-primary-500">
                  Lección activa
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black italic uppercase leading-[0.9] tracking-tight mb-5">
                Lógica de <br />
                <span className="font-outline text-transparent">Decisión</span>
              </h2>

              <p className="text-zinc-400 text-sm md:text-[15px] leading-relaxed mb-8 max-w-xl">
                El sistema necesita validar la edad del usuario. Completá la
                estructura para que solo permita el acceso si el usuario cumple
                la condición correcta.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck className="w-5 h-5 text-primary-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                      Dificultad
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white">{lessonMeta.difficulty}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Trophy className="w-5 h-5 text-primary-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                      Recompensa
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white">+{lessonMeta.reward} XP</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Code2 className="w-5 h-5 text-primary-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                      Concepto
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white">{lessonMeta.concept}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-5 h-5 text-primary-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                      Duración
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white">{lessonMeta.duration}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-primary-500/15 bg-primary-500/5 p-4 mb-8">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-primary-500 mb-2">
                  Qué espera el sistema
                </p>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li>• usar una estructura <span className="text-white font-bold">if</span></li>
                  <li>• evaluar la variable <span className="text-white font-bold">edad</span></li>
                  <li>• validar la condición de acceso</li>
                  <li>• mostrar <span className="text-white font-bold">"Podés entrar"</span> en consola</li>
                </ul>
              </div>

              <button
                onClick={handleExecute}
                disabled={isRunning}
                className={`w-full py-4 rounded-xl font-black uppercase italic text-[11px] tracking-[0.26em] transition-all flex items-center justify-center gap-3 ${
                  isRunning
                    ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-primary-500 hover:shadow-[0_0_25px_rgba(139,254,6,0.35)]'
                }`}
              >
                {isRunning ? 'Validando...' : 'Validar solución'}
                <Play className="w-4 h-4 fill-current" />
              </button>
            </motion.section>

            {/* RIGHT PANEL */}
            <motion.section
              variants={fadeUp}
              className="flex flex-col rounded-3xl border border-white/10 bg-zinc-950/80 overflow-hidden"
            >
              {/* TOP BAR */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.26em] text-zinc-500 font-black">
                      Sandbox activo
                    </p>
                    <p className="text-sm font-semibold text-white">decision.js</p>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/10 text-primary-500 text-[10px] uppercase tracking-[0.2em] font-black">
                    JavaScript
                  </span>
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-black">
                    Editor
                  </span>
                </div>
              </div>

              {/* EDITOR */}
              <div className="h-[420px] md:h-[500px] xl:h-[540px]">
                <Editor
                  height="100%"
                  theme="vs-dark"
                  defaultLanguage="javascript"
                  value={userCode}
                  onChange={(value) => setUserCode(value || '')}
                  options={{
                    fontSize: 15,
                    minimap: { enabled: false },
                    fontFamily: 'JetBrains Mono, monospace',
                    padding: { top: 18 },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    lineNumbersMinChars: 3,
                    roundedSelection: true,
                    automaticLayout: true,
                  }}
                />
              </div>

              {/* TERMINAL */}
              <div className="border-t border-white/10 bg-black">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-5 py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-500/15 bg-primary-500/10">
                      <TerminalSquare className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500 font-black">
                        Consola del sistema
                      </p>
                      <p className="text-sm text-zinc-400">
                        Feedback en tiempo real de la validación
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {completed && (
                      <motion.button
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        onClick={() => navigate('/misiones')}
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-5 py-3 text-black font-black uppercase text-[11px] tracking-[0.22em] hover:brightness-110 transition-all"
                      >
                        Siguiente misión
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <div className="min-h-[220px] px-5 py-5 font-mono text-xs space-y-2 overflow-auto">
                  {terminalOutput.map((line, i) => {
                    const styles =
                      line.type === 'error'
                        ? 'text-red-400'
                        : line.type === 'success'
                        ? 'text-emerald-400'
                        : line.type === 'reward'
                        ? 'text-primary-500'
                        : line.type === 'hint'
                        ? 'text-yellow-400'
                        : 'text-zinc-400';

                    return (
                      <motion.div
                        key={`${line.text}-${i}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`leading-relaxed ${styles}`}
                      >
                        {line.text}
                      </motion.div>
                    );
                  })}

                  {!completed && terminalOutput.length <= 1 && (
                    <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.02] p-4 text-zinc-500">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 mt-0.5 text-zinc-600" />
                        <div>
                          <p className="uppercase tracking-[0.22em] text-[10px] font-black mb-1">
                            Estado actual
                          </p>
                          <p>
                            La consola mostrará errores, validaciones y recompensas
                            cuando ejecutes tu solución.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {completed && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.26em] text-emerald-400 font-black mb-1">
                            Misión completada
                          </p>
                          <p className="text-sm text-zinc-300 leading-relaxed">
                            Excelente. Ya validaste correctamente la lógica de acceso
                            y desbloqueaste el avance de esta misión.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
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