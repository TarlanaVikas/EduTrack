import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart
} from 'recharts';
import { ProgressTrend } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface ProgressChartProps {
  data: ProgressTrend[];
  period: 'weekly' | 'monthly';
  onPeriodChange: (period: 'weekly' | 'monthly') => void;
}

export function ProgressChart({ data, period, onPeriodChange }: ProgressChartProps) {
  const [activeMetric, setActiveMetric] = useState<'all' | 'score' | 'completion'>('all');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold font-display">Student Progress Trends</h3>
          <p className="text-sm text-muted-foreground">Track performance metrics over time</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Period Toggle */}
          <div className="flex rounded-lg border bg-muted/50 p-1">
            <button
              onClick={() => onPeriodChange('weekly')}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                period === 'weekly' 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Weekly
            </button>
            <button
              onClick={() => onPeriodChange('monthly')}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                period === 'monthly' 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
          </div>
          
          {/* Metric Filter */}
          <div className="flex rounded-lg border bg-muted/50 p-1">
            <button
              onClick={() => setActiveMetric('all')}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                activeMetric === 'all' 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            <button
              onClick={() => setActiveMetric('score')}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                activeMetric === 'score' 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Score
            </button>
            <button
              onClick={() => setActiveMetric('completion')}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                activeMetric === 'completion' 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Completion
            </button>
          </div>
        </div>
      </div>
      
      <div className="h-[300px] sm:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(174, 72%, 46%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(174, 72%, 46%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis 
              dataKey="week" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
            />
            <Legend />
            
            {(activeMetric === 'all' || activeMetric === 'score') && (
              <>
                <Area
                  type="monotone"
                  dataKey="avgScore"
                  stroke="hsl(174, 72%, 46%)"
                  fill="url(#colorScore)"
                  strokeWidth={0}
                />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  name="Avg Score"
                  stroke="hsl(174, 72%, 46%)"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(174, 72%, 46%)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--card))', strokeWidth: 2 }}
                />
              </>
            )}
            
            {(activeMetric === 'all' || activeMetric === 'completion') && (
              <>
                <Area
                  type="monotone"
                  dataKey="completionRate"
                  stroke="hsl(38, 92%, 55%)"
                  fill="url(#colorCompletion)"
                  strokeWidth={0}
                />
                <Line
                  type="monotone"
                  dataKey="completionRate"
                  name="Completion Rate"
                  stroke="hsl(38, 92%, 55%)"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(38, 92%, 55%)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--card))', strokeWidth: 2 }}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      {/* Comparison Metrics */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <ComparisonMetric 
          label="Avg Score Change" 
          value="+8.5%" 
          isPositive={true}
          period={period}
        />
        <ComparisonMetric 
          label="Completion Change" 
          value="+12.3%" 
          isPositive={true}
          period={period}
        />
        <ComparisonMetric 
          label="Active Students" 
          value="+15" 
          isPositive={true}
          period={period}
        />
        <ComparisonMetric 
          label="At-Risk Change" 
          value="-7" 
          isPositive={true}
          period={period}
        />
      </div>
    </motion.div>
  );
}

function ComparisonMetric({ 
  label, 
  value, 
  isPositive, 
  period 
}: { 
  label: string; 
  value: string; 
  isPositive: boolean;
  period: string;
}) {
  return (
    <div className="rounded-xl bg-muted/50 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn(
        "text-lg font-semibold",
        isPositive ? "text-success" : "text-destructive"
      )}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground">vs prev {period === 'weekly' ? 'week' : 'month'}</p>
    </div>
  );
}
