import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    // 🔹 Dummy role logic (backend later)
    let role = "customer";

    if (email === "admin@taskbuddy.com") {
      role = "admin";
    } else if (email.endsWith("@provider.com")) {
      role = "provider";
    } else {
      role = "customer";
    }

    // ✅ ADD THIS (CRITICAL)
    localStorage.setItem(
      "user",
      JSON.stringify({ role })
    );

    toast.success("Login successful!", {
      position: "top-center",
      autoClose: 1500,
    });

    setTimeout(() => {
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "provider") {
        navigate("/provider-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
    }, 1500);
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow">

        <ToastContainer />

        <div className="text-center mb-3">
          <h4 className="fw-bold text-primary">TaskBuddy</h4>
        </div>

        <h5 className="text-center fw-bold">Welcome back</h5>
        <p className="text-center text-muted small">
          Log in to manage your bookings and requests.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="john.doe@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              required
            />
          </div>

          <button className="btn btn-primary w-100 mb-3">
            Login
          </button>

          <p className="text-center small">
            Don't have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
