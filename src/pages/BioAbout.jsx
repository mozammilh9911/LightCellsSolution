import { Link } from "react-router-dom";
import "./BioAbout.css";

export default function BioAbout() {
  return (
    <div className="bio-about-page">
      {/* Page Header Banner */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-tag">About Light Cells Solutions</span>
          <h1>Practical technology for better laboratory workflows</h1>
          <p>
            Light Cells Solutions brings together laboratory informatics, life
            science products, and technical support for research, academic, and
            industry teams.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="container grid-2">
          <div className="mv-card">
            <div className="mv-icon">🚀</div>
            <h3>Our Mission</h3>
            <p>
              To help laboratories organize information, source useful research
              products, and make everyday workflows easier to manage.
            </p>
          </div>
          <div className="mv-card">
            <div className="mv-icon">💡</div>
            <h3>Our Vision</h3>
            <p>
              To be a responsive partner for teams working across life science,
              laboratory technology, and scientific equipment.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-title">
            <h2>Core Values That Drive Us</h2>
            <p>The principles that guide how we work with laboratories and research teams.</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <h4>Scientific Rigor</h4>
              <p>We pay attention to the practical details behind laboratory processes, records, and product requirements.</p>
            </div>
            <div className="value-card">
              <h4>Continuous Innovation</h4>
              <p>We stay curious about new tools and approaches that can support changing research needs.</p>
            </div>
            <div className="value-card">
              <h4>Uncompromised Security</h4>
              <p>We treat research information and customer requirements with care throughout each engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Expertise */}
      <section className="expertise-section">
        <div className="container grid-2 align-center">
          <div className="expertise-text">
            <h2>Support shaped around laboratory work</h2>
            <p>
              Laboratory teams balance samples, instruments, records, and
              deadlines every day. We work with you to understand those needs
              and identify relevant products, informatics options, or service
              support.
            </p>
            <ul className="expertise-list">
              <li>✓ LIMS, ELN, and scientific data workflow enquiries</li>
              <li>✓ Product guidance for research and laboratory supplies</li>
              <li>✓ Equipment service and maintenance discussions</li>
            </ul>
            <Link to="/biotechnology/contact">
              <button className="btn-glow-primary">Speak With An Expert</button>
            </Link>
          </div>
          <div className="expertise-image">
            <img 
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80" 
              alt="Laboratory Research" 
            />
          </div>
        </div>
      </section>
    </div>
  );
}