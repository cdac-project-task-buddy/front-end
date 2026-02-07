import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { bookingService } from '../api/bookingService';
import { workerService } from '../api/workerService';
import { reviewService } from '../api/reviewService';
import { toast } from 'react-toastify';

export default function ProviderDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [workerId, setWorkerId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    fetchBookings();
    fetchWorkerProfile();
  }, []);

  useEffect(() => {
    if (workerId) {
      fetchReviews();
    }
  }, [workerId]);

  const fetchWorkerProfile = async () => {
    try {
      const workers = await workerService.getAllWorkers();
      const currentWorker = workers.find(w => w.email === user?.email);
      if (currentWorker) {
        setWorkerId(currentWorker.id);
        setIsAvailable(currentWorker.availablity);
        setIsVerified(currentWorker.verified || false);
      }
    } catch (err) {
      console.error('Failed to fetch worker profile', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getWorkerReviews(workerId);
      setReviews(data);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getWorkerBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await bookingService.updateBookingStatus(bookingId, status);
      fetchBookings();
      toast.success(`Booking ${status.toLowerCase()} successfully`);
    } catch (err) {
      toast.error('Failed to update booking status');
    }
  };

  const toggleAvailability = async () => {
    if (!workerId) {
      toast.error('Worker profile not found');
      return;
    }
    
    try {
      await workerService.updateAvailability(workerId, !isAvailable);
      setIsAvailable(!isAvailable);
      toast.success(`Availability set to ${!isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}`);
    } catch (err) {
      toast.error('Failed to update availability');
    }
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      PENDING: 'bg-warning text-dark',
      BOOKED: 'bg-info',
      COMPLETED: 'bg-success',
      CANCELLED: 'bg-danger',
    };
    return classes[status] || 'bg-secondary';
  };

  // Calculate stats from real bookings
  const stats = {
    todayJobs: bookings.filter(b => 
      new Date(b.bookingDate).toDateString() === new Date().toDateString()
    ).length,
    pending: bookings.filter(b => b.status === 'PENDING').length,
    confirmed: bookings.filter(b => b.status === 'BOOKED').length,
    totalEarnings: bookings
      .filter(b => b.status === 'COMPLETED')
      .reduce((sum, b) => sum + parseFloat(b.price || 0), 0)
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Verification Alert */}
      {!isVerified && (
        <div className="alert alert-warning mb-4">
          <strong>⚠️ Account Pending Verification</strong>
          <p className="mb-0">Your account is awaiting admin verification. You will be able to receive bookings once verified.</p>
        </div>
      )}

      {/* TOP HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-0">Welcome back 👋</h5>
          <small className="text-muted">
            {user?.email || "Service Provider"}
          </small>
        </div>

        <div className="d-flex gap-2 align-items-center">
          {/* Availability Toggle */}
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="availabilitySwitch"
              checked={isAvailable}
              onChange={toggleAvailability}
              style={{ cursor: 'pointer', width: '3rem', height: '1.5rem' }}
            />
            <label className="form-check-label ms-2" htmlFor="availabilitySwitch">
              <span className={`badge ${isAvailable ? 'bg-success' : 'bg-secondary'}`}>
                {isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </label>
          </div>

          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => navigate("/provider-bookings")}
          >
            View All Bookings
          </button>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate("/profile")}
          >
            My Profile
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card p-3">
            <h6>Today's Jobs</h6>
            <h4>{stats.todayJobs}</h4>
            <small>{stats.pending} pending, {stats.confirmed} confirmed</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Total Bookings</h6>
            <h4>{bookings.length}</h4>
            <small>All time</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Pending Requests</h6>
            <h4>{stats.pending}</h4>
            <small>Awaiting response</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Total Earnings</h6>
            <h4>₹{stats.totalEarnings}</h4>
            <small>Completed jobs</small>
          </div>
        </div>
      </div>

      {/* BOOKINGS LIST */}
      <div className="row">
        <div className="col-md-8">
          <div className="card p-3">
            <h5 className="mb-3">Recent Bookings</h5>

            {bookings.length === 0 ? (
              <div className="alert alert-info">No bookings yet.</div>
            ) : (
              bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="border rounded p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6>{booking.customerName}</h6>
                      <p className="mb-1"><strong>Service:</strong> {booking.serviceName}</p>
                      <p className="mb-1"><strong>Phone:</strong> {booking.customerPhone}</p>
                      <p className="mb-1">
                        <strong>Date:</strong> {new Date(booking.bookingDate).toLocaleString()}
                      </p>
                      {booking.address && (
                        <p className="mb-1 text-muted">
                          <strong>Address:</strong> {booking.address.street}, {booking.address.city}
                        </p>
                      )}
                      <p className="mb-0"><strong>Price:</strong> ₹{booking.price}</p>
                    </div>
                    <div>
                      <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {booking.status === 'PENDING' && (
                    <div className="mt-2">
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleUpdateStatus(booking.id, 'BOOKED')}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')}
                      >
                        Decline
                      </button>
                    </div>
                  )}

                  {booking.status === 'BOOKED' && (
                    <div className="mt-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleUpdateStatus(booking.id, 'COMPLETED')}
                      >
                        Mark as Completed
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="col-md-4">
          <div className="card p-3">
            <h5 className="mb-3">Customer Reviews</h5>
            {reviews.length === 0 ? (
              <p className="text-muted">No reviews yet</p>
            ) : (
              reviews.slice(0, 5).map((review) => (
                <div key={review.id} className="border-bottom pb-2 mb-2">
                  <div className="d-flex justify-content-between">
                    <strong>{review.customerName}</strong>
                    <span className="text-warning">{'⭐'.repeat(review.rating)}</span>
                  </div>
                  <p className="mb-0 text-muted"><small>{review.comment}</small></p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
