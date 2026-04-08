import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ChevronRight } from 'lucide-react';
import AnimatedButton from '../components/ui/AnimatedButton';
import HeroTerminal from '../components/ui/HeroTerminal';

export default function Landing() {
  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden grid-bg noise-overlay">
      {/* Ambient Orbs */}
      <div className="ambient-orb w-[500px] h-[500px] bg-white/5 -top-20 -left-20" />
      <div className="ambient-orb w-[380px] h-[380px] bg-primary-500/5 bottom-0 right-0" />

      <div className="max-w-[1100px] mx-auto px-6 py-20 md:py-28 lg:py-32 relative z-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center w-full">
          {/* Left */}
          <div className="max-w-[520px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-0 py-2 text-primary-500 font-black mb-8 tracking-[0.2em] uppercase text-xs border-b-2 border-primary-500"
            >
              <Zap className="w-4 h-4 fill-primary-500" />
              <span>Aprende a programar jugando</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl xl:text-7xl font-black tracking-[-0.06em] mb-8 leading-[0.9] uppercase italic text-white"
            >
              TU CÓDIGO.
              <br />
              SIN LÍMITES.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.75 }}
              className="text-lg md:text-2xl text-zinc-400 mb-12 leading-snug max-w-[480px] font-medium tracking-tight"
            >
              Una plataforma de aprendizaje para practicar programación con desafíos
              cortos, feedback inmediato y progreso real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <Link to="/dashboard">
                <AnimatedButton className="min-w-[280px] h-16 md:h-18 text-lg md:text-xl">
                  Ir a la plataforma
                  <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                </AnimatedButton>
              </Link>
            </motion.div>
          </div>

          {/* Right */}
          <div className="hidden lg:flex justify-end">
            <div className="w-full max-w-[560px]">
              <HeroTerminal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}