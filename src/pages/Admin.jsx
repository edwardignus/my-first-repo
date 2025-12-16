import { useEffect, useState } from "react";
import { client } from "../sanityclient";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.fetch(`
      *[_type == "post" && approved == false]{
        _id,
        title,
        description,
        publishedAt
      }
    `).then(setPosts);
  }, []);

  const approvePost = async (id) => {
    await client.patch(id).set({ approved: true }).commit();
    alert("Blog approved!");
    window.location.reload();
  };

  const rejectPost = async (id) => {
    await client.delete(id);
    alert("Blog rejected and deleted!");
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
        <h1 style={{ fontWeight: "300", color: "#333", marginBottom: "30px", borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
          Admin Panel <span style={{ fontSize: "0.6em", color: "#888" }}>Pending Approvals</span>
        </h1>

        {posts.length === 0 && <p style={{ color: "#666", fontSize: "1.1rem" }}>No pending blogs at the moment.</p>}

        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #eee",
              padding: "25px",
              marginBottom: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              background: "#fff"
            }}
          >
            <h2 style={{ marginTop: 0, color: "#222" }}>{post.title}</h2>
            <p style={{ color: "#555", lineHeight: "1.6" }}>{post.description}</p>
            <p style={{ fontSize: "0.9rem", color: "#999", marginBottom: "20px" }}>
              <strong>Date:</strong> {post.publishedAt}
            </p>

            <div style={{ display: "flex", gap: "15px" }}>
              <button
                onClick={() => approvePost(post._id)}
                style={{
                  padding: "10px 20px",
                  background: "#05968b",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                Approve
              </button>

              <button
                onClick={() => rejectPost(post._id)}
                style={{
                  padding: "10px 20px",
                  background: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
