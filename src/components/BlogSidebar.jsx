import { posts } from "../data/posts";

export default function BlogSidebar() {
  // Latest = sort by date (dummy logic for now)
  const latestPosts = posts.slice(0, 3);

  // Categories (you can add more later)
  const categories = ["Technology", "Innovation", "Business", "AI", "Trends"];

  // Popular posts (for now just last 2)
  const popularPosts = posts.slice(1, 3);

  return (
    <div style={{ width: "300px", padding: "20px", borderLeft: "1px solid #ddd" }}>
      
      {/* Latest Posts */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Latest Posts</h3>
        <div style={{ marginTop: "10px" }}>
          {latestPosts.map(post => (
            <div key={post.id} style={{ marginBottom: "10px", cursor: "pointer" }}>
              <strong>{post.title}</strong>
              <br />
              <small style={{ color: "#666" }}>{post.date}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Categories</h3>
        <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
          {categories.map((cat, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>{cat}</li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div>
        <h3>Popular Posts</h3>
        <div style={{ marginTop: "10px" }}>
          {popularPosts.map(post => (
            <div key={post.id} style={{ marginBottom: "10px", cursor: "pointer" }}>
              <strong>{post.title}</strong>
              <br />
              <small style={{ color: "#666" }}>{post.date}</small>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
