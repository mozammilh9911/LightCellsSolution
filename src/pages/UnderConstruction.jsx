import React from "react";
import { Link } from "react-router-dom";

export default function UnderConstruction() {
  return (
    <div style={{ textAlign: "center", padding: "100px 20px", minHeight: "60vh" }}>
      <h2 style={{ fontSize: "2.5rem", color: "#0f172a", marginBottom: "15px" }}>
        Under Construction 🚧
      </h2>
      <p style={{ fontSize: "1.1rem", color: "#475569", marginBottom: "30px" }}>
        We are currently building this section to bring you the best laboratory equipment and application details. Please check back soon!
      </p>
      <Link 
        to="/" 
        style={{ 
          background: "#2563eb", 
          color: "#fff", 
          padding: "12px 24px", 
          borderRadius: "8px", 
          textDecoration: "none", 
          fontWeight: "600" 
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}