import "./Navbar.css";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">Alan.<span className="logo-i">innovat</span></h2>
        <ul className="nav-links">
          <li>What We Do</li>
          <li>Home</li>
          <li>Innovation</li>
          <li>Who We Are</li>
          <li>Industries</li>
          <li>Events</li>
          <li>
            <Link to="/blog" style={{ textDecoration: "none", color: "inherit" }}>
              Blog
            </Link>
          </li>

        </ul>
      </div>

      <button className="get-btn">Get in Touch</button>
    </nav>
  );
}
