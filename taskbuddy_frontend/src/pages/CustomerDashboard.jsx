import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CustomerDashboard.css";
import Services from "../components/Services";
import { bookingService } from "../api/bookingService";
import Loading from "../components/Loading";

import sofaCleaning from "../assets/sofaCleaning.jpg";
import kitchenCleaning from "../assets/vacuum-cleaner-tackling-heavily-soiled-floor.jpg";
import bathroomCleaning from "../assets/sofaCleaning.jpg";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalBookings: 0,
    pending: 0,
    completed: 0,
    spending: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getMyBookings();
      setBookings(data.slice(0, 4));
      
      const total = data.length;
      const pending = data.filter(b => b.status === "PENDING").length;
      const completed = data.filter(b => b.status === "COMPLETED").length;
      const spending = data.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      
      setStats({ totalBookings: total, pending, completed, spending });
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard container">

      {loading ? (
        <Loading />
      ) : (
        <>

      {/* 🔹 TOP HEADER (PROFILE ACCESS) */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-0">
            Welcome back 👋
          </h5>
          <small className="text-muted">
            {user?.email || "Customer"}
          </small>
        </div>

        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => navigate("/profile")}
        >
          My Profile
        </button>
      </div>

      {/* 🔹 SEARCH */}
      <h4 className="mb-3">What are you looking for today?</h4>

      <div className="dashboard-search mb-4">
        <input 
          type="text" 
          placeholder="Search services..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchQuery && navigate(`/services?search=${searchQuery}`)}
        />
        <button 
          onClick={() => searchQuery && navigate(`/services?search=${searchQuery}`)}
          disabled={!searchQuery}
        >
          Search
        </button>
      </div>

      <div className="row">
        {/* LEFT SECTION */}
        <div className="col-md-8">

          {/* 🔹 BANNER / CAROUSEL */}
          <div className="dashboard-banner mb-4">
            <div
              id="bannerSlider"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner">

                <div className="carousel-item active">
                  <img src={sofaCleaning} alt="Sofa Cleaning" />
                  <h6 className="banner-title">House Cleaning Tips</h6>
                </div>

                <div className="carousel-item">
                  <img src={kitchenCleaning} alt="Kitchen Cleaning" />
                  <h6 className="banner-title">Keep Your Kitchen Fresh</h6>
                </div>

                <div className="carousel-item">
                  <img src={bathroomCleaning} alt="Bathroom Cleaning" />
                  <h6 className="banner-title">Bathroom Hygiene Hacks</h6>
                </div>

              </div>
            </div>
          </div>

          {/* 🔹 SERVICES */}
          <Services />
        </div>

        {/* RIGHT SECTION */}
        <div className="col-md-4">

          {/* 🔹 QUICK STATS */}
          <div className="dashboard-card mb-4">
            <h6>Quick Stats</h6>
            <p>Total Bookings: <b>{stats.totalBookings}</b></p>
            <p>Pending: <b>{stats.pending}</b></p>
            <p>Completed: <b>{stats.completed}</b></p>
            <p>Spending: <b>₹{stats.spending}</b></p>
          </div>

          {/* 🔹 RECENT BOOKINGS */}
          <div className="dashboard-card">
            <h6>Recent Bookings</h6>
            {bookings.length > 0 ? (
              bookings.map((b, i) => (
                <div className="booking-row" key={i}>
                  <span>{b.serviceName || "Service"}</span>
                  <span className={`status ${b.status.toLowerCase()}`}>
                    {b.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-muted">No bookings yet</p>
            )}

            <button
              className="btn btn-link p-0 mt-2"
              onClick={() => navigate("/my-bookings")}
            >
              View all bookings →
            </button>
          </div>

        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default CustomerDashboard;
