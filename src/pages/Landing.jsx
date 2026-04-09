
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
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
    <div className="relative w-full min-h-screen overflow-hidden bg-black grid-bg selection:bg-primary-500/30">
      <div className="pointer-events-none absolute inset-0 z-[1] noise-overlay opacity-[0.15]" />

      <div className="pointer-events-none absolute -top-24 -left-24 h-[600px] w-[600px] rounded-full bg-white/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[100px]" />

      <main className="relative z-10 container mx-auto flex min-h-screen items-center px-6 md:px-10 lg:px-16">
        <div className="grid w-full items-center gap-16 py-20 lg:grid-cols-2 lg:py-0 xl:gap-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="mb-5 text-5xl font-black uppercase italic leading-[0.9] tracking-[-0.07em] text-white md:text-6xl xl:text-[4.8rem]"
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
              className="mb-9 max-w-[670px] text-base leading-relaxed text-zinc-400 md:text-lg"
            >
              Aprendé a programar con misiones cortas, feedback inmediato y
              progreso real.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link to="/dashboard">
                <AnimatedButton className="group flex items-center gap-3 bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition-all duration-300 hover:bg-primary-500 hover:scale-[1.02]">
                  <span>ENTRAR A LA PLATAFORMA</span>
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
            className="relative flex w-full justify-center lg:justify-end"
          >
            <div className="absolute inset-0 rounded-3xl bg-primary-500/5 blur-[80px]" />

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