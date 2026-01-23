import { useNavigate } from "react-router-dom";
import ProviderStats from "../components/ProviderStats";
import AppointmentsList from "../components/AppointmentsList";
import CustomerDetails from "../components/CustomerDetails";

export default function ProviderDashboard() {
  const navigate = useNavigate();

  // 🔹 Logged-in provider (from login)
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container-fluid p-4">

      {/* 🔹 TOP HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-0">Welcome back 👋</h5>
          <small className="text-muted">
            {user?.email || "Service Provider"}
          </small>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => navigate("/provider-bookings")}
          >
            View Bookings
          </button>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate("/profile")}
          >
            My Profile
          </button>
        </div>
      </div>

      {/* 🔹 STATS */}
      <ProviderStats />

      {/* 🔹 MAIN CONTENT */}
      <div className="row mt-4">
        <div className="col-md-8">
          <AppointmentsList />
        </div>

        <div className="col-md-4">
          <CustomerDetails />
        </div>
      </div>
    </div>
  );
}
