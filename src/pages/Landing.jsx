import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ChevronRight } from 'lucide-react';
import AnimatedButton from '../components/ui/AnimatedButton';
import HeroTerminal from '../components/ui/HeroTerminal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Landing() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden grid-bg selection:bg-primary-500/30">
      <div className="absolute inset-0 noise-overlay opacity-[0.15] pointer-events-none z-[1]" />

      <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="relative z-10 container mx-auto min-h-screen flex items-center px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center w-full py-20 lg:py-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl xl:text-[4.8rem] font-black tracking-[-0.07em] leading-[0.9] uppercase italic text-white mb-5"
            >
              APRENDÉ
              <br />
              PROGRAMANDO
              <br />
              <span className="text-white">CON </span>
              <span className="text-primary-500">CODE-STEP</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-zinc-400 mb-9 leading-relaxed max-w-[470px] font-medium"
            >
              Aprendé a programar con misiones cortas, feedback inmediato y
              progreso real.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link to="/dashboard">
                <AnimatedButton className="group inline-flex items-center gap-3">
                  <Zap className="w-4 h-4 text-primary-500 fill-primary-500" />
                  <span>ENTRAR A LA PLATAFORMA</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </AnimatedButton>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 0.95,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.35,
            }}
            className="relative w-full flex justify-center lg:justify-end"
          >
            <div className="absolute inset-0 bg-primary-500/5 blur-[80px] rounded-3xl" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-full max-w-[540px]"
            >
              <HeroTerminal />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}