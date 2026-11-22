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
import ApplicationsHome from "./pages/ApplicationsHome";
import AppPage from "./pages/AppPage";
import EquipmentHome from "./pages/EquipmentHome";
import EquipmentPage from "./pages/EquipmentPage";


function App() {
  return (
    <Routes>
      {/* 1. ROOT HOME ROUTE (WRAPPED IN BIOLAYOUT) */}
      <Route path="/" element={<BioLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* 2. BIOTECHNOLOGY SUB-SITE (NESTED ROUTES WITH BIOLAYOUT) */}
      {/* <Route path="/biotechnology" element={<BioLayout />}>
        <Route index element={<Biotechnology />} />
        <Route path="about" element={<BioAbout />} />
        <Route path="products" element={<Products />} />
        <Route path="contact" element={<ContactUs />} />

  <Route path="applications" element={<ApplicationsHome />} />
  <Route path="applications/:categorySlug" element={<AppPage />} />
  <Route path="applications/:categorySlug/:subSlug" element={<AppPage />} />
  <Route path="applications/:categorySlug/:subSlug/:itemSlug" element={<AppPage />} />
  <Route path="equipment" element={<EquipmentHome />} />
  <Route path="equipment/:equipSlug" element={<EquipmentPage />} />
             </Route> */}

<Route path="/biotechnology" element={<BioLayout />}>
  <Route index element={<Biotechnology />} />

  <Route path="about" element={<BioAbout />} />
  <Route path="products" element={<Products />} />
  <Route path="contact" element={<ContactUs />} />

  {/* Applications */}
  <Route path="applications" element={<ApplicationsHome />} />

  {/* Application category */}
  <Route
    path="applications/:categorySlug"
    element={<AppPage />}
  />

  {/* Application subcategory */}
  <Route
    path="applications/:categorySlug/:subSlug"
    element={<AppPage />}
  />

  {/* Application product - your requested URL structure */}
  <Route
    path=":categorySlug/:subSlug/:itemSlug"
    element={<AppPage />}
  />

  {/* Optional: retain compatibility with old product URLs */}
  <Route
    path="applications/:categorySlug/:subSlug/:itemSlug"
    element={<AppPage />}
  />

  {/* Laboratory Equipment */}
  <Route path="equipment" element={<EquipmentHome />} />

  <Route
    path="equipment/:equipSlug"
    element={<EquipmentPage />}
  />
</Route>


      <Route path="/contact" element={<BioLayout />}>
        <Route index element={<ContactUs />} />
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