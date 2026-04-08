export const modules = [
  {
    id: "module-1",
    title: "La Memoria (Variables)",
    description: "Aprende dónde guardan la información las computadoras.",
    xp: 50,
    lesson: {
      title: "¿Qué es una Variable?",
      content: "Imagina que la memoria de una computadora es un mueble con muchos cajones. Si quieres guardar algo para usarlo después, lo metes en un cajón y le pones una etiqueta. En programación, ese cajón se llama **variable**.\n\nHoy en día usamos dos palabras clave en JavaScript para crear cajones: **let** y **const**.\n\n• Usa **let** si el contenido del cajón puede cambiar en el futuro.\n• Usa **const** si el contenido NUNCA va a cambiar (es constante).",
      codeExample: "// Un cajón que puede cambiar\nlet edad = 20;\nedad = 21; // ¡Feliz cumpleaños!\n\n// Un cajón que nunca cambia\nconst fechaDeNacimiento = \"2000-01-01\";\n// fechaDeNacimiento = \"2001-01-01\"; // ¡ERROR!",
      goal: "Entender cómo guardar datos básicos."
    },
    challenge: {
      question: "¿Qué palabra clave usarías para guardar una contraseña que nunca cambiará?",
      options: [
        { id: "a", text: "let contraseña = '123';", isCorrect: false, feedback: "Incorrecto. 'let' se usa cuando el valor puede cambiar." },
        { id: "b", text: "variable contraseña = '123';", isCorrect: false, feedback: "Esa palabra no existe en JavaScript." },
        { id: "c", text: "const contraseña = '123';", isCorrect: true, feedback: "¡Exacto! 'const' protege el valor para que no cambie por accidente." }
      ]
    }
  },
  {
    id: "module-2",
    title: "Las Decisiones (Condicionales)",
    description: "Haz que tu código decida qué hacer.",
    xp: 75,
    lesson: {
      title: "El poder de elegir (if/else)",
      content: "Los programas no siempre hacen lo mismo. A veces necesitan tomar decisiones. Por ejemplo: *\"Si es de día, enciende la pantalla; si es de noche, activa el modo oscuro\"*.\n\nPara esto usamos **if** (si pasa esto) y **else** (si no, haz esto otro).",
      codeExample: "let tieneEntrada = true;\n\nif (tieneEntrada) {\n  console.log(\"¡Puedes entrar al concierto!\");\n} else {\n  console.log(\"No tienes entrada, lo siento.\");\n}",
      goal: "Aprender a ejecutar código basado en condiciones."
    },
    challenge: {
      question: "Qué debería ir adentro de la condición `if (___)` para que siempre sea verdadero y siempre se ejecute el código?",
      options: [
        { id: "a", text: "false", isCorrect: false, feedback: "False significa falso, por lo que el código no se ejecutaría." },
        { id: "b", text: "true", isCorrect: true, feedback: "¡Perfecto! 'true' es el valor de verdad absoluto." },
        { id: "c", text: "\"falso\"", isCorrect: false, feedback: "Esto es texto, no un valor booleano puro que demuestre que entiendes la lógica." }
      ]
    }
  },
  {
    id: "module-3",
    title: "La Repetición (Bucles)",
    description: "Automatiza tareas repetitivas sin cansarte.",
    xp: 100,
    lesson: {
      title: "El bucle 'for'",
      content: "Un programador no escribe lo mismo 100 veces. Le dice a la computadora que lo repita 100 veces.\n\nEl bucle **for** tiene 3 partes pequeñas:\n1. Dónde empezar (ej. `let i = 0`)\n2. Cuándo detenerse (ej. `i < 5`)\n3. Qué hacer después de cada paso (ej. `i++`, que significa sumar 1).",
      codeExample: "// Cuenta del 0 al 4\nfor (let i = 0; i < 5; i++) {\n  console.log(\"Número: \" + i);\n}",
      goal: "Dominar la repetición de instrucciones."
    },
    challenge: {
      question: "Si hacemos un bucle `for (let i = 0; i < 3; i++)`, ¿cuáles números se imprimirán si hacemos un `console.log(i)`?",
      options: [
        { id: "a", text: "1, 2, 3", isCorrect: false, feedback: "Recuerda que en el código empezamos en '0', y la condición es que sea MENOR a 3." },
        { id: "b", text: "0, 1, 2", isCorrect: true, feedback: "¡Excelente! Empieza en 0 y termina antes de llegar a 3." },
        { id: "c", text: "0, 1, 2, 3", isCorrect: false, feedback: "Menor a 3 estricto (< 3), por lo que el 3 no entra." }
      ]
    }
  },
  {
    id: "module-4",
    title: "Las Máquinas (Funciones)",
    description: "Empaqueta tu código para re-utilizarlo.",
    xp: 150,
    lesson: {
      title: "Funciones: Mini-fábricas",
      content: "Imagina una licuadora. Le metes frutas (parámetros), aprietas un botón (ejecutas), y te devuelve un jugo (retorno).\n\nLas funciones en programación son igual. Guardan un bloque de código y lo puedes usar todas las veces que quieras enviándole cosas diferentes.",
      codeExample: "// Creamos la máquina\nfunction sumarDoble(numero) {\n  return (numero * 2);\n}\n\n// Usamos la máquina\nlet resultado = sumarDoble(5);\nconsole.log(resultado); // Muestra 10",
      goal: "Aprender a crear y llamar funciones con parámetros."
    },
    challenge: {
      question: "¿Cual es la palabra clave para que una función \"escupa\" o devuelva un resultado al exterior?",
      options: [
        { id: "a", text: "output", isCorrect: false, feedback: "Esa palabra no es nativa de JavaScript para esto." },
        { id: "b", text: "giveBack", isCorrect: false, feedback: "No, usamos otra palabra en inglés." },
        { id: "c", text: "return", isCorrect: true, feedback: "¡Genial! 'return' es lo que expulsa el resultado final de la función hacia donde fue llamada." }
      ]
    }
  },
  {
    id: "module-5",
    title: "Las Cajas (Arrays)",
    description: "Guarda muchos elementos en un solo lugar.",
    xp: 200,
    lesson: {
      title: "Arrays: Listas Ordenadas",
      content: "¿Y si tienes 100 amigos? ¿Crearías 100 variables? ¡No! Los agrupas en una sola lista o **Array**.\n\nLos Arrays siempre usan corchetes `[]` e internamente cada elemento tiene un número de posición que empieza en CERO.",
      codeExample: "let videojuegos = [\"Zelda\", \"Mario\", \"Minecraft\"];\n\n// Para ver el primero, usamos la posición 0\nconsole.log(videojuegos[0]); // \"Zelda\"\n\n// Para ver cuántos hay en total\nconsole.log(videojuegos.length); // 3",
      goal: "Entender el uso de listas e índices 0-based."
    },
    challenge: {
      question: "Si `colores = [\"Rojo\", \"Azul\", \"Verde\"]`, ¿cómo obtengo la palabra \"Verde\"?",
      options: [
        { id: "a", text: "colores[3]", isCorrect: false, feedback: "¡Cuidado! Empezamos a contar desde cero. Rojo es 0, Azul es 1..." },
        { id: "b", text: "colores[2]", isCorrect: true, feedback: "¡Maravilloso! 0 es Rojo, 1 es Azul y 2 es Verde." },
        { id: "c", text: "colores.last()", isCorrect: false, feedback: "Aunque algunos lenguajes tienen esto, en JS clásico usamos índices." }
      ]
    }
  }
];

export default modules;