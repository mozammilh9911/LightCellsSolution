
import { Link } from "react-router-dom";
import data from "../data/biotechData.json";
import "./CategoryCards.css";

export default function EquipmentHome() {
  const { title, description, items } = data.equipment;

  return (
    <section className="data-page">

      {/* Main Heading and Description */}
      <div className="category-page-heading">
        <h1>{title}</h1>

        {description && (
          <p>{description}</p>
        )}
      </div>

      {/* Equipment Cards */}
      <div className="category-cards-grid">

        {items.map((eq, index) => (
          <article className="category-card" key={eq.slug}>

            <div className={`category-card-header color-${index % 6}`}>
              <h2>{eq.name}</h2>
            </div>

            <div className="category-card-body">

              {eq.image && (
                <div className="category-card-image-wrapper">
                  <img
                    src={eq.image}
                    alt={eq.name}
                    className="category-card-image"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              <Link
                to={eq.path}
                className="explore-button"
              >
                Explore →
              </Link>

            </div>
          </article>
        ))}

      </div>

    </section>
  );
}
