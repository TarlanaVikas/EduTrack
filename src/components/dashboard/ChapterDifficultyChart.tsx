import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ChapterInsight } from '@/types/dashboard';
import { BookOpen, AlertTriangle, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChapterDifficultyChartProps {
  data: ChapterInsight[];
}

export function ChapterDifficultyChart({ data }: ChapterDifficultyChartProps) {
  const getBarColor = (score: number) => {
    if (score > 66) return 'hsl(0, 75%, 55%)';
    if (score > 33) return 'hsl(35, 90%, 55%)';
    return 'hsl(155, 70%, 40%)';
  };

  const chartData = data.map(chapter => ({
    name: `${chapter.course_id} Ch${chapter.chapter_id}`,
    score: chapter.difficulty_score,
    dropoutRate: chapter.dropout_rate,
    avgScore: chapter.avg_score,
    level: chapter.difficulty_level
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold font-display flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Chapter Difficulty Analysis
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Identify problematic chapters based on dropout rates and scores
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <div className="h-3 w-3 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Hard</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <div className="h-3 w-3 rounded-full bg-warning" />
            <span className="text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <div className="h-3 w-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Easy</span>
          </div>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-xl border bg-card p-3 shadow-lg">
                      <p className="font-semibold">{data.name}</p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Difficulty:</span>
                          <span className="font-medium">{data.score.toFixed(1)}</span>
                        </p>
                        <p className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Dropout Rate:</span>
                          <span className="font-medium text-destructive">{data.dropoutRate.toFixed(1)}%</span>
                        </p>
                        <p className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Avg Score:</span>
                          <span className="font-medium">{data.avgScore.toFixed(1)}</span>
                        </p>
                        <p className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Level:</span>
                          <span className={cn(
                            "font-medium",
                            data.level === 'Hard' && "text-destructive",
                            data.level === 'Medium' && "text-warning",
                            data.level === 'Easy' && "text-success"
                          )}>{data.level}</span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="score" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Problematic Chapters */}
      <div className="mt-6 space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Top Problematic Chapters
        </h4>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {data.slice(0, 3).map((chapter, index) => (
            <motion.div
              key={`${chapter.course_id}-${chapter.chapter_id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={cn(
                "rounded-xl border p-3",
                chapter.difficulty_level === 'Hard' && "border-destructive/30 bg-destructive/5",
                chapter.difficulty_level === 'Medium' && "border-warning/30 bg-warning/5"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{chapter.course_id} - Chapter {chapter.chapter_id}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingDown className="h-3 w-3 text-destructive" />
                    <span>{chapter.dropout_rate.toFixed(1)}% dropout</span>
                  </div>
                </div>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-semibold",
                  chapter.difficulty_level === 'Hard' && "bg-destructive/10 text-destructive",
                  chapter.difficulty_level === 'Medium' && "bg-warning/10 text-warning"
                )}>
                  {chapter.difficulty_level}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
