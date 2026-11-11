import { NavLink } from "react-router-dom";
import "./MobileBottomNav.css";

const MobileBottomNav = ({ onMenuClick }) => {
  return (
    <nav className="mobile-bottom-nav">

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `mobile-bottom-item ${isActive ? "active" : ""}`
        }
      >
        <span className="mobile-bottom-icon">⌂</span>
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/biotechnology"
        className={({ isActive }) =>
          `mobile-bottom-item ${isActive ? "active" : ""}`
        }
      >
        <span className="mobile-bottom-icon">⚗</span>
        <span>Life Sciences</span>
      </NavLink>

      <NavLink
        to="/Information"
        className={({ isActive }) =>
          `mobile-bottom-item ${isActive ? "active" : ""}`
        }
      >
        <span className="mobile-bottom-icon">▣</span>
        <span>IT</span>
      </NavLink>

      <NavLink
        to="/maintenance"
        className={({ isActive }) =>
          `mobile-bottom-item ${isActive ? "active" : ""}`
        }
      >
        <span className="mobile-bottom-icon">⚙</span>
        <span>Maintenance</span>
      </NavLink>

      <button
        type="button"
        className="mobile-bottom-item"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <span className="mobile-bottom-icon">☰</span>
        <span>Menu</span>
      </button>

    </nav>
  );
};

export default MobileBottomNav;
