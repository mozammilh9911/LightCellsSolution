import { useLayoutEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./Biotechnology.css";
import MaintenanceHeaderTools from "./MaintenanceHeaderTools";


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
      className={`bio-navbar${isBiotechnologySection ? "" : " home-navbar"}${
        isCenteredMainNav ? " centered-main-nav" : ""
      }${isMaintenancePage ? " maintenance-with-tools" : ""}`}
    >
      <div className="logo">
        <Link to="/">
          <h2>LightCells Solutions</h2>
        </Link>
      </div>

   <ul className="nav-links">
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

        {/* CTA Button / Header Tools */}
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