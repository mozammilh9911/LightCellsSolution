
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./Biotechnology.css";

import MobileBottomNav from "./MobileBottomNav";

import {
  applicationsNavigation,
  equipmentNavigation,
} from "../data/dropdownData";

const applicationsData = applicationsNavigation;
const laboratoryEquipmentData = equipmentNavigation;

// DESKTOP NAVIGATION RENDERER
function NavigationItems({ items, closeMenu }) {
  return (
    <>
      {items.map((item) => {
        const hasChildren = item.children?.length > 0;

        return (
          <li
            key={item.path}
            className={
              hasChildren
                ? "subcat-container has-submenu"
                : "dropdown-sub-item"
            }
          >
            <Link to={item.path} onClick={closeMenu}>
              <span>{item.name}</span>

              {hasChildren && (
                <span className="arrow">▸</span>
              )}
            </Link>

            {hasChildren && (
              <ul className="submenu-level-2">
                <NavigationItems
                  items={item.children}
                  closeMenu={closeMenu}
                />
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
}

// MOBILE NAVIGATION RENDERER
function MobileNavigationItems({ items, closeMenu }) {
  return (
    <>
      {items.map((item) => {
        const hasChildren = item.children?.length > 0;

        return (
          <div key={item.path} className="mobile-navigation-item">
            {hasChildren ? (
              <details>
                <summary>{item.name}</summary>

                <div className="drawer-nested">
                  <Link to={item.path} onClick={closeMenu}>
                    View {item.name}
                  </Link>

                  <MobileNavigationItems
                    items={item.children}
                    closeMenu={closeMenu}
                  />
                </div>
              </details>
            ) : (
              <Link to={item.path} onClick={closeMenu}>
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </>
  );
}

// LOGO
function LightCellsLogo({ compact = false }) {
  return (
    <span
      className={`lightcells-brand${
        compact ? " lightcells-brand-compact" : ""
      }`}
    >
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

  const isBiotechnologySection =
    pathname.startsWith("/biotechnology");

  const isInformationPage =
    pathname.toLowerCase() === "/information";

  const isCenteredMainNav = [
    "/",
    "/about",
    "/contact",
  ].includes(pathname.toLowerCase());

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // CLOSE DRAWER WHEN ROUTE CHANGES
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // CLOSE DRAWER USING ESCAPE KEY
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  // SCROLL TO SECTION
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // PAGE SCROLL MANAGEMENT
  useLayoutEffect(() => {
    if (hash) {
      scrollToSection(hash.slice(1));
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div
      className={`bio-page${
        pathname === "/" ? " home-page-layout" : ""
      }`}
    >
      {/* HEADER */}
      <header
        className={`bio-navbar site-header${
          isBiotechnologySection ? "" : " home-navbar"
        }${
          isCenteredMainNav ? " centered-main-nav" : ""
        }`}
      >
        {/* HAMBURGER */}
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={
            isMenuOpen ? "Close navigation" : "Open navigation"
          }
          aria-expanded={isMenuOpen}
          aria-controls="main-drawer"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* LOGO */}
        <div className="logo">
          <Link to="/" aria-label="LightCells Solutions home">
            <LightCellsLogo />
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <ul className="nav-links desktop-navigation">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {/* HOME PAGE NAVIGATION */}
          {pathname === "/" || pathname === "/about" ? (
            <>
              <li>
                <NavLink to="/biotechnology">
                  Life Sciences
                </NavLink>
              </li>

              <li>
                <NavLink to="/Information">
                  Information Technology
                </NavLink>
              </li>

              <li>
                <NavLink to="/about">About</NavLink>
              </li>
            </>
          ) : (
            <>
              {/* BIOTECHNOLOGY NAVIGATION */}
              {isBiotechnologySection && (
                <>
                  {/* APPLICATIONS */}
                  <li className="dropdown-container">
                    <NavLink to="/biotechnology/applications">
                      Applications ▾
                    </NavLink>

                    <ul className="dropdown-menu">
                      <NavigationItems
                        items={applicationsData}
                        closeMenu={closeMenu}
                      />
                    </ul>
                  </li>

                  {/* LABORATORY EQUIPMENT */}
                  <li className="dropdown-container">
                    <NavLink to="/biotechnology/equipment">
                      Laboratory Equipment ▾
                    </NavLink>

                    <ul className="dropdown-menu">
                      <NavigationItems
                        items={laboratoryEquipmentData}
                        closeMenu={closeMenu}
                      />
                    </ul>
                  </li>

                  {/* SERVICES */}
                  <li>
                    <NavLink
                      to="/biotechnology/#advanced-scientific-divisions"
                      onClick={() =>
                        scrollToSection(
                          "advanced-scientific-divisions"
                        )
                      }
                    >
                      Services
                    </NavLink>
                  </li>

                  {/* PRODUCTS */}
                  <li>
                    <NavLink to="/biotechnology/products">
                      Products
                    </NavLink>
                  </li>
                </>
              )}

              {/* INFORMATION TECHNOLOGY NAVIGATION */}
              {isInformationPage && (
                <>
                  <li>
                    <NavLink
                      to="/Information#web-app-services"
                      onClick={() =>
                        scrollToSection("web-app-services")
                      }
                    >
                      Service
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/Information#it-capabilities"
                      onClick={() =>
                        scrollToSection("it-capabilities")
                      }
                    >
                      Capabilities
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/Information#it-industries"
                      onClick={() =>
                        scrollToSection("it-industries")
                      }
                    >
                      Industries
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/Information#it-resources"
                      onClick={() =>
                        scrollToSection("it-resources")
                      }
                    >
                      Resources
                    </NavLink>
                  </li>
                </>
              )}

              {/* ABOUT NAVIGATION */}
              <li>
                <NavLink
                  to={
                    isInformationPage
                      ? "/Information#it-about-section"
                      : isBiotechnologySection
                        ? "/biotechnology#about-section"
                        : "/about"
                  }
                  onClick={(event) => {
                    const targetId = isInformationPage
                      ? "it-about-section"
                      : isBiotechnologySection
                        ? "about-section"
                        : null;

                    if (
                      targetId &&
                      document.getElementById(targetId)
                    ) {
                      event.preventDefault();
                      scrollToSection(targetId);
                    }
                  }}
                >
                  About
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* CONTACT BUTTON */}
        <div className="header-actions">
          <Link to="/contact" className="nav-btn header-contact">
            Contact Us
          </Link>
        </div>
      </header>

      {/* DRAWER OVERLAY */}
      {isMenuOpen && (
        <button
          type="button"
          className="drawer-overlay"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}

      {/* MOBILE DRAWER */}
      <aside
        id="main-drawer"
        className={`navigation-drawer${
          isMenuOpen ? " drawer-open" : ""
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="drawer-header">
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="LightCells Solutions home"
          >
            <LightCellsLogo compact />
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav
          className="drawer-navigation"
          aria-label="Main navigation"
        >
          <Link to="/" onClick={closeMenu}>
            <span className="drawer-icon">⌂</span>
            Home
          </Link>

          {/* LIFE SCIENCES */}
          <details open={isBiotechnologySection}>
            <summary>
              <span className="drawer-icon">🧬</span>
              Life Sciences
            </summary>

            <div className="drawer-submenu">
              <Link to="/biotechnology" onClick={closeMenu}>
                Overview
              </Link>

              {/* APPLICATIONS */}
              <details>
                <summary>Applications</summary>

                <div className="drawer-nested">
                  <MobileNavigationItems
                    items={applicationsData}
                    closeMenu={closeMenu}
                  />
                </div>
              </details>

              {/* LABORATORY EQUIPMENT */}
              <details>
                <summary>Laboratory Equipment</summary>

                <div className="drawer-nested">
                  <MobileNavigationItems
                    items={laboratoryEquipmentData}
                    closeMenu={closeMenu}
                  />
                </div>
              </details>

              <Link
                to="/biotechnology/products"
                onClick={closeMenu}
              >
                Products
              </Link>

              <Link
                to="/biotechnology#advanced-scientific-divisions"
                onClick={closeMenu}
              >
                Services
              </Link>
            </div>
          </details>

          {/* INFORMATION TECHNOLOGY */}
          <details open={isInformationPage}>
            <summary>
              <span className="drawer-icon">💻</span>
              Information Technology
            </summary>

            <div className="drawer-submenu">
              <Link to="/Information" onClick={closeMenu}>
                Overview
              </Link>

              <Link
                to="/Information#web-app-services"
                onClick={closeMenu}
              >
                Services
              </Link>

              <Link
                to="/Information#it-capabilities"
                onClick={closeMenu}
              >
                Capabilities
              </Link>

              <Link
                to="/Information#it-industries"
                onClick={closeMenu}
              >
                Industries
              </Link>

              <Link
                to="/Information#it-resources"
                onClick={closeMenu}
              >
                Resources
              </Link>

              <Link
                to="/Information#it-about-section"
                onClick={closeMenu}
              >
                About
              </Link>
            </div>
          </details>

          <Link to="/about" onClick={closeMenu}>
            <span className="drawer-icon">ⓘ</span>
            About Us
          </Link>

          <Link
            to="/contact"
            className="drawer-contact-link"
            onClick={closeMenu}
          >
            <span className="drawer-icon">✉</span>
            Contact Us
          </Link>
        </nav>

        <div className="drawer-footer">
          <p>LightCells Solutions</p>
          <small>
            Life Sciences • Information Technology
          </small>
        </div>
      </aside>

      {/* DYNAMIC PAGE CONTENT */}
      <main>
        <Outlet />
      </main>

      {/* COMMON FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div>
            <h3>Light Cells Solutions</h3>
            <p>
              Life Sciences and Information Technology Solutions
              for organizations and laboratories.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>

            <p><Link to="/">Home</Link></p>
            <p><Link to="/biotechnology">Life Sciences</Link></p>
            <p><Link to="/Information">Information Technology</Link></p>
            <p><Link to="/about">About</Link></p>

            {isBiotechnologySection && (
              <>
                <p>
                  <Link to="/biotechnology/applications">
                    Applications
                  </Link>
                </p>

                <p>
                  <Link to="/biotechnology/equipment">
                    Laboratory Equipment
                  </Link>
                </p>

                <p>
                  <Link to="/biotechnology/products">
                    Products
                  </Link>
                </p>
              </>
            )}

            <p><Link to="/contact">Contact Us</Link></p>
          </div>

          <div>
            <h4>Contact</h4>

            <p>
              <a href="mailto:lightcellssolutions@gmail.com">
                lightcellssolutions@gmail.com
              </a>
            </p>

            <p>
              <a href="tel:+919999966358">
                +91 99-9996-6358
              </a>
            </p>
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} Light Cells Solutions.
          All Rights Reserved.
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION */}
      <MobileBottomNav
        onMenuClick={() => setIsMenuOpen(true)}
      />
    </div>
  );
}
