import { useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h3 className="text-success">✅ Booking Confirmed!</h3>
      <p>Your service has been booked successfully.</p>

      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/my-bookings")}
      >
        View My Bookings
      </button>
    </div>
  );
}
