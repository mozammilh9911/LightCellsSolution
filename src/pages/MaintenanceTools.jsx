import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MapPin, UserRound } from "lucide-react";
import { MAINTENANCE_SERVICES, getMaintenanceCart, saveMaintenanceCart, saveMaintenanceLocation } from "./maintenanceData";
import "./Maintenance.css";

function MaintenancePageFrame({ children }) {
  return (
    <div className="maintenance-page">
      {children}
    </div>
  );
}

export function MaintenanceLocation() {
  const [location, setLocation] = useState(localStorage.getItem("maintenance-location") || "");
  const [message, setMessage] = useState("");
  const cities = ["Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad", "Chennai"];

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setMessage("Location detection is not supported by this browser.");
      return;
    }

    setMessage("Requesting location permission...");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nearbyLabel = `Nearby (${coords.latitude.toFixed(2)}, ${coords.longitude.toFixed(2)})`;
        setLocation(nearbyLabel);
        saveMaintenanceLocation(nearbyLabel);
        setMessage("Your approximate coordinates are saved for this browser.");
      },
      () => setMessage("Location unavailable. You can choose a city instead."),
      { timeout: 10000, maximumAge: 300000 },
    );
  };

  const chooseCity = (event) => {
    const nextLocation = event.target.value;
    setLocation(nextLocation);
    saveMaintenanceLocation(nextLocation);
    setMessage(`${nextLocation} saved as your service location.`);
  };

  return (
    <MaintenancePageFrame>
      <section className="maintenance-tool-page">
        <section className="maintenance-tool-card">
          <MapPin className="maintenance-tool-icon" aria-hidden="true" size={34} />
          <span className="maintenance-eyebrow">SERVICE LOCATION</span>
          <h1>Choose where you need support</h1>
          <p>Set a city for your maintenance requests, or allow your browser to share your approximate location.</p>
          <label className="maintenance-field-label" htmlFor="maintenance-city">Choose a city</label>
          <select id="maintenance-city" value={cities.includes(location) ? location : ""} onChange={chooseCity}>
            <option value="" disabled>Select your city</option>
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
          <button className="maintenance-primary-link maintenance-detect-button" type="button" onClick={detectLocation}>
            <MapPin aria-hidden="true" size={17} /> Detect my location
          </button>
          {location && <p className="maintenance-selected-location">Current location: <strong>{location}</strong></p>}
          <p className="maintenance-tool-message" role="status">{message}</p>
        </section>
      </section>
    </MaintenancePageFrame>
  );
}

export function MaintenanceSearch() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const results = MAINTENANCE_SERVICES.filter((service) =>
    `${service.title} ${service.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  const [cart, setCart] = useState(getMaintenanceCart);

  const addService = (service) => {
    if (cart.some((item) => item.number === service.number)) return;
    const updatedCart = [...cart, service];
    setCart(updatedCart);
    saveMaintenanceCart(updatedCart);
  };

  return (
    <MaintenancePageFrame>
      <section className="maintenance-tool-page maintenance-search-page">
        <div className="maintenance-tool-content">
          <span className="maintenance-eyebrow">SERVICE SEARCH</span>
          <h1>{query ? `Results for “${query}”` : "Browse maintenance services"}</h1>
          <p>{results.length} {results.length === 1 ? "service" : "services"} found</p>
          {results.length ? (
            <div className="maintenance-service-grid">
              {results.map((service) => {
                const isAdded = cart.some((item) => item.number === service.number);
                return (
                  <article className="maintenance-service-card" key={service.number}>
                    <span className="maintenance-service-number">{service.number}</span>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <button
                      className="maintenance-primary-link maintenance-add-button"
                      type="button"
                      disabled={isAdded}
                      onClick={() => addService(service)}
                    >
                      {isAdded ? "Added to cart" : "Add to cart"}
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="maintenance-empty-state">
              <h2>No matching services</h2>
              <p>Try a different search, or browse all our services.</p>
              <Link className="maintenance-secondary-link" to="/maintenance/search">View all services</Link>
            </div>
          )}
        </div>
      </section>
    </MaintenancePageFrame>
  );
}

export function MaintenanceCart() {
  const [cart, setCart] = useState(getMaintenanceCart);

  const removeService = (number) => {
    const updatedCart = cart.filter((item) => item.number !== number);
    setCart(updatedCart);
    saveMaintenanceCart(updatedCart);
  };

  return (
    <MaintenancePageFrame>
      <section className="maintenance-tool-page">
        <section className="maintenance-tool-content maintenance-cart-page">
          <span className="maintenance-eyebrow">YOUR REQUEST</span>
          <h1>Maintenance cart</h1>
          {cart.length ? (
            <>
              <div className="maintenance-cart-list">
                {cart.map((service) => (
                  <article className="maintenance-cart-item" key={service.number}>
                    <div>
                      <span className="maintenance-service-number">{service.number}</span>
                      <h2>{service.title}</h2>
                      <p>{service.description}</p>
                    </div>
                    <button type="button" className="maintenance-remove-button" onClick={() => removeService(service.number)}>
                      Remove
                    </button>
                  </article>
                ))}
              </div>
              <Link className="maintenance-primary-link" to="/contact">Request service <span aria-hidden="true">→</span></Link>
            </>
          ) : (
            <div className="maintenance-empty-state">
              <h2>Your cart is empty</h2>
              <p>Search maintenance services and add the support you need to your request.</p>
              <Link className="maintenance-primary-link" to="/maintenance/search">Browse services <span aria-hidden="true">→</span></Link>
            </div>
          )}
        </section>
      </section>
    </MaintenancePageFrame>
  );
}

export function MaintenanceProfile() {
  return (
    <MaintenancePageFrame>
      <section className="maintenance-tool-page">
        <section className="maintenance-tool-card">
          <UserRound className="maintenance-tool-icon" aria-hidden="true" size={34} />
          <span className="maintenance-eyebrow">YOUR ACCOUNT</span>
          <h1>Profile</h1>
          <p>Account sign-in is not available yet. You can still contact our team to manage service requests and equipment support.</p>
          <Link className="maintenance-primary-link" to="/contact">Contact our team <span aria-hidden="true">→</span></Link>
        </section>
      </section>
    </MaintenancePageFrame>
  );
}
