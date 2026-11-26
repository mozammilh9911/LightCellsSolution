
import { Link } from "react-router-dom";
import data from "../data/biotechData.json";
import "./CategoryCards.css";

export default function ApplicationsHome() {
  const { title, description, categories } = data.applications;

  return (
    <section className="data-page">

      {/* Main Heading and Description - Outside Grid */}
      <div className="category-page-heading">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>

      {/* Category Grid - No Descriptions */}
      <div className="category-cards-grid">

        {categories.map((cat, index) => (
          <article className="category-card" key={cat.slug}>

            <div className={`category-card-header color-${index % 6}`}>
              <h2>{cat.name}</h2>
            </div>

            <div className="category-card-body">

              <div className="category-card-image-wrapper">
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="category-card-image"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>

              <small className="category-card-count">
                {cat.subcategories?.length || 0} Subcategories
              </small>

              <Link to={cat.path} className="explore-button">
                Explore →
              </Link>

            </div>
          </article>
        ))}

      </div>

    </section>
  );
}
