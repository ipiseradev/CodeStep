// src/components/layout/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Asumiendo que tenés un componente Sidebar separado
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary-500/30">
      {/* Background Decorativo Global */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }} />

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar Fijo */}
        <Sidebar />

        {/* Contenido Principal Dinámico */}
        <main className="flex-1 px-8 lg:px-20 py-20 max-w-[1600px] mx-auto w-full">
          {/* El componente Outlet es donde se renderizarán Dashboard, Missions, etc. */}
          <Outlet />
        </main>
      </div>
      
      {/* <Footer /> Opcional, si lo querés global */}
    </div>
  );
}