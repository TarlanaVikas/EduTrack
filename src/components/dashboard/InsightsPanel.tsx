import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  BookOpen, 
  Target,
  Sparkles 
} from 'lucide-react';
import { PredictionResponse } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface InsightsPanelProps {
  data: PredictionResponse;
}

export function InsightsPanel({ data }: InsightsPanelProps) {
  const insights = generateInsights(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card overflow-hidden"
    >
      <div className="border-b bg-gradient-to-r from-primary/5 via-accent/5 to-info/5 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold font-display">AI-Generated Insights</h3>
            <p className="text-sm text-muted-foreground">
              Actionable recommendations based on data analysis
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={cn(
                "flex gap-4 p-5 transition-colors hover:bg-muted/30",
                insight.priority === 'high' && "bg-destructive/5"
              )}
            >
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                insight.color
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold">{insight.title}</h4>
                  {insight.priority === 'high' && (
                    <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                      Priority
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
                {insight.action && (
                  <button className="mt-3 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors">
                    {insight.action}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="border-t bg-muted/20 px-6 py-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="text-center">
            <p className="text-2xl font-bold font-display text-primary">{data.summary.total_students}</p>
            <p className="text-xs text-muted-foreground">Students Analyzed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold font-display text-success">{data.summary.completion_rate}</p>
            <p className="text-xs text-muted-foreground">Predicted Completion</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold font-display text-destructive">{data.summary.high_risk_count}</p>
            <p className="text-xs text-muted-foreground">At-Risk Students</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold font-display text-info">{data.chapter_insights.length}</p>
            <p className="text-xs text-muted-foreground">Chapters Analyzed</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface Insight {
  icon: typeof Lightbulb;
  title: string;
  description: string;
  color: string;
  priority?: 'high' | 'medium' | 'low';
  action?: string;
}

function generateInsights(data: PredictionResponse): Insight[] {
  const insights: Insight[] = [];
  const completionRate = parseFloat(data.summary.completion_rate);

  // Completion rate insight
  if (completionRate < 40) {
    insights.push({
      icon: AlertTriangle,
      title: 'Low Completion Rate Detected',
      description: `Only ${data.summary.completion_rate} of students are predicted to complete their courses. Consider reviewing course difficulty, pacing, and student engagement strategies.`,
      color: 'bg-destructive/10 text-destructive',
      priority: 'high',
      action: 'Review Course Structure'
    });
  } else if (completionRate > 70) {
    insights.push({
      icon: TrendingUp,
      title: 'Strong Completion Rate',
      description: `${data.summary.completion_rate} of students are on track to complete. Continue current engagement strategies and focus on maintaining this momentum.`,
      color: 'bg-success/10 text-success'
    });
  } else {
    insights.push({
      icon: Target,
      title: 'Moderate Completion Rate',
      description: `${data.summary.completion_rate} completion rate indicates room for improvement. Target at-risk students with personalized interventions.`,
      color: 'bg-warning/10 text-warning',
      action: 'Target Interventions'
    });
  }

  // High-risk students insight
  if (data.high_risk_students.length > 0) {
    insights.push({
      icon: AlertTriangle,
      title: `${data.high_risk_students.length} Students Need Immediate Attention`,
      description: `These students show early signs of dropout risk. Recommend immediate outreach, tutoring support, or personalized learning paths to prevent dropout.`,
      color: 'bg-destructive/10 text-destructive',
      priority: 'high',
      action: 'Contact At-Risk Students'
    });
  }

  // Chapter difficulty insight
  if (data.chapter_insights.length > 0) {
    const hardest = data.chapter_insights[0];
    insights.push({
      icon: BookOpen,
      title: 'Most Challenging Chapter Identified',
      description: `${hardest.course_id} Chapter ${hardest.chapter_id} has the highest difficulty score (${hardest.difficulty_score.toFixed(1)}) with a ${hardest.dropout_rate.toFixed(1)}% dropout rate. Consider adding supplementary materials or breaking content into smaller sections.`,
      color: 'bg-warning/10 text-warning',
      action: 'Review Chapter Content'
    });
  }

  // General recommendations
  insights.push({
    icon: Lightbulb,
    title: 'Recommended Next Steps',
    description: `(1) Provide additional support for high-risk students through one-on-one tutoring. (2) Create supplementary materials for difficult chapters. (3) Implement weekly check-ins for students below 50% progress. (4) Consider gamification elements to boost engagement.`,
    color: 'bg-info/10 text-info'
  });

  return insights;
}
