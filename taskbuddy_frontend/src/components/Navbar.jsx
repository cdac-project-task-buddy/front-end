import "./Navbar.css";
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        
        {/* Logo */}
        <a className="navbar-brand fw-bold text-primary" href="#">
          <i className="bi bi-tools me-2"></i>TaskBuddy
        </a>

        {/* Hamburger button (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
    <div className="collapse navbar-collapse" id="mainNavbar">
  <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mobile-menu">
    <li className="nav-item">
      <a className="nav-link fw-semibold" href="#">Home</a>
    </li>
    <li className="nav-item">
      <a className="nav-link fw-semibold" href="#">Services</a>
    </li>
    <li className="nav-item">
      <a className="nav-link fw-semibold" href="#">About Us</a>
    </li>
    <li className="nav-item">
      <a className="nav-link fw-semibold" href="#">Contact</a>
    </li>
  </ul>

  <div className="d-flex flex-column flex-lg-row gap-2 ms-lg-3 mt-3 mt-lg-0 mobile-buttons">
    <button className="btn btn-outline-primary">Login</button>
    <button className="btn btn-primary">Register</button>
  </div>
</div>


      </div>
    </nav>
  );
}
