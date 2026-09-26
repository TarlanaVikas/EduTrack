import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  AlertTriangle, 
  TrendingDown, 
  Clock, 
  Target, 
  BookOpen,
  Mail,
  Phone,
  Calendar,
  BarChart3,
  Lightbulb,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { HighRiskStudent } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface StudentDetailModalProps {
  student: HighRiskStudent | null;
  open: boolean;
  onClose: () => void;
}

export function StudentDetailModal({ student, open, onClose }: StudentDetailModalProps) {
  if (!student) return null;

  const riskLevel = student.risk_probability > 0.8 ? 'Critical' : student.risk_probability > 0.6 ? 'High' : 'Medium';
  const riskColor = student.risk_probability > 0.8 ? 'destructive' : 
                   student.risk_probability > 0.6 ? 'warning' : 'info';

  const recommendations = [
    { 
      title: 'Schedule One-on-One Session', 
      description: 'Personal attention can significantly improve engagement',
      icon: Calendar,
      priority: 'high'
    },
    { 
      title: 'Provide Additional Resources', 
      description: 'Share supplementary materials for difficult chapters',
      icon: BookOpen,
      priority: 'medium'
    },
    { 
      title: 'Assign Peer Mentor', 
      description: 'Connect with a high-performing student for support',
      icon: Target,
      priority: 'medium'
    },
    { 
      title: 'Simplify Current Chapter', 
      description: 'Break down complex topics into smaller segments',
      icon: Lightbulb,
      priority: 'low'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header with gradient */}
        <div className={cn(
          "relative p-6 border-b",
          riskColor === 'destructive' && "bg-gradient-to-r from-destructive/10 to-destructive/5",
          riskColor === 'warning' && "bg-gradient-to-r from-warning/10 to-warning/5",
          riskColor === 'info' && "bg-gradient-to-r from-info/10 to-info/5"
        )}>
          <DialogHeader>
            <div className="flex items-start gap-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-xl font-bold"
              >
                {student.student_id.slice(-2)}
              </motion.div>
              <div className="flex-1">
                <DialogTitle className="text-xl font-display">{student.student_id}</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">{student.course_id}</p>
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mt-2",
                    `text-${riskColor} bg-${riskColor}/10`
                  )}
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {riskLevel} Risk ({(student.risk_probability * 100).toFixed(0)}%)
                </motion.span>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Performance Metrics
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border bg-card p-4 text-center">
                <div className="text-2xl font-bold text-foreground">
                  {student.progress_percentage.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">Progress</div>
                <Progress 
                  value={student.progress_percentage} 
                  className="h-1.5 mt-2"
                />
              </div>
              <div className="rounded-xl border bg-card p-4 text-center">
                <div className={cn(
                  "text-2xl font-bold",
                  student.avg_score < 50 ? "text-destructive" :
                  student.avg_score < 65 ? "text-warning" : "text-success"
                )}>
                  {student.avg_score.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Avg Score</div>
                <div className="flex justify-center gap-0.5 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={cn(
                        "h-1.5 w-4 rounded-full",
                        student.avg_score >= star * 20 ? "bg-warning" : "bg-muted"
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-xl border bg-card p-4 text-center">
                <div className="text-2xl font-bold text-foreground flex items-center justify-center gap-1">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  {student.avg_time_per_chapter.toFixed(0)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Min/Chapter</div>
              </div>
            </div>
          </motion.div>

          {/* Risk Factors */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              Risk Factors
            </h4>
            <div className="space-y-2">
              {student.risk_factors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10"
                >
                  <XCircle className="h-4 w-4 text-destructive shrink-0" />
                  <span className="text-sm">{factor}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Recommended Actions
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "p-4 rounded-xl border cursor-pointer transition-colors",
                    rec.priority === 'high' && "bg-primary/5 border-primary/20 hover:bg-primary/10",
                    rec.priority === 'medium' && "bg-warning/5 border-warning/20 hover:bg-warning/10",
                    rec.priority === 'low' && "bg-muted/50 border-border hover:bg-muted"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      rec.priority === 'high' && "bg-primary/10 text-primary",
                      rec.priority === 'medium' && "bg-warning/10 text-warning",
                      rec.priority === 'low' && "bg-muted text-muted-foreground"
                    )}>
                      <rec.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="font-medium text-sm">{rec.title}</h5>
                      <p className="text-xs text-muted-foreground mt-0.5">{rec.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 pt-4 border-t"
          >
            <Button className="flex-1 sm:flex-none gap-2">
              <Mail className="h-4 w-4" />
              Send Email
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none gap-2">
              <Phone className="h-4 w-4" />
              Schedule Call
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none gap-2">
              <Calendar className="h-4 w-4" />
              Set Reminder
            </Button>
            <Button 
              variant="ghost" 
              className="flex-1 sm:flex-none gap-2 text-success hover:text-success hover:bg-success/10"
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark Resolved
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
