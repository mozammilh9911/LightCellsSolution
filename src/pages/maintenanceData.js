export const MAINTENANCE_SERVICES = [
  {
    number: "01",
    title: "Preventive maintenance",
    description:
      "Planned inspections and routine servicing help identify wear early and keep essential equipment ready for daily use.",
  },
  {
    number: "02",
    title: "Calibration and validation",
    description:
      "Calibration support helps maintain dependable readings, consistent performance, and confidence in your equipment.",
  },
  {
    number: "03",
    title: "Repair and technical support",
    description:
      "Get practical troubleshooting and repair assistance when equipment needs attention, with clear next steps from our team.",
  },
];

const CART_STORAGE_KEY = "maintenance-cart";
const LOCATION_STORAGE_KEY = "maintenance-location";

export function getMaintenanceCart() {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  return savedCart ? JSON.parse(savedCart) : [];
}

export function saveMaintenanceCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("maintenance-cart-updated"));
}

export function getMaintenanceLocation() {
  return localStorage.getItem(LOCATION_STORAGE_KEY) || "";
}

export function saveMaintenanceLocation(location) {
  localStorage.setItem(LOCATION_STORAGE_KEY, location);
  window.dispatchEvent(new Event("maintenance-location-updated"));
}
