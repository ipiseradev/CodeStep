import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ProgressProvider } from './context/ProgressContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Lesson from './pages/Lesson';
import Missions from './pages/Missions'; // Asegurate de que el archivo se llame así
import Profile from './pages/Profile';

// Componente para manejar las transiciones animadas
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rutas Principales */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Dashboard y Secciones del Sidebar */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/misiones" element={<Missions />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Rutas en construcción */}
        <Route path="/progreso" element={<div className="text-white p-20 font-black italic">PROGRESO_SYSTEM: LOADING...</div>} />
        <Route path="/comunidad" element={<div className="text-white p-20 font-black italic">COMMUNITY_HUB: OFFLINE</div>} />
        
        {/* Fallback (Redirigir al dashboard si la ruta no existe) */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-black">
          {/* Solo mostramos Navbar y Footer si no estamos en el dashboard/lessons 
              si es que tu diseño lo requiere así, sino dejalos fijos */}
          <Navbar />
          
          <main className="flex-1 flex flex-col">
            <AnimatedRoutes />
          </main>
          
          <Footer />
        </div>
      </BrowserRouter>
    </ProgressProvider>
  );
}

export default App;