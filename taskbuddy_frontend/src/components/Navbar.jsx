import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const goToDashboard = () => {
    if (user?.role === "provider") {
      navigate("/provider-dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          TaskBuddy
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
          </ul>

          <div className="d-flex gap-2 ms-3">
            {!user ? (
              <>
                <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
                  Login
                </button>
                <button className="btn btn-primary" onClick={() => navigate("/register")}>
                  Register
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-outline-primary" onClick={goToDashboard}>
                  Dashboard
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
