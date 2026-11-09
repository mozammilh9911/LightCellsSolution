import { useState } from "react";
import { Link } from "react-router-dom";
import { MAINTENANCE_SERVICES, getMaintenanceCart, saveMaintenanceCart } from "./maintenanceData";
import "./Maintenance.css";

const MAINTENANCE_CATEGORIES = [
  { id: "instahelp", name: "InstaHelp by UC", image: "/images/maintenance-categories/instahelp.png" },
  { id: "womens-salon", name: "Women's Salon & Spa", image: "/images/maintenance-categories/womens-salon.png" },
  { id: "mens-salon", name: "Men's Salon & Massage", image: "/images/maintenance-categories/mens-salon.png" },
  { id: "cleaning-pest", name: "Cleaning & Pest Control", image: "/images/maintenance-categories/cleaning-pest.png" },
  { id: "wall-panels", name: "Wall Panels by Revamp", image: "/images/maintenance-categories/wall-panels.png" },
  { id: "home-painting", name: "Home Painting & Upgrade", image: "/images/maintenance-categories/home-painting.png" },
  { id: "ac-appliance", name: "AC & Appliance Repair", image: "/images/maintenance-categories/ac-appliance.png" },
  { id: "electrician-plumber", name: "Electrician, Plumber & Carpenter", image: "/images/maintenance-categories/electrician-plumber.png" },
];

const NATIVE_SMART_PRODUCTS = [
  { id: "native-purifier", name: "Native Water Purifier", image: "/images/maintenance-categories/native-purifier.png", badge: "New" },
  { id: "smart-locks", name: "Native Smart Locks", image: "/images/maintenance-categories/smart-locks.png", badge: "Sale" },
];

const HERO_COLLAGE_IMAGES = [
  {
    main: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    sub1: "https://images.unsplash.com/photo-1639772823907-a716be4bdecc?auto=format&fit=crop&w=600&q=80",
    sub2: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
  },
];

const APPLIANCE_SERVICES = [
  {
    id: 1,
    title: "AC repair",
    rating: "4.73",
    reviews: "882K",
    price: "₹299",
    image: "https://images.unsplash.com/photo-1718203862467-c33159fdc504?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Foam-jet AC service",
    rating: "4.75",
    reviews: "3M",
    price: "₹599",
    image: "https://images.unsplash.com/photo-1776860150250-757406c52438?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Water Purifier Service & Installation",
    rating: "4.80",
    reviews: "336K",
    price: "₹299",
    image: "/images/maintenance-categories/water-purifier-product.png",
    imageFit: "contain",
  },
  {
    id: 4,
    title: "TV check-up",
    rating: "4.78",
    reviews: "184K",
    price: "₹249",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Geyser check-up",
    rating: "4.72",
    reviews: "159K",
    price: "₹249",
    image: "/images/maintenance-categories/geyser-product.png",
    imageFit: "contain",
  },
];

const HOME_REPAIR_SERVICES = [
  {
    id: 1,
    title: "Book a carpenter",
    rating: "4.67",
    reviews: "211K",
    price: "₹99",
    image: "https://images.unsplash.com/photo-1659930087003-2d64e33181f7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Electrician consultation",
    rating: "4.75",
    reviews: "196K",
    price: "₹49",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Switch/socket repair & replacement",
    rating: "4.83",
    reviews: "232K",
    price: "₹69",
    image: "https://images.unsplash.com/photo-1610056494071-9373f12bf769?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Fan repair",
    rating: "4.80",
    reviews: "220K",
    price: "₹149",
    image: "https://images.unsplash.com/photo-1609519479841-5fd3b2884e17?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Cupboard repair & installation",
    rating: "4.80",
    reviews: "143K",
    price: "₹99",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
  },
];

const HOME_REPAIR_POPUP_DATA = [
  { id: 1, name: "Electrician", icon: "🔌" },
  { id: 2, name: "Carpenter", icon: "🪵" },
  { id: 3, name: "Furniture Assembly", icon: "🪑" },
];

export default function Maintenance() {
  const [cart, setCart] = useState(getMaintenanceCart);
  const [activeCategory, setActiveCategory] = useState("InstaHelp by UC");
  
  // Modal state handlers for "See all" popups
  const [showApplianceModal, setShowApplianceModal] = useState(false);
  const [showHomeModal, setShowHomeModal] = useState(false);

  const addService = (service) => {
    if (cart.some((item) => item.number === service.number)) return;
    const updatedCart = [...cart, service];
    setCart(updatedCart);
    saveMaintenanceCart(updatedCart);
  };

  return (
    <div className="maintenance-page">
      
      {/* 1. SPLIT-PANE HERO SECTION */}
      <section className="maintenance-split-hero">
        <div className="maintenance-container split-hero-wrapper">
          <div className="split-hero-left">
            <h1 className="split-hero-title">
              Precision maintenance & support at your laboratory
            </h1>

            <div className="split-interactive-card">
              <div className="categories-grid-card">
                {MAINTENANCE_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className={`category-tile ${activeCategory === cat.name ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    <div className="tile-icon-wrap">
                      <img className="tile-image" src={cat.image} alt="" />
                    </div>
                    <span className="tile-name">{cat.name}</span>
                  </div>
                ))}
              </div>

              <div className="native-products-footer">
                <h3>Native Smart Products</h3>
                <div className="categories-grid-card native-products-grid">
                  {NATIVE_SMART_PRODUCTS.map((product) => (
                    <div
                      key={product.id}
                      className={`category-tile ${activeCategory === product.name ? "active" : ""}`}
                      onClick={() => setActiveCategory(product.name)}
                    >
                      <div className="tile-icon-wrap">
                        <img className="tile-image" src={product.image} alt="" />
                        <span className={`tile-product-badge tile-product-badge-${product.badge.toLowerCase()}`}>
                          {product.badge}
                        </span>
                      </div>
                      <span className="tile-name">{product.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="split-hero-right">
            <div className="collage-grid">
              <div className="collage-main-img">
                <img src={HERO_COLLAGE_IMAGES[0].main} alt="Laboratory technician working with equipment" loading="lazy" />
              </div>
              <div className="collage-side-stack">
                <div className="collage-sub-img">
                  <img src={HERO_COLLAGE_IMAGES[0].sub1} alt="Gloved hand using a laboratory microscope" loading="lazy" />
                </div>
                <div className="collage-sub-img">
                  <img src={HERO_COLLAGE_IMAGES[0].sub2} alt="Laboratory technician handling test samples" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAINTENANCE & SUPPORT ABOUT SECTION */}
<section id="maintenance-about-section" className="about-section maintenance-about-section">
  <div className="section-header">
    <h2>About Our Maintenance & Technical Services</h2>
    <p>
      Light Cells Solutions is a technology-backed service platform that connects 
      research facilities, laboratories, and enterprises with certified technical 
      experts for equipment servicing, system calibration, and infrastructure support.
    </p>
    <p>
      We eliminate downtime and safeguard critical workflows by delivering dependable, 
      transparent, and high-precision technical services every single time.
    </p>

    <div className="it-about-highlights">
      <div className="it-highlight-card">
        <h3>Equipment Calibration & Care</h3>
        <p>
          Delivering high-precision maintenance, routine inspection, and performance 
          tuning for scientific instruments and laboratory machinery to ensure operational accuracy.
        </p>
      </div>

      <div className="it-highlight-card">
        <h3>Rapid Technical Response</h3>
        <p>
          Providing on-demand troubleshooting and emergency repair support, connecting your 
          facility with verified technicians to resolve hardware and system faults without delay.
        </p>
      </div>

      <div className="it-highlight-card">
        <h3>Smart Infrastructure Diagnostics</h3>
        <p>
          Deploying preventive diagnostic tools and scheduled upkeep routines designed to extend 
          the lifespan of your hardware and prevent unexpected operational interruptions.
        </p>
      </div>
    </div>

    <blockquote className="about-quote">
      Ensuring reliability, protecting precision — that’s Light Cells Solutions.
    </blockquote>
  </div>
</section>

      {/* 2. APPLIANCE REPAIR & SERVICE SECTION */}
      <section className="uc-pattern-section">
        <div className="maintenance-container">
          <div className="uc-section-header">
            <h2>Appliance repair & service</h2>
            <button className="uc-see-all-btn" onClick={() => setShowApplianceModal(true)}>
              See all
            </button>
          </div>

          <div className="uc-horizontal-scroll-row">
            {APPLIANCE_SERVICES.map((item) => (
              <div className="uc-item-card" key={item.id}>
                <div className="uc-card-img-box">
                  <img
                    className={item.imageFit === "contain" ? "uc-card-image-contain" : undefined}
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                <h4 className="uc-item-title">{item.title}</h4>
                <div className="uc-item-meta">
                  <span className="uc-rating">★ {item.rating} ({item.reviews})</span>
                </div>
                <div className="uc-item-price">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOME REPAIR & INSTALLATION SECTION */}
      <section className="uc-pattern-section">
        <div className="maintenance-container">
          <div className="uc-section-header">
            <h2>Home repair & installation</h2>
            <button className="uc-see-all-btn" onClick={() => setShowHomeModal(true)}>
              See all
            </button>
          </div>

          <div className="uc-horizontal-scroll-row">
            {HOME_REPAIR_SERVICES.map((item) => (
              <div className="uc-item-card" key={item.id}>
                <div className="uc-card-img-box">
                  <img
                    className={item.imageFit === "contain" ? "uc-card-image-contain" : undefined}
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                <h4 className="uc-item-title">{item.title}</h4>
                <div className="uc-item-meta">
                  <span className="uc-rating">★ {item.rating} ({item.reviews})</span>
                </div>
                <div className="uc-item-price">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WALL PANELS PROMOTIONAL BANNER */}
      <section className="uc-promo-banner-section">
        <div className="maintenance-container">
          <div className="uc-promo-banner-box">
            <div className="uc-promo-left">
              <h2>Wall Panels</h2>
              <p>Level up your walls</p>
              <button className="uc-promo-know-btn" onClick={() => alert("Exploring Wall Panels...")}>
                Know more
              </button>
            </div>
            <div className="uc-promo-right">
              <img
                src="https://images.unsplash.com/photo-1585773818428-b50bebdc2344?auto=format&fit=crop&w=1000&q=80"
                alt="Wall Panels"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. MAIN SERVICES CATALOG SECTION */}
      <section id="maintenance-services" className="maintenance-services">
        <div className="maintenance-container">
          <div className="maintenance-section-heading">
            <span className="maintenance-eyebrow">HOW WE CAN HELP</span>
            <h2>Support throughout the equipment lifecycle</h2>
            <p>
              Showing services optimized for: <strong>{activeCategory}</strong>. Choose the support that fits your equipment, schedule, and operational needs.
            </p>
          </div>

          <div className="maintenance-service-grid">
            {MAINTENANCE_SERVICES.map((service) => {
              const isAdded = cart.some((item) => item.number === service.number);
              return (
                <article className="maintenance-service-card" key={service.number}>
                  <span className="maintenance-service-number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button
                    className="maintenance-add-button"
                    type="button"
                    disabled={isAdded}
                    onClick={() => addService(service)}
                  >
                    {isAdded ? "Added to cart" : "Add to cart"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ASSISTANCE CONTACT BAND */}
      <section id="maintenance-support" className="maintenance-contact-band">
        <div className="maintenance-container maintenance-contact-content">
          <div>
            <span className="maintenance-eyebrow">NEED ASSISTANCE?</span>
            <h2>Let’s find the right support for your equipment.</h2>
          </div>
          <Link className="maintenance-secondary-link" to="/contact">
            Contact us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* =========================================================
         MODAL POPUPS FOR "SEE ALL"
         ========================================================= */}

      {/* Appliance repair modal */}
      {showApplianceModal && (
        <div className="uc-modal-backdrop" onClick={() => setShowApplianceModal(false)}>
          <div className="uc-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="uc-modal-close"
              type="button"
              aria-label="Close appliance repair dialog"
              onClick={() => setShowApplianceModal(false)}
            >
              ✕
            </button>
            <div className="uc-modal-card">
              <div className="uc-modal-top">
                <h3>AC & Appliance Repair</h3>
              </div>

              {/* Large Appliances Section */}
              <div className="uc-modal-section-title">Large appliances</div>
              <div className="uc-modal-grid">
                {[
                  { id: 1, name: "AC", icon: "❄️" },
                  { id: 2, name: "Washing Machine", icon: "🧺" },
                  { id: 3, name: "Refrigerator", icon: "🧊" },
                  { id: 4, name: "Television", icon: "📺" },
                  { id: 5, name: "Air Purifier", icon: "🌬️" },
                ].map((item) => (
                  <div className="uc-modal-tile" key={item.id} onClick={() => { alert(`Selected: ${item.name}`); setShowApplianceModal(false); }}>
                    <div className="uc-modal-tile-icon">{item.icon}</div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>

              {/* Other Appliances Section */}
              <div className="uc-modal-section-title" style={{ marginTop: "24px" }}>Other appliances</div>
              <div className="uc-modal-grid">
                {[
                  { id: 6, name: "Chimney", icon: "🧑‍🍳" },
                  { id: 7, name: "Microwave", icon: "📦" },
                  { id: 8, name: "Stove", icon: "🔥" },
                  { id: 9, name: "Laptop", icon: "💻" },
                  { id: 10, name: "RO / Water Purifier", icon: "💧" },
                  { id: 11, name: "Geyser", icon: "🚿" },
                  { id: 12, name: "Air Cooler", icon: "🌀" },
                ].map((item) => (
                  <div className="uc-modal-tile" key={item.id} onClick={() => { alert(`Selected: ${item.name}`); setShowApplianceModal(false); }}>
                    <div className="uc-modal-tile-icon">{item.icon}</div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Home Repair & Installation Modal */}
      {showHomeModal && (
        <div className="uc-modal-backdrop" onClick={() => setShowHomeModal(false)}>
          <div className="uc-modal-dialog uc-home-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="uc-modal-close"
              type="button"
              aria-label="Close home repair dialog"
              onClick={() => setShowHomeModal(false)}
            >
              ✕
            </button>
            <div className="uc-modal-card uc-home-modal-card">
              <div className="uc-modal-top">
                <h3>Home repair & installation</h3>
              </div>
              <div className="uc-modal-grid uc-home-modal-grid">
                {HOME_REPAIR_POPUP_DATA.map((item) => (
                  <div className="uc-modal-tile" key={item.id} onClick={() => { alert(`Selected: ${item.name}`); setShowHomeModal(false); }}>
                    <div className="uc-modal-tile-icon">{item.icon}</div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}