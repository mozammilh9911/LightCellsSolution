import { useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./Biotechnology.css";
import MaintenanceHeaderTools from "./MaintenanceHeaderTools";
import MobileBottomNav from "./MobileBottomNav";

// Structured data with Categories, Subcategories, and Sub-items
const applicationsData = [
  {
    name: "Molecular Biology",
    path: "/biotechnology/applications/molecular-biology",
    subcategories: [
      {
        name: "Nucleic Acid Purification",
        path: "/biotechnology/applications/molecular-biology/sub-1",
        items: [
          "Plasmid Isolation Kit",
          "Gel Extraction Kit",
          "RNA Isolation Kit",
          "Genomic DNA Isolation Kit"
        ]
      },
      {
        name: "Agarose Gel Electrophoresis",
        path: "/biotechnology/applications/molecular-biology/sub-2",
        items: [
          "Electrophoresis Unit",
          "Electrophoresis Accessories",
          "Agarose",
          "Dye",
          "DNA Marker"
        ]
      },
      {
        name: "Cloning",
        path: "/biotechnology/applications/molecular-biology/sub-3",
        items: [
          "Vectors",
          "Restriction Enzymes",
          "Biochemicals"
        ]
      },
      {
        name: "PCR",
        path: "/biotechnology/applications/molecular-biology/sub-4",
        items: [
          "Taq Polymerase",
          "dNTPs",
          "PCR Mastermix",
          "Buffers"
        ]
      },
      {
        name: "qPCR",
        path: "/biotechnology/applications/molecular-biology/sub-5",
        items: [
          "qPCR Mastermix",
          "cDNA Synthesis Kit",
          "Probe"
        ]
      }
    ]
  },
  {
    name: "Protein Biology",
    path: "/biotechnology/applications/protein-biology",
    subcategories: [
      {
        name: "Extraction",
        path: "/biotechnology/applications/protein-biology/sub-1",
        items: [
          "Lyses Reagent",
          "Protease Inhibitor Cocktails",
          "Nucleases"
        ]
      },
      {
        name: "Purification",
        path: "/biotechnology/applications/protein-biology/sub-2",
        items: ["Agarose", "Magnetic"]
      },
      {
        name: "Quantification",
        path: "/biotechnology/applications/protein-biology/sub-3",
        items: [
          "Bradford",
          "BCA",
          "Lowry's Reagent"
        ]
      },
      {
        name: "Concentration",
        path: "/biotechnology/applications/protein-biology/sub-4",
        items: [
          "Centrifugal Based Filters",
          "Pressure Based Filters",
          "Dialysis Membrane"
        ]
      },
      {
        name: "SDS-PAGE",
        path: "/biotechnology/applications/protein-biology/sub-5",
        items: [
          "Acrylamide",
          "BisAcrylamide",
          "TEMED",
          "APS",
          "Tricine",
          "Glycine"
        ]
      },
      {
        name: "Assembly",
        path: "/biotechnology/applications/protein-biology/sub-6",
        items: [
          "Powerpack",
          "Accessories"
        ]
      },
      {
        name: "Western Blotting",
        path: "/biotechnology/applications/protein-biology/sub-7",
        items: [
          "PVDF",
          "Nitrocellulose",
          "Nylon",
          "Blocking Reagents",
          "Buffers",
          "Chemiluminescent Substrate"
        ]
      },
      {
        name: "ELISA",
        path: "/biotechnology/applications/protein-biology/sub-8",
        items: [
          "Human/Rat/Mouse",
          "ELISA Plate",
          "Substrate"
        ]
      },
      {
        name: "Antibodies",
        path: "/biotechnology/applications/protein-biology/sub-9",
        items: [
          "Primary",
          "Secondary"
        ]
      }
    ]
  },
  {
    name: "Cell Culture",
    path: "/biotechnology/applications/cell-culture",
    subcategories: [
      {
        name: "Cell Culture Plasticware",
        path: "/biotechnology/applications/cell-culture/sub-1",
        items: [
          "Plates",
          "Disc",
          "Serological Pipettes",
          "Flask",
          "Centrifuge Tubes",
          "Scrappers",
          "Inserts"
        ]
      },
      {
        name: "Media",
        path: "/biotechnology/applications/cell-culture/sub-2",
        items: ["DMEM", "RPMI", "MEM", "IMDM", "DPBS"]
      },
      {
        name: "Serum",
        path: "/biotechnology/applications/cell-culture/sub-3",
        items: [
          "South American",
          "North-American",
          "Australian",
          "Newzeland"
        ]
      },
      {
        name: "Antibiotics",
        path: "/biotechnology/applications/cell-culture/sub-4",
        items: [
          "Pen-strep",
          "Antimycotic",
          "Gentamicin",
          "Amphotericin",
          "G418"
        ]
      },
      {
        name: "Growth Factors & Supplements",
        path: "/biotechnology/applications/cell-culture/sub-5",
        items: [
          "Amino Acids",
          "Hormones",
          "Other Supplements"
        ]
      },
      {
        name: "Dissociation Reagents",
        path: "/biotechnology/applications/cell-culture/sub-6",
        items: [
          "Trypsin-EDTA",
          "Collagenase",
          "Accutase"
        ]
      },
      {
        name: "Cell Culture Filtration",
        path: "/biotechnology/applications/cell-culture/sub-7",
        items: [
          "Syringe Filter",
          "Media Filtration Units",
          "Pressure Based Filtration Unit"
        ]
      },
      {
        name: "Cell Freezing Solution",
        path: "/biotechnology/applications/cell-culture/sub-8",
        items: [
          "Readymade",
          "DMSO",
          "Glycerol"
        ]
      }
    ]
  },
  {
    name: "Analytical Chemistry",
    path: "/biotechnology/applications/analytical-chemistry",
    subcategories: [
      {
        name: "HPLC Columns and UPLC",
        path: "/biotechnology/applications/analytical-chemistry/sub-1",
        items: [
          "HPLC Columns",
          "LCMS Columns",
          "UHPLC Columns",
          "Mass Spectroscopy Columns"
        ]
      },
      {
        name: "GC Column and Accessories",
        path: "/biotechnology/applications/analytical-chemistry/sub-2",
        items: [
          "GC Columns",
          "Syringes",
          "Septa",
          "Other Accessories"
        ]
      },
      {
        name: "Solvents",
        path: "/biotechnology/applications/analytical-chemistry/sub-3",
        items: [
          "Solvents for Instrumental Analysis",
          "Classical Solvents",
          "General Chemistry",
          "NMR Solvents"
        ]
      },
      {
        name: "Reference Standards",
        path: "/biotechnology/applications/analytical-chemistry/sub-4",
        items: [
          "CRMs",
          "Pharmacopeia Standards",
          "Proficiency Test Standards",
          "ICP and AAS Standards",
          "Analytical Standards",
          "Chromatography Standards"
        ]
      },
      {
        name: "Filtration",
        path: "/biotechnology/applications/analytical-chemistry/sub-5",
        items: [
          "Filter Papers",
          "Membrane Filters",
          "Syringe Filters",
          "Vacuum Filters"
        ]
      }
    ]
  },
  {
    name: "Organic Synthesis",
    path: "/biotechnology/applications/organic-synthesis",
    subcategories: [
      {
        name: "Amino Acids, Resins & Reagents for Peptide Synthesis",
        path: "/biotechnology/applications/organic-synthesis/sub-1",
        items: []
      },
      {
        name: "Building Blocks",
        path: "/biotechnology/applications/organic-synthesis/sub-2",
        items: []
      },
      {
        name: "Catalyst",
        path: "/biotechnology/applications/organic-synthesis/sub-3",
        items: []
      },
      {
        name: "Lab Chemicals",
        path: "/biotechnology/applications/organic-synthesis/sub-4",
        items: []
      },
      {
        name: "Stable Isotopes",
        path: "/biotechnology/applications/organic-synthesis/sub-5",
        items: []
      }
    ]
  },
  {
    name: "Material Science",
    path: "/biotechnology/applications/material-science",
    subcategories: [
      {
        name: "High Purity Metals and Alloys",
        path: "/biotechnology/applications/material-science/sub-1",
        items: []
      },
      {
        name: "High Purity Metals Oxides and Salts",
        path: "/biotechnology/applications/material-science/sub-2",
        items: []
      },
      {
        name: "Graphene and CNTs",
        path: "/biotechnology/applications/material-science/sub-3",
        items: []
      },
      {
        name: "3D Bioprinting",
        path: "/biotechnology/applications/material-science/sub-4",
        items: []
      },
      {
        name: "Battery Material",
        path: "/biotechnology/applications/material-science/sub-5",
        items: []
      },
      {
        name: "Polymers",
        path: "/biotechnology/applications/material-science/sub-6",
        items: []
      }
    ]
  },
  {
    name: "Filtration",
    path: "/biotechnology/applications/filtration",
    subcategories: [
      {
        name: "Filter Paper",
        path: "/biotechnology/applications/filtration/sub-1",
        items: []
      },
      {
        name: "Laboratory Filter Holders",
        path: "/biotechnology/applications/filtration/sub-2",
        items: []
      },
      {
        name: "Filter Membranes",
        path: "/biotechnology/applications/filtration/sub-3",
        items: []
      },
      {
        name: "Laboratory Syringe Filters",
        path: "/biotechnology/applications/filtration/sub-4",
        items: []
      },
      {
        name: "Vacuum Filters",
        path: "/biotechnology/applications/filtration/sub-5",
        items: []
      }
    ]
  },
  {
    name: "Water Purification System (WPS)",
    path: "/biotechnology/applications/water-purification",
    subcategories: [
      {
        name: "Milli-Q® Lab Water Purification Systems",
        path: "/biotechnology/applications/water-purification/sub-1",
        items: []
      },
      {
        name: "Accessories for Milli-Q® Water Purification Systems",
        path: "/biotechnology/applications/water-purification/sub-2",
        items: []
      },
      {
        name: "Milli-Q® Lab Water Purification Consumables",
        path: "/biotechnology/applications/water-purification/sub-3",
        items: []
      }
    ]
  }
];

// Laboratory Equipment
const laboratoryEquipmentData = [
  {
    name: "Liquid Nitrogen Containers",
    path: "/biotechnology/equipment/liquid-nitrogen-containers"
  },
  {
    name: "Ultra Low Temperature Freezers",
    path: "/biotechnology/equipment/ultra-low-temperature-freezers"
  },
  {
    name: "Electrophoresis Units",
    path: "/biotechnology/equipment/electrophoresis-units"
  },
  {
    name: "Centrifuges",
    path: "/biotechnology/equipment/centrifuges"
  },
  {
    name: "Balances",
    path: "/biotechnology/equipment/balances"
  }
];


function LightCellsLogo({ compact = false }) {
  return (
    <span className={`lightcells-brand${compact ? " lightcells-brand-compact" : ""}`}>
      <svg className="lightcells-mark" viewBox="0 0 52 64" aria-hidden="true">
        <path d="M38 4C12 13 12 25 38 34C12 43 12 53 38 60" fill="none" stroke="#159b78" strokeWidth="4" strokeLinecap="round" />
        <path d="M14 4C40 13 40 25 14 34C40 43 40 53 14 60" fill="none" stroke="#2477c9" strokeWidth="4" strokeLinecap="round" />
        <path d="M19 9L33 9M15 20L37 20M16 32L36 32M15 44L37 44M19 56L33 56" stroke="#74b9c8" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="lightcells-wordmark">
        <strong>LightCells</strong>
        <small>Solutions</small>
      </span>
    </span>
  );
}

export default function BioLayout() {
  const { pathname, hash } = useLocation();
  const isBiotechnologySection = pathname.startsWith("/biotechnology");
  const isInformationPage = pathname.toLowerCase() === "/information";
  const isMaintenancePage = pathname.startsWith("/maintenance");
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
        className={`bio-navbar site-header${isBiotechnologySection ? "" : " home-navbar"}${isCenteredMainNav ? " centered-main-nav" : ""
          }${isMaintenancePage ? " maintenance-with-tools" : ""}`}
      >
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
                <NavLink to="/maintenance">Maintenance</NavLink>
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
                                        {sub.items.map((item, itemIndex) => (
                                          <li key={itemIndex} className="dropdown-sub-item">
                                            <Link to={`${sub.path}/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                                              {item}
                                            </Link>
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

              {/* Maintenance Page Links */}
              {isMaintenancePage && (
                <li>
                  <NavLink to="/maintenance#maintenance-services" onClick={() => scrollToSection("maintenance-services")}>
                    Service
                  </NavLink>
                </li>
              )}

              {/* About Link for Sub-pages (Smooth scrolls to local section) */}
              <li>
                <NavLink
                  to={
                    isInformationPage
                      ? "/Information#it-about-section"
                      : isBiotechnologySection
                        ? "/biotechnology#about-section"
                        : isMaintenancePage
                          ? "/maintenance#maintenance-about-section"
                          : "/about"
                  }
                  onClick={(e) => {
                    const targetId = isInformationPage
                      ? "it-about-section"
                      : isBiotechnologySection
                        ? "about-section"
                        : isMaintenancePage
                          ? "maintenance-about-section"
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
          {/* Keep the original desktop Contact Us button / maintenance tools. */}
          {isMaintenancePage ? (
            <MaintenanceHeaderTools />
          ) : (
            <Link to="/contact" className="nav-btn header-contact">
              Contact Us
            </Link>
          )}
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
                              {sub.items.map((item) => (
                                <Link
                                  key={item}
                                  to={`${sub.path}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                  onClick={closeMenu}
                                >{item}</Link>
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

          <details open={isMaintenancePage}>
            <summary><span className="drawer-icon">🔧</span> Maintenance</summary>
            <div className="drawer-submenu">
              <Link to="/maintenance" onClick={closeMenu}>Overview</Link>
              <Link to="/maintenance#maintenance-services" onClick={closeMenu}>Services</Link>
              <Link to="/maintenance#maintenance-about-section" onClick={closeMenu}>About</Link>
            </div>
          </details>

          <Link to="/about" onClick={closeMenu}><span className="drawer-icon">ⓘ</span> About Us</Link>
          <Link to="/contact" className="drawer-contact-link" onClick={closeMenu}>
            <span className="drawer-icon">✉</span> Contact Us
          </Link>
        </nav>

        <div className="drawer-footer">
          <p>LightCells Solutions</p>
          <small>Technology • Biotechnology • Maintenance</small>
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
            <p>Technology, biotechnology, and technical support for organizations and laboratories.</p>
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