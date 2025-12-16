import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../sanityclient";
import Navbar from "../components/Navbar";

export default function SinglePost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == $slug]{
          title,
          description,
          body,
          publishedAt,
          "image": mainImage.asset->url,
          "name": author->name
        }[0]`,
        { slug: id }
      )
      .then((data) => setPost(data))
      .catch(console.error);
  }, [id]);

  if (!post) return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif" }}>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "12px", marginBottom: "30px" }}
          />
        )}

        <h1 style={{ fontSize: "2.5rem", color: "#333", marginBottom: "10px" }}>{post.title}</h1>

        <div style={{ display: "flex", justifyContent: "space-between", color: "#888", marginBottom: "30px", fontSize: "0.9rem", borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
          <span>By {post.name || "Admin"}</span>
          <span>{new Date(post.publishedAt).toDateString()}</span>
        </div>

        <div style={{ lineHeight: "1.8", color: "#444", fontSize: "1.1rem" }}>
          {/* Simple rendering for now, can be improved with PortableText */}
          {post.body && Array.isArray(post.body)
            ? post.body.map((block, i) => block.children?.map(child => <p key={i}>{child.text}</p>))
            : <p>{post.description}</p>
          }
        </div>
      </div>
    </>
  );
}
