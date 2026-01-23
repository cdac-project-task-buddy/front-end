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
import Home from "./pages/Home";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import BookService from "./pages/BookService";
import BookingSuccess from "./pages/BookSuccess";

import ProviderBookings from "./pages/ProviderBookings";
import ProviderDashboard from './pages/ProviderDashboard';
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Services */}
            <Route path="/services" element={<Services />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Customer */}
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/profile" element={<Profile />} />

            {/* Providers Listing */}
            <Route
              path="/providers/:serviceName"
              element={<ServiceProviders />}
            />

            {/* Service Flow */}
            <Route path="/service/:id" element={<ServiceProviders />} />
            <Route path="/book-service/:id" element={<BookService />} />
            <Route path="/booking-success" element={<BookingSuccess />} />

            {/* Provider */}
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="/provider-bookings" element={<ProviderBookings />} />


            {/* Admin */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
