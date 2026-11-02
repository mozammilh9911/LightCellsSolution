import { useLayoutEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./Biotechnology.css";
import MaintenanceHeaderTools from "./MaintenanceHeaderTools";



export default function BioLayout() {
  const { pathname, hash } = useLocation();
  const isBiotechnologySection = pathname.startsWith("/biotechnology");
  const isInformationPage = pathname.toLowerCase() === "/information";
  const isMaintenancePage = pathname.startsWith("/maintenance");
  const isCenteredMainNav = ["/", "/about", "/contact"].includes(pathname.toLowerCase());

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
      <nav
        className={`bio-navbar${isBiotechnologySection ? "" : " home-navbar"}${isCenteredMainNav ? " centered-main-nav" : ""}${isMaintenancePage ? " maintenance-with-tools" : ""}`}
      >
        <div className="logo">
          <Link to="/">
            <h2>Light Cells Solutions</h2>
          </Link>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          {!isBiotechnologySection && (
            <li>
              {isInformationPage ? (
                <NavLink
                  to="/Information#web-app-services"
                  onClick={() => scrollToSection("web-app-services")}
                >
                  Service
                </NavLink>
              ) : isMaintenancePage ? (
                <NavLink
                  to="/maintenance#maintenance-services"
                  onClick={() => scrollToSection("maintenance-services")}
                >
                  Service
                </NavLink>
              ) : (
                <NavLink
                  to="/#core-divisions"
                  onClick={() => {
                    document.getElementById("core-divisions")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  Service
                </NavLink>
              )}
            </li>
          )}
          {isInformationPage && (
            <>
              <li>
                <NavLink
                  to="/Information#it-capabilities"
                  onClick={() => scrollToSection("it-capabilities")}
                >
                  Capabilities
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Information#it-industries"
                  onClick={() => scrollToSection("it-industries")}
                >
                  Industries
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Information#it-resources"
                  onClick={() => scrollToSection("it-resources")}
                >
                  Resources
                </NavLink>
              </li>
            </>
          )}
          {isBiotechnologySection && (
            <>
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
        </ul>

        {isMaintenancePage ? (
          <MaintenanceHeaderTools />
        ) : (
          <Link to="/contact">
            <button className="nav-btn">Contact Us</button>
          </Link>
        )}
      </nav>

      {/* DYNAMIC PAGE / SUB-SECTION CONTENT */}
      <main>
        <Outlet />
      </main>

      {/* COMMON FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div>
            <h3>Light Cells Solutions</h3>
            <p>Technology, biotechnology, and technical support for organizations and laboratories.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <p><Link to="/">Home</Link></p>
            <p><Link to="/Information">Information Technology</Link></p>
            <p><Link to="/about">About</Link></p>
            {!isBiotechnologySection && (
              <p>
                {isInformationPage ? (
                  <Link
                    to="/Information#web-app-services"
                    onClick={() => scrollToSection("web-app-services")}
                  >
                    Service
                  </Link>
                ) : (
                  <Link
                    to="/#core-divisions"
                    onClick={() => {
                      document.getElementById("core-divisions")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    Service
                  </Link>
                )}
              </p>
            )}
            {isInformationPage && (
              <>
                <p>
                  <Link
                    to="/Information#it-capabilities"
                    onClick={() => scrollToSection("it-capabilities")}
                  >
                    Capabilities
                  </Link>
                </p>
                <p>
                  <Link
                    to="/Information#it-industries"
                    onClick={() => scrollToSection("it-industries")}
                  >
                    Industries
                  </Link>
                </p>
                <p>
                  <Link
                    to="/Information#it-resources"
                    onClick={() => scrollToSection("it-resources")}
                  >
                    Resources
                  </Link>
                </p>
              </>
            )}
            {isBiotechnologySection && (
              <>
                <p>
                  <Link
                    to="/biotechnology/#advanced-scientific-divisions"
                    onClick={() => {
                      document.getElementById("advanced-scientific-divisions")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    Services
                  </Link>
                </p>
                <p><Link to="/biotechnology/products">Products</Link></p>
              </>
            )}
            <p><Link to="/contact">Contact Us</Link></p>
          </div>

          <div>
            <h4>Contact</h4>
            <p><a href="mailto:info@lightcellssolutions.com">info@lightcellssolutions.com</a></p>
            <p><a href="tel:+919876543210">+91 98765 43210</a></p>
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} Light Cells Solutions. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}