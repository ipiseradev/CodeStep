import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Layout,
  Zap,
  Users,
  Shield,
  GraduationCap,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Sparkles,
  Target,
  Code2,
  ArrowRight
} from 'lucide-react';
import AnimatedButton from '../components/ui/AnimatedButton';
import HeroTerminal from '../components/ui/HeroTerminal';

// --- Variantes de Animación Optimizadas ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const academyFeatures = [
  { title: 'Gamificación real', desc: 'Misiones, XP y sensación de avance para eliminar la monotonía teórica.', icon: Zap },
  { title: 'Panel para academias', desc: 'Detectá alumnos estancados y monitoreá el progreso de cohortes en tiempo real.', icon: BarChart3 },
  { title: 'Marca blanca', desc: 'Tu logo, tus colores. Una plataforma que tus alumnos perciben como propia.', icon: Layout },
  { title: 'IA Contextual', desc: 'Feedback inteligente que guía al alumno sin darle la respuesta servida.', icon: BrainCircuit },
  { title: 'Gestión de Cohortes', desc: 'Organizá grupos y niveles de acceso con un clic.', icon: Users },
  { title: 'Infraestructura Pro', desc: 'Arquitectura escalable lista para miles de alumnos simultáneos.', icon: Shield },
];

export default function Landing() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-zinc-300 selection:bg-primary-500/30 font-sans">
      
      {/* CAPA DE FONDO PREMIUM */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-150" />
        <div className="absolute -top-[10%] -left-[10%] h-[60%] w-[60%] rounded-full bg-primary-500/5 blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* NAVEGACIÓN REFINADA */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="group flex items-center gap-2 text-2xl font-black italic uppercase tracking-tighter text-white">
            <span className="bg-primary-500 px-1.5 py-0.5 text-black not-italic group-hover:rotate-3 transition-transform">CS</span>
            CODE<span className="text-primary-500">STEP</span>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {['Beneficios', 'Academias', 'Cómo funciona'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 hover:text-primary-500 transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-[10px] font-black uppercase tracking-widest text-white hover:text-primary-500 transition-colors hidden sm:block">Login</Link>
            <button className="bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-black transition-all hover:bg-primary-500 hover:scale-105">
              Solicitar Demo
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - REVISADO */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1500px] items-center px-6 py-20 md:px-10 lg:px-16 lg:py-0">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-3 border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 rounded-full">
              <Sparkles className="h-3 w-3 text-primary-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary-500">The Future of EdTech</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="mb-8 text-5xl font-black uppercase italic leading-[0.85] tracking-tighter text-white md:text-7xl xl:text-[5.5rem]">
              VENDÉ MÁS QUE <br/>
              UN CURSO: <span className="text-primary-500 font-outline text-white">VENDÉ</span> <br/>
              RESULTADOS
            </motion.h1>

            <motion.p variants={itemVariants} className="mb-10 max-w-[600px] text-lg leading-relaxed text-zinc-400">
              Transformá tu academia en un centro de alto rendimiento. CODESTEP ofrece la infraestructura técnica para que tus alumnos aprendan <span className="text-white italic">haciendo</span>.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
              <AnimatedButton className="bg-primary-500 px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-black hover:shadow-[0_0_30px_rgba(139,254,6,0.3)]">
                Empezar ahora <ArrowRight className="ml-2 h-4 w-4 inline" />
              </AnimatedButton>
              <button className="border border-white/10 bg-white/5 px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-sm hover:bg-white/10 transition-all">
                Explorar Features
              </button>
            </motion.div>
          </motion.div>

          {/* Terminal Visual con Efecto de Profundidad */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-primary-500/10 blur-3xl" />
            <HeroTerminal />
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID - REESTRUCTURADO */}
      <section id="academias" className="relative z-10 py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          <div className="mb-20 text-center lg:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-500 mb-4">Enterprise Engine</p>
            <h2 className="text-4xl font-black italic uppercase leading-none text-white md:text-6xl">
              Diseñado para el <br/> <span className="text-transparent font-outline">Éxito Académico</span>
            </h2>
          </div>

          <div className="grid gap-1 lg:grid-cols-3">
            {academyFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden border border-white/5 bg-zinc-950/50 p-10 transition-all hover:bg-zinc-900/40"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <feature.icon className="h-16 w-16 text-primary-500" />
                </div>
                <feature.icon className="h-8 w-8 text-primary-500 mb-8" />
                <h4 className="text-xl font-black italic uppercase text-white mb-4 tracking-tighter">{feature.title}</h4>
                <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-300 transition-colors">{feature.desc}</p>
                <div className="mt-8 h-px w-0 bg-primary-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL IMPACTANTE */}
      <section id="cta" className="relative z-10 py-32 px-6">
        <div className="mx-auto max-w-[1300px] overflow-hidden rounded-[3rem] bg-zinc-900 border border-white/10 relative">
          <div className="absolute inset-0 bg-primary-500/5" />
          <div className="relative z-10 grid lg:grid-cols-2 items-center p-12 lg:p-24 gap-12">
            <div>
              <h3 className="text-5xl lg:text-7xl font-black italic uppercase leading-[0.85] text-white mb-8 tracking-tighter">
                ¿LISTO PARA <br/> <span className="text-primary-500">ESCALAR?</span>
              </h3>
              <p className="text-zinc-400 text-lg max-w-md">
                Unite a las instituciones que están redefiniendo la educación tecnológica con CODESTEP.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <button className="w-full bg-white text-black font-black py-6 uppercase italic tracking-widest hover:bg-primary-500 transition-all flex items-center justify-center gap-4">
                Solicitar Demo Privada <ChevronRight className="h-5 w-5" />
              </button>
              <p className="text-[10px] text-center text-zinc-600 uppercase tracking-widest">Respuesta en menos de 24hs</p>
            </div>
          </div>
        </div>
      </section>

      {/* ESTILOS CUSTOM */}
      <style>{`
        .font-outline {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
          color: transparent;
        }
        .grid-bg {
          background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
          background-size: 40px 40px;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}