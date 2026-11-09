import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "./Carousel";
import "./Products.css";

const CATEGORIES = [
  { label: "All Products", value: "All Products" },
  { label: "Plasticware Products", value: "Plastic Labware" },
  { label: "Laboratory Glassware", value: "Laboratory Glassware" },
  { label: "Laboratory Instruments", value: "Laboratory Instruments" },
  { label: "Miscellaneous Labware", value: "Miscellaneous Labware" },
];

const PRODUCT_INQUIRY_EMAIL =
  import.meta.env.VITE_PRODUCT_INQUIRY_EMAIL || "sajda3109@gmail.com";

export default function ProductsPage() {
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [inquiryProduct, setInquiryProduct] = useState(null);
  const [inquiryStatus, setInquiryStatus] = useState("idle");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const { hash } = useLocation();
  const searchInputRef = useRef(null);

  // Fetch products from the public JSON file
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}products.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load product catalogue.");
        return response.json();
      })
      .then((data) => {
        setProductsData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  const handleInquirySubmit = async (event) => {
    event.preventDefault();
    setInquiryStatus("submitting");
    setInquiryMessage("");

    const formData = new FormData(event.currentTarget);
    const inquiry = Object.fromEntries(formData.entries());

    const payload = {
      ...inquiry,
      product: inquiryProduct.name,
      productCategory: inquiryProduct.category,
      _subject: `Product inquiry: ${inquiryProduct.name}`,
    };

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(PRODUCT_INQUIRY_EMAIL)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      );
      const result = await response.json();

      if (!response.ok || (result.success !== "true" && result.success !== true)) {
        throw new Error(
          typeof result.message === "string"
            ? result.message
            : "The inquiry could not be sent. Please try again.",
        );
      }

      setInquiryStatus("success");
      setInquiryMessage(
        "Your query has been sent successfully. You will be contacted in a few minutes.",
      );
    } catch (error) {
      setInquiryStatus("error");
      setInquiryMessage(
        error instanceof Error
          ? error.message
          : "The inquiry could not be sent. Please try again.",
      );
    }
  };

  useEffect(() => {
    if (hash !== "#catalog-search") return;

    document.getElementById("catalog-search")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    searchInputRef.current?.focus({ preventScroll: true });
  }, [hash]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Products" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [productsData, selectedCategory, searchQuery]);

  return (
    <div className="products-edge-page">
      {/* 1. Full-bleed Carousel Banner */}
      <div className="carousel-bleed-wrapper">
        <Carousel />
      </div>

      {/* 2. Floating Glassmorphism Controls Section */}
      <section
        id="catalog-search"
        className={`catalog-control-panel${hash === "#catalog-search" ? " is-highlighted" : ""}`}
      >
        <div className="edge-container">
          <div className="glass-control-bar">
            {/* Search Input with Neon Accent */}
            <div className="search-box-wrapper">
              <span className="search-icon">🔍</span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search precision instruments, glassware, equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery("")}>
                  ✕
                </button>
              )}
            </div>

            <div className="category-pills">
              {CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  className={`pill-btn ${selectedCategory === category.value ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. Edge-to-Edge Products Showcase */}
      <main className="edge-products-section">
        <div className="edge-container">
          <div className="catalog-status-header">
            <p className="results-count">
              Showing <span>{filteredProducts.length}</span> catalogue items
            </p>
          </div>

          {isLoading ? (
            <div className="empty-catalog-state">
              <div className="empty-icon">⏳</div>
              <h3>Loading catalogue...</h3>
              <p>Please wait while we fetch the latest items.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-catalog-state">
              <div className="empty-icon">🧪</div>
              <h3>No items match your search</h3>
              <p>Try a different keyword or category to browse the catalogue.</p>
              <button
                className="reset-btn"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Products");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="edge-product-grid">
              {filteredProducts.map((product) => (
                <div className="modern-product-card" key={product.id}>
                  <div className="card-image-box">
                    <span className="badge-neon">{product.tag}</span>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <div className="image-overlay-glow"></div>
                  </div>

                  <div className="card-content-box">
                    <span className="category-tag">{product.category}</span>
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-desc">{product.description}</p>
                  </div>

                  <div className="card-action-bar">
                    <button
                      className="btn-cyan-glow"
                      onClick={() => {
                        setInquiryProduct(product);
                        setInquiryStatus("idle");
                        setInquiryMessage("");
                      }}
                    >
                      Instant Inquiry ⚡
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 4. Full-bleed Interactive Catalogue Download Section */}
      <section className="catalogue-banner-bleed">
        <div className="edge-container">
          <div className="catalogue-banner-inner">
            <div className="banner-info">
              <span className="mini-tag">PRODUCT INFORMATION</span>
              <h2>Need help finding the right item?</h2>
              <p>Share your application or specifications with our team to discuss suitable products.</p>
            </div>
            <button
              className="btn-glass-download"
              onClick={() => alert("Catalogue requests are not connected in this preview yet.")}
            >
              Ask About the Catalogue
            </button>
          </div>
        </div>
      </section>

      {/* 5. Glassmorphism Modal Overlay */}
      {inquiryProduct && (
        <div className="glass-modal-backdrop" onClick={() => setInquiryProduct(null)}>
          <div
            className="glass-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-inquiry-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close product inquiry"
              onClick={() => setInquiryProduct(null)}
            >
              ✕
            </button>
            <div className="modal-header">
              <span className="modal-tag">PRODUCT ENQUIRY</span>
              <h3 id="product-inquiry-title">{inquiryProduct.name}</h3>
            </div>
            {inquiryMessage && (
              <p
                className={`inquiry-status-message ${inquiryStatus}`}
                role={inquiryStatus === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {inquiryMessage}
              </p>
            )}
            {inquiryStatus !== "success" && (
              <form onSubmit={handleInquirySubmit}>
                <input
                  type="text"
                  name="_honey"
                  className="inquiry-honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="form-field">
                  <label htmlFor="inquiry-name">Your Name *</label>
                  <input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    required
                    minLength="2"
                    maxLength="80"
                    autoComplete="name"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="inquiry-email">Email Address *</label>
                  <input
                    id="inquiry-email"
                    name="email"
                    type="email"
                    required
                    maxLength="254"
                    autoComplete="email"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="inquiry-phone">Phone Number *</label>
                  <input
                    id="inquiry-phone"
                    name="phone"
                    type="tel"
                    required
                    minLength="7"
                    maxLength="20"
                    pattern="(?=.*[0-9])[0-9+() -]{7,20}"
                    title="Enter 7 to 20 characters using digits, spaces, +, parentheses, or hyphens."
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="inquiry-organization">Organization</label>
                  <input
                    id="inquiry-organization"
                    name="organization"
                    type="text"
                    maxLength="120"
                    autoComplete="organization"
                    placeholder="Your organization (optional)"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="inquiry-quantity">Target Quantity *</label>
                  <input
                    id="inquiry-quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    step="1"
                    defaultValue="1"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="inquiry-remarks">Specifications / Remarks</label>
                  <textarea
                    id="inquiry-remarks"
                    name="remarks"
                    rows="3"
                    maxLength="2000"
                    placeholder="Share specifications or questions (optional)."
                  />
                </div>
                <button
                  type="submit"
                  className="btn-cyan-glow full-width"
                  disabled={inquiryStatus === "submitting"}
                >
                  {inquiryStatus === "submitting" ? "Sending..." : "Send Query"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}