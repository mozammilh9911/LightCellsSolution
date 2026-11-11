import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Home.css";


const CAROUSEL_SLIDES = [
  {
    id: "01",
    title: "Empowering Global Business & Scientific Infrastructure",
    subtitle:
      "One platform for Information Technology, Biotechnology solutions, and high-performance equipment maintenance.",
    bgClass: "slide-bg-1",
  },
  {
    id: "02",
    title: "Advanced Biotechnology & Precision Laboratory Equipment",
    subtitle:
      "High-precision laboratory glassware, bio-plasticware, and cutting-edge research tools designed for modern laboratories.",
    bgClass: "slide-bg-2",
  },
  {
    id: "03",
    title: "24/7 Technical Support & Maintenance Services",
    subtitle:
      "Equipment calibration, preventive hardware servicing, and full enterprise system integrations.",
    bgClass: "slide-bg-3",
  },
];

const CORE_DIVISIONS = [
  {
  
    title: "Life Sciences",
    subtitle: "Biotechnology Solutions",
    description:
      "High-precision laboratory glassware, bio-plasticware, analytical instruments, and cutting-edge research equipment.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
    alt: "Biotechnology Laboratory Supplies",
    path: "/biotechnology",
  },
  {
  
    title: "Information Technology",
    subtitle: "IT Solutions",
    description:
      "Enterprise software architecture, automated laboratory workflows, and secure high-performance data analytics platforms.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    alt: "Information Technology Solutions",
    path: "/Information",
  },
  {
  
    title: "Maintenance & Services",
    subtitle: "Technical Support",
    description:
      "24/7 technical assistance, equipment calibration, preventive hardware servicing, and full system integrations.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    alt: "Maintenance and Technical Support Services",
    path: "/maintenance",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash !== "#core-divisions") return;

    document.getElementById("core-divisions")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [hash]);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  return (
    <div className="home-page-wrapper">
      {/* 1. HERO CAROUSEL SECTION */}
      <section
        className="hero-carousel-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="carousel-track-container">
          {CAROUSEL_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              // className={`carousel-slide slide ${slide.bgClass}${slide.id === "03" ? " division-three-slide" : ""} ${index === currentSlide ? "active" : ""}`}
            className={`carousel-slide slide ${slide.bgClass} ${index === currentSlide ? "active" : ""
}`}
            >
              <div className="hero-content">
                {/* <span className="slide-badge"> {slide.id}</span> */}
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <div className="hero-button-group">
                  <Link to="/contact" className="btn-primary-blue">
                    Request a demo <span className="arrow">→</span>
                  </Link>
                  <Link to="/about" className="btn-secondary-outline">
                    Learn about us <span className="arrow">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Control Arrows */}
        <button className="carousel-control prev" onClick={prevSlide} aria-label="Previous Slide">
          ‹
        </button>
        <button className="carousel-control next" onClick={nextSlide} aria-label="Next Slide">
          ›
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {CAROUSEL_SLIDES.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. CURVED ANNOUNCEMENT BANNER */}
      <div className="hero-banner-wrapper">
        <div className="curved-blue-banner">
          <div className="banner-text">
            <h3>Light Cells Enterprise Platform Release: Customer & Partner FAQ</h3>
            <p>
              Discover how our updated multi-divisional structure enhances service delivery, product fulfillment, and client support across all sectors.
            </p>
          </div>
          {/* <Link to="/Information" className="banner-explore-btn">
            Explore <span className="arrow">→</span>
          </Link> */}
        </div>
      </div>

      {/* 3. CORE DIVISIONS ARCHED PILL CARDS */}
      <section
        id="core-divisions"
        className={`pricing-benefits-section${hash === "#core-divisions" ? " is-highlighted" : ""}`}
      >
        <div className="section-inner">
          <h2 className="section-main-title">Core Divisions & Services</h2>

          <div className="arch-cards-grid">
            {CORE_DIVISIONS.map((item) => (
              <div className="arch-pill-card" key={item.id}>
                {/* Top Arched Image Mask */}
                <div className="arch-photo-wrapper">
                  <img src={item.image} alt={item.alt} loading="lazy" />
                </div>

                {/* Blue Capsule Content Area */}
                <div className="arch-card-body">
                  <div className="title-number-row">
                    <div>
                      <h3 className="card-title-text">
                        <Link to={item.path}>{item.title}</Link>
                      </h3>
                      <span className="card-subtitle-text">{item.subtitle}</span>
                    </div>
                    <span className="card-number">{item.id}</span>
                  </div>
                  <p className="card-description-text">{item.description}</p>

                  <div className="card-action-row">
                    <Link to={item.path} className="card-inline-btn">
                      Explore Division <span className="arrow">→</span>
                  </Link>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
