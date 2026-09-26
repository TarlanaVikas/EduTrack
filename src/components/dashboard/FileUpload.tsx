import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileSpreadsheet, X, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  selectedFile: File | null;
}

export function FileUpload({ onFileSelect, onAnalyze, isLoading, selectedFile }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border bg-card p-6 card-shadow"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold font-display">Upload Student Data</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a CSV file with student learning data for AI analysis
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-xl border-2 border-dashed p-8 text-center transition-all cursor-pointer",
          isDragging 
            ? "border-primary bg-primary/5 scale-[1.02]" 
            : "border-border hover:border-primary/50 hover:bg-muted/30",
          selectedFile && "border-success bg-success/5"
        )}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-success" />
                <span className="font-medium">{selectedFile.name}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(2)} KB • Ready for analysis
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect(null);
                }}
                className="mt-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
                Remove file
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
              >
                <Upload className="h-8 w-8 text-primary" />
              </motion.div>
              <p className="font-medium">
                <span className="text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                CSV file with student data (max 10MB)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAnalyze}
        disabled={!selectedFile || isLoading}
        className={cn(
          "mt-4 w-full rounded-xl px-6 py-3 font-semibold text-primary-foreground transition-all flex items-center justify-center gap-2",
          selectedFile && !isLoading
            ? "gradient-primary hover:opacity-90 shadow-lg shadow-primary/25"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing with AI...
          </>
        ) : (
          <>
            <FileSpreadsheet className="h-5 w-5" />
            Analyze with AI
          </>
        )}
      </motion.button>

      {/* Expected format hint */}
      <div className="mt-4 rounded-lg bg-muted/50 p-3">
        <p className="text-xs font-medium text-muted-foreground mb-2">Expected CSV columns:</p>
        <div className="flex flex-wrap gap-1.5">
          {['student_id', 'course_id', 'chapter_id', 'time_spent_minutes', 'assessment_score', 'completed', 'total_chapters'].map((col) => (
            <span key={col} className="rounded-md bg-card px-2 py-0.5 text-xs font-mono text-foreground">
              {col}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
