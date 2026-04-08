import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Code2, CheckCircle2, ArrowRight, XCircle, Trophy, Lightbulb, ChevronLeft, Target, Zap } from 'lucide-react';
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
      {/* Tactical Top Bar */}
      <div className="sticky top-20 z-40 bg-black/95 backdrop-blur-xl border-b-2 border-zinc-900 py-4 px-6 w-full">
        <div className="max-w-7xl mx-auto flex items-center gap-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-4 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-2 uppercase font-black italic tracking-tighter">
              <span className="text-sm text-zinc-500">Misión: {moduleObj.title}</span>
              <span className="text-xl text-primary-500">
                {step === 'theory' ? 'ANÁLISIS' : step === 'challenge' ? 'EJECUCIÓN' : 'VICTORIA'}
              </span>
            </div>
            <ProgressBar progress={step === 'theory' ? 33 : step === 'challenge' ? 66 : 100} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <AnimatePresence mode="wait">
          {step === 'theory' && (
            <motion.div 
              key="theory"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid md:grid-cols-12 gap-1"
            >
              <div className="md:col-span-12 lg:col-span-7 bg-zinc-950 p-12 border border-zinc-900">
                <div className="text-primary-500 font-black text-xs uppercase tracking-[0.3em] mb-10 inline-block border-b-2 border-primary-500 pb-1">
                  REPORTE TÁCTICO
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-10 leading-[0.9] tracking-tighter italic uppercase">
                  {moduleObj.lesson.title}
                </h1>
                <p className="text-2xl text-zinc-400 leading-tight font-medium mb-12">
                  {moduleObj.lesson.content}
                </p>
                <AnimatedButton 
                    onClick={() => setStep('challenge')}
                    className="h-20 lg:h-24 px-12 text-2xl"
                >
                  Confirmar lectura <ArrowRight className="w-8 h-8" />
                </AnimatedButton>
              </div>

              <div className="md:col-span-12 lg:col-span-5 bg-black border border-zinc-900 p-0 overflow-hidden flex flex-col">
                <div className="bg-zinc-900 px-6 py-4 flex items-center justify-between border-b border-zinc-800">
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">VISTA DE CASO DE ESTUDIO</span>
                    <Code2 className="w-4 h-4 text-zinc-700" />
                </div>
                <div className="flex-1">
                    <SyntaxHighlighter 
                        language="javascript" 
                        style={atomDark}
                        customStyle={{ padding: '3rem', margin: 0, background: 'transparent', fontSize: '18px', border: 'none', lineHeight: '1.6' }}
                    >
                        {moduleObj.lesson.codeExample}
                    </SyntaxHighlighter>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'challenge' && (
            <motion.div 
              key="challenge"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-zinc-950 border border-zinc-900 p-16 mb-1 text-center translate-y-2">
                <div className="text-primary-500 font-black text-xs uppercase tracking-[0.3em] mb-10">
                  Target Identification
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
                  {moduleObj.challenge.question}
                </h2>
              </div>

              <div className="grid gap-1 bg-zinc-900 p-1">
                {moduleObj.challenge.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    disabled={showFeedback}
                    className={`w-full p-10 flex items-center gap-10 text-left transition-all duration-300 relative group ${
                      selectedOption?.id === option.id 
                        ? option.isCorrect 
                          ? 'bg-primary-500 text-black' 
                          : 'bg-red-500 text-black'
                        : 'bg-black text-zinc-500 hover:text-white'
                    }`}
                  >
                    <div className={`text-4xl font-black italic tracking-tighter uppercase leading-none ${
                         selectedOption?.id === option.id ? 'text-black/30' : 'text-zinc-900 group-hover:text-zinc-800'
                    }`}>
                        {option.id}
                    </div>
                    <span className="font-mono text-xl font-bold tracking-tight flex-1">
                      {option.text}
                    </span>
                    {selectedOption?.id === option.id && (
                        <div className="w-12 h-12 flex items-center justify-center">
                            {option.isCorrect ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                        </div>
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {showFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    className={`mt-1 p-12 border-t-8 ${
                        selectedOption?.isCorrect 
                        ? 'bg-zinc-950 border-primary-500' 
                        : 'bg-zinc-950 border-red-500'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
                        <div className="flex-1">
                            <h5 className={`text-4xl font-black italic uppercase tracking-tighter mb-4 ${selectedOption?.isCorrect ? 'text-primary-500' : 'text-red-500'}`}>
                                {selectedOption?.isCorrect ? 'Impacto Positivo' : 'Misión Fallida'}
                            </h5>
                            <p className="text-zinc-400 text-2xl leading-tight font-medium">
                                {selectedOption?.feedback}
                            </p>
                        </div>
                        <AnimatedButton 
                            onClick={handleContinueChallenge}
                            variant={selectedOption?.isCorrect ? 'primary' : 'outline'}
                            className="h-20 min-w-[280px] text-2xl"
                        >
                            {selectedOption?.isCorrect ? 'Confirmar' : 'Reintentar'}
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
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-20 min-h-[60vh]"
            >
              <div className="w-56 h-56 bg-white flex items-center justify-center mb-16 rotate-6 shadow-[20px_20px_0px_rgba(226,251,24,1)]">
                <Trophy className="w-24 h-24 text-black" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic leading-[0.8] tracking-tighter">VICTORIA.</h1>
              <div className="flex items-center gap-6 mb-20 bg-zinc-900 border border-zinc-800 px-10 py-4">
                 <Zap className="w-8 h-8 text-primary-500 fill-primary-500" />
                 <span className="text-3xl font-black italic text-white">+{moduleObj.xp} XP</span>
              </div>
              
              <AnimatedButton 
                onClick={() => navigate('/dashboard')}
                className="h-24 px-16 text-3xl"
              >
                Continuar Entrenamiento <ArrowRight className="w-10 h-10" />
              </AnimatedButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
