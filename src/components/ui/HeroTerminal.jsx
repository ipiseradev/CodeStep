const codeLines = useMemo(
  () => [
    { type: 'log', text: '> [0x001] Cargando sesión...' },
    { type: 'log', text: '> [0x002] STATUS: ACCESO CONCEDIDO' },
    { type: 'log', text: '> [0x003] INICIALIZANDO ENTORNO DEV' },
    { type: 'spacer' },
    {
      type: 'code',
      parts: [
        { text: 'const ', color: 'text-primary-500' },
        { text: 'engine = ', color: 'text-zinc-100' },
        { text: 'new ', color: 'text-primary-500' },
        { text: 'CodeStep(', color: 'text-zinc-400' },
        { text: '{', color: 'text-zinc-500' },
      ],
    },
    {
      type: 'code',
      parts: [
        { text: '  mode: ', color: 'text-zinc-400' },
        { text: '"ultra_performance"', color: 'text-cyan-400' },
        { text: ',', color: 'text-zinc-500' },
      ],
    },
    {
      type: 'code',
      parts: [
        { text: '  user: ', color: 'text-zinc-400' },
        { text: '"Ignacio"', color: 'text-cyan-400' },
        { text: ',', color: 'text-zinc-500' },
      ],
    },
    {
      type: 'code',
      parts: [
        { text: '  level: ', color: 'text-zinc-400' },
        { text: 'level_04', color: 'text-primary-500' },
        { text: ',', color: 'text-zinc-500' },
      ],
    },
    {
      type: 'code',
      parts: [
        { text: '  track: ', color: 'text-zinc-400' },
        { text: '"frontend_dev"', color: 'text-cyan-400' },
        { text: ',', color: 'text-zinc-500' },
      ],
    },
    {
      type: 'code',
      parts: [{ text: '});', color: 'text-zinc-400' }],
    },
    { type: 'spacer' },
    {
      type: 'code',
      parts: [
        { text: 'async function', color: 'text-primary-500' },
        { text: ' deploy', color: 'text-white' },
        { text: '(logic) ', color: 'text-zinc-100' },
        { text: '{', color: 'text-zinc-500' },
      ],
    },
    {
      type: 'code',
      parts: [
        { text: '  await ', color: 'text-primary-500' },
        { text: 'logic.verify()', color: 'text-zinc-100' },
        { text: ';', color: 'text-zinc-500' },
      ],
    },
    {
      type: 'code',
      parts: [
        { text: '  return ', color: 'text-primary-500' },
        { text: '"MAX_SUCCESS"', color: 'text-cyan-400' },
        { text: ';', color: 'text-zinc-500' },
      ],
    },
    {
      type: 'code',
      parts: [{ text: '}', color: 'text-zinc-100' }],
    },
    { type: 'spacer' },
    { type: 'log', text: '> INTEGRITY_CHECK: 100% OPTIMIZED' },
    { type: 'log', text: '> SYSTEM_01: READY_FOR_DEPLOYMENT' },
  ],
  []
);