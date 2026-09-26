![EduTrack](https://capsule-render.vercel.app/api?type=waving\&color=0:0F172A,45:1E3A8A,100:2563EB\&height=210\&section=header\&text=EduTrack\&fontSize=52\&fontColor=FFFFFF\&animation=fadeIn\&fontAlignY=38)

<p align="center">
  <strong>Analyze • Predict • Visualize • Understand</strong>
</p>

<p align="center">
  An AI-powered educational analytics platform for
  <br/>
  <strong>Student Performance • Learning Analytics • Academic Insights</strong>
</p>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Pandas-Data%20Analysis-150458?style=flat-square&logo=pandas&logoColor=white"/>
  <img src="https://img.shields.io/badge/NumPy-Data%20Processing-013243?style=flat-square&logo=numpy&logoColor=white"/>
  <img src="https://img.shields.io/badge/Scikit--Learn-Machine%20Learning-F7931E?style=flat-square&logo=scikitlearn&logoColor=white"/>
  <img src="https://img.shields.io/badge/Joblib-Model%20Serialization-3776AB?style=flat-square"/>
</p>

<p align="center">
  <a href="https://edu-track-pied-nine.vercel.app/">
    <img src="https://img.shields.io/badge/🚀%20LIVE%20DEMO-EduTrack-2563EB?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

---

## ◈ The Platform

**EduTrack** is an AI-powered educational analytics platform designed to analyze student academic data, identify learning patterns, and transform educational records into meaningful insights.

The platform combines **data processing, machine learning, interactive analytics, and visualization** to provide a centralized environment for understanding student performance and learning progress.

```text
                          EDUTRACK
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
     STUDENT DATA       ML ANALYTICS       COURSE DATA
          │                  │                  │
          ▼                  ▼                  ▼
     DATA ANALYSIS      PREDICTION        PROGRESS TRACKING
          │                  │                  │
          └──────────────────┼──────────────────┘
                             ▼
                    ACADEMIC INSIGHTS
```

---

# ✦ Platform Highlights

<table>
<tr>
<td width="50%">

### 🎓 Student Analytics

Analyze student academic records and identify important performance patterns across courses, chapters, and assessments.

</td>
<td width="50%">

### 📊 Performance Visualization

Transform academic data into meaningful charts, metrics, and interactive visualizations.

</td>
</tr>

<tr>
<td>

### 🤖 Machine Learning

Apply machine learning techniques to analyze student performance and generate data-driven academic insights.

</td>
<td>

### 📈 Learning Progress

Track completion, assessment performance, time spent, and other learning indicators.

</td>
</tr>

<tr>
<td>

### 📁 Dataset Analysis

Process structured student datasets and extract useful information for academic analysis.

</td>
<td>

### 🖥️ Interactive Dashboard

A modern web interface provides an accessible way to explore student analytics and performance data.

</td>
</tr>
</table>

---

# 🚀 Core Features

## 01 — Student Performance Analytics

EduTrack analyzes student-level academic information to provide a clear view of learning performance.

```text
Student Records
      │
      ▼
Data Processing
      │
      ▼
Performance Metrics
      │
      ▼
Learning Analysis
      │
      ▼
Academic Insights
```

Features include:

* Student-level performance analysis
* Assessment score analysis
* Course-wise performance
* Chapter-level progress
* Completion tracking
* Learning behavior analysis

---

## 02 — Learning Analytics

EduTrack uses learning activity data to understand how students interact with educational content.

Key indicators include:

* Time spent learning
* Assessment scores
* Course completion
* Chapter completion
* Student engagement
* Learning progress

This allows academic data to be analyzed beyond simple marks and scores.

---

## 03 — Course & Chapter Analysis

The platform provides structured analysis of student performance across different courses and chapters.

```text
Student
   │
   ├── Course 1
   │      ├── Chapter 1
   │      ├── Chapter 2
   │      └── Chapter 3
   │
   ├── Course 2
   │      ├── Chapter 1
   │      ├── Chapter 2
   │      └── Chapter 3
   │
   └── Course 3
          ├── Chapter 1
          └── Chapter 2
```

This structure enables:

* Course-wise comparisons
* Chapter progress tracking
* Assessment analysis
* Completion analysis
* Learning pattern identification

---

## 04 — Machine Learning Pipeline

The platform integrates machine learning into the educational analytics workflow.

```text
Student Dataset
       │
       ▼
Data Exploration
       │
       ▼
Data Processing
       │
       ▼
Feature Engineering
       │
       ▼
Machine Learning
       │
       ▼
Model Analysis
       │
       ▼
Academic Insights
```

The ML layer enables the platform to extract patterns from historical student data and support data-driven analysis.

---

# 🧠 Machine Learning

EduTrack uses machine learning and data science techniques for educational analytics.

### Machine Learning Components

* Scikit-learn
* Feature-based analysis
* Model-based prediction
* Data preprocessing
* Model serialization
* Statistical analysis

Machine learning models can be integrated with the platform to analyze historical student performance and generate predictions or insights.

---

# 📊 Data & Visualization

EduTrack works with structured educational datasets containing information such as:

```text
student_id
course_id
chapter_id
time_spent_minutes
assessment_score
completed
total_chapters
```

This enables analysis of:

* Student performance
* Learning time
* Assessment results
* Course completion
* Chapter progress
* Student engagement

Visualization technologies allow this information to be presented through an interactive analytics dashboard.

---

# 🧩 Technical Architecture

```text
┌───────────────────────────────────────────────┐
│                   USER LAYER                  │
│                                               │
│          Student & Academic Data              │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│              REACT + TYPESCRIPT               │
│                                               │
│       Dashboard • Analytics • Insights        │
└───────────────────────┬───────────────────────┘
                        │
                   API Requests
                        │
                        ▼
┌───────────────────────────────────────────────┐
│                    FASTAPI                    │
│                                               │
│          Backend & ML Processing              │
└───────────────────────┬───────────────────────┘
                        │
            ┌───────────┼───────────┐
            ▼           ▼           ▼
       Data Layer   ML Layer   Analytics Layer
            │           │           │
            ▼           ▼           ▼
         Pandas    Scikit-learn   Processing
         NumPy       Models       & Metrics
            │           │           │
            └───────────┼───────────┘
                        ▼
              Educational Insights
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
   Performance Analysis         Data Visualization
```

---

# 🛠️ Technology Stack

| Technology       | Role                           |
| ---------------- | ------------------------------ |
| **React**        | Frontend application           |
| **TypeScript**   | Type-safe frontend development |
| **Vite**         | Frontend build tool            |
| **Python**       | Backend & ML development       |
| **FastAPI**      | API backend                    |
| **Uvicorn**      | ASGI server                    |
| **Pandas**       | Data processing and analysis   |
| **NumPy**        | Numerical computation          |
| **Scikit-learn** | Machine learning               |
| **Joblib**       | Model serialization            |
| **HTML / CSS**   | Interface development          |
| **Git & GitHub** | Version control                |

---

# 📁 Project Structure

```text
EduTrack/
│
├── data/
│   └── student_data.csv
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── ...
│
├── backend/
│   ├── models/
│   └── ...
│
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── requirements.txt
└── README.md
```

---

# 🎯 Application Workflow

```text
Launch EduTrack
       │
       ▼
Student / Academic Dataset
       │
       ▼
Data Processing
       │
       ▼
Performance Analysis
       │
       ├───────────────┐
       ▼               ▼
Machine Learning   Data Analytics
       │               │
       └───────┬───────┘
               ▼
       Academic Insights
               │
               ▼
      Interactive Dashboard
               │
       ┌───────┴────────┐
       ▼                ▼
 Performance       Learning
  Analytics        Progress
```

---

# 📋 Dataset

EduTrack is designed to work with structured student learning data.

### Example Data Fields

| Field                | Description                  |
| -------------------- | ---------------------------- |
| `student_id`         | Unique student identifier    |
| `course_id`          | Course identifier            |
| `chapter_id`         | Chapter identifier           |
| `time_spent_minutes` | Learning time                |
| `assessment_score`   | Assessment performance       |
| `completed`          | Completion status            |
| `total_chapters`     | Total chapters in the course |

These attributes provide the foundation for student performance and learning analytics.

---

# 📌 Use Cases

EduTrack can be used for:

* Student performance monitoring
* Academic data analysis
* Learning progress tracking
* Course performance evaluation
* Student engagement analysis
* Educational analytics
* ML-based academic analysis
* Learning behavior analysis
* Data-driven educational decision support

---

# 📊 Key Benefits

| Area                      | EduTrack |
| ------------------------- | -------- |
| Student Analytics         | ✅        |
| Performance Visualization | ✅        |
| Learning Analytics        | ✅        |
| Course Analysis           | ✅        |
| Chapter Analysis          | ✅        |
| CSV Data Processing       | ✅        |
| Machine Learning          | ✅        |
| Interactive Dashboard     | ✅        |
| FastAPI Backend           | ✅        |
| React Frontend            | ✅        |

---

# 🌐 Live Application

<p align="center">

<a href="https://edu-track-pied-nine.vercel.app/">

<img src="https://img.shields.io/badge/🚀%20OPEN%20EDUTRACK-Live%20Application-2563EB?style=for-the-badge" alt="EduTrack Live Application">

</a>

</p>

<p align="center">
  <strong>https://edu-track-pied-nine.vercel.app/</strong>
</p>

---

# 🔮 Future Enhancements

Potential improvements include:

* Personalized AI study recommendations
* Early identification of students requiring additional support
* Automated academic performance reports
* Advanced predictive analytics
* Personalized learning paths
* Student and faculty authentication
* Role-based dashboards
* Cloud database integration
* Real-time analytics
* AI-powered educational assistant
* Advanced learning behavior prediction

---


# 👨‍💻 Developer

<p align="center">

<strong>Vikas Tarlana</strong>

<br/>

B.Tech CSE | AI & Software Development

<br/><br/>

<a href="https://github.com/TarlanaVikas">
  <img src="https://img.shields.io/badge/GitHub-TarlanaVikas-181717?style=for-the-badge&logo=github" alt="GitHub"/>
</a>

<a href="https://www.linkedin.com/in/tarlana-vikas/">
  <img src="https://img.shields.io/badge/LinkedIn-Vikas%20Tarlana-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn"/>
</a>

</p>

---

<p align="center">

