import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Payment from '../components/Payment';
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, serviceName } = location.state || {};

  useEffect(() => {
    if (!booking) {
      navigate('/');
    }
  }, [booking, navigate]);

  if (!booking) {
    return null;
  }

  const handlePaymentSuccess = (response) => {
    toast.success('Payment successful!');
    navigate('/booking-success', { 
      state: { 
        booking: booking,
        paymentResponse: response 
      } 
    });
  };

  const handlePaymentFailure = (error) => {
    toast.error(`Payment failed: ${error}`);
    // Stay on payment page to retry
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Complete Payment</h2>
              
              <Payment 
                booking={{
                  ...booking,
                  serviceName: serviceName,
                  customerName: booking.customerName || 'Customer',
                  customerEmail: booking.customerEmail || '',
                  customerPhone: booking.customerPhone || ''
                }}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentFailure={handlePaymentFailure}
              />
              
              <div className="mt-3 text-center">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/customer-dashboard')}
                >
                  Cancel & Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;