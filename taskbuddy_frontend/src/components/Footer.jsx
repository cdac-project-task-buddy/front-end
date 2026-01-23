import "./Footer.css";

export default function Footer() {
  return (
    <footer id="footer" className="footer bg-dark text-light py-2">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* Brand */}
          <div className="col-12 col-md-3 mb-2">
            <h5 className="fw-bold">TaskBuddy</h5>
            <p className="text-light small opacity-75">
              Reliable home services at your doorstep. We connect you with trusted professionals for all your daily needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-3 mb-2">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li>Home</li>
              <li>Services</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-md-3 mb-2">
            <h6 className="fw-semibold">Support</h6>
            <ul className="list-unstyled footer-links">
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-12 col-md-3 mb-2">
            <h6 className="fw-semibold">Contact</h6>
            <p className="mb-1 small">📧 support@taskbuddy.com</p>
            <p className="small">📞 +91 99999 99999</p>

            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
              <i className="bi bi-facebook footer-icon"></i>
              <i className="bi bi-instagram footer-icon"></i>
              <i className="bi bi-twitter footer-icon"></i>
              <i className="bi bi-linkedin footer-icon"></i>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div id="Bottom" className="text-center border-top pt-2 mt-2 small">
          © {new Date().getFullYear()} TaskBuddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
