import "./Hero.css";

export default function Hero({
  backgroundImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  title = "Unleash lasting change: Your trusted partner for business transformation",
  subtitle = "Alan Innovations: Where technology meets humanity to drive impact",
  smallText = "INNOVATION WITH INTENTION",
  overlayColor = "rgba(5, 150, 139, 0.7)",
  titleStyle = {}
}) {
  return (
    <div className="hero-container" style={{ backgroundImage: `url("${backgroundImage}")` }}>
      <div className="overlay" style={{ background: overlayColor }}></div>

      <div className="hero-content">
        {smallText && <p className="small-text">{smallText}</p>}
        <h1 className="hero-title" style={titleStyle}>
          {title}
        </h1>
        {subtitle && <p className="hero-subtext">{subtitle}</p>}
      </div>
    </div>
  );
}
