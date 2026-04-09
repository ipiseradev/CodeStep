import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const codeLines = [
  { type: 'log', text: '> [0x001] Cargando sesión...' },
  { type: 'log', text: '> [0x002] STATUS: ACCESO CONCEDIDO' },
  { type: 'log', text: '> [0x003] INICIALIZANDO ENTORNO DEV' },
  { type: 'spacer' },
  {
    type: 'code',
    parts: [
      { text: 'const ', color: 'text-primary-500' },
      { text: 'engine = ', color: 'text-zinc-100' },
      { text: 'new ', color: 'text-primary-500' },
      { text: 'CodeStep(', color: 'text-zinc-400' },
      { text: '{', color: 'text-zinc-500' },
    ],
  },
  {
    type: 'code',
    parts: [
      { text: '  mode: ', color: 'text-zinc-400' },
      { text: '"ultra_performance"', color: 'text-cyan-400' },
      { text: ',', color: 'text-zinc-500' },
    ],
  },
  {
    type: 'code',
    parts: [
      { text: '  user: ', color: 'text-zinc-400' },
      { text: '"Ignacio"', color: 'text-cyan-400' },
      { text: ',', color: 'text-zinc-500' },
    ],
  },
  {
    type: 'code',
    parts: [
      { text: '  level: ', color: 'text-zinc-400' },
      { text: 'level_04', color: 'text-primary-500' },
      { text: ',', color: 'text-zinc-500' },
    ],
  },
  {
    type: 'code',
    parts: [
      { text: '  track: ', color: 'text-zinc-400' },
      { text: '"Full Stack Dev"', color: 'text-cyan-400' },
      { text: ',', color: 'text-zinc-500' },
    ],
  },
  {
    type: 'code',
    parts: [{ text: '});', color: 'text-zinc-400' }],
  },
  { type: 'spacer' },
  {
    type: 'code',
    parts: [
      { text: 'async function', color: 'text-primary-500' },
      { text: ' deploy', color: 'text-white' },
      { text: '(logic) ', color: 'text-zinc-100' },
      { text: '{', color: 'text-zinc-500' },
    ],
  },
  {
    type: 'code',
    parts: [
      { text: '  await ', color: 'text-primary-500' },
      { text: 'logic.verify()', color: 'text-zinc-100' },
      { text: ';', color: 'text-zinc-500' },
    ],
  },
  {
    type: 'code',
    parts: [
      { text: '  return ', color: 'text-primary-500' },
      { text: '"MAX_SUCCESS"', color: 'text-cyan-400' },
      { text: ';', color: 'text-zinc-500' },
    ],
  },
  {
    type: 'code',
    parts: [{ text: '}', color: 'text-zinc-100' }],
  },
  { type: 'spacer' },
  { type: 'log', text: '> INTEGRITY_CHECK: 100% OPTIMIZED' },
  { type: 'log', text: '> SYSTEM_01: READY_FOR_DEPLOYMENT' },
];

const Line = ({ line, delay }) => {
  const renderLog = (text) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex text-sm font-mono"
    >
      <span className="text-green-400">$</span>
      <span className="text-zinc-400 ml-1">{text}</span>
    </motion.div>
  );

  const renderCode = (parts) => (
    <div className="text-sm font-mono">
      {parts.map((part, i) => (
        <span key={i} className={part.color || 'text-zinc-400'}>
          {part.text}
        </span>
      ))}
    </div>
  );

  const renderSpacer = () => <div className="h-4" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {line.type === 'log' && renderLog(line.text)}
      {line.type === 'code' && renderCode(line.parts)}
      {line.type === 'spacer' && renderSpacer()}
    </motion.div>
  );
};

const HeroTerminal = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < codeLines.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md p-6 lg:p-8 bg-black/80 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <div className="w-3 h-3 bg-green-500 rounded-full" />
      </div>
      <div className="space-y-1 overflow-hidden max-h-96">
        <AnimatePresence>
          {codeLines.slice(0, visibleLines).map((line, index) => (
            <Line
              key={`${line.type}-${index}`}
              line={line}
              delay={0.1 * index}
            />
          ))}
        </AnimatePresence>
        {visibleLines < codeLines.length && (
          <div className="h-4 w-full bg-gradient-to-b from-transparent to-black" />
        )}
      </div>
      <div className="flex items-center mt-4 pt-4 border-t border-white/10">
        <span className="text-green-400 text-xs font-mono">$</span>
        <div className="flex-1 h-1 bg-gradient-to-r from-zinc-800 via-zinc-700 to-transparent ml-2 animate-pulse rounded" />
      </div>
    </div>
  );
};

export default HeroTerminal;

