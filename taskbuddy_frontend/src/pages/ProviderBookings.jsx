import { useState, useEffect } from 'react';
import { bookingService } from '../api/bookingService';

export default function ProviderBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getWorkerBookings();
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await bookingService.updateBookingStatus(bookingId, status);
      fetchBookings();
      alert(`Booking ${status.toLowerCase()} successfully`);
    } catch (err) {
      alert('Failed to update booking status');
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
    <div className="container mt-4">
      <h4>Booking Requests</h4>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="alert alert-info">
          No bookings yet.
        </div>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="card mb-3 p-3">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p><strong>Customer:</strong> {booking.customerName}</p>
                <p><strong>Phone:</strong> {booking.customerPhone}</p>
                <p><strong>Service:</strong> {booking.serviceName}</p>
                <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
                {booking.address && (
                  <p><strong>Address:</strong> {booking.address.street}, {booking.address.city}, {booking.address.pincode}</p>
                )}
                <p><strong>Price:</strong> ₹{booking.price}</p>
              </div>
              <div>
                <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
            </div>

            <div className="mt-2">
              {booking.status === 'PENDING' && (
                <>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleUpdateStatus(booking.id, 'BOOKED')}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')}
                  >
                    Reject
                  </button>
                </>
              )}
              {booking.status === 'BOOKED' && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateStatus(booking.id, 'COMPLETED')}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
