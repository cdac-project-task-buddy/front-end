import "./Register.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();

  // common fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "Customer",

    // provider-only fields
    serviceCategory: "",
    experience: "",
    price: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 prepare payload
    const payload =
      formData.role === "Service Provider"
        ? formData
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            role: formData.role
          };

    console.log("Submitting:", payload); // backend API later

    toast.success("Registration successful!", {
      position: "top-center",
      autoClose: 1500
    });

    setTimeout(() => {
      if (formData.role === "Service Provider") {
        navigate("/provider-onboarding");
      } else {
        navigate("/login");
      }
    }, 1500);
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center">
      <div className="register-card shadow">

        <ToastContainer />

        <div className="text-center mb-3">
          <h4 className="fw-bold text-primary">TaskBuddy</h4>
        </div>

        <h5 className="text-center fw-bold">Create your account</h5>
        <p className="text-center text-muted small">
          Sign up to book or provide home services
        </p>

        <form onSubmit={handleSubmit}>
          {/* Common Fields */}
          <div className="mb-2">
            <label className="form-label small">Full name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="form-label small">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="form-label small">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="form-label small">Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label small">Role</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option>Customer</option>
              <option>Service Provider</option>
            </select>
          </div>

          {/* 🔹 Provider-only Fields */}
          {formData.role === "Service Provider" && (
            <>
              <div className="mb-2">
                <label className="form-label small">Service Category</label>
                <input
                  type="text"
                  name="serviceCategory"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label small">Experience (years)</label>
                <input
                  type="number"
                  name="experience"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label small">Price per Service</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="form-check mb-3 small">
            <input className="form-check-input" type="checkbox" required />
            <label className="form-check-label">
              I agree to the <span className="text-primary">Terms</span> and{" "}
              <span className="text-primary">Privacy Policy</span>.
            </label>
          </div>

          <button className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
