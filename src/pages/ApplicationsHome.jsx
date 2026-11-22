
import { Link } from "react-router-dom";
import data from "../data/biotechData.json";
import "./CategoryCards.css";

export default function ApplicationsHome() {
  const { title, description, categories } = data.applications;

  return (
    <section className="data-page">

      <div className="category-page-heading">
        <h1>{title}</h1>

        {description && <p>{description}</p>}
      </div>

      <div className="category-cards-grid">

        {categories.map((cat, index) => (
          <article className="category-card" key={cat.slug}>

            {/* Card Header */}
            <div
              className={`category-card-header color-${index % 6}`}
            >
           
              <h2>{cat.name}</h2>
            </div>

            {/* Card Body */}
            <div className="category-card-body">

              {/* Category Image */}
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

              {/* Description */}
              <p className="category-card-description">
                {cat.description}
              </p>

              {/* Subcategory Count */}
              <small className="category-card-count">
                {cat.subcategories?.length || 0} Subcategories
              </small>

              {/* Explore */}
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
