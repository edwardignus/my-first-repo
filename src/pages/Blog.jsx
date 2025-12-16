import { useEffect, useState } from "react";
import { client } from "../sanityclient";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BlogSidebar from "../components/BlogSidebar";

export default function Blog() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    client
      .fetch(`
        *[_type == "post" && approved == true]{
          _id,
          title,
          description,
          publishedAt,
          "image": mainImage.asset->url,
          "slug": slug.current
        } | order(publishedAt desc)
      `)
      .then((res) => setPosts(res));
  }, []);

  return (
    <>
      <Navbar />
      <Hero
        title="News & Events"
        subtitle="Our Journey"
        smallText=""
        overlayColor="rgba(5, 150, 139, 0.85)"
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
        titleStyle={{ fontSize: "5rem", fontWeight: "300" }}
      />

      <div style={{ padding: "60px 10%", background: "#f9f9f9", minHeight: "60vh" }}>

        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h3 style={{ color: "#555", fontWeight: "400", fontSize: "1.5rem" }}>
            Explore our journey through key milestones and memorable moments
          </h3>
        </div>

        {/* Admin Link (Hidden/Subtle) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button
            onClick={() => (window.location.href = "/create-blog")}
            style={{
              background: "transparent",
              color: "#ccc",
              border: "1px solid #eee",
              padding: "5px 10px",
              cursor: "pointer",
              fontSize: "0.8rem"
            }}
          >
            Contributor Access
          </button>
        </div>


        {posts === null && <p>Loading...</p>}
        {posts?.length === 0 && <p>No approved posts yet.</p>}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "40px",
          justifyContent: "center"
        }}>
          {posts?.map((post) => (
            <BlogCard
              key={post._id}
              id={post.slug}
              title={post.title}
              description={post.description}
              date={new Date(post.publishedAt).toDateString()}
              image={post.image}
            />
          ))}
        </div>
      </div>

      <BlogSidebar />
    </>
  );
}
