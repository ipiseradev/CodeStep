import { createContext, useContext, useState, useEffect } from 'react';
import { modules } from '../data/modules';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [xp, setXp] = useState(0);
  const [completedModules, setCompletedModules] = useState([]);
  
  // Cargar progreso inicial desde localStorage
  useEffect(() => {
    const savedXp = localStorage.getItem('codestep_xp');
    const savedModules = localStorage.getItem('codestep_completed');
    
    if (savedXp) setXp(parseInt(savedXp));
    if (savedModules) setCompletedModules(JSON.parse(savedModules));
  }, []);

  // Guardar en localStorage cuando hay cambios
  useEffect(() => {
    localStorage.setItem('codestep_xp', xp.toString());
    localStorage.setItem('codestep_completed', JSON.stringify(completedModules));
  }, [xp, completedModules]);

  const markModuleCompleted = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
      // Buscar el modulo para añadir XP
      const module = modules.find(m => m.id === moduleId);
      if (module) {
        setXp(prev => prev + module.xp);
      }
    }
  };

  const isModuleCompleted = (moduleId) => completedModules.includes(moduleId);
  
  const isModuleLocked = (moduleId) => {
    // El primer módulo nunca está bloqueado
    if (moduleId === modules[0].id) return false;
    
    // Un módulo está bloqueado si el anterior no está completado
    const index = modules.findIndex(m => m.id === moduleId);
    if (index > 0) {
      const prevModuleId = modules[index - 1].id;
      return !completedModules.includes(prevModuleId);
    }
    return false;
  };

  const getPercentageCompleted = () => {
    return Math.round((completedModules.length / modules.length) * 100);
  };

  return (
    <ProgressContext.Provider value={{
      xp,
      completedModules,
      markModuleCompleted,
      isModuleCompleted,
      isModuleLocked,
      getPercentageCompleted,
      totalModules: modules.length
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
