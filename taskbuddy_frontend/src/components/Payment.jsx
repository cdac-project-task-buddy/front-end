import React, { useState } from 'react';
import { paymentService } from '../api/paymentService';

const Payment = ({ booking, onPaymentSuccess, onPaymentFailure }) => {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load payment gateway');
        return;
      }

      // Create payment order
      const orderResponse = await paymentService.createPaymentOrder({
        bookingId: booking.id,
        amount: booking.price,
        currency: 'INR'
      });

      const options = {
        key: orderResponse.data.key,
        amount: orderResponse.data.amount * 100, // Convert to paise
        currency: orderResponse.data.currency,
        name: 'TaskBuddy',
        description: `Payment for ${booking.serviceName}`,
        order_id: orderResponse.data.orderId,
        handler: async (response) => {
          try {
            // Verify payment
            const verificationResponse = await paymentService.verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              bookingId: booking.id
            });
            
            onPaymentSuccess(verificationResponse);
          } catch (error) {
            onPaymentFailure(error.message || 'Payment verification failed');
          }
        },
        modal: {
          ondismiss: () => {
            onPaymentFailure('Payment cancelled by user');
          }
        },
        prefill: {
          name: booking.customerName || 'Customer',
          email: booking.customerEmail || '',
          contact: booking.customerPhone || ''
        },
        theme: {
          color: '#3399cc'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      onPaymentFailure(error.message || 'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-details">
        <h3>Payment Details</h3>
        <p><strong>Service:</strong> {booking.serviceName}</p>
        <p><strong>Worker:</strong> {booking.workerName}</p>
        <p><strong>Amount:</strong> ₹{booking.price}</p>
        <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
      </div>
      
      <button 
        onClick={handlePayment}
        disabled={loading}
        className="pay-now-btn"
        style={{
          backgroundColor: '#3399cc',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Processing...' : `Pay ₹${booking.price}`}
      </button>
    </div>
  );
};

export default Payment;