// import "./Register.css";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useState } from "react";

// export default function Register() {
//   const navigate = useNavigate();

//   // common fields
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     role: "Customer",

//     // provider-only fields
//     serviceCategory: "",
//     experience: "",
//     price: ""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // 🔹 prepare payload
//     const payload =
//       formData.role === "Service Provider"
//         ? formData
//         : {
//             name: formData.name,
//             email: formData.email,
//             password: formData.password,
//             phone: formData.phone,
//             role: formData.role
//           };

//     console.log("Submitting:", payload); // backend API later

//     toast.success("Registration successful!", {
//       position: "top-center",
//       autoClose: 1500
//     });

//     setTimeout(() => {
//       if (formData.role === "Service Provider") {
//         navigate("/provider-onboarding");
//       } else {
//         navigate("/login");
//       }
//     }, 1500);
//   };

//   return (
//     <div className="register-page d-flex align-items-center justify-content-center">
//       <div className="register-card shadow">

//         <ToastContainer />

//         <div className="text-center mb-3">
//           <h4 className="fw-bold text-primary">TaskBuddy</h4>
//         </div>

//         <h5 className="text-center fw-bold">Create your account</h5>
//         <p className="text-center text-muted small">
//           Sign up to book or provide home services
//         </p>

//         <form onSubmit={handleSubmit}>
//           {/* Common Fields */}
//           <div className="mb-2">
//             <label className="form-label small">Full name</label>
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-2">
//             <label className="form-label small">Email</label>
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-2">
//             <label className="form-label small">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               required
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-2">
//             <label className="form-label small">Phone</label>
//             <input
//               type="tel"
//               name="phone"
//               className="form-control"
//               onChange={handleChange}
//             />
//           </div>

//           {/* Role */}
//           <div className="mb-3">
//             <label className="form-label small">Role</label>
//             <select
//               name="role"
//               className="form-select"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option>Customer</option>
//               <option>Service Provider</option>
//             </select>
//           </div>

//           {/* 🔹 Provider-only Fields */}
//           {formData.role === "Service Provider" && (
//             <>
//               <div className="mb-2">
//                 <label className="form-label small">Service Category</label>
//                 <select value={formData.serviceCategory} className="form-control" required onChange={handleChange}>
//                   {SERVICE_NAMES.map(s => (
//                     <option key={s} value={s}>{s}</option>
//               ))}

//               </select>

//               </div>

//               <div className="mb-2">
//                 <label className="form-label small">Experience (years)</label>
//                 <input
//                   type="number"
//                   name="experience"
//                   className="form-control"
//                   required
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-2">
//                 <label className="form-label small">Price per Service</label>
//                 <input
//                   type="number"
//                   name="price"
//                   className="form-control"
//                   required
//                   onChange={handleChange}
//                 />
//               </div>
//             </>
//           )}

//           <div className="form-check mb-3 small">
//             <input className="form-check-input" type="checkbox" required />
//             <label className="form-check-label">
//               I agree to the <span className="text-primary">Terms</span> and{" "}
//               <span className="text-primary">Privacy Policy</span>.
//             </label>
//           </div>

//           <button className="btn btn-primary w-100">
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/authService';
import { toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    userRole: 'ROLE_CUSTOMER',
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

  // Validation
  if (formData.password.length < 6) {
    setError('Password must be at least 6 characters');
    toast.error('Password must be at least 6 characters');
    setLoading(false);
    return;
  }

  if (!/^[0-9]{10,14}$/.test(formData.phone)) {
    setError('Phone number must be 10-14 digits');
    toast.error('Phone number must be 10-14 digits');
    setLoading(false);
    return;
  }

  try {
    const response = await authService.register(formData);
    
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response));
    
    window.dispatchEvent(new Event('userLogin'));
    
    toast.success('Registration successful!');
    
    // Check if user was trying to book a service
    const bookingIntent = localStorage.getItem('bookingIntent');
    if (bookingIntent && response.role === 'ROLE_CUSTOMER') {
      const intent = JSON.parse(bookingIntent);
      localStorage.removeItem('bookingIntent');
      navigate(intent.returnTo, {
        state: { serviceId: intent.serviceId, serviceName: intent.serviceName }
      });
      return;
    }
    
    // Regular registration flow
    if (response.role === 'ROLE_WORKER') {
      navigate('/worker-profile-setup');
    } else if (response.role === 'ROLE_CUSTOMER') {
      navigate('/services');
    }
  } catch (err) {
    const errorMsg = err.response?.data?.message || 'Registration failed';
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
              <h2 className="text-center mb-4">Register</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

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
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10,14}"
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
                    minLength="6"
                    required
                  />
                  <small className="text-muted">Minimum 6 characters</small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Register as</label>
                  <select
                    className="form-select"
                    name="userRole"
                    value={formData.userRole}
                    onChange={handleChange}
                  >
                    <option value="ROLE_CUSTOMER">Customer</option>
                    <option value="ROLE_WORKER">Service Provider</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>

              <div className="text-center mt-3">
                <p>
                  Already have an account?{' '}
                  <Link to="/login">Login here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}