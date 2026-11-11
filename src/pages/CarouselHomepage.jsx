
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CarouselHomepage.css";


const HOME_SLIDES = [
  {
    id: 1,
    tag: "LIFE SCIENCES & BIOTECHNOLOGY",
    title: "Advancing research through scientific innovation",
    description:
      "Discover quality laboratory equipment, scientific instruments, research consumables, and biotechnology solutions that support laboratories, researchers, and scientific discoveries.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=85",
    primaryBtnText: "Explore Life Sciences",
    primaryLink: "/biotechnology",
    secondaryBtnText: "View Products",
    secondaryLink: "/biotechnology/products#catalog-search",
  },
  {
    id: 2,
    tag: "INFORMATION TECHNOLOGY",
    title: "Building smarter solutions for a connected world",
    description:
      "Transform your business with modern software development, digital solutions, IT infrastructure, and technology services designed to improve efficiency, connectivity, and performance.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85",
    primaryBtnText: "Explore IT Solutions",
    primaryLink: "/Information",
    secondaryBtnText: "Contact Our Team",
    secondaryLink: "/contact",
  },
  {
    id: 3,
    tag: "MAINTENANCE & TECHNICAL SERVICES",
    title: "Reliable maintenance for uninterrupted performance",
    description:
      "Keep your equipment and systems operating efficiently with professional technical support, preventive maintenance, troubleshooting, equipment servicing, and dependable after-sales assistance.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=85",
    primaryBtnText: "Explore Services",
    primaryLink: "/maintenance",
    secondaryBtnText: "Get in Touch",
    secondaryLink: "/contact",
  },
];


export default function CarouselHomepage({ slides = HOME_SLIDES }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change slides every 6 seconds
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Handle empty slide data
  if (!slides.length) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="modern-carousel">
      {/* Carousel Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-slide-item ${
            index === currentSlide ? "active" : ""
          }`}
          style={{
            backgroundImage: `url("${slide.image}")`,
          }}
          aria-hidden={index !== currentSlide}
        >
          <div className="carousel-glass-overlay">
            <div className="carousel-content-box">
              <span className="modern-tag">{slide.tag}</span>

              <h1>{slide.title}</h1>

              <p>{slide.description}</p>

              <div className="modern-buttons">
                <Link
                  to={slide.primaryLink}
                  className="btn-glow-primary"
                  tabIndex={index === currentSlide ? 0 : -1}
                >
                  {slide.primaryBtnText}
                </Link>

                <Link
                  to={slide.secondaryLink}
                  className="btn-glass-secondary"
                  tabIndex={index === currentSlide ? 0 : -1}
                >
                  {slide.secondaryBtnText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Previous Slide Button */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="carousel-nav-btn prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            &#10094;
          </button>

          {/* Next Slide Button */}
          <button
            type="button"
            className="carousel-nav-btn next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            &#10095;
          </button>

          {/* Slide Progress Indicators */}
          <div className="carousel-progress-container">
            {slides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                className={`progress-bar-wrapper ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  index === currentSlide ? "true" : undefined
                }
              >
                <span className="progress-fill"></span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
