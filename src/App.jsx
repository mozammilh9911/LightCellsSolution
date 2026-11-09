import { Routes, Route } from "react-router-dom";
import "./App.css";

// Page Imports
import Home from "./pages/Home";
import Biotechnology from "./pages/Biotechnology";
import BioAbout from "./pages/BioAbout";
import Products from "./pages/Products";
import InformationTechnology from "./pages/InformationTechnology";
import About from "./pages/About";
import ContactUs from "./pages/Contactus";
import BioLayout from "./pages/BioLayout";
import Maintenance from "./pages/Maintenance";
import UnderConstruction from "./pages/UnderConstruction";
import {
  MaintenanceCart,
  MaintenanceLocation,
  MaintenanceProfile,
  MaintenanceSearch,
} from "./pages/MaintenanceTools";

function App() {
  return (
    <Routes>
      {/* 1. ROOT HOME ROUTE (WRAPPED IN BIOLAYOUT) */}
      <Route path="/" element={<BioLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* 2. BIOTECHNOLOGY SUB-SITE (NESTED ROUTES WITH BIOLAYOUT) */}
      <Route path="/biotechnology" element={<BioLayout />}>
        <Route index element={<Biotechnology />} />
        <Route path="about" element={<BioAbout />} />
        <Route path="products" element={<Products />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="applications/*" element={<UnderConstruction />} />
        <Route path="equipment/*" element={<UnderConstruction />} />
      </Route>

      <Route path="/contact" element={<BioLayout />}>
        <Route index element={<ContactUs />} />
      </Route>

      <Route path="/maintenance" element={<BioLayout />}>
        <Route index element={<Maintenance />} />
        <Route path="location" element={<MaintenanceLocation />} />
        <Route path="search" element={<MaintenanceSearch />} />
        <Route path="cart" element={<MaintenanceCart />} />
        <Route path="profile" element={<MaintenanceProfile />} />
      </Route>

      {/* 3. STANDALONE GENERAL ROUTES */}
      <Route path="/Information" element={<BioLayout />}>
        <Route index element={<InformationTechnology />} />
      </Route>
      <Route path="/about" element={<BioLayout />}>
        <Route index element={<About />} />
      </Route>
      <Route path="/products" element={<Products />} />
      <Route path="/bio-products" element={<Products />} />
    </Routes>
  );
}

export default App;