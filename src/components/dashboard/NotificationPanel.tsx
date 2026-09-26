import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { Notification } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

const iconMap = {
  warning: AlertTriangle,
  danger: AlertCircle,
  info: Info,
  success: CheckCircle,
};

const colorMap = {
  warning: 'text-warning bg-warning/10 border-warning/20',
  danger: 'text-destructive bg-destructive/10 border-destructive/20',
  info: 'text-info bg-info/10 border-info/20',
  success: 'text-success bg-success/10 border-success/20',
};

const pulseColorMap = {
  warning: 'bg-warning',
  danger: 'bg-destructive',
  info: 'bg-info',
  success: 'bg-success',
};

export function NotificationPanel({ notifications, onMarkRead, onDismiss }: NotificationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Auto-show notification toast for new critical alerts
  const [showToast, setShowToast] = useState(false);
  const latestUnread = notifications.find(n => !n.read && n.type === 'danger');

  useEffect(() => {
    if (latestUnread && !showToast) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [latestUnread?.id]);

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative rounded-full bg-white/10 p-2.5 hover:bg-white/20 transition-colors"
        >
          <Bell className="h-5 w-5 text-white" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white"
            >
              {unreadCount}
            </motion.span>
          )}
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 h-5 w-5 animate-ping rounded-full bg-destructive opacity-75" />
          )}
        </motion.button>

        {/* Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute right-0 top-full z-50 mt-2 w-80 sm:w-96 overflow-hidden rounded-2xl border bg-card shadow-lg"
              >
                <div className="border-b bg-muted/30 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold font-display">Notifications</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {unreadCount} new
                    </span>
                  </div>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell className="mx-auto mb-2 h-8 w-8 opacity-50" />
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notification) => {
                      const Icon = iconMap[notification.type];
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={cn(
                            "relative border-b p-4 transition-colors hover:bg-muted/30",
                            !notification.read && "bg-muted/20"
                          )}
                          onClick={() => onMarkRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
                              colorMap[notification.type]
                            )}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="font-medium text-sm">{notification.title}</p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDismiss(notification.id);
                                  }}
                                  className="shrink-0 rounded-full p-1 hover:bg-muted"
                                >
                                  <X className="h-3 w-3 text-muted-foreground" />
                                </button>
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="mt-2 text-xs text-muted-foreground">
                                {formatTimeAgo(notification.timestamp)}
                              </p>
                            </div>
                          </div>
                          {!notification.read && (
                            <div className={cn(
                              "absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full",
                              pulseColorMap[notification.type]
                            )} />
                          )}
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && latestUnread && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-4 right-4 z-50 max-w-sm"
          >
            <div className={cn(
              "flex items-start gap-3 rounded-2xl border p-4 shadow-lg",
              colorMap[latestUnread.type],
              "bg-card"
            )}>
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full animate-pulse-ring",
                colorMap[latestUnread.type]
              )}>
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{latestUnread.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{latestUnread.message}</p>
                <div className="mt-3 flex gap-2">
                  <button 
                    onClick={() => {
                      onMarkRead(latestUnread.id);
                      setShowToast(false);
                    }}
                    className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => setShowToast(false)}
                    className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="shrink-0 rounded-full p-1 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
}
