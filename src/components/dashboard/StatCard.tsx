import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  delay?: number;
}

const variantStyles = {
  default: 'from-primary/10 to-primary/5 border-primary/20',
  success: 'from-success/10 to-success/5 border-success/20',
  warning: 'from-warning/10 to-warning/5 border-warning/20',
  danger: 'from-destructive/10 to-destructive/5 border-destructive/20',
  info: 'from-info/10 to-info/5 border-info/20',
};

const iconStyles = {
  default: 'bg-primary/15 text-primary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-destructive/15 text-destructive',
  info: 'bg-info/15 text-info',
};

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  variant = 'default',
  delay = 0 
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative overflow-hidden glass-card bg-gradient-to-br p-5",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold font-display tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div className={cn(
          "rounded-xl p-3",
          iconStyles[variant]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {/* Decorative gradient orb */}
      <div className={cn(
        "absolute -right-4 -bottom-4 h-24 w-24 rounded-full opacity-30 blur-2xl",
        variant === 'default' && "bg-primary",
        variant === 'success' && "bg-success",
        variant === 'warning' && "bg-warning",
        variant === 'danger' && "bg-destructive",
        variant === 'info' && "bg-info"
      )} />
    </motion.div>
  );
}
