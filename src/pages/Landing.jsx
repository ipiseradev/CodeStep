import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, ArrowRight, Zap, Target, Award, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import AnimatedButton from '../components/ui/AnimatedButton';
import HeroTerminal from '../components/ui/HeroTerminal';

export default function Landing() {
  return (
    <div className="w-full flex-1 bg-black relative overflow-hidden grid-bg noise-overlay">
      {/* Ambient Orbs - Nike Stealth Style */}
      <div className="ambient-orb w-[600px] h-[600px] bg-white/5 -top-20 -left-20" />
      <div className="ambient-orb w-[400px] h-[400px] bg-primary-500/5 bottom-20 right-0" />

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-40 relative z-10">

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-0 py-2 text-primary-500 font-black mb-8 tracking-[0.2em] uppercase text-xs border-b-2 border-primary-500"
            >
              <Zap className="w-4 h-4 fill-primary-500" />
              <span>High Performance Learning</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-black tracking-[-0.06em] mb-12 leading-[0.85] uppercase italic"
            >
              TU CÓDIGO.<br />
              <span className="text-white">SIN LÍMITES.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-2xl md:text-3xl text-zinc-400 mb-16 leading-snug max-w-xl font-medium tracking-tight"
            >
              Domina los fundamentos de la programación con ejecución de alto nivel. Desafíos reales para programadores que no se detuvieron.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/dashboard">
                <AnimatedButton className="min-w-[320px] h-20 text-2xl">
                  Empezar ahora
                  <ChevronRight className="w-8 h-8" />
                </AnimatedButton>
              </Link>
            </motion.div>
          </div>

          <div className="hidden lg:block relative">
            <HeroTerminal />
          </div>
        </div>

        {/* Action Showcase */}
        <motion.div 
           initial={{ opacity: 0, y: 60 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="mb-60"
        >
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 border-b border-zinc-900 pb-10">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Ejecución Constante</h2>
            <p className="text-zinc-500 text-xl max-w-sm text-right font-medium leading-tight">Aprendés el concepto. Lo aplicás. Ganás. Repetís.</p>
          </div>

          <div className="grid md:grid-cols-12 gap-1 px-1 bg-zinc-900 border border-zinc-900">
            <div className="md:col-span-8 bg-black p-12 flex flex-col justify-between min-h-[500px]">
                <div>
                    <div className="text-primary-500 font-black text-xs uppercase tracking-widest mb-10 flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-500" /> Desafío 01 / Variables
                    </div>
                    <h4 className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
                        ¿Cómo protegés un valor que no debe cambiar?
                    </h4>
                </div>
                <div className="flex flex-col gap-3 max-w-xl">
                    <div className="p-6 bg-zinc-900 border-l-4 border-primary-500 flex items-center justify-between group cursor-pointer hover:bg-zinc-800 transition-colors">
                        <span className="font-mono text-xl text-primary-500">const PI = 3.14;</span>
                        <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />
                        </div>
                    </div>
                    <div className="p-6 bg-zinc-900/40 border-l-4 border-zinc-800 text-zinc-500 font-mono text-xl italic selection:bg-zinc-800">
                        let radio = 3.14;
                    </div>
                </div>
            </div>
            <div className="md:col-span-4 bg-zinc-950 p-12 flex flex-col items-center justify-center text-center border-t md:border-t-0 md:border-l border-primary-500/20 shadow-[inset_0_0_20px_rgba(226,251,24,0.02)]">
                <div className="w-24 h-24 bg-white flex items-center justify-center mb-8 rotate-3 shadow-[10px_10px_0px_rgba(226,251,24,0.1)]">
                    <Award className="w-16 h-16 text-black" />
                </div>
                <h5 className="text-3xl font-black text-white mb-4 uppercase italic">Módulo Dominado</h5>
                <p className="text-zinc-500 font-bold tracking-widest uppercase text-xs">+25 Puntos de XP</p>
                <div className="mt-10 w-full h-2 bg-zinc-900">
                    <div className="h-full bg-primary-500 w-[70%]" />
                </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Pillars */}
        <div className="grid md:grid-cols-3 gap-0 border border-zinc-900">
          <Pillar 
            id="01" 
            title="Disciplina" 
            desc="Módulos cortos diseñados para la consistencia diaria. No busques motivación, buscá resultados."
          />
          <Pillar 
            id="02" 
            title="Precisión" 
            desc="Entorno de validación inmediata. Corregimos tus errores en milisegundos para una curva de aprendizaje radical."
          />
          <Pillar 
            id="03" 
            title="Potencia" 
            desc="De la sintaxis a la lógica pura. Construí una base técnica inquebrantable para tu carrera."
          />
        </div>
        
      </div>
    </div>
  );
}

function Pillar({ id, title, desc }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="p-12 border-zinc-900 md:border-r last:border-r-0 hover:bg-zinc-950 transition-colors group"
    >
      <div className="text-zinc-800 font-black text-4xl mb-12 group-hover:text-primary-500 transition-colors italic">{id}</div>
      <h3 className="text-2xl font-black text-white mb-6 uppercase italic tracking-tighter">{title}</h3>
      <p className="text-zinc-500 leading-snug font-medium text-lg">{desc}</p>
    </motion.div>
  );
}
