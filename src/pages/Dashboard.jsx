import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Flame, BookOpen, Trophy, ChevronRight, LayoutDashboard, Target, BarChart3, User, ExternalLink } from 'lucide-react';
import modulesData from '../data/modules.js';

// --- CONFIGURACIÓN DE ANIMACIÓN ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

// --- COMPONENTES AUXILIARES ---

const StatCard = ({ stat }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      variants={itemVariants}
      className="group relative border border-white/5 bg-zinc-950/50 p-5 hover:bg-zinc-900/30 transition-all duration-500 rounded-sm overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">{stat.label}</span>
          <Icon className={`w-4 h-4 ${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
        </div>
        <div className="text-3xl font-black italic tracking-tighter uppercase">{stat.value}</div>
      </div>
    </motion.div>
  );
};

const SidebarLink = ({ to, icon: Icon, label, active = false }) => (
  <Link 
    to={to} 
    className={`group flex items-center gap-4 px-6 py-4 transition-all duration-300 ${
      active ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
    }`}
  >
    <div className={`absolute left-0 w-1 h-6 bg-primary-500 transition-all duration-300 ${active ? 'opacity-100' : 'opacity-0'}`} />
    <Icon className={`w-5 h-5 transition-colors ${active ? 'text-primary-500' : 'group-hover:text-primary-500'}`} />
    <span className="text-[11px] font-black uppercase tracking-[0.15em]">{label}</span>
  </Link>
);

// --- MAIN DASHBOARD ---

export default function Dashboard() {
  // Mapping de datos con fallback para evitar errores si modulesData falla
  const displayModules = (modulesData || []).slice(0, 4).map((m, i) => ({
    title: m.title || "Módulo",
    lessons: 12,
    progress: [25, 50, 75, 100][i] // Simulación de progreso escalonado como en tu imagen
  }));

  const stats = [
    { label: 'XP TOTAL', value: '1,240', icon: Zap, color: 'text-primary-500' },
    { label: 'NIVEL', value: '04', icon: Trophy, color: 'text-yellow-500' },
    { label: 'MISIONES', value: '18', icon: BookOpen, color: 'text-blue-500' },
    { label: 'RACHA', value: '7 DÍAS', icon: Flame, color: 'text-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary-500/30 font-sans">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/5 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar Estilizada */}
        <aside className="hidden lg:flex w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl flex-col">
          <div className="p-8 mb-8">
            <h1 className="text-xl font-black italic tracking-tighter uppercase group cursor-default">
              CODE<span className="text-primary-500 group-hover:text-white transition-colors">STEP</span>
            </h1>
          </div>
          <nav className="flex flex-col gap-1">
            <SidebarLink to="#" icon={LayoutDashboard} label="Dashboard" active />
            <SidebarLink to="#" icon={Target} label="Misiones" />
            <SidebarLink to="#" icon={BarChart3} label="Progreso" />
            <SidebarLink to="#" icon={User} label="Perfil" />
          </nav>
        </aside>

        <main className="flex-1 px-8 lg:px-16 py-12 max-w-[1600px] mx-auto w-full">
          {/* Header Premium */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-12 bg-primary-500" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-primary-500 font-black">Estadisticas de Tu Cuenta</span>
              </div>
              <h2 className="text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Bienvenido, <span className="text-zinc-500">Ignacio</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-6 pb-2">
              <div className="text-right">
                <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Estado de cuenta</p>
                <p className="text-xs font-black text-primary-500 tracking-tighter uppercase">Admin</p>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div className="px-5 py-2 bg-white text-black text-[11px] font-black uppercase tracking-tighter italic">Nivel 04</div>
            </div>
          </header>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
            {/* Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
            </section>

            {/* Main Section */}
            <section className="grid xl:grid-cols-3 gap-6">
              {/* Feature Card: Misión Activa */}
              <motion.div variants={itemVariants} className="xl:col-span-2 relative group overflow-hidden border border-white/5 bg-zinc-950/40 p-10 rounded-sm transition-all duration-500 hover:border-primary-500/20">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/[0.03] blur-[100px] group-hover:bg-primary-500/[0.07] transition-all duration-700" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-2 text-primary-500 mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Misión Activa</span>
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter mb-6 max-w-xl leading-[0.85]">
                    JavaScript: <br />Condicionales y Lógica
                  </h3>
                  
                  <p className="text-zinc-500 text-sm mb-10 max-w-sm leading-relaxed">
                    Estás a un paso de dominar el control de flujo. Completá el desafío final para obtener <span className="text-white font-bold">+250 XP</span>.
                  </p>

                  <div className="mt-auto space-y-8">
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        <span>Progreso del bloque</span>
                        <span className="text-white">72%</span>
                      </div>
                      <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ duration: 1.2, ease: "circOut" }}
                          className="h-full bg-primary-500" 
                        />
                      </div>
                    </div>
                    <button className="group flex items-center gap-6 bg-white hover:bg-primary-500 px-8 py-4 text-black transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-primary-500/20">
                      <span className="text-xs font-black uppercase tracking-[0.2em]">Continuar ahora</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Activity Card */}
              <motion.div variants={itemVariants} className="border border-white/5 bg-zinc-950/40 p-8 rounded-sm">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-lg font-black italic uppercase tracking-tighter">Rendimiento</h3>
                  <BarChart3 className="w-4 h-4 text-zinc-700" />
                </div>
                <div className="h-48 flex items-end gap-3 px-2">
                  {[40, 65, 45, 90, 55, 80, 70].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-default">
                      <div className="relative w-full h-full bg-white/[0.02] rounded-t-sm overflow-hidden">
                        <motion.div 
                          initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.3 + (i*0.05) }}
                          className="absolute bottom-0 w-full bg-zinc-800 group-hover:bg-primary-500 transition-all duration-300" 
                        />
                      </div>
                      <span className="text-[9px] font-bold text-zinc-700 group-hover:text-zinc-400 uppercase">
                        {['L','M','M','J','V','S','D'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Learning Path */}
            <section className="space-y-8">
              <div className="flex items-center gap-6">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Ruta de aprendizaje</h3>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>
              
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                {displayModules.map((module) => (
                  <motion.div
                    key={module.title}
                    variants={itemVariants}
                    className="group border border-white/5 bg-zinc-950/40 p-6 rounded-sm hover:border-white/20 transition-all duration-500"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="space-y-1">
                        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Módulo</p>
                        <h4 className="text-lg font-black italic tracking-tighter group-hover:text-primary-500 transition-colors uppercase">
                          {module.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-black italic text-zinc-600">{module.progress}%</span>
                    </div>
                    <div className="space-y-5">
                      <div className="h-[1px] bg-zinc-900 w-full overflow-hidden">
                        <div className="h-full bg-zinc-600 group-hover:bg-primary-500 transition-all duration-700" style={{ width: `${module.progress}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">{module.lessons} Lecciones</span>
                        <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                          Explorar <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        </main>
      </div>
    </div>
  );
}