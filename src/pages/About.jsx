import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import "./About.css";

const ABOUT_CAROUSEL_SLIDES = [
  {
    id: 1,
    tag: "INFORMATION TECHNOLOGY",
    title: "Digital foundations for modern organizations",
    description:
      "Enterprise software, cloud platforms, data intelligence, and automation built around the way your teams work.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    primaryBtnText: "Explore IT",
    primaryLink: "/Information",
    secondaryBtnText: "Contact Us",
    secondaryLink: "/contact",
  },
  {
    id: 2,
    tag: "BIOTECHNOLOGY",
    title: "Tools and expertise for scientific discovery",
    description:
      "Laboratory informatics, research equipment, life science products, and support for modern laboratories.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80",
    primaryBtnText: "Explore Biotechnology",
    primaryLink: "/biotechnology",
    secondaryBtnText: "Browse Products",
    secondaryLink: "/biotechnology/products",
  },
  {
    id: 3,
    tag: "SERVICE & MAINTENANCE",
    title: "Reliable support throughout the equipment lifecycle",
    description:
      "Calibration, preventive maintenance, repairs, and practical technical assistance for critical operations.",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1600&q=80",
    primaryBtnText: "Get Support",
    primaryLink: "/contact",
    secondaryBtnText: "Explore Services",
    secondaryLink: "/biotechnology/#advanced-scientific-divisions",
  },
];

const ABOUT_DIVISIONS = [
  {
   title: "Information Technology",
    description:
      "Enterprise applications, cloud infrastructure, data analytics, and workflow automation that help organizations operate with clarity and scale.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Data center infrastructure",
    linkText: "Explore IT solutions",
    href: "/Information",
  },
  {
   title: "Biotechnology",
    description:
      "Laboratory informatics, scientific equipment, and life science products that support research, quality, and discovery.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Research laboratory glassware",
    linkText: "Explore biotechnology",
    href: "/biotechnology",
  },
  {
    title: "Service & Maintenance",
    description:
      "Responsive technical support, calibration, preventive maintenance, and repairs to keep essential equipment performing.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Technical specialist working with equipment",
    linkText: "Explore Maintenance",
    href: "/maintenance",
  },
];

export default function About() {
  return (
    <div className="about-page">
      <Carousel slides={ABOUT_CAROUSEL_SLIDES} />

      <section className="about-intro-section">
        <div className="about-intro-content">
          <span className="about-eyebrow">ABOUT LIGHT CELLS SOLUTIONS</span>
          <h2>Technology, life science, and dependable support in one team.</h2>
          <p>
            We bring together digital expertise, scientific products, and hands-on
            service to help businesses and laboratories solve practical challenges
            and move their work forward.
          </p>
        </div>
      </section>

      <section className="about-divisions-section" id="about-divisions">
        <div className="about-section-heading">
          <span className="about-eyebrow">OUR DIVISIONS</span>
          <h2>Three areas of expertise. One connected partner.</h2>
          <p>Explore the teams and capabilities behind Light Cells Solutions.</p>
        </div>

        <div className="about-divisions-grid">
          {ABOUT_DIVISIONS.map((division) => (
            <article className="about-division-card" key={division.number}>
              <div className="about-division-image">
                <img src={division.image} alt={division.imageAlt} loading="lazy" />
              </div>
              <div className="about-division-content">
                <span className="about-division-number">{division.number}</span>
                <h3>{division.title}</h3>
                <p>{division.description}</p>
                <Link to={division.href} className="about-division-link">
                  {division.linkText} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-contact-band">
        <div className="about-contact-content">
          <div>
            <span className="about-eyebrow">LET'S WORK TOGETHER</span>
            <h2>Find the right team for your next challenge.</h2>
          </div>
          <Link to="/contact" className="about-contact-link">
            Contact Us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}