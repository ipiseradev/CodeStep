import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Globe, Database, Shield } from 'lucide-react';

export default function HeroTerminal() {
  const codeLines = useMemo(
    () => [
      { type: 'log', text: '> [0x001] AUTHENTICATING_SESSION...' },
      { type: 'log', text: '> [0x002] STATUS: ACCESS_GRANTED' },
      { type: 'log', text: '> [0x003] INITIALIZING_NODE: DELTA_9' },
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
          { text: '  athlete: ', color: 'text-zinc-400' },
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
    ],
    []
  );

  const [visibleLines, setVisibleLines] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer;
    if (index < codeLines.length) {
      const currentLine = codeLines[index];
      const delay = currentLine.type === 'spacer' ? 100 : currentLine.type === 'log' ? 350 : 250;

      timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, currentLine]);
        setIndex((prev) => prev + 1);
      }, delay);
    } else {
      timer = setTimeout(() => {
        setVisibleLines([]);
        setIndex(0);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [index, codeLines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[560px] mx-auto lg:mr-0 group"
    >
      {/* Glow Ambient Layer */}
      <div className="absolute -inset-4 bg-primary-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="relative overflow-hidden border border-white/10 bg-[#040404]/98 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {/* Grain Texture Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] noise-overlay" />

        {/* Scan line Refined */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 500, opacity: [0, 0.15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          className="pointer-events-none absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent z-20"
        />

        {/* Terminal Header */}
        <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-zinc-900/40 z-30">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] opacity-80" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] opacity-80" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27C93F] opacity-80" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">
              <Shield className="w-2.5 h-2.5" />
              <span>Encrypted Session</span>
            </div>
            <div className="h-4 w-[1px] bg-white/5" />
            <div className="text-[8px] font-black uppercase tracking-[0.2em] text-primary-500">v1.2.0-PRO</div>
          </div>
        </div>

        {/* Tactical Sub-header (Simulated Metrics) */}
        <div className="grid grid-cols-4 border-b border-white/[0.05] bg-zinc-950/50">
          <Metric label="LATENCY" value="12ms" />
          <Metric label="STABILITY" value="99.9%" />
          <Metric label="UPLINK" value="D-01" />
          <Metric label="LOAD" value="4.2%" />
        </div>

        {/* Main Console Content */}
        <div className="relative min-h-[460px] px-6 md:px-8 py-8 bg-[radial-gradient(circle_at_70%_5% ,rgba(226,251,24,0.06),transparent_40%)]">
          <div className="border border-white/[0.03] bg-black/40 px-6 py-6 shadow-inner backdrop-blur-sm relative overflow-hidden">
            {/* Tiny Background Grid for the inner console */}
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

            <div className="space-y-3 font-mono relative z-10">
              <AnimatePresence initial={false}>
                {visibleLines.map((line, i) => (
                  <motion.div
                    key={`${line.type}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="leading-relaxed"
                  >
                    {line.type === 'log' && (
                      <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                        {line.text}
                      </div>
                    )}

                    {line.type === 'code' && (
                      <div className="text-[14px] md:text-[16px] tracking-tight">
                        {line.parts.map((part, pi) => (
                          <span key={pi} className={`${part.color} drop-shadow-[0_0_8px_rgba(255,255,255,0.02)]`}>
                            {part.text}
                          </span>
                        ))}
                      </div>
                    )}

                    {line.type === 'spacer' && <div className="h-2" />}
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block h-5 w-[2px] bg-primary-500 shadow-[0_0_12px_rgba(226,251,24,0.8)] align-middle ml-1"
              />
            </div>
          </div>

          {/* Real-time Graph Simulation (Decoration) */}
          <div className="mt-8 flex gap-6 items-end justify-between px-2">
            <div className="flex-1 space-y-3">
              <div className="text-[9px] font-black text-zinc-700 tracking-widest uppercase flex items-center gap-2">
                <Activity className="w-3 h-3 text-primary-500" /> Technical Accuracy
              </div>
              <div className="flex items-end gap-1 h-8">
                {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75, 55].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h}%`, `${Math.min(100, h + 15)}%`, `${h}%`] }}
                    transition={{ repeat: Infinity, duration: 2 + Math.random(), ease: "easeInOut" }}
                    className="flex-1 bg-zinc-900 group-hover:bg-primary-500/20 transition-colors"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 text-primary-500/80">
                <Cpu className="w-3 h-3" /> <span className="text-[9px] font-black tracking-widest uppercase">Kernel OK</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700">
                <Globe className="w-3 h-3" /> <span className="text-[9px] font-black tracking-widest uppercase">Cloud Sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Status Bar Refined */}
        <div className="relative flex items-center justify-between px-5 py-4 border-t border-white/[0.08] bg-zinc-900/60 z-30">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="h-1.5 w-1.5 bg-primary-500 shadow-[0_0_8px_rgba(226,251,24,1)]" />
              <div className="absolute h-4 w-4 rounded-full border border-primary-500/20 animate-ping" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
              System_Operational
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Database className="w-2.5 h-2.5 text-zinc-600" />
              <span className="text-[8px] font-black text-zinc-600 tracking-widest uppercase">Cache: Active</span>
            </div>
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-500 italic">
              Ref: 0xCODE1A-PRIME
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="px-4 py-3 border-r border-white/[0.05] last:border-r-0 text-center">
      <div className="text-[8px] font-black text-zinc-700 tracking-widest uppercase mb-1">{label}</div>
      <div className="text-[10px] font-black text-zinc-300 italic tracking-tighter">{value}</div>
    </div>
  );
}