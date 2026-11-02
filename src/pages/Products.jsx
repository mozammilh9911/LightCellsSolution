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
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [inquiryProduct, setInquiryProduct] = useState(null);
  const [inquiryStatus, setInquiryStatus] = useState("idle");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const { hash } = useLocation();
  const searchInputRef = useRef(null);

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

    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Products" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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

          {filteredProducts.length === 0 ? (
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


const PRODUCTS_DATA = [
  // PLASTIC LAB WARE PRODUCTS

  {
    id: 1,
    name: "Multichannel Pipette",
    category: "Plastic Labware",
    tag: "Pipettes",
    description: "Multichannel pipette designed for accurate liquid handling in laboratory applications.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/11/1-1-1024x683.png",
  },
  {
    id: 2,
    name: "Variable Volume Micro Pipette",
    category: "Plastic Labware",
    tag: "Pipettes",
    description: "Adjustable volume micropipette for precise liquid measurement and dispensing.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/11/2-1-1024x683.png",
  },
  {
    id: 3,
    name: "Pipette Pump",
    category: "Plastic Labware",
    tag: "Pipettes",
    description: "Laboratory pipette pump for controlled liquid transfer.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/11/3-1-1024x683.png",
  },
  {
    id: 4,
    name: "Pasture Pipette",
    category: "Plastic Labware",
    tag: "Pipettes",
    description: "Disposable pipette for transferring small quantities of liquids.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/11/4-1-1024x683.png",
  },
  {
    id: 5,
    name: "Petri Dish Disposable (Round Shape)",
    category: "Plastic Labware",
    tag: "Petri Dishes",
    description: "Disposable round petri dish for laboratory culture and sample testing.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-18-1024x683.png",
  },
  {
    id: 6,
    name: "Petri Dish Disposable (Square Shape)",
    category: "Plastic Labware",
    tag: "Petri Dishes",
    description: "Disposable square petri dish for laboratory culture applications.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-19-1024x683.png",
  },
  {
    id: 7,
    name: "PCR Tube (Flat Cap Imported)",
    category: "Plastic Labware",
    tag: "PCR Tubes",
    description: "PCR tube with flat cap for molecular biology and laboratory testing.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-20-1024x683.png",
  },
  {
    id: 8,
    name: "Centrifuge Tube",
    category: "Plastic Labware",
    tag: "Centrifuge",
    description: "Plastic centrifuge tube for sample separation and laboratory storage.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-21-1-1024x683.png",
  },
  {
    id: 9,
    name: "Oakridge Centrifuge Tube",
    category: "Plastic Labware",
    tag: "Centrifuge",
    description: "Oakridge centrifuge tube designed for laboratory sample processing.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-23-1024x683.png",
  },
  {
    id: 10,
    name: "Cryo Vial (Screw Cap, Sterile)",
    category: "Plastic Labware",
    tag: "Sample Storage",
    description: "Sterile screw-cap cryogenic vial for secure sample storage.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-24-1024x683.png",
  },
  {
    id: 11,
    name: "Micro Tip Box",
    category: "Plastic Labware",
    tag: "Pipette Accessories",
    description: "Storage box for organizing and protecting laboratory micropipette tips.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-26-1024x683.png",
  },
  {
    id: 12,
    name: "Storage Vial",
    category: "Plastic Labware",
    tag: "Sample Storage",
    description: "Laboratory storage vial for sample collection and preservation.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-27-1024x683.png",
  },
  {
    id: 13,
    name: "Vacuum Desicator",
    category: "Plastic Labware",
    tag: "Storage Equipment",
    description: "Desiccator for protecting laboratory materials from moisture.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-28-1024x683.png",
  },
  {
    id: 14,
    name: "Beaker Plastic",
    category: "Plastic Labware",
    tag: "Laboratory Containers",
    description: "Plastic laboratory beaker for liquid handling and measurement.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-29-1024x683.png",
  },
  {
    id: 15,
    name: "Test Tube Stand (Material: P.P)",
    category: "Plastic Labware",
    tag: "Laboratory Racks",
    description: "Polypropylene test tube stand for organized tube storage.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-30-1024x683.png",
  },
  {
    id: 16,
    name: "Test Tube Stand (Material: P.C)",
    category: "Plastic Labware",
    tag: "Laboratory Racks",
    description: "Polycarbonate test tube stand for laboratory sample organization.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-32-1024x683.png",
  },
  {
    id: 17,
    name: "Plastic Measuring Jug",
    category: "Plastic Labware",
    tag: "Measuring Equipment",
    description: "Plastic measuring jug for laboratory liquid measurement.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-33-1024x683.png",
  },
  {
    id: 18,
    name: "Wash Bottles",
    category: "Plastic Labware",
    tag: "Laboratory Bottles",
    description: "Wash bottles for dispensing distilled water and laboratory solutions.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-34-1024x683.png",
  },
  {
    id: 19,
    name: "Plastic Funnel P.P",
    category: "Plastic Labware",
    tag: "Laboratory Funnels",
    description: "Polypropylene funnel for transferring liquids in laboratory applications.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-36-1024x683.png",
  },
  {
    id: 20,
    name: "Powder Funnel",
    category: "Plastic Labware",
    tag: "Laboratory Funnels",
    description: "Plastic powder funnel for transferring dry laboratory materials.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-35-1024x683.png",
  },
  {
    id: 21,
    name: "Carboy (Polypropylene)",
    category: "Plastic Labware",
    tag: "Storage Containers",
    description: "Polypropylene carboy for laboratory liquid storage.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-37-1024x683.png",
  },
  {
    id: 22,
    name: "Carboy with Stopcock (Polypropylene)",
    category: "Plastic Labware",
    tag: "Storage Containers",
    description: "Polypropylene carboy with stopcock for controlled liquid dispensing.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-38-1024x683.png",
  },
  {
    id: 23,
    name: "Reagent Bottle HDPE (Narrow Mouth Amber)",
    category: "Plastic Labware",
    tag: "Reagent Bottles",
    description: "Amber HDPE narrow-mouth bottle for laboratory reagent storage.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-39-1024x683.png",
  },
  {
    id: 24,
    name: "Reagent Bottle HDPE (Wide Mouth Amber)",
    category: "Plastic Labware",
    tag: "Reagent Bottles",
    description: "Amber HDPE wide-mouth bottle for storing laboratory reagents.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-40-1024x683.png",
  },
  {
    id: 25,
    name: "Conical Flask (Material: Polypropylene)",
    category: "Plastic Labware",
    tag: "Laboratory Flasks",
    description: "Polypropylene conical flask for laboratory liquid handling.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-41-1024x683.png",
  },
  {
    id: 26,
    name: "M.C.T. Twin Rack",
    category: "Plastic Labware",
    tag: "Laboratory Racks",
    description: "Twin rack for organizing microcentrifuge tubes.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-42-1024x683.png",
  },
  {
    id: 27,
    name: "P.C.R. Tube Rack",
    category: "Plastic Labware",
    tag: "Laboratory Racks",
    description: "PCR tube rack for organized laboratory sample handling.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-43-1024x683.png",
  },
  {
    id: 28,
    name: "Coplin Jar",
    category: "Plastic Labware",
    tag: "Laboratory Containers",
    description: "Coplin jar for laboratory slide staining and processing.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-44-1024x683.png",
  },
  {
    id: 29,
    name: "Plastic Trays",
    category: "Plastic Labware",
    tag: "Laboratory Accessories",
    description: "Plastic laboratory trays for handling and organizing materials.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-45-1024x683.png",
  },
  {
    id: 30,
    name: "Spatula Plastic",
    category: "Plastic Labware",
    tag: "Laboratory Tools",
    description: "Plastic spatula for handling and transferring laboratory materials.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-46-1024x683.png",
  },
  {
    id: 31,
    name: "Slide Storage Rack",
    category: "Plastic Labware",
    tag: "Laboratory Racks",
    description: "Storage rack for organizing laboratory slides.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-47-1024x683.png",
  },
  {
    id: 32,
    name: "Centrifuge Tube Box",
    category: "Plastic Labware",
    tag: "Sample Storage",
    description: "Storage box for organizing and protecting centrifuge tubes.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-48-1024x683.png",
  },

  // LABORATORY GLASS WARE PRODUCTS

  {
    id: 33,
    name: "Automatic Water Distillation Unit (Glass)",
    category: "Laboratory Glassware",
    tag: "Distillation Equipment",
    description: "Glass water distillation unit for laboratory distilled water production.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-49-1024x683.png",
  },
  {
    id: 34,
    name: "Glass Funnel 60° Angle, Long Stem",
    category: "Laboratory Glassware",
    tag: "Laboratory Funnels",
    description: "Long-stem glass funnel for transferring liquids and laboratory materials.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-50-1024x683.png",
  },
  {
    id: 35,
    name: "Glass Funnel (Powder Funnel)",
    category: "Laboratory Glassware",
    tag: "Laboratory Funnels",
    description: "Glass powder funnel designed for transferring dry laboratory materials.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-51-1024x683.png",
  },
  {
    id: 36,
    name: "TLC Jar / Weighing Bottle with Interchangeable Stopper",
    category: "Laboratory Glassware",
    tag: "Glass Containers",
    description: "Glass container for thin-layer chromatography and sample handling.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-52-1024x683.png",
  },
  {
    id: 37,
    name: "Filtration Assembly Glass",
    category: "Laboratory Glassware",
    tag: "Filtration Equipment",
    description: "Glass filtration assembly for laboratory filtration processes.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-53-1024x683.png",
  },
  {
    id: 38,
    name: "Amber Glass Bottle with Cap Complete",
    category: "Laboratory Glassware",
    tag: "Glass Bottles",
    description: "Amber glass bottle for storing light-sensitive laboratory materials.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-54-1024x683.png",
  },
  {
    id: 39,
    name: "Stoppered Test Tube with I/C Joint",
    category: "Laboratory Glassware",
    tag: "Glass Tubes",
    description: "Stoppered glass test tube for laboratory sample handling.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-55-1024x683.png",
  },
  {
    id: 40,
    name: "Glass Petridish",
    category: "Laboratory Glassware",
    tag: "Glassware",
    description: "Glass petri dish for laboratory sample preparation and observation.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-56-1024x683.png",
  },
  {
    id: 41,
    name: "Measuring Cylinder",
    category: "Laboratory Glassware",
    tag: "Measuring Equipment",
    description: "Graduated glass cylinder for measuring laboratory liquids.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-57-1024x683.png",
  },
  {
    id: 42,
    name: "Glass Stirring Rod",
    category: "Laboratory Glassware",
    tag: "Laboratory Tools",
    description: "Glass stirring rod for mixing laboratory solutions.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-58-1024x683.png",
  },
  {
    id: 43,
    name: "Glass Pasture Pipette",
    category: "Laboratory Glassware",
    tag: "Pipettes",
    description: "Glass Pasteur pipette for transferring small liquid samples.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-59-1024x683.png",
  },
  {
    id: 44,
    name: "Conical Flask",
    category: "Laboratory Glassware",
    tag: "Glass Flasks",
    description: "Conical glass flask for mixing, heating and storing laboratory solutions.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-60-1024x683.png",
  },
  {
    id: 45,
    name: "Filtering Flask",
    category: "Laboratory Glassware",
    tag: "Filtration Equipment",
    description: "Filtering flask for laboratory vacuum filtration applications.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-61-1024x683.png",
  },
  {
    id: 46,
    name: "Glass Beaker",
    category: "Laboratory Glassware",
    tag: "Glassware",
    description: "Glass beaker for measuring, mixing and heating laboratory liquids.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-62-1024x683.png",
  },
  {
    id: 47,
    name: "McCartney Bottle (Glass)",
    category: "Laboratory Glassware",
    tag: "Glass Bottles",
    description: "Glass McCartney bottle for laboratory sample storage.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-63-1024x683.png",
  },
  {
    id: 48,
    name: "Gem Bottle with Screw Cap",
    category: "Laboratory Glassware",
    tag: "Glass Bottles",
    description: "Glass gem bottle with screw cap for laboratory storage.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-64-1024x683.png",
  },

  // LABORATORY INSTRUMENTS

  {
    id: 49,
    name: "Vacuum Pump",
    category: "Laboratory Instruments",
    tag: "Vacuum Equipment",
    description: "Laboratory vacuum pump for applications requiring vacuum pressure.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-65-1024x683.png",
  },
  {
    id: 50,
    name: "Rocker Vacuum Pump (Imported)",
    category: "Laboratory Instruments",
    tag: "Vacuum Equipment",
    description: "Imported rocker vacuum pump for laboratory applications.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-66-1024x683.png",
  },
  {
    id: 51,
    name: "Rockyvac Oil Free Compressor",
    category: "Laboratory Instruments",
    tag: "Air Compressors",
    description: "Oil-free compressor for laboratory air supply applications.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-67-1024x683.png",
  },
  {
    id: 52,
    name: "Vortex Mixer",
    category: "Laboratory Instruments",
    tag: "Mixing Equipment",
    description: "Vortex mixer for mixing and homogenizing laboratory samples.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-68-1024x683.png",
  },
  {
    id: 53,
    name: "Magnetic Stirrer",
    category: "Laboratory Instruments",
    tag: "Mixing Equipment",
    description: "Magnetic stirrer for mixing laboratory liquids and solutions.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-69-1024x683.png",
  },
  {
    id: 54,
    name: "Digital Weighing Scale",
    category: "Laboratory Instruments",
    tag: "Measuring Equipment",
    description: "Digital weighing scale for laboratory sample measurement.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-70-1024x683.png",
  },
  {
    id: 55,
    name: "Heating Mantle (Single Size)",
    category: "Laboratory Instruments",
    tag: "Heating Equipment",
    description: "Laboratory heating mantle for controlled heating of glassware.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-71-1024x683.png",
  },
  {
    id: 56,
    name: "Hot Plate (Laboratory Hot Plate)",
    category: "Laboratory Instruments",
    tag: "Heating Equipment",
    description: "Laboratory hot plate for heating samples and solutions.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-72-1024x683.png",
  },
  {
    id: 57,
    name: "Vacuum Oven - Round",
    category: "Laboratory Instruments",
    tag: "Laboratory Ovens",
    description: "Round vacuum oven for controlled laboratory heating and drying.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-73-1024x683.png",
  },
  {
    id: 58,
    name: "Bacteriological Incubators (Natural Convection)",
    category: "Laboratory Instruments",
    tag: "Incubators",
    description: "Natural convection incubator for bacteriological laboratory applications.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-74-1024x683.png",
  },
  {
    id: 59,
    name: "BOD Incubator",
    category: "Laboratory Instruments",
    tag: "Incubators",
    description: "BOD incubator for controlled temperature laboratory testing.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-75-1024x683.png",
  },
  {
    id: 60,
    name: "Muffle Furnace",
    category: "Laboratory Instruments",
    tag: "Heating Equipment",
    description: "Muffle furnace for high-temperature laboratory heating applications.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-76-1024x683.png",
  },
  {
    id: 61,
    name: "Laboratory Autoclave – Vertical",
    category: "Laboratory Instruments",
    tag: "Sterilization Equipment",
    description: "Vertical laboratory autoclave for sterilizing laboratory equipment and materials.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-77-1024x683.png",
  },
  {
    id: 62,
    name: "Water Bath Rectangular, Double Walled",
    category: "Laboratory Instruments",
    tag: "Water Baths",
    description: "Double-walled rectangular water bath for controlled laboratory heating.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-78-1024x683.png",
  },
  {
    id: 63,
    name: "Serological Water Bath",
    category: "Laboratory Instruments",
    tag: "Water Baths",
    description: "Serological water bath for temperature-controlled laboratory procedures.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-79-1024x683.png",
  },
  {
    id: 64,
    name: "PH Meter - Digital",
    category: "Laboratory Instruments",
    tag: "Measuring Equipment",
    description: "Digital pH meter for measuring acidity and alkalinity of solutions.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-80-1024x683.png",
  },

  // MISCELLANEOUS LAB WARE PRODUCTS

  {
    id: 65,
    name: "Acid & Alkaline Proof Gloves",
    category: "Miscellaneous Labware",
    tag: "Safety & PPE",
    description: "Protective gloves designed for handling laboratory chemicals.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-81-1024x683.png",
  },
  {
    id: 66,
    name: "Surgical Gloves",
    category: "Miscellaneous Labware",
    tag: "Safety & PPE",
    description: "Protective surgical gloves for laboratory and medical handling tasks.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-82-1024x683.png",
  },
  {
    id: 67,
    name: "Latex Gloves",
    category: "Miscellaneous Labware",
    tag: "Safety & PPE",
    description: "Latex gloves for general laboratory protection and handling.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-83-1024x683.png",
  },
  {
    id: 68,
    name: "Aluminium Test Tube Stand",
    category: "Miscellaneous Labware",
    tag: "Laboratory Accessories",
    description: "Aluminium stand for holding and organizing laboratory test tubes.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-84-1024x683.png",
  },
  {
    id: 69,
    name: "Trays S.S",
    category: "Miscellaneous Labware",
    tag: "Stainless Steel",
    description: "Stainless steel trays for laboratory material handling and storage.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-85-1024x683.png",
  },
  {
    id: 70,
    name: "Kidney Trays S.S.",
    category: "Miscellaneous Labware",
    tag: "Stainless Steel",
    description: "Stainless steel kidney trays for laboratory and medical use.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-86-1024x683.png",
  },
  {
    id: 71,
    name: "Beaker S.S. With Handle",
    category: "Miscellaneous Labware",
    tag: "Stainless Steel",
    description: "Stainless steel beaker with handle for laboratory applications.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-87-1024x683.png",
  },
  {
    id: 72,
    name: "Beaker S.S. Without Handle",
    category: "Miscellaneous Labware",
    tag: "Stainless Steel",
    description: "Stainless steel beaker without handle for laboratory applications.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-88-1024x683.png",
  },
  {
    id: 73,
    name: "Scissor S.S",
    category: "Miscellaneous Labware",
    tag: "Laboratory Tools",
    description: "Stainless steel scissors for laboratory handling tasks.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-89-1024x683.png",
  },
  {
    id: 74,
    name: "Spatula S.S",
    category: "Miscellaneous Labware",
    tag: "Laboratory Tools",
    description: "Stainless steel spatula for transferring and handling laboratory materials.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-90-1024x683.png",
  },
  {
    id: 75,
    name: "Tong S.S. (Heavy Duty)",
    category: "Miscellaneous Labware",
    tag: "Laboratory Tools",
    description: "Heavy-duty stainless steel tongs for handling laboratory equipment.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-91-1024x683.png",
  },
  {
    id: 76,
    name: "Thermometer",
    category: "Miscellaneous Labware",
    tag: "Measuring Equipment",
    description: "Thermometer for measuring temperature in laboratory applications.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-92-1024x683.png",
  },
  {
    id: 77,
    name: "Stethoscope",
    category: "Miscellaneous Labware",
    tag: "Medical Equipment",
    description: "Stethoscope for medical examination and diagnostic applications.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-93-1024x683.png",
  },
  {
    id: 78,
    name: "Face Mask Disposable",
    category: "Miscellaneous Labware",
    tag: "Safety & PPE",
    description: "Disposable face mask for personal protection and hygiene.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-94-1024x683.png",
  },
  {
    id: 79,
    name: "N-95 Mask (Respirator Mask)",
    category: "Miscellaneous Labware",
    tag: "Safety & PPE",
    description: "N95 respirator mask for respiratory protection.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-95-1024x683.png",
  },
  {
    id: 80,
    name: "Surgical Gown (Disposable)",
    category: "Miscellaneous Labware",
    tag: "Safety & PPE",
    description: "Disposable surgical gown for protective laboratory and medical use.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-96-1024x683.png",
  },
  {
    id: 81,
    name: "Personal Protective Equipments Kit (PPE Kit)",
    category: "Miscellaneous Labware",
    tag: "Safety & PPE",
    description: "Personal protective equipment kit for laboratory safety.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-97-1024x683.png",
  },
  {
    id: 82,
    name: "Lab Coat White",
    category: "Miscellaneous Labware",
    tag: "Safety & PPE",
    description: "White laboratory coat for protective laboratory workwear.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-98-1024x683.png",
  },
  {
    id: 83,
    name: "Safety Goggle",
    category: "Miscellaneous Labware",
    tag: "Safety & PPE",
    description: "Protective safety goggles for laboratory eye protection.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-99-1024x683.png",
  },
  {
    id: 84,
    name: "Surgical Gown (Disposable)",
    category: "Miscellaneous Labware",
    tag: "Safety & PPE",
    description: "Disposable surgical gown for protective laboratory and medical use.",
    image: "https://praveenscientific.com/wp-content/uploads/2025/12/Untitled-design-100-1024x683.png",
  },
];
