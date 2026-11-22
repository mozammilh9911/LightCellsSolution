import { Link, useParams } from "react-router-dom";
import data from "../data/biotechData.json";

export default function EquipmentPage() {
  const { equipSlug } = useParams();
  const eq = data.equipment.items.find((e) => e.slug === equipSlug);

  if (!eq) {
    return (
      <section className="data-page">
        <h1>Equipment not found</h1>
        <Link to="/biotechnology/equipment">Back to Laboratory Equipment</Link>
      </section>
    );
  }

  return (
    <section className="data-page">
      <nav className="breadcrumb">
        <Link to="/biotechnology/equipment">Laboratory Equipment</Link> / <span>{eq.name}</span>
      </nav>

      <h1>{eq.name}</h1>
      {eq.description && <p>{eq.description}</p>}
      {eq.image && (
        <img src={eq.image} alt={eq.name} className="data-page-img"
          onError={(e) => (e.currentTarget.style.display = "none")} />
      )}
      {eq.products.length > 0 ? (
        <ul className="data-grid">
          {eq.products.map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      ) : (
        <p>Products coming soon.</p>
      )}
    </section>
  );
}