import { useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./Biotechnology.css";

import MobileBottomNav from "./MobileBottomNav";
import data from "../data/biotechData.json";

const applicationsData = data.applications.categories;
const laboratoryEquipmentData = data.equipment.items;

// Structured data with Categories, Subcategories, and Sub-items

function LightCellsLogo({ compact = false }) {
  return (
    <span className={`lightcells-brand${compact ? " lightcells-brand-compact" : ""}`}>
      <img
        src="/images/log9.png"
        alt="LightCells Solutions"
        className="lightcells-logo-img"
      />
    </span>
  );
}

export default function BioLayout() {
  const { pathname, hash } = useLocation();
  const isBiotechnologySection = pathname.startsWith("/biotechnology");
  const isInformationPage = pathname.toLowerCase() === "/information";
  const isCenteredMainNav = ["/", "/about", "/contact"].includes(pathname.toLowerCase());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useLayoutEffect(() => {
    if (hash) {
      scrollToSection(hash.slice(1));
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className={`bio-page${pathname === "/" ? " home-page-layout" : ""}`}>


      <header
        className={`bio-navbar site-header${isBiotechnologySection ? "" : " home-navbar"}${isCenteredMainNav ? " centered-main-nav" : ""}`}
      >
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="main-drawer"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
        <div className="logo">
          <Link to="/" aria-label="LightCells Solutions home">
            <LightCellsLogo />
          </Link>
        </div>

        <ul className="nav-links desktop-navigation">
          {/* 1st Position: Home */}
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {/* ===========================================
              HOME PAGE SPECIFIC LINKS
          =========================================== */}
          {pathname === "/" || pathname === "/about" ? (
            <>
              <li>
                <NavLink to="/biotechnology">Life Sciences</NavLink>
              </li>
              <li>
                <NavLink to="/Information">Information Technology</NavLink>
              </li>
      
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
            </>
          ) : (
            /* ===========================================
                SUB-PAGE / DIVISION SPECIFIC NAVIGATION
            =========================================== */
            <>
              {/* Biotechnology Dropdown Links */}
              {isBiotechnologySection && (
                <>
                  <li className="dropdown-container">
                    <NavLink to="/biotechnology/applications">Applications ▾</NavLink>
                    <ul className="dropdown-menu">
                      {applicationsData.map((app, index) => (
                        <li key={index} className={`subcat-container ${app.subcategories ? "has-submenu" : ""}`}>
                          <Link to={app.path}>
                            <span>{app.name}</span>
                            {app.subcategories && <span className="arrow">▸</span>}
                          </Link>
                          {app.subcategories && (
                            <ul className="submenu-level-2">
                              {app.subcategories.map((sub, subIndex) => {
                                // Check if sub actually has valid nested items
                                const hasNestedItems = sub.items && sub.items.length > 0;

                                return (
                                  <li
                                    key={subIndex}
                                    className={`subcat-item-container ${hasNestedItems ? "has-submenu" : ""}`}
                                  >
                                    <Link to={sub.path}>
                                      <span>{sub.name}</span>
                                      {/* Only show the arrow if nested items actually exist */}
                                      {hasNestedItems && <span className="arrow">▸</span>}
                                    </Link>

                                    {hasNestedItems && (
                                      <ul className="submenu-level-3">
                                        {sub.items.map((item) => (
                                          <li key={item.slug} className="dropdown-sub-item">
                                            <Link to={item.path}>{item.name}</Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="dropdown-container">
                    <NavLink to="/biotechnology/equipment">Laboratory Equipment ▾</NavLink>
                    <ul className="dropdown-menu">
                      {laboratoryEquipmentData.map((eq, index) => (
                        <li key={index} className="dropdown-sub-item">
                          <Link to={eq.path}>{eq.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <NavLink
                      to="/biotechnology/#advanced-scientific-divisions"
                      onClick={() => {
                        document.getElementById("advanced-scientific-divisions")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                    >
                      Services
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/biotechnology/products">Products</NavLink>
                  </li>
                </>
              )}

              {/* Information Page Links */}
              {isInformationPage && (
                <>
                  <li>
                    <NavLink to="/Information#web-app-services" onClick={() => scrollToSection("web-app-services")}>
                      Service
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Information#it-capabilities" onClick={() => scrollToSection("it-capabilities")}>
                      Capabilities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Information#it-industries" onClick={() => scrollToSection("it-industries")}>
                      Industries
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Information#it-resources" onClick={() => scrollToSection("it-resources")}>
                      Resources
                    </NavLink>
                  </li>
                </>
              )}



              {/* About Link for Sub-pages (Smooth scrolls to local section) */}
              <li>
                <NavLink
                  to={
                    isInformationPage
                      ? "/Information#it-about-section"
                      : isBiotechnologySection
                        ? "/biotechnology#about-section"
                        : "/about"
                  }

                  onClick={(e) => {
                    const targetId = isInformationPage
                      ? "it-about-section"
                      : isBiotechnologySection
                        ? "about-section"
                        : null;

                    if (targetId && document.getElementById(targetId)) {
                      e.preventDefault();
                      document.getElementById(targetId)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  About
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="header-actions">
          <Link to="/contact" className="nav-btn header-contact">
            Contact Us
          </Link>
        </div>
      </header>

      {isMenuOpen && (
        <button
          type="button"
          className="drawer-overlay"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}

      <aside
        id="main-drawer"
        className={`navigation-drawer${isMenuOpen ? " drawer-open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="drawer-header">
          <Link to="/" onClick={closeMenu} aria-label="LightCells Solutions home">
            <LightCellsLogo compact />
          </Link>
          <button type="button" onClick={closeMenu} aria-label="Close menu">✕</button>
        </div>

        <nav className="drawer-navigation" aria-label="Main navigation">
          <Link to="/" onClick={closeMenu}><span className="drawer-icon">⌂</span> Home</Link>

          <details open={isBiotechnologySection}>
            <summary><span className="drawer-icon">🧬</span> Life Sciences</summary>
            <div className="drawer-submenu">
              <Link to="/biotechnology" onClick={closeMenu}>Overview</Link>
              <details>
                <summary>Applications</summary>
                <div className="drawer-nested">
                  {applicationsData.map((app) => (
                    <details key={app.path}>
                      <summary>{app.name}</summary>
                      <div className="drawer-nested">
                        {app.subcategories.map((sub) => (
                          <details key={sub.path}>
                            <summary>{sub.name}</summary>
                            <div className="drawer-nested">
                              <Link to={sub.path} onClick={closeMenu}>View Category</Link>
                              {/* {sub.items.map((item) => (
                                <Link
                                  key={item}
                                  to={`${sub.path}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                  onClick={closeMenu}
                                >{item}</Link>
                              ))} */}

                              {sub.items.map((item) => (
                                <Link key={item.slug} to={item.path} onClick={closeMenu}>
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </details>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </details>
              <details>
                <summary>Laboratory Equipment</summary>
                <div className="drawer-nested">
                  {laboratoryEquipmentData.map((eq) => (
                    <Link key={eq.path} to={eq.path} onClick={closeMenu}>{eq.name}</Link>
                  ))}
                </div>
              </details>
              <Link to="/biotechnology/products" onClick={closeMenu}>Products</Link>
              <Link to="/biotechnology#advanced-scientific-divisions" onClick={closeMenu}>Services</Link>
            </div>
          </details>

          <details open={isInformationPage}>
            <summary><span className="drawer-icon">💻</span> Information Technology</summary>
            <div className="drawer-submenu">
              <Link to="/Information" onClick={closeMenu}>Overview</Link>
              <Link to="/Information#web-app-services" onClick={closeMenu}>Services</Link>
              <Link to="/Information#it-capabilities" onClick={closeMenu}>Capabilities</Link>
              <Link to="/Information#it-industries" onClick={closeMenu}>Industries</Link>
              <Link to="/Information#it-resources" onClick={closeMenu}>Resources</Link>
              <Link to="/Information#it-about-section" onClick={closeMenu}>About</Link>
            </div>
          </details>



          <Link to="/about" onClick={closeMenu}><span className="drawer-icon">ⓘ</span> About Us</Link>
          <Link to="/contact" className="drawer-contact-link" onClick={closeMenu}>
            <span className="drawer-icon">✉</span> Contact Us
          </Link>
        </nav>

        <div className="drawer-footer">
          <p>LightCells Solutions</p>
          <small>Life Sciences • Information Technology </small>
        </div>
      </aside>

      {/* DYNAMIC PAGE / SUB-SECTION CONTENT */}
      <main>
        <Outlet />
      </main>

      {/* COMMON FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div>
            <h3>Light Cells Solutions</h3>
            <p>Life Sciences and Information Technology Solutions for organizations and laboratories.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <p><Link to="/">Home</Link></p>
            <p><Link to="/Information">Information Technology</Link></p>
            <p><Link to="/about">About</Link></p>
            {isBiotechnologySection && (
              <>
                <p><Link to="/biotechnology/applications">Applications</Link></p>
                <p><Link to="/biotechnology/equipment">Laboratory Equipment</Link></p>
                <p><Link to="/biotechnology/products">Products</Link></p>
              </>
            )}
            <p><Link to="/contact">Contact Us</Link></p>
          </div>

          <div>
            <h4>Contact</h4>
            <p><a href="mailto:lightcellssolutions@gmail.com">lightcellssolutions@gmail.com</a></p>
            <p><a href="tel:+919999966358">+91 99-9996-6358</a></p>
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} Light Cells Solutions. All Rights Reserved.
        </div>
      </footer>

      <MobileBottomNav onMenuClick={() => setIsMenuOpen(true)} />



    </div>
  );
}