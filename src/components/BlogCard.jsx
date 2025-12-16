import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ id, title, description, date, image }) {
    return (
        <Link to={`/blog/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="blog-card">
                <img
                    src={image}
                    alt="blog"
                    className="blog-card-image"
                />

                <div className="blog-card-content">
                    <h2 className="blog-card-title">{title}</h2>
                    <p className="blog-card-description">{description}</p>
                    <small className="blog-card-date">{date}</small>
                </div>
            </div>
        </Link>
    );
}
