import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import os

np.random.seed(42)

def generate_student_data(n_students=500, n_courses=5, max_chapters=12):
    """Generate realistic student learning data"""
    
    data = []
    
    for student_id in range(1, n_students + 1):
        for course_id in range(1, n_courses + 1):
            # Student characteristics (affects their performance)
            student_engagement = np.random.uniform(0.3, 1.0)
            student_ability = np.random.uniform(0.4, 1.0)
            
            n_chapters = np.random.randint(8, max_chapters + 1)
            
            for chapter in range(1, n_chapters + 1):
                # Chapter difficulty (some chapters are harder)
                chapter_difficulty = 0.5 + (chapter / n_chapters) * 0.3
                
                # Time spent (influenced by engagement and difficulty)
                base_time = np.random.uniform(20, 180)  # minutes
                time_spent = base_time * student_engagement * (1 + chapter_difficulty)
                time_spent = max(5, time_spent)  # minimum 5 minutes
                
                # Score (influenced by ability, time, and difficulty)
                base_score = student_ability * 100
                time_bonus = min(20, time_spent / 10)
                difficulty_penalty = chapter_difficulty * 20
                
                score = base_score + time_bonus - difficulty_penalty
                score = np.clip(score + np.random.normal(0, 10), 0, 100)
                
                # Completion status (higher dropout in later chapters if low engagement)
                dropout_prob = (chapter / n_chapters) * (1 - student_engagement) * chapter_difficulty
                completed = np.random.random() > dropout_prob
                
                if not completed and chapter < n_chapters:
                    # If dropped out, don't add future chapters
                    data.append({
                        'student_id': f'STU{student_id:04d}',
                        'course_id': f'CRS{course_id:02d}',
                        'chapter_id': chapter,
                        'time_spent_minutes': round(time_spent, 2),
                        'assessment_score': round(score, 2),
                        'completed': 0,
                        'total_chapters': n_chapters
                    })
                    break
                else:
                    data.append({
                        'student_id': f'STU{student_id:04d}',
                        'course_id': f'CRS{course_id:02d}',
                        'chapter_id': chapter,
                        'time_spent_minutes': round(time_spent, 2),
                        'assessment_score': round(score, 2),
                        'completed': 1 if chapter == n_chapters else 0,
                        'total_chapters': n_chapters
                    })
    
    df = pd.DataFrame(data)
    return df


# Create data directory if it doesn't exist
os.makedirs('data', exist_ok=True)

# Generate the dataset
print("Generating student learning data...")
df = generate_student_data(n_students=500, n_courses=5, max_chapters=12)

# Save to CSV (since we're already in backend folder)
df.to_csv('data/student_data.csv', index=False)
print(f"✅ Generated {len(df)} records")
print(f"✅ {df['student_id'].nunique()} unique students")
print(f"✅ {df['course_id'].nunique()} courses")
print("\nSample data:")
print(df.head(10))
print("\nCompletion statistics:")
print(df.groupby('completed').size())