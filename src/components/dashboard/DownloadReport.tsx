import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PredictionResponse } from '@/types/dashboard';

interface DownloadReportProps {
  data: PredictionResponse;
}

export function DownloadReport({ data }: DownloadReportProps) {
  const generateReport = () => {
    const reportContent = generateReportContent(data);
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `edutrack-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateCSVReport = () => {
    const csvContent = generateCSVContent(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `edutrack-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold font-display">Download Report</h3>
            <p className="text-sm text-muted-foreground">
              Export analysis results and insights
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={generateReport}
            variant="outline"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Full Report (.txt)
          </Button>
          <Button
            onClick={generateCSVReport}
            className="gap-2 gradient-primary text-primary-foreground hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Data Export (.csv)
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function generateReportContent(data: PredictionResponse): string {
  const lines: string[] = [];
  const divider = '═'.repeat(60);
  const subDivider = '─'.repeat(60);
  
  lines.push(divider);
  lines.push('                    EDUTRACK ANALYSIS REPORT');
  lines.push(`                    Generated: ${new Date().toLocaleString()}`);
  lines.push(divider);
  lines.push('');
  
  // Summary Section
  lines.push('📊 EXECUTIVE SUMMARY');
  lines.push(subDivider);
  lines.push(`Total Students Analyzed: ${data.summary.total_students}`);
  lines.push(`Predicted Completion Rate: ${data.summary.completion_rate}`);
  lines.push(`Students Predicted to Complete: ${data.summary.predicted_completions}`);
  lines.push(`High-Risk Students: ${data.summary.high_risk_count}`);
  lines.push(`Average Completion Probability: ${data.summary.avg_completion_probability}`);
  lines.push('');
  
  // High-Risk Students Section
  lines.push('⚠️ HIGH-RISK STUDENTS (Immediate Intervention Required)');
  lines.push(subDivider);
  
  if (data.high_risk_students.length === 0) {
    lines.push('No high-risk students identified.');
  } else {
    data.high_risk_students.forEach((student, index) => {
      lines.push(`${index + 1}. Student ID: ${student.student_id}`);
      lines.push(`   Course: ${student.course_id}`);
      lines.push(`   Risk Level: ${student.risk_level.toUpperCase()}`);
      lines.push(`   Risk Probability: ${(student.risk_probability * 100).toFixed(1)}%`);
      lines.push(`   Current Progress: ${student.progress_percentage}%`);
      lines.push(`   Average Score: ${student.avg_score.toFixed(1)}`);
      lines.push(`   Time per Chapter: ${student.avg_time_per_chapter.toFixed(1)} hours`);
      lines.push(`   Risk Factors: ${student.risk_factors.join(', ')}`);
      lines.push('');
    });
  }
  
  // Key Factors Affecting Completion
  lines.push('🔑 KEY FACTORS AFFECTING COMPLETION');
  lines.push(subDivider);
  
  const allRiskFactors = data.high_risk_students.flatMap(s => s.risk_factors);
  const factorCounts: Record<string, number> = {};
  allRiskFactors.forEach(factor => {
    factorCounts[factor] = (factorCounts[factor] || 0) + 1;
  });
  
  const sortedFactors = Object.entries(factorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  if (sortedFactors.length === 0) {
    lines.push('No significant risk factors identified.');
  } else {
    sortedFactors.forEach(([factor, count], index) => {
      lines.push(`${index + 1}. ${factor} (affects ${count} student${count > 1 ? 's' : ''})`);
    });
  }
  lines.push('');
  
  // Chapter Difficulty Analysis
  lines.push('📚 CHAPTER DIFFICULTY ANALYSIS');
  lines.push(subDivider);
  
  const sortedChapters = [...data.chapter_insights].sort((a, b) => b.difficulty_score - a.difficulty_score);
  
  lines.push('Chapters Needing Improvement (sorted by difficulty):');
  lines.push('');
  
  sortedChapters.forEach((chapter, index) => {
    lines.push(`${index + 1}. ${chapter.course_id} - Chapter ${chapter.chapter_id}`);
    lines.push(`   Difficulty Level: ${chapter.difficulty_level}`);
    lines.push(`   Difficulty Score: ${chapter.difficulty_score.toFixed(1)}/100`);
    lines.push(`   Dropout Rate: ${chapter.dropout_rate.toFixed(1)}%`);
    lines.push(`   Average Time Spent: ${chapter.avg_time_spent.toFixed(1)} hours`);
    lines.push(`   Average Assessment Score: ${chapter.avg_score.toFixed(1)}/100`);
    lines.push('');
  });
  
  // Recommendations
  lines.push('💡 RECOMMENDATIONS');
  lines.push(subDivider);
  lines.push('1. Immediate outreach to high-risk students with personalized support plans');
  lines.push('2. Review and simplify content for high-difficulty chapters');
  lines.push('3. Add supplementary materials (videos, practice exercises) for struggling areas');
  lines.push('4. Implement weekly check-ins for students below 50% progress');
  lines.push('5. Consider peer tutoring programs matching high and low performers');
  lines.push('6. Analyze time-spent patterns to identify engagement issues');
  lines.push('');
  
  lines.push(divider);
  lines.push('                    END OF REPORT');
  lines.push(divider);
  
  return lines.join('\n');
}

function generateCSVContent(data: PredictionResponse): string {
  const lines: string[] = [];
  
  // High-Risk Students CSV
  lines.push('=== HIGH-RISK STUDENTS ===');
  lines.push('Student ID,Course ID,Risk Level,Risk Probability,Progress,Avg Score,Time per Chapter,Risk Factors');
  
  data.high_risk_students.forEach(student => {
    lines.push([
      student.student_id,
      student.course_id,
      student.risk_level,
      (student.risk_probability * 100).toFixed(1) + '%',
      student.progress_percentage + '%',
      student.avg_score.toFixed(1),
      student.avg_time_per_chapter.toFixed(1),
      `"${student.risk_factors.join('; ')}"`
    ].join(','));
  });
  
  lines.push('');
  lines.push('=== CHAPTER DIFFICULTY ANALYSIS ===');
  lines.push('Course ID,Chapter ID,Difficulty Level,Difficulty Score,Dropout Rate,Avg Time Spent,Avg Score');
  
  data.chapter_insights.forEach(chapter => {
    lines.push([
      chapter.course_id,
      chapter.chapter_id,
      chapter.difficulty_level,
      chapter.difficulty_score.toFixed(1),
      chapter.dropout_rate.toFixed(1) + '%',
      chapter.avg_time_spent.toFixed(1),
      chapter.avg_score.toFixed(1)
    ].join(','));
  });
  
  lines.push('');
  lines.push('=== SUMMARY ===');
  lines.push('Metric,Value');
  lines.push(`Total Students,${data.summary.total_students}`);
  lines.push(`Completion Rate,${data.summary.completion_rate}`);
  lines.push(`Predicted Completions,${data.summary.predicted_completions}`);
  lines.push(`High-Risk Count,${data.summary.high_risk_count}`);
  lines.push(`Avg Completion Probability,${data.summary.avg_completion_probability}`);
  
  return lines.join('\n');
}