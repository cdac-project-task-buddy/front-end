// export default function MyBookings() {
//   const bookings = [
//     {
//       id: 1,
//       service: "Plumber",
//       date: "20 Jan 2026",
//       status: "Confirmed"
//     },
//     {
//       id: 2,
//       service: "Electrician",
//       date: "15 Jan 2026",
//       status: "Completed"
//     }
//   ];

//   return (
//     <div className="container mt-4">
//       <h4>My Bookings</h4>

//       {bookings.map((b) => (
//         <div key={b.id} className="card mb-2 p-3">
//           <p><strong>Service:</strong> {b.service}</p>
//           <p><strong>Date:</strong> {b.date}</p>
//           <p><strong>Status:</strong> {b.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { bookingService } from '../api/bookingService';
import { reviewService } from '../api/reviewService';
import { toast } from 'react-toastify';
import Loading from './Loading';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (err) {
      setError('Failed to load bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingService.cancelBooking(bookingId);
        setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'CANCELLED' } : b));
        toast.success('Booking cancelled successfully');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to cancel booking');
      }
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookingService.deleteBooking(bookingId);
        setBookings(bookings.filter(b => b.id !== bookingId));
        toast.success('Booking deleted successfully');
      } catch (err) {
        toast.error('Failed to delete booking');
      }
    }
  };

  const handleReview = (booking) => {
    setSelectedBooking(booking);
    if (booking.review) {
      setReviewData({ rating: booking.review.rating, comment: booking.review.comment });
      setIsEditMode(true);
    } else {
      setReviewData({ rating: 5, comment: '' });
      setIsEditMode(false);
    }
    setShowReviewModal(true);
  };

  const submitReview = async () => {
    try {
      if (isEditMode) {
        await reviewService.updateReview(selectedBooking.review.id, {
          bookingId: selectedBooking.id,
          rating: reviewData.rating,
          comment: reviewData.comment,
        });
        toast.success('Review updated successfully');
      } else {
        await reviewService.createReview({
          bookingId: selectedBooking.id,
          rating: reviewData.rating,
          comment: reviewData.comment,
        });
        toast.success('Review submitted successfully');
      }
      setShowReviewModal(false);
      setReviewData({ rating: 5, comment: '' });
      setIsEditMode(false);
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    }
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      PENDING: 'bg-warning',
      BOOKED: 'bg-info',
      COMPLETED: 'bg-success',
      CANCELLED: 'bg-danger',
    };
    return classes[status] || 'bg-secondary';
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Bookings</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="alert alert-info">
          You haven't made any bookings yet.
        </div>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title">{booking.serviceName}</h5>
                      <p className="card-text">
                        <strong>Provider:</strong> {booking.workerName}
                      </p>
                      <p className="card-text">
                        <strong>Phone:</strong> {booking.workerPhone}
                      </p>
                      <p className="card-text">
                        <strong>Date:</strong> {new Date(booking.bookingDate).toLocaleString()}
                      </p>
                      <p className="card-text">
                        <strong>Price:</strong> ₹{booking.price}
                      </p>
                      {booking.address && (
                        <p className="card-text">
                          <strong>Address:</strong> {booking.address.street}, {booking.address.city}, {booking.address.pincode}
                        </p>
                      )}
                    </div>
                    <div>
                      <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    {booking.status === 'PENDING' && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </button>
                    )}
                    {booking.status === 'CANCELLED' && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteBooking(booking.id)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    )}
                    {booking.status === 'COMPLETED' && (
                      <>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleReview(booking)}
                        >
                          {booking.review ? 'Edit Review' : 'Write Review'}
                        </button>
                        {booking.review && (
                          <div className="mt-2 p-2 bg-light rounded">
                            <small className="text-muted">Your Review:</small>
                            <div className="d-flex align-items-center gap-2">
                              <span className="text-warning">{'⭐'.repeat(booking.review.rating)}</span>
                              <span className="text-muted">({booking.review.rating}/5)</span>
                            </div>
                            <p className="mb-0 mt-1"><small>{booking.review.comment}</small></p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? 'Edit Review' : 'Write a Review'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowReviewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Rating (1-5)</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="5"
                    value={reviewData.rating}
                    onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value) })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Comment</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowReviewModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitReview}
                >
                  {isEditMode ? 'Update Review' : 'Submit Review'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}