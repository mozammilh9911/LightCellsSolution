import { useState } from "react";
import "./Contactus.css";

const INQUIRY_EMAIL =
  import.meta.env.VITE_PRODUCT_INQUIRY_EMAIL || "sajda3109@gmail.com";

const CONTACT_CATEGORIES = [
  "General Inquiry",
  "Information Technology",
  "Biotechnology",
  "Service & Maintenance",
];

export default function BiotechnologyContact() {
  const [selectedCategory, setSelectedCategory] = useState("General Inquiry");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });

  const handleChange = (e) => {
    setSubmissionStatus("idle");
    setSubmissionMessage("");
    setFormData((currentData) => ({
      ...currentData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    setSubmissionMessage("");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(INQUIRY_EMAIL)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...formData,
            category: selectedCategory,
            _subject: `Website contact inquiry: ${selectedCategory}`,
          }),
        },
      );
      const result = await response.json();

      if (!response.ok || (result.success !== "true" && result.success !== true)) {
        throw new Error(
          typeof result.message === "string"
            ? result.message
            : "Your message could not be sent. Please try again.",
        );
      }

      setSubmissionStatus("success");
      setSubmissionMessage("Your message was sent successfully. We will contact you soon.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        organization: "",
        message: "",
      });
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again.",
      );
    }
  };

  return (
    <div className="contact-edge-page">
      {/* Page Header Title Section (Replaces Carousel) */}
      <section className="contact-page-header">
        <div className="edge-container">
          <span className="badge-neon">CONTACT DESK</span>
          <h1>Connect With Our Specialists</h1>
          <p>Get in touch for quotations, technical support, or laboratory informatics deployment.</p>
        </div>
      </section>

      {/* Category Filter Pills / Control Bar */}
      <section className="catalog-control-panel">
        <div className="edge-container">
          <div className="glass-control-bar contact-control-bar">
            <div className="control-bar-header">
              <h2>Select an inquiry area</h2>
            </div>
            <div className="category-pills" role="tablist" aria-label="Inquiry area">
              {CONTACT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === category}
                  className={`pill-btn ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Info Grid Section */}
      <section className="edge-contact-section">
        <div className="edge-container">
          <div className="edge-contact-grid">
            
            {/* LEFT PANEL: Inquiry Form */}
            <div className="modern-contact-card">
              <div className="card-header-box">
                <span className="category-tag">{selectedCategory}</span>
                <h3 className="panel-title">Direct Scientific Message</h3>
                <p className="panel-desc">
                  Fill out the details below. Our team responds within 4 business hours.
                </p>
              </div>

              {submissionMessage && (
                <div
                  className={`submission-banner ${submissionStatus}`}
                  role={submissionStatus === "error" ? "alert" : "status"}
                  aria-live="polite"
                >
                  {submissionMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="edge-contact-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contact-full-name">Full Name *</label>
                    <input
                      id="contact-full-name"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={80}
                      autoComplete="name"
                      placeholder="Dr. / Mr. / Ms. Name"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="name@institution.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contact-phone">Phone / Contact *</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      minLength={7}
                      maxLength={20}
                      pattern="(?=.*[0-9])[0-9+() -]{7,20}"
                      title="Enter 7 to 20 characters using digits, spaces, +, parentheses, or hyphens."
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-organization">Organization / University *</label>
                    <input
                      id="contact-organization"
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      required
                      minLength={2}
                      maxLength={120}
                      autoComplete="organization"
                      placeholder="e.g. Apex Biotech Labs"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="contact-category">Inquiry category *</label>
                  <select
                    id="contact-category"
                    value={selectedCategory}
                    onChange={(event) => {
                      setSelectedCategory(event.target.value);
                      setSubmissionStatus("idle");
                      setSubmissionMessage("");
                    }}
                    required
                  >
                    {CONTACT_CATEGORIES.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="contact-message">Message (optional)</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    minLength={10}
                    maxLength={2000}
                    rows={5}
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-cyan-glow full-width-btn"
                  disabled={submissionStatus === "submitting"}
                >
                  {submissionStatus === "submitting" ? "Sending..." : "Submit Official Inquiry ⚡"}
                </button>
              </form>
            </div>

            {/* RIGHT PANEL: Info Cards & Map Holder */}
            <div className="facility-info-stack">
              <div className="quick-info-box">
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div>
                    <h4>Corporate Headquarters</h4>
                    <p>Light Cells Solutions Biotech Tower, Zone C, Tech Park, India</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">✉️</span>
                  <div>
                    <h4>Direct Emails</h4>
                    <p>support@lightcellsbiotech.com</p>
                    <p>sales@lightcellsbiotech.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📞</span>
                  <div>
                    <h4>Support Desk</h4>
                    <p>+91 (0) 80-4567-8900 (Mon–Sat: 9 AM - 6:30 PM)</p>
                  </div>
                </div>
              </div>

              <div className="map-placeholder-card">
                <div className="map-overlay-content">
                  <span className="map-pin">📍</span>
                  <h4>Biotech R&D Center</h4>
                  <p>Interactive Location View</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    Open Google Maps ↗
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Compact Help Button */}
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
            <h3>Quick Support Desk</h3>
            <p>Direct assistance line</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Quick ticket submitted!");
              setIsHelpOpen(false);
            }}
          >
            <div className="form-field">
              <label>Name</label>
              <input type="text" required placeholder="Your Name" />
            </div>
            <div className="form-field">
              <label>Contact Email / Phone</label>
              <input type="text" required placeholder="Phone or Email" />
            </div>
            <div className="form-field">
              <label>Query</label>
              <textarea rows="2" required placeholder="Ask your question..."></textarea>
            </div>
            <button type="submit" className="help-submit-btn">
              Send Quick Ticket 🚀
            </button>
          </form>
        </div>
      )}
    </div>
  );
}