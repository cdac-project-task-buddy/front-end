import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { bookingService } from "../api/bookingService";
import { toast } from "react-toastify";

export default function BookService() {
  const { id } = useParams(); // workerId
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId, serviceName } = location.state || {};

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || !user.userId) {
      toast.error('Please login to book a service');
      navigate('/login');
      return;
    }

    if (user.role !== 'ROLE_CUSTOMER') {
      toast.error('Only customers can book services');
      navigate('/');
      return;
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    workerId: parseInt(id),
    serviceId: serviceId,
    bookingDate: "",
    address: {
      street: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      country: "India"
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [minDateTime, setMinDateTime] = useState("");

  useEffect(() => {
    // Set minimum date to current date and time
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setMinDateTime(now.toISOString().slice(0, 16));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: { ...formData.address, [name]: value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate booking date is not in the past
    const selectedDate = new Date(formData.bookingDate);
    const now = new Date();
    
    if (selectedDate < now) {
      const errorMsg = "Cannot book for past dates. Please select a future date and time.";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    try {
      const bookingDateTime = new Date(formData.bookingDate).toISOString();
      
      const bookingData = {
        workerId: formData.workerId,
        serviceId: formData.serviceId,
        bookingDate: bookingDateTime,
        address: formData.address
      };
      
      console.log('Creating booking with data:', bookingData);
      const bookingResponse = await bookingService.createBooking(bookingData);
      console.log('Booking response:', bookingResponse);
      
      toast.success('Booking created successfully!');
      
      // Navigate to payment page instead of booking success
      navigate("/payment", { 
        state: { 
          booking: bookingResponse, // Remove .data since it's already the data
          serviceName: serviceName 
        } 
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to create booking";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="mb-4">Book {serviceName} Service</h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                {/* Booking Date & Time */}
                <div className="mb-3">
                  <label className="form-label">Booking Date & Time</label>
                  <input
                    type="datetime-local"
                    name="bookingDate"
                    className="form-control"
                    value={formData.bookingDate}
                    onChange={handleChange}
                    min={minDateTime}
                    required
                  />
                  <small className="text-muted">Select a future date and time</small>
                </div>

                {/* Address Section */}
                <h5 className="mt-4 mb-3">Service Address</h5>

                <div className="mb-3">
                  <label className="form-label">Street</label>
                  <input
                    type="text"
                    name="street"
                    className="form-control"
                    value={formData.address.street}
                    onChange={handleAddressChange}
                    placeholder="House/Flat No., Building Name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Area/Locality</label>
                  <input
                    type="text"
                    name="area"
                    className="form-control"
                    value={formData.address.area}
                    onChange={handleAddressChange}
                    placeholder="Area, Locality"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={formData.address.city}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      value={formData.address.state}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    className="form-control"
                    value={formData.address.pincode}
                    onChange={handleAddressChange}
                    pattern="[0-9]{6}"
                    maxLength="6"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
