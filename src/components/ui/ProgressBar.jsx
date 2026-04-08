import { motion } from 'framer-motion';

export default function ProgressBar({ progress, className = "" }) {
  return (
    <div className={`w-full bg-zinc-900 overflow-hidden ${className}`}>
      <motion.div 
        className="bg-primary-500 h-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
