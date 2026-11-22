
import { Link, useParams } from "react-router-dom";
import data from "../data/biotechData.json";
import "./CategoryCards.css";

export default function AppPage() {
  const { categorySlug, subSlug, itemSlug } = useParams();

  const cat = data.applications.categories.find(
    (c) => c.slug === categorySlug
  );

  const sub = cat?.subcategories.find(
    (s) => s.slug === subSlug
  );

  const item = sub?.items.find(
    (i) => i.slug === itemSlug
  );

  // Identify the current page
  const page = item || sub || cat;

  if (!page) {
    return (
      <section className="data-page">
        <h1>Page not found</h1>
        <Link to="/biotechnology/applications">
          Back to Applications
        </Link>
      </section>
    );
  }

  // Identify child items
  let children = [];

  if (item) {
    children = item.products || [];
  } else if (sub) {
    children = sub.items || [];
  } else {
    children = cat.subcategories || [];
  }

  return (
    <section className="data-page">

      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/biotechnology/applications">
          Applications
        </Link>

        {cat && (
          <>
            {" / "}
            <Link to={cat.path}>{cat.name}</Link>
          </>
        )}

        {sub && (
          <>
            {" / "}
            <Link to={sub.path}>{sub.name}</Link>
          </>
        )}

        {item && (
          <>
            {" / "}
            <span>{item.name}</span>
          </>
        )}
      </nav>

      {/* Page Heading */}
      <div className="category-page-heading">
        <h1>{page.name}</h1>

        {page.description && (
          <p>{page.description}</p>
        )}
      </div>

      {/* Current Page Image */}
      {page.image && (
        <div className="data-page-image-wrapper">
          
        </div>
      )}

      {/* Dynamic Child Cards */}
      {children.length > 0 ? (

        <div className="category-cards-grid">

          {children.map((child, index) => (

            <article className="category-card" key={child.slug || child.path || child.name}>

              {/* Card Header */}
              <div
                className={`category-card-header color-${index % 6}`}
              >
            
                <h2>{child.name}</h2>
              </div>

              {/* Card Body */}
              <div className="category-card-body">

                {child.image && (
                  <div className="category-card-image-wrapper">
                    <img
                      src={child.image}
                      alt={child.name}
                      className="category-card-image"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}

                {child.description && (
                  <p className="category-card-description">
                    {child.description}
                  </p>
                )}

                {child.path && (
                  <Link
                    to={child.path}
                    className="explore-button"
                  >
                    Explore →
                  </Link>
                )}

              </div>

            </article>

          ))}

        </div>

      ) : (

        <p className="coming-soon">
          Products coming soon.
        </p>

      )}

    </section>
  );
}
