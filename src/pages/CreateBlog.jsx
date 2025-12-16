import { useState } from "react";
import { client } from "../sanityclient";
import Navbar from "../components/Navbar";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const doc = {
      _type: "post",
      title,
      description,
      body: [
        {
          _type: "block",
          children: [{ _type: "span", text: content }]
        }
      ],
      approved: false,
      createdByUser: true,
      publishedAt: new Date().toISOString()
    };

    await client.create(doc);
    alert("Blog submitted! Waiting for admin approval.");
  }

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    boxSizing: "border-box"
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
        <h1 style={{ fontWeight: "300", color: "#333", marginBottom: "30px", borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
          Submit a Blog <span style={{ fontSize: "0.6em", color: "#888" }}>Contributor Access</span>
        </h1>

        <form onSubmit={handleSubmit} style={{ background: "#f9f9f9", padding: "40px", borderRadius: "12px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#555", fontSize: "0.9rem" }}>Blog Title</label>
            <input
              type="text"
              placeholder="Enter a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#555", fontSize: "0.9rem" }}>Short Description</label>
            <textarea
              placeholder="What is this blog about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ ...inputStyle, minHeight: "80px" }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#555", fontSize: "0.9rem" }}>Full Content</label>
            <textarea
              placeholder="Write your story here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              style={{ ...inputStyle, minHeight: "200px" }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              background: "#05968b",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
          >
            Submit for Review
          </button>
        </form>
      </div>
    </>
  );
}
