# EduTrack - Learning Intelligence Platform

[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green.svg)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-61dafb.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> An AI-powered tool for analyzing student learning data and predicting educational outcomes. Built as a production-ready system for a training platform.

---

## 🌐 Live Demo


**🎨 Interactive Dashboard**  
https://shiksha-ai-alpha.vercel.app/
---

## 🎯 Project Overview

**EduTrack** is a production-ready AI tool designed to help educational platforms:

- 🎓 Predict student course completion rates
- ⚠️ Identify at-risk students before they drop out
- 📚 Detect difficult course chapters requiring intervention
- 💡 Generate actionable insights for educators

### Why This Matters

Early detection of struggling students allows for:
- Personalized intervention strategies
- Improved student retention rates
- Better resource allocation for educators
- Data-driven curriculum improvements

---

## ✨ Key Features

### 1️⃣ Course Completion Prediction
- **ML Model**: Random Forest Classifier
- **Accuracy**: 100% on test set
- **Output**: Binary prediction (Will Complete / Will Drop Out)
- **Confidence**: Probability score for each prediction

### 2️⃣ Early Risk Detection
- **ML Model**: Gradient Boosting Classifier  
- **Accuracy**: 91.11%
- **Timing**: Flags students at <50% course progress
- **Use Case**: Enables proactive intervention

### 3️⃣ Chapter Difficulty Analysis
- **Method**: Statistical aggregation + composite scoring
- **Metrics**: Dropout rate, time spent, assessment scores
- **Output**: Difficulty score (0-100) and level (Easy/Medium/Hard)
- **Visual**: Color-coded heatmap in dashboard

### 4️⃣ AI-Generated Insights
- Human-readable recommendations
- Prioritized action items
- Course-specific suggestions
- Student cohort analysis

### 5️⃣ Interactive Dashboard
- Modern, responsive UI built with React + TypeScript
- Real-time data visualization with Chart.js
- CSV upload with drag-and-drop
- Downloadable reports (planned)

### 6️⃣ REST API
- FastAPI-powered backend
- Automatic OpenAPI documentation
- JSON and CSV input support
- CORS-enabled for web integration

---

## 🏗️ System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface                          │
│  React + TypeScript + Tailwind CSS + Vite                   │
│  Deployed on Vercel                                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ HTTPS/REST
                  ↓
┌─────────────────────────────────────────────────────────────┐
│                   FastAPI Backend                           │
│  • Request validation (Pydantic)                            │
│  • Feature engineering pipeline                             │
│  • Model inference layer                                    │
│  • Response formatting                                      │
│  Deployed on Render                                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────────────────────────────┐
│                 Machine Learning Models                     │
│  • Random Forest (Completion Prediction)                    │
│  • Gradient Boosting (Risk Detection)                       │
│  • Statistical Analysis (Chapter Difficulty)                │
│  Models stored as .pkl files                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Python** | Primary language | 3.12+ |
| **FastAPI** | REST API framework | 0.104.1 |
| **Scikit-learn** | ML algorithms | 1.6.1 |
| **Pandas** | Data manipulation | 2.1.3 |
| **NumPy** | Numerical computing | 1.26.4 |
| **Uvicorn** | ASGI server | 0.24.0 |
| **Joblib** | Model serialization | 1.3.2 |

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI framework | 18.3.1 |
| **TypeScript** | Type safety | 5.0+ |
| **Vite** | Build tool | 5.0+ |
| **Tailwind CSS** | Styling | 3.0+ |
| **Chart.js** | Data visualization | 4.4.0 |

### Machine Learning
- **Random Forest Classifier** - Ensemble learning for completion prediction
- **Gradient Boosting Classifier** - Sequential learning for risk detection
- **Feature Engineering** - 13 derived features from raw data
- **Cross-validation** - Stratified train-test split (80/20)

---

## 🚀 Usage Guide

### Web Dashboard Usage

1. **Open the dashboard** in your browser
2. **Upload CSV file** with student data (drag-and-drop or click)
3. **Click "Analyze with AI"**
4. **View results**:
   - Summary statistics cards
   - Completion prediction chart (doughnut)
   - Chapter difficulty heatmap (bar chart)
   - High-risk students table
   - AI-generated insights

### CSV File Format

Your input CSV must have these exact columns:
```csv
student_id,course_id,chapter_id,time_spent_minutes,assessment_score,completed,total_chapters
STU0001,CRS01,1,120.50,85.00,0,10
STU0001,CRS01,2,95.00,78.00,0,10
STU0002,CRS01,1,45.00,60.00,0,10
```

**Column Descriptions:**

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `student_id` | string | Unique student identifier | STU0001 |
| `course_id` | string | Course identifier | CRS01 |
| `chapter_id` | int | Chapter number (sequential) | 1, 2, 3... |
| `time_spent_minutes` | float | Time spent on chapter (minutes) | 120.5 |
| `assessment_score` | float | Score achieved (0-100) | 85.0 |
| `completed` | int | 1 if completed, 0 otherwise | 0 or 1 |
| `total_chapters` | int | Total chapters in course | 10 |

**Sample data included**: `data/student_data.csv` (18,151 records, 500 students, 5 courses)

---

## 🤖 Machine Learning Details

### Model 1: Course Completion Prediction

**Algorithm**: Random Forest Classifier (100 trees, max depth 10)

**Performance Metrics**:
```
Accuracy:  100.00%
Precision: 1.00 (Will Complete), 1.00 (Will Drop)
Recall:    1.00 (Will Complete), 1.00 (Will Drop)
F1-Score:  1.00 (both classes)
```

**Top 5 Important Features**:
1. Progress percentage (56.4%)
2. Last chapter reached (19.7%)
3. Total time spent (12.6%)
4. Avg time per chapter (3.6%)
5. Time consistency (2.7%)

### Model 2: Early Dropout Risk Detection

**Algorithm**: Gradient Boosting Classifier (100 estimators, learning rate 0.1)

**Performance Metrics**:
```
Accuracy:  91.11%
Precision: 0.93 (High Risk), 0.89 (Low Risk)
Recall:    0.90 (High Risk), 0.92 (Low Risk)
F1-Score:  0.92 (High Risk), 0.90 (Low Risk)
```

**Key Features Used**:
- Average time per chapter
- Average score
- Minimum score
- Score consistency
- Engagement flags

### Model 3: Chapter Difficulty Scoring

**Method**: Composite statistical analysis

**Formula**:
```
Difficulty Score = (0.4 × Normalized_Dropout_Rate) + 
                   (0.3 × Normalized_Time_Spent) + 
                   (0.3 × Normalized_Score_Inverse)
```

**Output**: Score from 0-100, categorized as:
- Easy: 0-33
- Medium: 34-66
- Hard: 67-100

### Feature Engineering Pipeline

From raw data, the system creates:

| Feature | Description |
|---------|-------------|
| `avg_time_per_chapter` | Mean time spent across chapters |
| `total_time_spent` | Sum of all time spent |
| `time_consistency` | Standard deviation of time spent |
| `avg_score` | Mean assessment score |
| `min_score` | Lowest score achieved |
| `max_score` | Highest score achieved |
| `score_consistency` | Standard deviation of scores |
| `progress_percentage` | (Last chapter / Total chapters) × 100 |
| `low_engagement` | Flag if avg time < 60 min |
| `struggling` | Flag if avg score < 60 |
| `inconsistent_effort` | Flag if time std dev > 50 |
| `last_chapter_reached` | Highest chapter number |

---

## 📊 Sample Results

Analysis of **2,500 student-course enrollments** (500 students × 5 courses):

| Metric | Value |
|--------|-------|
| **Predicted Completion Rate** | 37.0% (925 completions) |
| **High-Risk Students** | 362 students (14.5%) |
| **Most Difficult Chapter** | CRS01 - Chapter 9 (73.4 difficulty score) |
| **Average Score** | 66.8 / 100 |
| **Model Training Time** | ~45 seconds |
| **Prediction Time** | <2 seconds for 2,500 records |

**Actionable Insights Generated**:
- 362 students flagged for immediate intervention
- 5 chapters identified as requiring curriculum improvement
- 3 courses with <30% completion requiring review
- Early warning system catches 91% of at-risk students

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

The dashboard is deployed on Vercel:
```bash
# Vercel auto-deploys from GitHub on push to main branch
# Build command: npm run build
# Output directory: dist
```

**URL**: https://shiksha-ai-alpha.vercel.app

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
```
MIT License

Copyright (c) 2025 [Gaddam Suvarsha]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👤 Author

**[Gaddam Suvarsha]**


- 💼 LinkedIn: [Gaddam Suvarsha](https://www.linkedin.com/in/gaddam-suvarsha/)
- 🐙 GitHub: [Suvarsha97](https://github.com/Suvarsha97)
- 📧 Email: gaddamsuvarsha@gmail.com

---

[View Demo](https://shiksha-ai-alpha.vercel.app/)

</div>
