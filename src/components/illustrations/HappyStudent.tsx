import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HappyStudentProps {
  className?: string;
}

export function HappyStudent({ className }: HappyStudentProps) {
  return (
    <motion.div 
      className={cn("relative w-16 h-20", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Character body */}
      <motion.div
        animate={{ 
          y: [0, -3, 0],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0"
      >
        {/* Head */}
        <motion.div
          animate={{ 
            rotate: [-2, 2, -2],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2"
        >
          {/* Face circle */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-amber-200 to-amber-300 shadow-sm relative overflow-hidden">
            {/* Hair */}
            <div className="absolute -top-1 left-0 right-0 h-4 bg-gradient-to-b from-amber-800 to-amber-700 rounded-t-full" />
            
            {/* Happy eyebrows */}
            <div className="absolute top-4 left-1.5 w-2 h-0.5 bg-gray-700 rounded-full" />
            <div className="absolute top-4 right-1.5 w-2 h-0.5 bg-gray-700 rounded-full" />
            
            {/* Eyes - happy curved */}
            <motion.div
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="absolute top-5 left-2 w-1.5 h-1.5 rounded-full bg-gray-800"
            />
            <motion.div
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 0.1 }}
              className="absolute top-5 right-2 w-1.5 h-1.5 rounded-full bg-gray-800"
            />
            
            {/* Happy smile */}
            <motion.div
              animate={{ scaleX: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-1.5 border-2 border-gray-700 border-t-0 rounded-b-full bg-transparent"
            />
            
            {/* Blush */}
            <div className="absolute bottom-2.5 left-0.5 w-2 h-1 rounded-full bg-pink-300/50" />
            <div className="absolute bottom-2.5 right-0.5 w-2 h-1 rounded-full bg-pink-300/50" />
          </div>
          
          {/* Sparkles around head */}
          <motion.div
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute -top-1 -right-1 w-2 h-2 text-yellow-400"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ 
              scale: [1, 0.8, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute top-0 -left-2 w-1.5 h-1.5 text-yellow-400 text-xs"
          >
            ⭐
          </motion.div>
        </motion.div>
        
        {/* Body - Green shirt for success */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-t-lg bg-gradient-to-b from-emerald-500 to-emerald-600" />
        
        {/* Arms raised in celebration */}
        <motion.div
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute top-8 -left-1 w-2 h-5 rounded-full bg-amber-200 transform -rotate-45"
          style={{ transformOrigin: 'bottom center' }}
        />
        <motion.div
          animate={{ rotate: [10, -10, 10] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute top-8 -right-1 w-2 h-5 rounded-full bg-amber-200 transform rotate-45"
          style={{ transformOrigin: 'bottom center' }}
        />
      </motion.div>
    </motion.div>
  );
}
