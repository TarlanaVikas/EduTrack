import { 
  PredictionResponse, 
  ProgressTrend, 
  Notification,
  StudentRecord,
  CompletionPrediction,
  HighRiskStudent,
  ChapterInsight
} from '@/types/dashboard';

// Generate realistic mock student data
export function generateMockStudentData(count: number = 500): StudentRecord[] {
  const data: StudentRecord[] = [];
  const courses = ['CRS01', 'CRS02', 'CRS03', 'CRS04', 'CRS05'];
  
  for (let i = 1; i <= count; i++) {
    const studentId = `STU${String(i).padStart(4, '0')}`;
    const courseId = courses[Math.floor(Math.random() * courses.length)];
    const totalChapters = Math.floor(Math.random() * 5) + 8; // 8-12 chapters
    const engagement = 0.3 + Math.random() * 0.7;
    const ability = 0.4 + Math.random() * 0.6;
    
    const chaptersCompleted = Math.floor(totalChapters * engagement * Math.random());
    
    for (let chapter = 1; chapter <= chaptersCompleted; chapter++) {
      const chapterDifficulty = 0.5 + (chapter / totalChapters) * 0.3;
      const baseTime = 20 + Math.random() * 160;
      const timeSpent = baseTime * engagement * (1 + chapterDifficulty);
      
      let score = ability * 100 + Math.min(20, timeSpent / 10) - chapterDifficulty * 20;
      score = Math.max(0, Math.min(100, score + (Math.random() - 0.5) * 20));
      
      data.push({
        student_id: studentId,
        course_id: courseId,
        chapter_id: chapter,
        time_spent_minutes: Math.round(timeSpent * 100) / 100,
        assessment_score: Math.round(score * 100) / 100,
        completed: chapter === chaptersCompleted ? 0 : 1,
        total_chapters: totalChapters
      });
    }
  }
  
  return data;
}

// Generate mock prediction response
export function generateMockPredictions(): PredictionResponse {
  const completionPredictions: CompletionPrediction[] = [];
  const highRiskStudents: HighRiskStudent[] = [];
  
  for (let i = 1; i <= 150; i++) {
    const studentId = `STU${String(i).padStart(4, '0')}`;
    const courseId = `CRS0${(i % 5) + 1}`;
    const willComplete = Math.random() > 0.35 ? 1 : 0;
    const completionProb = willComplete ? 0.6 + Math.random() * 0.4 : Math.random() * 0.5;
    const progress = 20 + Math.random() * 80;
    const avgScore = 40 + Math.random() * 55;
    
    completionPredictions.push({
      student_id: studentId,
      course_id: courseId,
      will_complete: willComplete,
      completion_probability: completionProb,
      progress_percentage: progress,
      avg_score: avgScore
    });
    
    // Add some as high-risk
    if (completionProb < 0.45 && progress < 50) {
      const riskFactors: string[] = [];
      if (progress < 30) riskFactors.push('Low progress');
      if (avgScore < 50) riskFactors.push('Low assessment scores');
      if (Math.random() > 0.5) riskFactors.push('Irregular activity');
      if (Math.random() > 0.6) riskFactors.push('Long gaps between sessions');
      if (Math.random() > 0.7) riskFactors.push('Missed deadlines');
      
      highRiskStudents.push({
        student_id: studentId,
        course_id: courseId,
        risk_probability: 0.6 + Math.random() * 0.35,
        risk_level: completionProb < 0.25 ? 'high' : completionProb < 0.35 ? 'medium' : 'low',
        progress_percentage: progress,
        avg_score: avgScore,
        avg_time_per_chapter: 20 + Math.random() * 60,
        risk_factors: riskFactors.length > 0 ? riskFactors : ['Declining engagement']
      });
    }
  }
  
  const chapterInsights: ChapterInsight[] = [
    { course_id: 'CRS01', chapter_id: 7, difficulty_score: 82.5, difficulty_level: 'Hard', dropout_rate: 28.3, avg_time_spent: 4.2, avg_score: 58.2 },
    { course_id: 'CRS02', chapter_id: 5, difficulty_score: 75.8, difficulty_level: 'Hard', dropout_rate: 22.1, avg_time_spent: 3.8, avg_score: 62.4 },
    { course_id: 'CRS03', chapter_id: 8, difficulty_score: 71.2, difficulty_level: 'Hard', dropout_rate: 19.8, avg_time_spent: 3.5, avg_score: 64.1 },
    { course_id: 'CRS01', chapter_id: 4, difficulty_score: 58.3, difficulty_level: 'Medium', dropout_rate: 12.5, avg_time_spent: 2.8, avg_score: 71.3 },
    { course_id: 'CRS04', chapter_id: 6, difficulty_score: 55.1, difficulty_level: 'Medium', dropout_rate: 10.2, avg_time_spent: 2.5, avg_score: 73.8 },
    { course_id: 'CRS02', chapter_id: 3, difficulty_score: 45.2, difficulty_level: 'Medium', dropout_rate: 8.1, avg_time_spent: 2.2, avg_score: 76.5 },
    { course_id: 'CRS05', chapter_id: 2, difficulty_score: 32.1, difficulty_level: 'Easy', dropout_rate: 5.2, avg_time_spent: 1.8, avg_score: 82.1 },
    { course_id: 'CRS03', chapter_id: 1, difficulty_score: 18.5, difficulty_level: 'Easy', dropout_rate: 2.8, avg_time_spent: 1.2, avg_score: 88.4 },
  ];
  
  const completedCount = completionPredictions.filter(p => p.will_complete === 1).length;
  const avgProb = completionPredictions.reduce((sum, p) => sum + p.completion_probability, 0) / completionPredictions.length;
  
  return {
    completion_predictions: completionPredictions,
    high_risk_students: highRiskStudents.slice(0, 25),
    chapter_insights: chapterInsights,
    summary: {
      total_students: completionPredictions.length,
      predicted_completions: completedCount,
      completion_rate: `${((completedCount / completionPredictions.length) * 100).toFixed(1)}%`,
      high_risk_count: highRiskStudents.length,
      avg_completion_probability: `${(avgProb * 100).toFixed(1)}%`,
      hardest_chapter: chapterInsights[0]
    }
  };
}

// Generate weekly/monthly progress trends
export function generateProgressTrends(period: 'weekly' | 'monthly'): ProgressTrend[] {
  const trends: ProgressTrend[] = [];
  const weeks = period === 'weekly' ? 12 : 6;
  const baseDate = new Date();
  
  for (let i = weeks - 1; i >= 0; i--) {
    const date = new Date(baseDate);
    if (period === 'weekly') {
      date.setDate(date.getDate() - i * 7);
    } else {
      date.setMonth(date.getMonth() - i);
    }
    
    // Simulate improving trends with some variance
    const weekProgress = (weeks - i) / weeks;
    const variance = (Math.random() - 0.5) * 10;
    
    trends.push({
      week: period === 'weekly' ? `Week ${weeks - i}` : date.toLocaleString('default', { month: 'short' }),
      date: date.toISOString().split('T')[0],
      avgScore: Math.min(95, 55 + weekProgress * 25 + variance),
      completionRate: Math.min(90, 45 + weekProgress * 30 + variance),
      activeStudents: Math.floor(100 + weekProgress * 50 + Math.random() * 20),
      atRiskCount: Math.max(5, Math.floor(35 - weekProgress * 20 + Math.random() * 8))
    });
  }
  
  return trends;
}

// Generate notifications for at-risk students
export function generateNotifications(highRiskStudents: HighRiskStudent[]): Notification[] {
  const notifications: Notification[] = [];
  const now = new Date();
  
  highRiskStudents.slice(0, 8).forEach((student, index) => {
    const type = student.risk_probability > 0.8 ? 'danger' : 'warning';
    const minutesAgo = index * 15 + Math.floor(Math.random() * 10);
    
    notifications.push({
      id: `notif-${student.student_id}-${index}`,
      type,
      title: type === 'danger' ? 'Critical Risk Alert' : 'At-Risk Warning',
      message: `${student.student_id} in ${student.course_id} has ${(student.risk_probability * 100).toFixed(0)}% dropout risk. Progress: ${student.progress_percentage.toFixed(1)}%, Avg Score: ${student.avg_score.toFixed(1)}`,
      studentId: student.student_id,
      timestamp: new Date(now.getTime() - minutesAgo * 60000),
      read: index > 3
    });
  });
  
  // Add some info notifications
  notifications.push({
    id: 'notif-weekly-report',
    type: 'info',
    title: 'Weekly Report Ready',
    message: 'Your weekly student performance report is now available for review.',
    timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    read: true
  });
  
  notifications.push({
    id: 'notif-chapter-update',
    type: 'success',
    title: 'Chapter Analysis Complete',
    message: 'Difficulty analysis for CRS01 chapters has been updated with latest data.',
    timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
    read: true
  });
  
  return notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}
