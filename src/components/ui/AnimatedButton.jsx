import { motion } from 'framer-motion';

export default function AnimatedButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  type = 'button'
}) {
  const variants = {
    primary: 'bg-white text-black hover:bg-primary-500 font-black',
    secondary: 'bg-dark-800 text-white border border-white/10 hover:bg-dark-700 font-bold',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-black',
    ghost: 'bg-transparent text-zinc-500 hover:text-white font-medium'
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.96 }}
      className={`
        px-8 py-4 rounded-none uppercase tracking-tighter transition-all duration-200 
        flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
