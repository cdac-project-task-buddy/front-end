import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import { authService } from "../api/authService";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      
      // Check if both user and token exist and token is valid
      if (storedUser && token) {
        try {
          // Basic token validation - check if it's not expired
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Date.now() / 1000;
          
          if (tokenPayload.exp > currentTime) {
            setUser(JSON.parse(storedUser));
          } else {
            // Token expired, clear storage
            localStorage.clear();
            setUser(null);
          }
        } catch (error) {
          // Invalid token, clear storage
          localStorage.clear();
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("userLogin", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("userLogin", syncUser);
    };
  }, []);
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    authService.logout();
    localStorage.clear();
    setUser(null);
    setIsMenuOpen(false);
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
    setIsMenuOpen(false);
  };
  
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          TaskBuddy
        </Link>

        {/* Hamburger Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={closeMenu}>Home</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/services" onClick={closeMenu}>Services</Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex gap-2 ms-3 flex-column flex-lg-row">
            {!user ? (
              <>
                <button className="btn btn-outline-primary mb-2 mb-lg-0" onClick={() => { navigate("/login"); closeMenu(); }}>
                  Login
                </button>
                <button className="btn btn-primary" onClick={() => { navigate("/register"); closeMenu(); }}>
                  Register
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-outline-primary mb-2 mb-lg-0" onClick={goToDashboard}>
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
