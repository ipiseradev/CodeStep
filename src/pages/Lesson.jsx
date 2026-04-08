import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Code2, CheckCircle2, ArrowRight, XCircle, Trophy, ChevronLeft, Target, Zap, ShieldCheck } from 'lucide-react';
import { modules } from '../data/modules';
import { useProgress } from '../context/ProgressContext';
import ProgressBar from '../components/ui/ProgressBar';
import AnimatedButton from '../components/ui/AnimatedButton';

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { markModuleCompleted, isModuleLocked } = useProgress();

  const [step, setStep] = useState('theory'); // 'theory', 'challenge', 'success'
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const moduleObj = modules.find(m => m.id === id);

  if (!moduleObj) return <Navigate to="/dashboard" />;
  if (isModuleLocked(moduleObj.id)) return <Navigate to="/dashboard" />;

  const handleOptionClick = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(true);
  };

  const handleContinueChallenge = () => {
    if (selectedOption?.isCorrect) {
      markModuleCompleted(moduleObj.id);
      setStep('success');
    } else {
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="flex-1 bg-black pb-20 relative grid-bg overflow-hidden noise-overlay">
      {/* Barra de Navegación Táctica (Compacta & Premium) */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.05] py-4 px-6">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-3 bg-zinc-900/50 border border-white/[0.03] text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all group"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </button>
            <div className="hidden md:block">
              <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">MISIÓN ACTUAL</div>
              <div className="text-sm font-black text-white italic uppercase tracking-tight">{moduleObj.title}</div>
            </div>
          </div>

          <div className="flex items-center gap-8 flex-1 max-w-md ml-12">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-black text-primary-500 tracking-[0.2em] uppercase">
                  ESTADO: {step === 'theory' ? 'ANÁLISIS' : step === 'challenge' ? 'EJECUCIÓN' : 'COMPLETADA'}
                </span>
                <span className="text-[10px] font-black text-white">{step === 'theory' ? '33' : step === 'challenge' ? '66' : '100'}%</span>
              </div>
              <ProgressBar
                progress={step === 'theory' ? 33 : step === 'challenge' ? 66 : 100}
                className="h-1.5 rounded-none bg-zinc-900"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1240px] mx-auto px-6 py-12 md:py-20 relative z-10">
        <AnimatePresence mode="wait">
          {step === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-1"
            >
              <div className="lg:col-span-12 xl:col-span-7 bg-[#080808] p-10 md:p-14 border border-white/5 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-2 h-2 bg-primary-500 shadow-[0_0_8px_rgba(226,251,24,0.6)]" />
                    <div className="text-primary-500 font-black text-[10px] uppercase tracking-[0.3em]">ANÁLISIS TÁCTICO</div>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black text-white mb-10 leading-[0.9] tracking-tighter italic uppercase">
                    {moduleObj.lesson.title}
                  </h1>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-xl md:text-2xl text-zinc-400 leading-snug font-medium mb-12 whitespace-pre-line">
                      {moduleObj.lesson.content}
                    </p>
                  </div>

                  <AnimatedButton
                    onClick={() => setStep('challenge')}
                    className="h-20 lg:h-24 px-12 group"
                  >
                    <span className="text-2xl">Confirmar Ejecución</span>
                    <ArrowRight className="w-8 h-8 transition-transform group-hover:translate-x-2" />
                  </AnimatedButton>
                </div>

                {/* Background Decoration */}
                <div className="absolute -bottom-10 -left-10 opacity-[0.02] rotate-12">
                  <Target className="w-64 h-64 text-white" />
                </div>
              </div>

              <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-1">
                <div className="flex-1 bg-zinc-950 border border-white/5 overflow-hidden flex flex-col">
                  <div className="bg-zinc-900/40 px-6 py-4 flex items-center justify-between border-b border-white/[0.05]">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.2em]">CASO_ESTUDIO.JSON</span>
                    <Code2 className="w-3.5 h-3.5 text-zinc-700" />
                  </div>
                  <div className="p-4 md:p-10 flex-1 relative bg-[radial-gradient(circle_at_top_right,rgba(226,251,24,0.03),transparent_40%)]">
                    <div className="absolute inset-0 opacity-[0.01] pointer-events-none noise-overlay" />
                    <SyntaxHighlighter
                      language="javascript"
                      style={atomDark}
                      customStyle={{
                        padding: 0,
                        margin: 0,
                        background: 'transparent',
                        fontSize: '17px',
                        border: 'none',
                        lineHeight: '1.7',
                        letterSpacing: '-0.02em',
                        fontFamily: 'JetBrains Mono, Menlo, monospace'
                      }}
                    >
                      {moduleObj.lesson.codeExample}
                    </SyntaxHighlighter>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] p-8 border border-white/5 flex items-center gap-6">
                  <ShieldCheck className="w-10 h-10 text-zinc-800" />
                  <div>
                    <div className="text-[10px] font-black text-zinc-500 tracking-widest uppercase mb-1">VALIDACIÓN</div>
                    <div className="text-zinc-200 text-sm font-bold uppercase tracking-tighter italic italic">Integridad de lógica verificada.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-[780px] mx-auto"
            >
              <div className="bg-zinc-950/80 backdrop-blur-sm border border-white/10 p-10 md:p-14 mb-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-primary-500/30" />
                <div className="text-primary-500 font-black text-[10px] uppercase tracking-[0.4em] mb-10">
                  IDENTIFICACIÓN DE OBJETIVO
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-[0.95]">
                  {moduleObj.challenge.question}
                </h2>
              </div>

              <div className="space-y-3">
                {moduleObj.challenge.options.map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={!showFeedback ? { x: 8 } : {}}
                    whileTap={!showFeedback ? { scale: 0.99 } : {}}
                    onClick={() => handleOptionClick(option)}
                    disabled={showFeedback}
                    className={`w-full p-8 md:p-10 flex items-center gap-10 text-left border transition-all duration-400 relative overflow-hidden group ${selectedOption?.id === option.id
                      ? option.isCorrect
                        ? 'bg-primary-500 border-primary-500 text-black'
                        : 'bg-red-500 border-red-500 text-black'
                      : 'bg-zinc-950 border-white/5 text-zinc-500 hover:border-white/20'
                      }`}
                  >
                    {/* Background ID Marker */}
                    <div className={`text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none absolute right-4 bottom-[-10px] transition-colors ${selectedOption?.id === option.id ? 'text-black/10' : 'text-white/5 group-hover:text-white/10'
                      }`}>
                      {option.id}
                    </div>

                    <div className="flex items-center gap-8 relative z-10 w-full">
                      <span className={`w-10 h-10 flex items-center justify-center font-black text-xl italic border-2 ${selectedOption?.id === option.id
                        ? 'border-black/20 text-black'
                        : 'border-zinc-800 text-zinc-700 group-hover:border-zinc-500 group-hover:text-zinc-500'
                        }`}>
                        {option.id}
                      </span>
                      <span className={`font-mono text-xl md:text-2xl font-bold tracking-tight flex-1 ${selectedOption?.id === option.id ? 'text-black' : 'group-hover:text-zinc-200 transition-colors'
                        }`}>
                        {option.text}
                      </span>
                      {selectedOption?.id === option.id && (
                        <div className="w-12 h-12 flex items-center justify-center">
                          {option.isCorrect ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-10 p-10 border shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-zinc-950 ${selectedOption?.isCorrect
                      ? 'border-primary-500/30'
                      : 'border-red-500/30'
                      }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-3 h-3 ${selectedOption?.isCorrect ? 'bg-primary-500' : 'bg-red-500'} animate-pulse`} />
                          <h5 className={`text-3xl font-black italic uppercase tracking-tighter ${selectedOption?.isCorrect ? 'text-primary-500' : 'text-red-500'}`}>
                            {selectedOption?.isCorrect ? 'Impacto Detectado' : 'Fallo de Lógica'}
                          </h5>
                        </div>
                        <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium">
                          {selectedOption?.feedback}
                        </p>
                      </div>
                      <AnimatedButton
                        onClick={handleContinueChallenge}
                        variant={selectedOption?.isCorrect ? 'primary' : 'outline'}
                        className="h-20 min-w-[240px]"
                      >
                        <span className="text-xl font-black uppercase italic italic">{selectedOption?.isCorrect ? 'CONTINUAR' : 'REINTENTAR'}</span>
                      </AnimatedButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-10 min-h-[70vh] relative"
            >
              {/* Victory Glow */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-primary-500/5 blur-[120px] pointer-events-none" />

              <motion.div
                initial={{ rotate: -15, scale: 0 }}
                animate={{ rotate: 6, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                className="w-56 h-56 bg-white flex items-center justify-center mb-16 shadow-[20px_20px_0px_rgba(226,251,24,1)] relative z-10"
              >
                <Trophy className="w-24 h-24 text-black" />
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase italic leading-[0.8] tracking-tighter relative z-10">
                VICTORIA_TÁCTICA.
              </h1>

              <div className="flex flex-col md:flex-row items-center gap-4 mb-20 relative z-10">
                <div className="flex items-center gap-3 bg-zinc-900 border border-white/5 pl-8 pr-12 py-5">
                  <Zap className="w-8 h-8 text-primary-500 fill-primary-500" />
                  <div>
                    <div className="text-[10px] font-black text-zinc-600 tracking-widest uppercase mb-1">RECOMPENSA</div>
                    <div className="text-4xl font-black italic text-white leading-none">+{moduleObj.xp} XP</div>
                  </div>
                </div>
                <div className="bg-zinc-900 border border-white/5 py-5 px-10 flex flex-col items-start">
                  <div className="text-[10px] font-black text-zinc-600 tracking-widest uppercase mb-1">NODO_STATUS</div>
                  <div className="text-sm font-black text-primary-500 italic uppercase">OPTIMIZADO</div>
                </div>
              </div>

              <AnimatedButton
                onClick={() => navigate('/dashboard')}
                className="h-24 px-16 relative z-10 group"
              >
                <span className="text-3xl font-black uppercase italic italic">Siguiente Fase</span>
                <ArrowRight className="w-10 h-10 group-hover:translate-x-3 transition-transform" />
              </AnimatedButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
