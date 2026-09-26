import { motion } from 'framer-motion';
import { BarChart3, Brain, LayoutDashboard, Menu, Users, X, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { NotificationPanel } from './NotificationPanel';
import { Notification } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onDismissNotification: (id: string) => void;
  apiStatus: 'checking' | 'online' | 'offline';
}

export function DashboardHeader({ 
  notifications, 
  onMarkRead, 
  onDismissNotification,
  apiStatus 
}: DashboardHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      className="dashboard-rail"
    >
      <div className="rail-brand-row">
        <div className="rail-mark"><Brain size={21} /></div>
        <div className="rail-brand">
          <strong>EduTrack</strong>
          <span>LEARNING INTELLIGENCE</span>
        </div>
        <button
          aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rail-menu-toggle"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <span className="rail-section-label">Workspace</span>
      <nav className={cn('rail-nav', isMobileMenuOpen && 'is-open')}>
        <a href="#overview" className="active"><LayoutDashboard />Overview</a>
        <a href="#analytics"><BarChart3 />Analytics</a>
        <a href="#students"><Users />At-risk learners</a>
        <a href="#insights"><Lightbulb />Insights</a>
      </nav>

      <div className="rail-bottom">
        <div className="rail-api-status">
          <span className="status-orb" style={{ background: apiStatus === 'online' ? 'hsl(var(--success))' : apiStatus === 'offline' ? 'hsl(var(--destructive))' : undefined }} />
          {apiStatus === 'online' ? 'API CONNECTED' : apiStatus === 'offline' ? 'API OFFLINE' : 'CHECKING API'}
        </div>
        <div className="rail-notification">
          <NotificationPanel
            notifications={notifications}
            onMarkRead={onMarkRead}
            onDismiss={onDismissNotification}
          />
          <span>Notifications</span>
        </div>
      </div>
    </motion.aside>
  );
}
