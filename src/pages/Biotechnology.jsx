import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Biotechnology.css";
import Carousel from "./Carousel";

// 6 Featured Products
const BIOTECH_FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Research Antibodies",
    category: "Antibodies",
    tag: "Antibody Reagents",
    description: "Monoclonal and polyclonal antibody options for immunoassays, detection, and laboratory research.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Assay Kits",
    category: "Assay Kits",
    tag: "Research Applications",
    description: "Ready-to-use assay formats for routine measurements and research workflows.",
    image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Cell Culture Media",
    category: "Cell Culture & Media",
    tag: "Cell Culture",
    description: "Culture media and related essentials for routine cell growth and maintenance workflows.",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "ELISA Kits",
    category: "ELISA Kits",
    tag: "Immunoassays",
    description: "Immunoassay kits for target detection and quantitative laboratory analysis.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Laboratory Equipment",
    category: "Laboratory Equipment",
    tag: "Lab Instruments",
    description: "Equipment options for sample preparation, measurement, and everyday laboratory operations.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Molecular Biology Reagents",
    category: "Molecular Biology Reagents",
    tag: "Molecular Biology",
    description: "Reagents and kits for nucleic acid preparation, amplification, and related workflows.",
    image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

// 8 Platform Solutions Cards with moving images
const SOLUTIONS_CARDS_DATA = [
  {
    id: 1,
    title: "Antibodies",
    description: "Antibody options for immunoassays, target detection, and laboratory research.",
    images: [
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 2,
    title: "Assay Kits",
    description: "Assay formats for routine measurements and life science research.",
    images: [
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 3,
    title: "Cell Culture & Media",
    description: "Media and related supplies for cell culture workflows.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 4,
    title: "ELISA Kits",
    description: "ELISA formats for target detection and quantitative analysis.",
    images: [
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 5,
    title: "Laboratory Equipment",
    description: "Equipment options for sample preparation, measurement, and routine lab work.",
    images: [
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 6,
    title: "Molecular Biology Reagents",
    description: "Reagents and kits for nucleic acid preparation and molecular biology workflows.",
    images: [
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 7,
    title: "Proteins & Enzymes",
    description: "Protein and enzyme reagents for biochemical assays and research.",
    images: [
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 8,
    title: "Custom Services",
    description: "Discuss custom synthesis, assay support, and project-specific laboratory needs.",
    images: [
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80",
    ],
  },
];

// 8 Stylish Division / Service Boxes
const STYLISH_BOXES_DATA = [
  {
    id: 1,
    icon: "🧬",
    title: "Next-Generation Sequencing (NGS) Analysis",
    description: "Support for organizing sequencing data and preparing clear downstream reports.",
  },
  {
    id: 2,
    icon: "🔬",
    title: "Global Proteome Analysis",
    description: "Protein-level data review for comparing samples and exploring biological patterns.",
  },
  {
    id: 3,
    icon: "💊",
    title: "Drug Screening & Molecular Dynamics",
    description: "Early-stage compound evaluation that combines laboratory and computational approaches.",
  },
  {
    id: 4,
    icon: "🧪",
    title: "Custom Synthesis",
    description: "Discuss project-specific peptide or compound preparation with our team.",
  },
  {
    id: 5,
    icon: "🥗",
    title: "Food & Cosmetics Product Testing",
    description: "Laboratory testing support for food, personal-care, and healthcare product teams.",
  },
  {
    id: 6,
    icon: "✒️",
    title: "Scientific Writing Support",
    description: "Help shaping manuscripts, proposals, and technical materials for scientific audiences.",
  },
  {
    id: 7,
    icon: "🔧",
    title: "Lab Instrument Service & AMC",
    description: "Discuss equipment installation, routine calibration, preventive care, and maintenance plans.",
  },
  {
    id: 8,
    icon: "🛡️",
    title: "Assays, Antibodies & Recombinant Proteins",
    description: "Find assay, antibody, and protein reagents suited to your research application.",
  },
];

function SolutionCard({ item }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % item.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [item.images.length]);

  return (
    <div className="gbt-pill-card">
      <div className="card-top-image">
        {item.images.map((imgUrl, idx) => (
          <img
            key={idx}
            src={imgUrl}
            alt={item.title}
            className={`sliding-img ${idx === currentImgIndex ? "active" : ""}`}
            loading="lazy"
          />
        ))}
        <div className="image-gloss-overlay"></div>
      </div>
      <div className="card-bottom-body">
        <h3 className="card-title-text">{item.title}</h3>
        <p>{item.description}</p>
        <Link 
          to="/biotechnology/products" 
          className={`styled-circle-btn ${item.id % 2 === 0 ? "cyan-variant" : ""}`}
        >
          <span className="arrow-icon">→</span>
        </Link>
      </div>
    </div>
  );
}

export default function Biotechnology() {
  const [inquiryProduct, setInquiryProduct] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash !== "#advanced-scientific-divisions") return;

    document.getElementById("advanced-scientific-divisions")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [hash]);

  return (
    <div className="biotechnology-page">
      {/* 1. CAROUSEL HERO SECTION */}
      <Carousel />

      {/* 2. ABOUT SECTION */}
      <section className="about-section">
        <div className="section-header">
          <h2>About Our Biotechnology Division</h2>
          <p>
            We help research, academic, and industry laboratories find the
            products, informatics tools, and technical support that fit their
            day-to-day scientific work.
          </p>
          <Link to="/biotechnology/about">
            <button className="section-btn">Read More</button>
          </Link>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="products-section">
        <div className="solutions-container">
          <div className="section-header text-center" style={{ marginBottom: "40px" }}>
            <h2>Our Featured Products</h2>
            <p>Browse antibodies, assay kits, cell culture supplies, molecular reagents, proteins, and laboratory essentials.</p>
          </div>

          <div className="edge-product-grid">
            {BIOTECH_FEATURED_PRODUCTS.map((product) => (
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
                    onClick={() => setInquiryProduct(product)}
                  >
                    Instant Inquiry ⚡
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="see-more-container" style={{ textAlign: "center", marginTop: "40px" }}>
            <Link to="/biotechnology/products#catalog-search">
              <button className="see-more-btn">
                See More Products <span className="arrow">→</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 8-CARD MOVING IMAGE SOLUTIONS GRID */}
      <section className="solutions-cards-section">
        <div className="solutions-container">
          <div className="solutions-section-heading">
            <h2 className="solutions-main-title">Product Categories</h2>
            <p>Browse antibodies, assay kits, cell culture supplies, molecular biology reagents, proteins, and custom research support.</p>
          </div>

          <div className="solutions-grid">
            {SOLUTIONS_CARDS_DATA.map((card) => (
              <SolutionCard key={card.id} item={card} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. 8 STYLISH INDIVIDUAL BOXES SECTION (Advanced Scientific Divisions & Capabilities) */}
      <section
        id="advanced-scientific-divisions"
        className={`stylish-boxes-section${hash === "#advanced-scientific-divisions" ? " is-highlighted" : ""}`}
      >
        <div className="solutions-container">
          <div className="section-header text-center" style={{ marginBottom: "40px" }}>
            <h2>Advanced Scientific Divisions & Capabilities</h2>
            <p>Explore research services, technical support, and laboratory equipment care.</p>
          </div>

          <div className="stylish-boxes-grid">
            {STYLISH_BOXES_DATA.map((box) => (
              <div className="stylish-grid-box" key={box.id}>
                <div className="box-icon-wrap">{box.icon}</div>
                <h3 className="stylish-box-title">{box.title}</h3>
                <p className="stylish-box-desc">{box.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SERVICES SECTION */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Implementation</h3>
            <p>Plan LIMS, ELN, and scientific data workflows around your laboratory processes.</p>
            <Link to="/biotechnology/#advanced-scientific-divisions">
              <button className="read-more-btn">Learn More</button>
            </Link>
          </div>
          <div className="service-card">
            <h3>Validation</h3>
            <p>Organize documentation, system testing, and validation activities for laboratory workflows.</p>
            <Link to="/biotechnology/#advanced-scientific-divisions">
              <button className="read-more-btn">Learn More</button>
            </Link>
          </div>
          <div className="service-card">
            <h3>Consulting</h3>
            <p>Get guidance on laboratory technology, product selection, and research workflows.</p>
            <Link to="/biotechnology/#advanced-scientific-divisions">
              <button className="read-more-btn">Learn More</button>
            </Link>
          </div>
          <div className="service-card">
            <h3>Automation</h3>
            <p>Identify repetitive tasks and explore practical opportunities to streamline lab work.</p>
            <Link to="/biotechnology/#advanced-scientific-divisions">
              <button className="read-more-btn">Learn More</button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. STATS SECTION */}
      <section className="stats-section">
        <div className="stat-card">
          <h2>Products</h2>
          <p>Research supplies and lab essentials</p>
        </div>
        <div className="stat-card">
          <h2>Informatics</h2>
          <p>Tools for laboratory information workflows</p>
        </div>
        <div className="stat-card">
          <h2>Support</h2>
          <p>Service and maintenance enquiries</p>
        </div>
      </section>

      {/* 8. CONTACT */}
      <section className="cta-section">
        <h2>Looking for a laboratory product or service?</h2>
        <p>Tell us what your team needs and we can help direct your enquiry.</p>
        <Link to="/biotechnology/contact">
          <button className="contact-btn">Contact Us</button>
        </Link>
      </section>

      {/* 9. FLOATING HELP BUTTON & POPUP */}
     
      {/* Small Floating Help Button */}
<button 
  className="floating-help-btn"
  onClick={() => setIsHelpOpen(!isHelpOpen)}
  title="Need Assistance?"
>
  {isHelpOpen ? "✕" : "💬"}
</button>

      {isHelpOpen && (
        <div className="help-popup-card">
          <div className="help-header">
            <h3>Biotech Support Assistant</h3>
            <p>Ask us about products, informatics, or laboratory support.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("This support form is a preview and is not connected to a submission service yet.");
              setIsHelpOpen(false);
            }}
          >
            <div className="form-field">
              <label>Your Name</label>
              <input type="text" required placeholder="Dr. / Mr. / Ms. Name" />
            </div>
            <div className="form-field">
              <label>Email Address</label>
              <input type="email" required placeholder="name@institution.com" />
            </div>
            <div className="form-field">
              <label>Your Query</label>
              <textarea rows="3" required placeholder="Tell us about the products or support you are looking for..."></textarea>
            </div>
            <button type="submit" className="help-submit-btn">
              Send Support Request 🚀
            </button>
          </form>
        </div>
      )}

      {/* 10. INQUIRY MODAL OVERLAY */}
      {inquiryProduct && (
        <div className="glass-modal-backdrop" onClick={() => setInquiryProduct(null)}>
          <div className="glass-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setInquiryProduct(null)}>
              ✕
            </button>
            <div className="modal-header">
              <span className="modal-tag">PRODUCT INQUIRY</span>
              <h3>{inquiryProduct.name}</h3>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("This product enquiry form is a preview and is not connected to a submission service yet.");
                setInquiryProduct(null);
              }}
            >
              <div className="form-field">
                <label>Your Name</label>
                <input type="text" required placeholder="Dr. / Mr. / Ms. Full Name" />
              </div>
              <div className="form-field">
                <label>Contact Email / Phone</label>
                <input type="text" required placeholder="contact@lab-institution.com" />
              </div>
              <div className="form-field">
                <label>Target Quantity</label>
                <input type="number" min="1" defaultValue="1" />
              </div>
              <div className="form-field">
                <label>Custom Specifications / Remarks</label>
                <textarea rows="3" placeholder="Mention volume capacity, delivery timeline, or tender specs..."></textarea>
              </div>
              <button type="submit" className="btn-cyan-glow full-width">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}