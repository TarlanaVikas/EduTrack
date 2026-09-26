import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CompletionPrediction } from '@/types/dashboard';

interface CompletionPieChartProps {
  predictions: CompletionPrediction[];
}

export function CompletionPieChart({ predictions }: CompletionPieChartProps) {
  const willComplete = predictions.filter(p => p.will_complete === 1).length;
  const willDrop = predictions.length - willComplete;

  const data = [
    { name: 'Will Complete', value: willComplete, color: 'hsl(174, 72%, 46%)' },
    { name: 'At Risk of Dropout', value: willDrop, color: 'hsl(0, 72%, 55%)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass-card p-6"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold font-display">Completion Predictions</h3>
        <p className="text-sm text-muted-foreground">
          AI-predicted course completion distribution
        </p>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  const percentage = ((data.value / predictions.length) * 100).toFixed(1);
                  return (
                    <div className="rounded-xl border bg-card p-3 shadow-lg">
                      <p className="font-semibold">{data.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {data.value} students ({percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-success/10 p-3 text-center">
          <p className="text-2xl font-bold text-success">{willComplete}</p>
          <p className="text-xs text-muted-foreground">On Track</p>
        </div>
        <div className="rounded-xl bg-destructive/10 p-3 text-center">
          <p className="text-2xl font-bold text-destructive">{willDrop}</p>
          <p className="text-xs text-muted-foreground">At Risk</p>
        </div>
      </div>
    </motion.div>
  );
}
