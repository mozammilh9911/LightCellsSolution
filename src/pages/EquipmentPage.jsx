
import { Link, useParams } from "react-router-dom";
import data from "../data/biotechData.json";
import "./CategoryCards.css";

export default function EquipmentPage() {
  const { equipSlug } = useParams();

  const eq = data.equipment.items.find(
    (e) => e.slug === equipSlug
  );

  if (!eq) {
    return (
      <section className="data-page">
        <h1>Equipment not found</h1>

        <Link to="/biotechnology/equipment">
          Back to Laboratory Equipment
        </Link>
      </section>
    );
  }

  return (
    <section className="data-page">

      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/biotechnology/equipment">
          Laboratory Equipment
        </Link>
        {" / "}
        <span>{eq.name}</span>
      </nav>

      {/* Main Heading and Description */}
      <div className="category-page-heading">
        <h1>{eq.name}</h1>

        {eq.description && (
          <p>{eq.description}</p>
        )}
      </div>

      {/* Equipment Image */}
      {eq.image && (
        <div className="data-page-image-wrapper">
          <img
            src={eq.image}
            alt={eq.name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      {/* Products */}
      {eq.products?.length > 0 ? (
        <ul className="data-grid">
          {eq.products.map((p) => (
            <li key={p.name}>
              {p.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="coming-soon">
          Products coming soon.
        </p>
      )}

    </section>
  );
}
