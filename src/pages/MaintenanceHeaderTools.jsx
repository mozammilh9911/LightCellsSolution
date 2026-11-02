import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import { getMaintenanceLocation, saveMaintenanceLocation } from "./maintenanceData";

export default function MaintenanceHeaderTools() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(getMaintenanceLocation);
  const [locationError, setLocationError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateLocation = () => setLocation(getMaintenanceLocation());
    window.addEventListener("maintenance-location-updated", updateLocation);
    return () => window.removeEventListener("maintenance-location-updated", updateLocation);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/maintenance/search?q=${encodeURIComponent(query.trim())}`);
  };

  const requestLocation = () => {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Location access is unavailable in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nearbyLocation = `Nearby (${coords.latitude.toFixed(2)}, ${coords.longitude.toFixed(2)})`;
        saveMaintenanceLocation(nearbyLocation);
        setLocation(nearbyLocation);
      },
      () => setLocationError("Location access was denied or unavailable."),
      { timeout: 10000, maximumAge: 300000 },
    );
  };

  return (
    <div className="maintenance-header-tools">
      <button
        className="maintenance-header-location"
        type="button"
        onClick={requestLocation}
        aria-label="Use your current location"
      >
        <MapPin aria-hidden="true" size={18} />
        <span>
          <small>Location</small>
          <strong>{location || "Choose location"}</strong>
        </span>
      </button>
      {locationError && (
        <Link className="maintenance-location-fallback" to="/maintenance/location">
          Choose a city
        </Link>
      )}
      <form className="maintenance-header-search" onSubmit={handleSearch} role="search">
        <label className="maintenance-visually-hidden" htmlFor="maintenance-header-query">
          Search maintenance services
        </label>
        <input
          id="maintenance-header-query"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search services"
        />
        <button type="submit" aria-label="Search services">
          <Search aria-hidden="true" size={18} />
        </button>
      </form>
      <Link className="nav-btn maintenance-header-contact" to="/contact">
        Contact Us
      </Link>
    </div>
  );
}
