import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Zap,
  Timer,
  Target,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import modules from '../data/modules';

export default function Lesson() {
  const navigate = useNavigate();
  const { markModuleCompleted } = useProgress();

  const moduleObj = modules[0];

  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [step, setStep] = useState('challenge');

  const correctOption = 1;

  const options = [
    {
      id: 0,
      label: 'A',
      code: 'let PI = 3.14;',
      explanation: 'let permite cambiar el valor después.',
    },
    {
      id: 1,
      label: 'B',
      code: 'const PI = 3.14;',
      explanation: 'const declara un valor que no debería cambiar.',
    },
    {
      id: 2,
      label: 'C',
      code: 'var PI = 3.14;',
      explanation: 'var es una forma antigua y no la ideal para este caso.',
    },
  ];

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setShowFeedback(true);

    if (selectedOption === correctOption) {
      setTimeout(() => {
        setStep('success');
        markModuleCompleted(moduleObj.id);
      }, 800);
    }
  };

  const handleContinueChallenge = () => {
    navigate('/profile');
  };

  const getOptionState = (id) => {
    if (!showFeedback) {
      return selectedOption === id
        ? 'border-primary-500 bg-primary-500/8'
        : 'border-white/5 bg-zinc-950 hover:border-white/10 hover:bg-zinc-900/70';
    }

    if (id === correctOption) {
      return 'border-primary-500 bg-primary-500/10';
    }

    if (id === selectedOption && selectedOption !== correctOption) {
      return 'border-red-500/50 bg-red-500/10';
    }

    return 'border-white/5 bg-zinc-950 opacity-60';
  };

  return (
    <div className="min-h-screen bg-black text-white grid-bg noise-overlay">
      <div className="max-w-[1180px] mx-auto px-6 py-8 md:py-10">
        {/* Top bar */}
        <div className="sticky top-0 z-20 mb-8 border border-white/5 bg-black/80 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-4">
            <div className="flex items-center gap-4 min-w-0">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-3 border border-white/5 bg-zinc-950 text-zinc-400 hover:text-white hover:border-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500 mb-1">
                  Misión actual
                </div>
                <div className="text-sm md:text-base font-black uppercase italic tracking-tight text-white truncate">
                  {moduleObj.title}
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-zinc-400">
                <Timer className="w-4 h-4 text-primary-500" />
                <span className="text-xs font-black uppercase tracking-[0.18em]">
                  3 min
                </span>
              </div>

              <div className="flex items-center gap-2 text-zinc-400">
                <Zap className="w-4 h-4 text-primary-500" />
                <span className="text-xs font-black uppercase tracking-[0.18em]">
                  +25 XP
                </span>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-12 gap-6"
            >
              {/* Left */}
              <div className="lg:col-span-7 border border-white/5 bg-[#050505] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary-500 text-black flex items-center justify-center font-black italic">
                    01
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.22em] text-primary-500">
                      Desafío de sintaxis
                    </div>
                    <div className="text-sm text-zinc-500 font-bold uppercase tracking-wide">
                      JavaScript · Variables
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl md:text-4xl font-black italic uppercase tracking-tight leading-tight mb-5">
                  ¿Cómo declarás un valor que no debería cambiar?
                </h1>

                <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                  Elegí la opción correcta para declarar una constante en JavaScript.
                  Buscamos una sintaxis clara, moderna y segura.
                </p>

                <div className="border border-white/5 bg-zinc-950/70 p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-primary-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                      Objetivo
                    </span>
                  </div>

                  <p className="text-zinc-300 leading-relaxed">
                    Entender cuándo usar <span className="text-primary-500 font-bold">const</span>{' '}
                    para proteger valores que no deben reasignarse.
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-5 border border-white/5 bg-zinc-950 p-6 md:p-8 flex flex-col">
                <div className="mb-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500 mb-2">
                    Seleccioná una respuesta
                  </div>
                  <div className="text-lg md:text-xl font-black italic uppercase tracking-tight">
                    Elegí la mejor opción
                  </div>
                </div>

                <div className="space-y-3">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => !showFeedback && setSelectedOption(option.id)}
                      className={`w-full text-left border p-4 md:p-5 transition-all ${getOptionState(
                        option.id
                      )}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 shrink-0 border border-white/10 bg-black flex items-center justify-center text-sm font-black italic text-zinc-300">
                          {option.label}
                        </div>

                        <div className="flex-1">
                          <div className="font-mono text-sm md:text-base text-zinc-100 mb-2">
                            {option.code}
                          </div>
                          <div className="text-sm text-zinc-500 leading-relaxed">
                            {option.explanation}
                          </div>
                        </div>

                        {showFeedback && option.id === correctOption && (
                          <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-1" />
                        )}

                        {showFeedback &&
                          option.id === selectedOption &&
                          selectedOption !== correctOption && (
                            <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                          )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 border border-white/5 bg-black/30 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    Consejo rápido
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    En JavaScript moderno, <span className="text-primary-500 font-bold">const</span>{' '}
                    es la opción recomendada cuando no necesitás reasignar el valor.
                  </p>
                </div>

                <div className="mt-6">
                  {!showFeedback ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={selectedOption === null}
                      className="w-full bg-primary-500 text-black font-black uppercase tracking-[0.18em] text-sm md:text-base py-4 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 transition"
                    >
                      Validar respuesta
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`border p-4 ${selectedOption === correctOption
                        ? 'border-primary-500/30 bg-primary-500/10'
                        : 'border-red-500/30 bg-red-500/10'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        {selectedOption === correctOption ? (
                          <CheckCircle2 className="w-5 h-5 text-primary-500 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        )}

                        <div>
                          <div className="font-black uppercase tracking-[0.16em] text-sm mb-1">
                            {selectedOption === correctOption
                              ? 'Respuesta correcta'
                              : 'Respuesta incorrecta'}
                          </div>
                          <p className="text-sm text-zinc-300 leading-relaxed">
                            {selectedOption === correctOption
                              ? 'Perfecto. Const protege mejor un valor que no debería cambiar.'
                              : 'Casi. Para este caso, la mejor opción es usar const.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.98, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-3xl mx-auto border border-primary-500/20 bg-[#050505] p-8 md:p-12 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-primary-500 text-black flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="text-[10px] font-black uppercase tracking-[0.26em] text-primary-500 mb-4">
                Misión completada
              </div>

              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight mb-4">
                Excelente ejecución
              </h2>

              <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
                Resolviste correctamente la misión y sumaste progreso real en tu camino
                como programador.
              </p>

              <div className="grid md:grid-cols-3 gap-3 mb-8">
                <RewardCard label="Recompensa" value="+25 XP" highlight />
                <RewardCard label="Concepto" value="Constantes" />
                <RewardCard label="Estado" value="Validado" />
              </div>

              <button
                onClick={handleContinueChallenge}
                className="inline-flex items-center gap-3 bg-primary-500 text-black px-6 md:px-8 py-4 font-black uppercase tracking-[0.16em] hover:brightness-105 transition"
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RewardCard({ label, value, highlight = false }) {
  return (
    <div className="border border-white/5 bg-zinc-950 p-5">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">
        {label}
      </div>
      <div className={`text-xl font-black italic uppercase ${highlight ? 'text-primary-500' : 'text-white'}`}>
        {value}
      </div>
    </div>
  );
}