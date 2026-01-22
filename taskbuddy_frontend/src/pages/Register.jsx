import "./Register.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Customer");

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Registration successful!", {
      position: "top-center",
      autoClose: 1500,
    });

    setTimeout(() => {
      if (role === "Service Provider") {
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
          <div className="mb-2">
            <label className="form-label small">Full name</label>
            <input type="text" className="form-control" required />
          </div>

          <div className="mb-2">
            <label className="form-label small">Email</label>
            <input type="email" className="form-control" required />
          </div>

          <div className="mb-2">
            <label className="form-label small">Password</label>
            <input type="password" className="form-control" required />
          </div>

          <div className="mb-2">
            <label className="form-label small">Phone</label>
            <input type="tel" className="form-control" />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label small">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Customer</option>
              <option>Service Provider</option>
            </select>
          </div>

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
