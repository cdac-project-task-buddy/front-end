// import "./Login.css";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { login } from "../api/authService";


// export default function Login() {
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const email = e.target.email.value;
//   const password = e.target.password.value;

//   try {
//     const response = await login({ email, password });

//     // ✅ Save role from backend response (OPTIONAL)
//     localStorage.setItem(
//       "user",
//       JSON.stringify({
//         role: response.userRole,
//         email: response.email,
//         userId: response.userId,
//       })
//     );

//     toast.success("Login successful!", {
//       position: "top-center",
//       autoClose: 1500,
//     });

//     setTimeout(() => {
//       if (response.userRole === "ROLE_ADMIN") {
//         navigate("/admin-dashboard");
//       } else if (response.userRole === "ROLE_WORKER") {
//         navigate("/provider-dashboard");
//       } else {
//         navigate("/customer-dashboard");
//       }
//     }, 1500);

//   } catch (error) {
//     // Error message already handled by Axios interceptor
//     console.error(error);
//   }
// };


//   return (
//     <div className="login-page d-flex align-items-center justify-content-center">
//       <div className="login-card shadow">

//         <ToastContainer />

//         <div className="text-center mb-3">
//           <h4 className="fw-bold text-primary">TaskBuddy</h4>
//         </div>

//         <h5 className="text-center fw-bold">Welcome back</h5>
//         <p className="text-center text-muted small">
//           Log in to manage your bookings and requests.
//         </p>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label small">Email</label>
//             <input
//               name="email"
//               type="email"
//               className="form-control"
//               placeholder="john.doe@example.com"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label small">Password</label>
//             <input
//               name="password"
//               type="password"
//               className="form-control"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button className="btn btn-primary w-100 mb-3">
//             Login
//           </button>

//           <p className="text-center small">
//             Don't have an account?{" "}
//             <span
//               className="text-primary"
//               style={{ cursor: "pointer" }}
//               onClick={() => navigate("/register")}
//             >
//               Register
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/authService';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await authService.login(formData);
    
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response));
    
    window.dispatchEvent(new Event('userLogin'));
    
    toast.success('Login successful!');
    
    // Check if user was trying to book a service
    const bookingIntent = localStorage.getItem('bookingIntent');
    if (bookingIntent) {
      const intent = JSON.parse(bookingIntent);
      localStorage.removeItem('bookingIntent');
      navigate(intent.returnTo, {
        state: { serviceId: intent.serviceId, serviceName: intent.serviceName }
      });
      return;
    }
    
    // Regular login flow
    if (response.role === 'ROLE_CUSTOMER') {
      navigate('/services');
    } else if (response.role === 'ROLE_WORKER') {
      navigate('/provider-dashboard');
    } else if (response.role === 'ROLE_ADMIN') {
      navigate('/admin-dashboard');
    }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Login to TaskBuddy</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div className="text-center mt-3">
                <p>
                  Don't have an account?{' '}
                  <Link to="/register">Register here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}