import React from "react";
import "./CustomerDashboard.css";
import Services from "../components/Services";
const CustomerDashboard = () => {
  const stats = {
    totalBookings: 158,
    pending: 12,
    completed: 144,
    spending: 5200,
  };

  const bookings = [
    { service: "House Cleaning", status: "Completed" },
    { service: "Plumbing Fix", status: "Pending" },
    { service: "Washing Machine Repair", status: "Completed" },
    { service: "Hair Cut", status: "Cancelled" },
  ];

  return (
    <>
      <div className="dashboard container">
        {/* Search */}
        <h4 className="mb-3">What you are looking for today</h4>

        <div className="dashboard-search mb-4">
          <input type="text" placeholder="Search anything here..." />
          <button>Search</button>
        </div>

        <div className="row">
          {/* LEFT */}
          <div className="col-md-8">
            <div className="dashboard-banner mb-4">
              <h6>Top 5 House Cleaning Tips</h6>
            </div>

             <section className="dashboard-services-section">
                {/* <h5>Available Services</h5> */}
                <Services />
            </section>
            {/* <h5>Services</h5>
            <div className="dashboard-services">
              {[
                "Washing Machine",
                "Plumbing",
                "Cleaning",
                "Shifting",
                "Beauty",
                "Men’s Salon",
                "Repairing",
                "More",
              ].map((service) => (
                <div key={service} className="service-box">
                  {service}
                </div>
              ))}
            </div> */}
          </div>

          {/* RIGHT */}
          <div className="col-md-4">
            <div className="dashboard-card mb-4">
              <h6>Quick Stats</h6>
              <p>Total Bookings: <b>{stats.totalBookings}</b></p>
              <p>Pending: <b>{stats.pending}</b></p>
              <p>Completed: <b>{stats.completed}</b></p>
              <p>Spending: <b>₹{stats.spending}</b></p>
            </div>

            <div className="dashboard-card">
              <h6>Recent Bookings</h6>
              {bookings.map((b, i) => (
                <div className="booking-row" key={i}>
                  <span>{b.service}</span>
                  <span className={`status ${b.status.toLowerCase()}`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
