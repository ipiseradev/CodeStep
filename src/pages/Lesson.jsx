import { motion } from 'framer-motion';
import { Play, CheckCircle2, ChevronRight, TerminalSquare } from 'lucide-react';

export default function Lesson() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex min-h-screen">
        <aside className="hidden lg:flex w-72 border-r border-white/10 bg-black/70 backdrop-blur-xl flex-col p-6">
          <div className="mb-10">
            <h1 className="text-2xl font-black italic tracking-[-0.08em] uppercase">
              CODE<span className="text-primary-500">STEP</span>
            </h1>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-primary-500">
              Módulo actual
            </p>
            <h2 className="text-2xl font-black italic uppercase leading-none">
              JavaScript
            </h2>
            <p className="text-zinc-500 text-sm">
              Condicionales y lógica
            </p>
          </div>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">
              Progreso
            </p>
            <div className="h-2 bg-zinc-900 overflow-hidden">
              <div className="h-full w-[72%] bg-primary-500" />
            </div>
            <p className="text-xs text-zinc-500 mt-2">72% completado</p>
          </div>
        </aside>

        <main className="flex-1 px-6 md:px-10 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary-500 mb-3">
                Lección activa
              </p>
              <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-[-0.06em]">
                Condicionales en JavaScript
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="px-4 py-2 border border-white/10 bg-zinc-900 text-sm font-black uppercase tracking-[0.12em]">
                XP +250
              </div>
              <div className="px-4 py-2 bg-white text-black text-sm font-black uppercase tracking-[0.12em]">
                Lección 03
              </div>
            </div>
          </div>

          <div className="grid xl:grid-cols-[0.95fr_1.25fr] gap-6">
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-white/10 bg-zinc-950/80 p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-primary-500 mb-4">
                Objetivo
              </p>

              <h2 className="text-3xl font-black italic uppercase leading-[0.95] mb-4">
                Crear una condición
                <br />
                con <span className="text-primary-500">if</span>
              </h2>

              <p className="text-zinc-400 leading-relaxed mb-6">
                Escribí una condición que evalúe si la variable
                <span className="text-white font-bold"> edad </span>
                es mayor o igual a 18. Si se cumple, mostr&aacute;
                <span className="text-primary-500 font-bold"> "Podés entrar"</span>.
              </p>

              <div className="border border-white/10 bg-black/50 p-5 mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">
                  Requisitos
                </p>

                <ul className="space-y-3 text-sm text-zinc-300">
                  <li>• Declarar la variable <span className="text-primary-500">edad</span></li>
                  <li>• Usar una estructura <span className="text-primary-500">if</span></li>
                  <li>• Mostrar el mensaje correcto en consola</li>
                </ul>
              </div>

              <div className="border border-white/10 bg-black/50 p-5 mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">
                  Hint
                </p>
                <code className="text-sm text-cyan-400 font-mono">
                  if (edad &gt;= 18) {'{'} console.log("Podés entrar"); {'}'}
                </code>
              </div>

              <button className="group inline-flex items-center gap-3 bg-white px-5 py-3 text-black text-xs font-black uppercase tracking-[0.12em] hover:bg-primary-500 transition-all">
                Validar solución
                <CheckCircle2 className="w-4 h-4 transition-transform group-hover:scale-110" />
              </button>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="border border-white/10 bg-zinc-950/80 overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-zinc-900/60">
                <div className="flex items-center gap-3">
                  <TerminalSquare className="w-4 h-4 text-primary-500" />
                  <span className="text-xs font-black uppercase tracking-[0.15em]">
                    Editor
                  </span>
                </div>

                <button className="group inline-flex items-center gap-2 bg-white px-4 py-2 text-black text-[11px] font-black uppercase tracking-[0.12em] hover:bg-primary-500 transition-all">
                  Ejecutar
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              <div className="grid lg:grid-rows-[1fr_180px] min-h-[640px]">
                <div className="p-6 bg-black/70 font-mono text-[15px] leading-8 text-zinc-200">
                  <div className="text-zinc-600 mb-2">// Escribí tu solución acá</div>
                  <div>
                    <span className="text-primary-500">const</span>{' '}
                    <span className="text-white">edad</span>{' '}
                    <span className="text-zinc-500">=</span>{' '}
                    <span className="text-cyan-400">18</span>
                    <span className="text-zinc-500">;</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-primary-500">if</span>{' '}
                    <span className="text-zinc-500">(</span>
                    <span className="text-white">edad</span>{' '}
                    <span className="text-zinc-500">&gt;=</span>{' '}
                    <span className="text-cyan-400">18</span>
                    <span className="text-zinc-500">) {'{'}</span>
                  </div>
                  <div className="ml-6">
                    <span className="text-white">console</span>
                    <span className="text-zinc-500">.</span>
                    <span className="text-primary-500">log</span>
                    <span className="text-zinc-500">(</span>
                    <span className="text-cyan-400">"Podés entrar"</span>
                    <span className="text-zinc-500">);</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">{'}'}</span>
                  </div>

                  <div className="inline-block ml-1 h-5 w-[2px] bg-primary-500 align-middle animate-pulse" />
                </div>

                <div className="border-t border-white/10 bg-zinc-950/90 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary-500 mb-3">
                    Output
                  </p>

                  <div className="bg-black border border-white/10 p-4 font-mono text-sm text-zinc-300 min-h-[100px]">
                    <div className="text-zinc-500">&gt; Ejecutando validación...</div>
                    <div className="text-primary-500 mt-2">&gt; Resultado correcto</div>
                    <div className="text-white mt-1">&gt; "Podés entrar"</div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button className="group inline-flex items-center gap-3 bg-white px-5 py-3 text-black text-xs font-black uppercase tracking-[0.12em] hover:bg-primary-500 transition-all">
                      Siguiente lección
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </div>
  );
}