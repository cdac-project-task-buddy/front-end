import { useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h3 className="text-success">✅ Booking Confirmed!</h3>
      <p>Your service has been booked successfully.</p>

      <div className="d-flex gap-3 justify-content-center mt-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/my-bookings")}
        >
          View My Bookings
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/customer-dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
