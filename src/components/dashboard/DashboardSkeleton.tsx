import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 card-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-12 w-12 rounded-xl" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 card-shadow">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-56" />
      </div>
      <div className="flex items-end justify-between gap-2 h-64">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${30 + Math.random() * 60}%` }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex-1"
          >
            <Skeleton className="h-full w-full rounded-t-md" />
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-6">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl border bg-card overflow-hidden card-shadow">
      <div className="border-b bg-muted/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="grid grid-cols-7 gap-4 px-2 py-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-4" />
            ))}
          </div>
          {/* Rows */}
          {[...Array(rows)].map((_, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: rowIndex * 0.05 }}
              className="grid grid-cols-7 gap-4 px-2 py-3 border-b last:border-0"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-16 rounded-full" />
                <Skeleton className="h-4 w-8" />
              </div>
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InsightsSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 card-shadow">
      <div className="mb-6 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-lg border p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-8 py-8">
      {/* Stats Grid */}
      <div className="container">
        <div className="mb-4 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <StatCardSkeleton />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress Chart */}
      <div className="container">
        <ChartSkeleton />
      </div>

      {/* Two Charts */}
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ChartSkeleton />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ChartSkeleton />
          </motion.div>
        </div>
      </div>

      {/* Table */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <TableSkeleton rows={5} />
        </motion.div>
      </div>

      {/* Insights */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <InsightsSkeleton />
        </motion.div>
      </div>
    </div>
  );
}
