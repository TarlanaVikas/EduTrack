import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StressedStudentProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function StressedStudent({ className, intensity = 'medium' }: StressedStudentProps) {
  const shakeIntensity = intensity === 'high' ? 3 : intensity === 'medium' ? 2 : 1;
  const animationSpeed = intensity === 'high' ? 0.3 : intensity === 'medium' ? 0.5 : 0.7;

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
          x: [-shakeIntensity, shakeIntensity, -shakeIntensity],
        }}
        transition={{ 
          duration: animationSpeed, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0"
      >
        {/* Head */}
        <motion.div
          animate={{ 
            rotate: [-3, 3, -3],
          }}
          transition={{ 
            duration: animationSpeed * 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2"
        >
          {/* Face circle */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-amber-200 to-amber-300 shadow-sm relative overflow-hidden">
            {/* Hair */}
            <div className="absolute -top-1 left-0 right-0 h-4 bg-gradient-to-b from-gray-800 to-gray-700 rounded-t-full" />
            
            {/* Worried eyebrows */}
            <motion.div
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="absolute top-4 left-1.5 w-2 h-0.5 bg-gray-700 rounded-full transform -rotate-12"
            />
            <motion.div
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
              className="absolute top-4 right-1.5 w-2 h-0.5 bg-gray-700 rounded-full transform rotate-12"
            />
            
            {/* Eyes */}
            <motion.div
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute top-5 left-2 w-1.5 h-1.5 rounded-full bg-gray-800"
            />
            <motion.div
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
              className="absolute top-5 right-2 w-1.5 h-1.5 rounded-full bg-gray-800"
            />
            
            {/* Worried mouth */}
            <motion.div
              animate={{ scaleX: [1, 0.9, 1] }}
              transition={{ duration: 0.4, repeat: Infinity }}
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-1 border-2 border-gray-700 border-t-0 rounded-b-full bg-transparent"
            />
          </div>
          
          {/* Sweat drops */}
          <motion.div
            animate={{ 
              y: [0, 8, 16],
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              ease: "easeIn" 
            }}
            className="absolute top-3 -right-1 w-1 h-2 rounded-full bg-blue-300"
          />
          <motion.div
            animate={{ 
              y: [0, 10, 20],
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 1.2, 
              repeat: Infinity, 
              ease: "easeIn",
              delay: 0.3
            }}
            className="absolute top-2 -left-1 w-1 h-1.5 rounded-full bg-blue-300"
          />
          
          {/* Stress lines */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute -top-2 left-1/2 -translate-x-1/2"
          >
            <div className="flex gap-0.5">
              <div className="w-0.5 h-2 bg-red-400 rounded-full" />
              <div className="w-0.5 h-3 bg-red-500 rounded-full" />
              <div className="w-0.5 h-2 bg-red-400 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Body */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-t-lg bg-gradient-to-b from-blue-500 to-blue-600" />
        
        {/* Arms holding head */}
        <motion.div
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: animationSpeed * 2, repeat: Infinity }}
          className="absolute top-8 left-0 w-2 h-5 rounded-full bg-amber-200 transform -rotate-45"
          style={{ transformOrigin: 'bottom center' }}
        />
        <motion.div
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: animationSpeed * 2, repeat: Infinity }}
          className="absolute top-8 right-0 w-2 h-5 rounded-full bg-amber-200 transform rotate-45"
          style={{ transformOrigin: 'bottom center' }}
        />
      </motion.div>
    </motion.div>
  );
}
