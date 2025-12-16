from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import time
import os
import random
from filter import blog_score

app = Flask(__name__)
CORS(app)

# -------------------------
# CONFIG
# -------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_NAME = os.path.join(BASE_DIR, "blogs.db")

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
DEFAULT_IMAGES = [
    "defaults/default1.jpg",
    "defaults/default2.jpg",
    "defaults/default3.jpg"
]

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -------------------------
# DB CONNECTION
# -------------------------
def get_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

# -------------------------
# USER → SUBMIT BLOG
# -------------------------
@app.route("/submit-blog", methods=["POST"])
def submit_blog():
    try:
        title = request.form.get("title")
        author = request.form.get("author")
        summary = request.form.get("summary")
        content = request.form.get("content")
        image = request.files.get("image")

        if not title or not author or not summary or not content:
            return jsonify({"error": "Missing fields"}), 400

        # ---------- IMAGE HANDLING ----------
        if image:
            filename = f"{int(time.time())}_{image.filename}"
            image_path = os.path.join(UPLOAD_FOLDER, filename)
            image.save(image_path)
            image_url = f"uploads/{filename}"
        else:
            image_url = random.choice(DEFAULT_IMAGES)

        conn = get_db()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO blogs
            (title, author, summary, content, image, score, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            title,
            author,
            summary,
            content,
            image_url,
            None,
            "pending",
            int(time.time())
        ))

        conn.commit()
        conn.close()

        return jsonify({"message": "Blog submitted successfully"}), 201

    except Exception as e:
        print("❌ SUBMIT ERROR:", e)
        return jsonify({"error": "Submission failed"}), 500

# -------------------------
# ADMIN → GET BLOGS
# -------------------------
@app.route("/blogs", methods=["GET"])
def get_blogs():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT * FROM blogs ORDER BY created_at DESC")
    rows = cur.fetchall()
    conn.close()

    blogs = []
    for row in rows:
        blog = dict(row)

        if blog["score"] is not None:
            blog["score"] = int(round(blog["score"]))

        blogs.append(blog)

    return jsonify(blogs)

# -------------------------
# ADMIN → ANALYSE WITH AI
# -------------------------
@app.route("/analyse", methods=["POST"])
def analyse_blogs():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT id, content FROM blogs WHERE score IS NULL")
    rows = cur.fetchall()

    for row in rows:
        score = int(round(blog_score(row["content"])))
        status = "approved" if score >= 50 else "hidden"

        cur.execute("""
            UPDATE blogs
            SET score = ?, status = ?
            WHERE id = ?
        """, (score, status, row["id"]))

    conn.commit()
    conn.close()

    return jsonify({"message": "AI analysis completed"})

# -------------------------
# ADMIN → PUBLISH BLOG
# -------------------------
@app.route("/publish/<int:blog_id>", methods=["PUT"])
def publish_blog(blog_id):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        UPDATE blogs
        SET status = 'published'
        WHERE id = ?
    """, (blog_id,))

    conn.commit()
    conn.close()

    return jsonify({"message": "Blog published"})

# -------------------------
# ADMIN → DELETE BLOG
# -------------------------
@app.route("/delete/<int:blog_id>", methods=["DELETE"])
def delete_blog(blog_id):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("DELETE FROM blogs WHERE id = ?", (blog_id,))

    conn.commit()
    conn.close()

    return jsonify({"message": "Blog deleted"})

# -------------------------
# HEALTH CHECK
# -------------------------
@app.route("/")
def home():
    return jsonify({
        "status": "Backend running",
        "routes": ["/submit-blog", "/blogs", "/analyse", "/publish/<id>", "/delete/<id>"]
    })

# -------------------------
# RUN SERVER
# -------------------------
if __name__ == "__main__":
    app.run(debug=True)
