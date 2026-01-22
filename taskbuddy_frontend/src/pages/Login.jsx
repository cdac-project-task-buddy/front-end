import "./Login.css";

export default function Login() {
  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow">

        {/* Logo */}
        <div className="text-center mb-3">
          <h4 className="fw-bold text-primary">TaskBuddy</h4>
        </div>

        <h5 className="text-center fw-bold">Welcome back</h5>
        <p className="text-center text-muted small">
          Log in to manage your bookings and requests.
        </p>

        <form>
          <div className="mb-3">
            <label className="form-label small">Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="john.doe@example.com" 
            />
          </div>

          <div className="mb-3">
            <label className="form-label small">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••" 
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3 small">
            <div>
              <input type="checkbox" className="form-check-input me-1" />
              Remember me
            </div>
            <a href="#" className="text-primary text-decoration-none">
              Forgot password?
            </a>
          </div>

          <button className="btn btn-primary w-100 mb-3">
            Login
          </button>

          <div className="text-center text-muted small mb-3">
            OR
          </div>

          <div className="d-flex gap-2 mb-3">
            <button type="button" className="btn btn-outline-dark w-100">
              <i className="bi bi-google me-1"></i> Google
            </button>
            <button type="button" className="btn btn-outline-dark w-100">
              <i className="bi bi-github me-1"></i> GitHub
            </button>
          </div>

          <p className="text-center small">
            Don't have an account? <a href="#" className="text-primary">Register</a>
          </p>

          <p className="text-center text-muted small mt-3">
            We use secure authentication.
          </p>
        </form>
      </div>
    </div>
  );
}
