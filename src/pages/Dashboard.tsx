import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  BarChart3
} from 'lucide-react';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { FileUpload } from '@/components/dashboard/FileUpload';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { CompletionPieChart } from '@/components/dashboard/CompletionPieChart';
import { RiskTable } from '@/components/dashboard/RiskTable';
import { ChapterDifficultyChart } from '@/components/dashboard/ChapterDifficultyChart';
import { InsightsPanel } from '@/components/dashboard/InsightsPanel';
import { DownloadReport } from '@/components/dashboard/DownloadReport';
import { DashboardLoadingSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { 
  generateMockPredictions, 
  generateProgressTrends, 
  generateNotifications 
} from '@/lib/mockData';
import { PredictionResponse, ProgressTrend, Notification } from '@/types/dashboard';

const API_BASE_URL = 'http://localhost:8000';

export default function Dashboard() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<PredictionResponse | null>(null);
  const [progressTrends, setProgressTrends] = useState<ProgressTrend[]>([]);
  const [trendPeriod, setTrendPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Check API status on mount
  useEffect(() => {
    checkAPIStatus();
  }, []);

  // Generate progress trends when period changes
  useEffect(() => {
    setProgressTrends(generateProgressTrends(trendPeriod));
  }, [trendPeriod]);

  const checkAPIStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, { 
        signal: AbortSignal.timeout(3000) 
      });
      setApiStatus(response.ok ? 'online' : 'offline');
    } catch {
      setApiStatus('offline');
    }
  };

  const handleFileSelect = useCallback((file: File | null) => {
    setSelectedFile(file);
    if (!file) {
      setShowResults(false);
      setPredictionData(null);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    
    try {
      if (apiStatus === 'online') {
        // Try real API
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        const response = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          const data = await response.json();
          setPredictionData(data);
          setNotifications(generateNotifications(data.high_risk_students));
          setShowResults(true);
          setIsLoading(false);
          return;
        }
      }
      
      // Fallback to mock data
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading
      const mockData = generateMockPredictions();
      setPredictionData(mockData);
      setNotifications(generateNotifications(mockData.high_risk_students));
      setShowResults(true);
      
    } catch (error) {
      console.error('Analysis error:', error);
      // Use mock data on error
      const mockData = generateMockPredictions();
      setPredictionData(mockData);
      setNotifications(generateNotifications(mockData.high_risk_students));
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkNotificationRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const handleDismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Section animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="app-shell">
      <DashboardHeader 
        notifications={notifications}
        onMarkRead={handleMarkNotificationRead}
        onDismissNotification={handleDismissNotification}
        apiStatus={apiStatus}
      />

      <div className="dashboard-main">
      <main className="dashboard-content">
        <section className="workspace-intro" id="overview">
          <div className="workspace-heading">
            <div>
              <span className="eyebrow">COHORT ANALYSIS / WORKSPACE 01</span>
              <h1>Make every learner<br /><span>visible.</span></h1>
              <p>Read the patterns behind student progress, spot risk early, and give every intervention a clearer starting point.</p>
            </div>
            <div className="model-status">
              <span className="micro-label">Ingestion API</span>
              <div className="model-status-value">
                <span
                  className="status-orb"
                  style={{ background: apiStatus === 'online' ? 'hsl(var(--success))' : apiStatus === 'offline' ? 'hsl(var(--destructive))' : undefined }}
                />
                {apiStatus === 'online' ? 'Connected' : apiStatus === 'offline' ? 'Offline mode' : 'Connecting'}
              </div>
            </div>
          </div>

          <div className="intake-grid">
            <FileUpload
              onFileSelect={handleFileSelect}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              selectedFile={selectedFile}
            />
            <aside className="signal-brief">
              <span className="micro-label">EduTrack signal map / 01</span>
              <h2>From raw activity<br />to clear action.</h2>
              <p>One cohort file becomes a practical view of learner momentum and intervention needs.</p>
              <ul className="signal-list">
                <li><span>01 / Outcome</span><span>Completion</span></li>
                <li><span>02 / Momentum</span><span>Progress</span></li>
                <li><span>03 / Intervention</span><span>Risk</span></li>
              </ul>
            </aside>
          </div>
        </section>

        {/* Loading Skeleton */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DashboardLoadingSkeleton />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && predictionData && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Summary Stats Section */}
              <section className="console-section" id="summary">
                <div className="container relative z-10">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="mb-4 flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-2 rounded-xl bg-primary/10"
                    >
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-semibold font-display">Analysis Overview</h2>
                      <p className="text-sm text-muted-foreground">Key metrics from your data</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                  >
                    <motion.div variants={sectionVariants}>
                      <StatCard
                        title="Total Students"
                        value={predictionData.summary.total_students}
                        subtitle="Analyzed from uploaded data"
                        icon={Users}
                        variant="default"
                        delay={0}
                      />
                    </motion.div>
                    <motion.div variants={sectionVariants}>
                      <StatCard
                        title="Completion Rate"
                        value={predictionData.summary.completion_rate}
                        subtitle={`${predictionData.summary.predicted_completions} predicted to complete`}
                        icon={TrendingUp}
                        trend={{ value: 8.5, isPositive: true }}
                        variant="success"
                        delay={0.1}
                      />
                    </motion.div>
                    <motion.div variants={sectionVariants}>
                      <StatCard
                        title="High-Risk Students"
                        value={predictionData.summary.high_risk_count}
                        subtitle="Need immediate intervention"
                        icon={AlertTriangle}
                        trend={{ value: 12, isPositive: true }}
                        variant="danger"
                        delay={0.2}
                      />
                    </motion.div>
                    <motion.div variants={sectionVariants}>
                      <StatCard
                        title="Avg Completion Prob"
                        value={predictionData.summary.avg_completion_probability}
                        subtitle="Across all students"
                        icon={Target}
                        variant="info"
                        delay={0.3}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              {/* Progress Trends Section */}
              <section className="console-section" id="analytics">
                <div className="container relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProgressChart
                      data={progressTrends}
                      period={trendPeriod}
                      onPeriodChange={setTrendPeriod}
                    />
                  </motion.div>
                </div>
              </section>

              {/* Charts Section */}
              <section className="console-section">
                <div className="container relative z-10">
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid gap-6 lg:grid-cols-2"
                  >
                    <motion.div variants={sectionVariants}>
                      <CompletionPieChart predictions={predictionData.completion_predictions} />
                    </motion.div>
                    <motion.div variants={sectionVariants}>
                      <ChapterDifficultyChart data={predictionData.chapter_insights} />
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              {/* Risk Students Section */}
              <section className="console-section" id="students">
                <div className="container relative z-10">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-6 flex items-center gap-4"
                  >
                    <div>
                      <h2 className="text-xl font-semibold font-display">Students Requiring Attention</h2>
                      <p className="text-sm text-muted-foreground">
                        Early intervention can prevent dropout
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <RiskTable students={predictionData.high_risk_students} />
                  </motion.div>
                </div>
              </section>

              {/* Insights Section */}
              <section className="console-section" id="insights">
                <div className="container relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <InsightsPanel data={predictionData} />
                  </motion.div>
                </div>
              </section>

              {/* Download Section */}
              <section className="console-section">
                <div className="container relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <DownloadReport data={predictionData} />
                  </motion.div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!showResults && !isLoading && (
          <section className="empty-state-strip" aria-label="Analysis preview">
            <div>
              <span className="micro-label">Awaiting first cohort</span>
              <h2>Your learning signals will land here.</h2>
              <p>Upload a cohort to reveal completion, momentum, and learner risk patterns.</p>
            </div>
            <div className="metric-keys" aria-label="Analysis dimensions">
              <span>COMPLETION</span>
              <span>CHAPTER FRICTION</span>
              <span>LEARNER RISK</span>
            </div>
          </section>
        )}
      </main>

      <footer className="dashboard-footer">© 2026 EduTrack / Learning intelligence</footer>
      </div>
    </div>
  );
}
