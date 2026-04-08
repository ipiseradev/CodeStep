import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroTerminal() {
  const codeLines = [
    { type: 'log', text: '> AUTENTICANDO_ATLETA...' },
    { type: 'log', text: '> ESTADO: ACCESO_CONCEDIDO' },
    { type: 'log', text: '> INICIALIZANDO_MÓDULO: VARIABLES_01' },
    { type: 'spacer', text: '' },
    { type: 'code', parts: [
        { text: 'const ', color: 'text-primary-500' },
        { text: 'rendimiento = ', color: 'text-white' },
        { text: '"atleta"', color: 'text-cyan-400' },
        { text: ';', color: 'text-zinc-600' }
    ]},
    { type: 'code', parts: [
        { text: 'function ', color: 'text-primary-500' },
        { text: 'ejecutar(mision) {', color: 'text-white' }
    ]},
    { type: 'code', parts: [
        { text: '  if ', color: 'text-primary-500' },
        { text: '(mision.completada) {', color: 'text-white' }
    ]},
    { type: 'code', parts: [
        { text: '    return ', color: 'text-primary-500' },
        { text: '"MISIÓN_ÉXITO"', color: 'text-cyan-400' },
        { text: ';', color: 'text-zinc-600' }
    ]},
    { type: 'code', parts: [
        { text: '  }', color: 'text-white' }
    ]},
    { type: 'code', parts: [
        { text: '}', color: 'text-white' }
    ]},
    { type: 'spacer', text: '' },
    { type: 'log', text: '> CODESTEP_OS: LISTO_PARA_DESPLIEGUE' }
  ];

  const [visibleLines, setVisibleLines] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < codeLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, codeLines[index]]);
        setIndex(prev => prev + 1);
      }, 600); // Slightly faster typing for better UX
      return () => clearTimeout(timer);
    } else {
        const resetTimer = setTimeout(() => {
            setVisibleLines([]);
            setIndex(0);
        }, 6000);
        return () => clearTimeout(resetTimer);
    }
  }, [index]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-xl mx-auto lg:mr-0 aspect-video md:aspect-[4/3] lg:aspect-square flex flex-col bg-[#050505] border border-white/5 shadow-2xl overflow-hidden group"
    >
      {/* Terminal Title Bar - Mac Traffic Lights */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.03] bg-zinc-900/40">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm shadow-[#FF5F56]/20" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm shadow-[#FFBD2E]/20" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm shadow-[#27C93F]/20" />
        </div>
        <span className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.3em] italic">
            INTERFAZ DE ALTO RENDIMIENTO
        </span>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-10 font-mono overflow-y-auto bg-black/50">
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {visibleLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="leading-relaxed"
              >
                {line.type === 'log' && (
                  <span className="text-[11px] font-bold text-zinc-700 tracking-tight uppercase">
                    {line.text}
                  </span>
                )}
                
                {line.type === 'code' && (
                  <div className="text-sm md:text-base lg:text-lg">
                    {line.parts.map((part, pi) => (
                      <span key={pi} className={part.color}>{part.text}</span>
                    ))}
                  </div>
                )}

                {line.type === 'spacer' && <div className="h-2" />}
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.div 
            animate={{ opacity: [0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-1.5 h-6 bg-primary-500 inline-block align-middle shadow-[0_0_8px_rgba(226,251,24,0.6)]"
          />
        </div>
      </div>

      {/* Status Footer */}
      <div className="px-8 py-5 border-t border-white/[0.03] bg-zinc-900/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-primary-500 animate-pulse shadow-[0_0_5px_rgba(226,251,24,1)]" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">SISTEMA_EN_LÍNEA</span>
        </div>
        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-500 italic">
            NODO: 0xCODE1A
        </div>
      </div>

      {/* Background Glow - Accentuated */}
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-primary-500/[0.08] blur-[140px] pointer-events-none group-hover:bg-primary-500/[0.12] transition-colors duration-1000" />
    </motion.div>
  );
}
