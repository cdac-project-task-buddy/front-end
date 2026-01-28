import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import ServiceProviders from "./pages/ServiceProviders";
import Home from "./pages/Home";
import MyBookings from "./components/MyBookings";
import Profile from "./components/Profile";
import BookService from "./pages/BookService";
import BookingSuccess from "./pages/BookSuccess";
import ProviderBookings from "./pages/ProviderBookings";
import ProviderDashboard from './pages/ProviderDashboard';
import NotFound from "./components/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import WorkerProfileSetup from "./pages/WorkerProfileSetup";

function App(){
  
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = getUser();

    if (!user) {
      return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Services - Public Access */}
            <Route path="/services" element={<Services />} />
            
            {/* Providers Listing - Public Access */}
            <Route path="/providers/:serviceName" element={<ServiceProviders />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Worker Profile Setup */}
            <Route
              path="/worker-profile-setup"
              element={
                <ProtectedRoute allowedRoles={["ROLE_WORKER"]}>
                  <WorkerProfileSetup />
                </ProtectedRoute>
              }
            />
            
            {/* Customer */}
            <Route
              path="/customer-dashboard"
              element={
                <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/profile" element={<Profile />} />

            {/* Service Flow */}
            <Route path="/service/:id" element={<ServiceProviders />} />
            <Route path="/book-service/:id" element={<BookService />} />
            <Route path="/booking-success" element={<BookingSuccess />} />

            {/* Provider */}
            <Route
              path="/provider-dashboard"
              element={
                <ProtectedRoute allowedRoles={["ROLE_WORKER"]}>
                  <ProviderDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/provider-bookings" element={<ProviderBookings />} />


            {/* Admin */}
            <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
