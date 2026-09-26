export interface StudentRecord {
  student_id: string;
  course_id: string;
  chapter_id: number;
  time_spent_minutes: number;
  assessment_score: number;
  completed: number;
  total_chapters: number;
}

export interface CompletionPrediction {
  student_id: string;
  course_id: string;
  will_complete: number;
  completion_probability: number;
  progress_percentage: number;
  avg_score: number;
}

export interface HighRiskStudent {
  student_id: string;
  course_id: string;
  risk_probability: number;
  risk_level: 'high' | 'medium' | 'low';
  progress_percentage: number;
  avg_score: number;
  avg_time_per_chapter: number;
  risk_factors: string[];
}

export interface ChapterInsight {
  course_id: string;
  chapter_id: number;
  difficulty_score: number;
  difficulty_level: 'Easy' | 'Medium' | 'Hard';
  dropout_rate: number;
  avg_time_spent: number;
  avg_score: number;
}

export interface PredictionSummary {
  total_students: number;
  predicted_completions: number;
  completion_rate: string;
  high_risk_count: number;
  avg_completion_probability: string;
  hardest_chapter: ChapterInsight | null;
}

export interface PredictionResponse {
  completion_predictions: CompletionPrediction[];
  high_risk_students: HighRiskStudent[];
  chapter_insights: ChapterInsight[];
  summary: PredictionSummary;
}

export interface ProgressTrend {
  week: string;
  date: string;
  avgScore: number;
  completionRate: number;
  activeStudents: number;
  atRiskCount: number;
}

export interface Notification {
  id: string;
  type: 'warning' | 'danger' | 'info' | 'success';
  title: string;
  message: string;
  studentId?: string;
  timestamp: Date;
  read: boolean;
}
