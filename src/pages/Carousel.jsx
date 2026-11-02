import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";

const SLIDES = [
  {
    id: 1,
    tag: "LIFE SCIENCE PRODUCTS",
    title: "Research essentials for work at every scale",
    description: "Explore laboratory supplies, research reagents, instruments, and everyday lab essentials for life science workflows.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80",
    primaryBtnText: "Explore Products",
    primaryLink: "/biotechnology/products#catalog-search",
    secondaryBtnText: "Explore Services",
    secondaryLink: "/biotechnology/#advanced-scientific-divisions",
  },
  {
    id: 2,
    tag: "LABORATORY INFORMATICS",
    title: "Bring samples, records, and workflows together",
    description: "Explore LIMS, ELN, and scientific data management options designed to organize laboratory information and routine processes.",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1600&q=80",
    primaryBtnText: "View LIMS",
    primaryLink: "/biotechnology/products#catalog-search",
    secondaryBtnText: "Request Demo",
    secondaryLink: "/biotechnology/contact",
  },
  {
    id: 3,
    tag: "SCIENTIFIC SERVICES",
    title: "Support for research and equipment care",
    description: "Find options for sequencing and proteomics analysis, custom research support, instrument service, and maintenance.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    primaryBtnText: "Explore Services",
    primaryLink: "/biotechnology/#advanced-scientific-divisions",
    secondaryBtnText: "Contact Us",
    secondaryLink: "/biotechnology/contact",
  },
];

export default function Carousel({ slides = SLIDES }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="modern-carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-slide-item ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Modern Dark Gradient Overlay */}
          <div className="carousel-glass-overlay">
            <div className="carousel-content-box">
              <span className="modern-tag">{slide.tag}</span>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              
              <div className="modern-buttons">
                <Link
                  to={slide.primaryLink}
                  onClick={() => {
                    if (!slide.primaryLink.includes("#catalog-search")) return;
                    const searchSection = document.getElementById("catalog-search");
                    searchSection?.scrollIntoView({ behavior: "smooth", block: "start" });
                    searchSection?.querySelector("input")?.focus({ preventScroll: true });
                  }}
                >
                  <button className="btn-glow-primary">{slide.primaryBtnText}</button>
                </Link>
                <Link to={slide.secondaryLink}>
                  <button className="btn-glass-secondary">{slide.secondaryBtnText}</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modern Floating Navigation Chevrons */}
      <button className="carousel-nav-btn prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-nav-btn next" onClick={nextSlide}>
        &#10095;
      </button>

      {/* Modern Progress Bar Timeline Indicators */}
      <div className="carousel-progress-container">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`progress-bar-wrapper ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          >
            <div className="progress-fill"></div>
          </div>
        ))}
      </div>
    </div>
  );
}