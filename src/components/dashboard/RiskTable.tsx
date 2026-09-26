import { useState } from 'react';
import { motion } from 'framer-motion';
import { HighRiskStudent } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import { AlertTriangle, TrendingDown, Clock, Target, Eye } from 'lucide-react';
import { StudentDetailModal } from './StudentDetailModal';

interface RiskTableProps {
  students: HighRiskStudent[];
}

export function RiskTable({ students }: RiskTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<HighRiskStudent | null>(null);
  if (students.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <Target className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-lg font-semibold font-display">All Students On Track!</h3>
        <p className="mt-2 text-muted-foreground">
          No high-risk students detected. Great job maintaining student engagement!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card overflow-hidden"
    >
      <div className="border-b bg-gradient-to-r from-destructive/5 to-warning/5 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 animate-pulse-ring">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold font-display">At-Risk Students</h3>
            <p className="text-sm text-muted-foreground">
              {students.length} students need immediate intervention
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Avg Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Time/Chapter
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const riskLevel = student.risk_probability > 0.8 ? 'Critical' : student.risk_probability > 0.6 ? 'High' : 'Medium';
              const riskColor = student.risk_probability > 0.8 ? 'text-destructive bg-destructive/10' : 
                               student.risk_probability > 0.6 ? 'text-warning bg-warning/10' : 
                               'text-info bg-info/10';
              
              return (
                <motion.tr
                  key={student.student_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-muted/30 transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted font-medium text-sm">
                        {student.student_id.slice(-2)}
                      </div>
                      <span className="font-medium">{student.student_id}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {student.course_id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                      riskColor
                    )}>
                      <TrendingDown className="h-3 w-3" />
                      {riskLevel} ({(student.risk_probability * 100).toFixed(0)}%)
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all",
                            student.progress_percentage < 30 ? "bg-destructive" :
                            student.progress_percentage < 50 ? "bg-warning" : "bg-success"
                          )}
                          style={{ width: `${student.progress_percentage}%` }}
                        />
                      </div>
                      <span className="text-sm">{student.progress_percentage.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={cn(
                      "text-sm font-medium",
                      student.avg_score < 50 ? "text-destructive" :
                      student.avg_score < 65 ? "text-warning" : "text-success"
                    )}>
                      {student.avg_score.toFixed(1)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {student.avg_time_per_chapter.toFixed(0)} min
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <button 
                      onClick={() => setSelectedStudent(student)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Details
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <StudentDetailModal
        student={selectedStudent}
        open={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </motion.div>
  );
}
