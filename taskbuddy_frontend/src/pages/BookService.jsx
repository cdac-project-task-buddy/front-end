import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function BookService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    date: "",
    time: "",
    address: "",
    notes: ""
  });

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", booking, "Provider ID:", id);
    navigate("/booking-success");
  };

  return (
    <div className="container mt-4">
      <h4>Book Service</h4>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          className="form-control mb-2"
          required
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          className="form-control mb-2"
          required
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Service Address"
          className="form-control mb-2"
          required
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Additional notes (optional)"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <button className="btn btn-success">Confirm Booking</button>
      </form>
    </div>
  );
}
