import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import { authService } from "../api/authService";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("userLogin", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("userLogin", syncUser);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const goToDashboard = () => {
    if (user?.role === "ROLE_WORKER") {
      navigate("/provider-dashboard");
    } else if (user?.role === "ROLE_ADMIN") {
      navigate("/admin-dashboard");
    } else if (user?.role === "ROLE_CUSTOMER") {
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
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/services">Services</Link>
                </li>
              </>
            )}
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
