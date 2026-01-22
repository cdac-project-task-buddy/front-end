import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Trust from "./components/Trust";
import Footer from "./components/Footer";


import Login from "./pages/Login";
import Register from "./pages/Register";
import ProviderOnboarding from "./pages/ProviderOnboarding";
import CustomerDashboard from "./pages/CustomerDashboard";
import ServiceProviders from "./pages/ServiceProviders";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Services />
                  <HowItWorks />
                  <Trust />
                </>
              }
            />

            {/* Customer Dashboard */}
                <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/provider-onboarding" element={<ProviderOnboarding />} />

            <Route
              path="/dashboard"
              element={<CustomerDashboard />}
            />


          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
