import sqlite3

conn = sqlite3.connect("blogs.db")
cursor = conn.cursor()

# Create table if not exists
cursor.execute("""
CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    category TEXT,
    summary TEXT,
    content TEXT,
    image TEXT,
    score REAL,
    status TEXT,
    created_at INTEGER
)
""")

# 🔥 Ensure image column exists (safe check)
cursor.execute("PRAGMA table_info(blogs)")
columns = [col[1] for col in cursor.fetchall()]

if "image" not in columns:
    cursor.execute("ALTER TABLE blogs ADD COLUMN image TEXT")

conn.commit()
conn.close()

print("✅ Database ready (with image column)")
