// src/utils/evaluator.js
export const evaluateCode = (userCode, moduleId) => {
  let logs = [];
  const mockConsole = {
    log: (...args) => logs.push(args.join(" "))
  };

  try {
    // Ejecución segura en el cliente
    const runner = new Function('console', userCode);
    runner(mockConsole);

    // Lógica específica por módulo (puedes expandir esto)
    if (moduleId === 'module-2') { // Condicionales
      const hasIf = userCode.includes('if');
      const correctOutput = logs.some(l => l.includes("Podés entrar"));
      
      if (hasIf && correctOutput) return { success: true, logs };
      return { 
        success: false, 
        logs, 
        error: !hasIf ? "Debés usar una estructura 'if'." : "El mensaje mostrado no es correcto." 
      };
    }

    return { success: true, logs };
  } catch (err) {
    return { success: false, logs, error: `Error de sintaxis: ${err.message}` };
  }
};