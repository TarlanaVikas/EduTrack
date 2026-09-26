import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingElementsProps {
  className?: string;
  variant?: 'books' | 'charts' | 'students';
}

export function FloatingElements({ className, variant = 'books' }: FloatingElementsProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Floating circles */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 blur-xl"
      />
      
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          x: [0, -15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-accent/15 to-accent/5 blur-xl"
      />
      
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-success/10 to-success/5 blur-lg"
      />

      {variant === 'books' && (
        <>
          {/* Floating book icons */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[15%] opacity-30"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              rotate: [5, -5, 5]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-32 right-[20%] opacity-25"
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </motion.div>
        </>
      )}

      {variant === 'charts' && (
        <>
          <motion.div
            animate={{ 
              y: [0, -12, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 right-[25%] opacity-25"
          >
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-success">
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 8, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-24 left-[18%] opacity-20"
          >
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warning">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
          </motion.div>
        </>
      )}

      {variant === 'students' && (
        <>
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-24 left-[10%] opacity-25"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 12, 0],
              x: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-28 right-[15%] opacity-20"
          >
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warning">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </motion.div>
        </>
      )}

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
