import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBooksProps {
  className?: string;
}

export function AnimatedBooks({ className }: AnimatedBooksProps) {
  return (
    <motion.div 
      className={cn("relative w-20 h-20", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Book Stack */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {/* Bottom book - Red */}
        <motion.div
          initial={{ rotate: -5 }}
          animate={{ rotate: [-5, -3, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-4 rounded-sm bg-gradient-to-r from-red-500 to-red-600 shadow-md"
          style={{ transformOrigin: 'center bottom' }}
        />
        
        {/* Middle book - Blue */}
        <motion.div
          initial={{ rotate: 3 }}
          animate={{ rotate: [3, 5, 3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-4 rounded-sm bg-gradient-to-r from-blue-500 to-blue-600 shadow-md"
          style={{ transformOrigin: 'center bottom' }}
        />
        
        {/* Top book - Green */}
        <motion.div
          initial={{ rotate: -2 }}
          animate={{ rotate: [-2, 0, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-10 h-3 rounded-sm bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-md"
          style={{ transformOrigin: 'center bottom' }}
        />
        
        {/* Open book on top */}
        <motion.div
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          {/* Left page */}
          <div className="absolute -left-5 top-0 w-5 h-6 bg-white rounded-l-sm shadow-sm transform -skew-y-6 origin-right" />
          {/* Right page */}
          <div className="absolute left-0 top-0 w-5 h-6 bg-gray-50 rounded-r-sm shadow-sm transform skew-y-6 origin-left" />
          {/* Spine */}
          <div className="absolute left-0 top-0 w-0.5 h-6 bg-gray-300" />
        </motion.div>
        
        {/* Floating particles */}
        <motion.div
          animate={{ 
            y: [-20, -35, -20],
            x: [0, 5, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary/60"
        />
        <motion.div
          animate={{ 
            y: [-15, -30, -15],
            x: [0, -5, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -top-4 left-2 w-1 h-1 rounded-full bg-accent/60"
        />
      </motion.div>
    </motion.div>
  );
}
