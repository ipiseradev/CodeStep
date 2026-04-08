import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ProgressProvider } from './context/ProgressContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-dark-950">
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
