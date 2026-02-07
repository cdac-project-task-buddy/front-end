import { useNavigate } from "react-router-dom";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          
          <div className="col-md-6">
            <h1 className="fw-bold display-5">
              All Home Services, <br /> One Trusted Buddy
            </h1>

            <p className="text-muted mt-3">
              Book verified professionals for any home work — quickly and safely.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 mt-4 justify-content-center justify-content-md-start">
              <button 
                className="btn btn-primary px-4"
                onClick={() => navigate("/services")}
              >
                Explore Services
              </button>

              <button 
                className="btn btn-outline-primary px-4"
                onClick={() => navigate("/login")}
              >
                Login / Register
              </button>
            </div>
          </div>

          <div className="col-md-6 mt-4 mt-md-0">
            <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
              
              <div className="carousel-inner rounded hero-slider">
                <div className="carousel-item active">
                  <img src={hero1} className="d-block w-100" alt="Service 1" />
                </div>
                <div className="carousel-item">
                  <img src={hero2} className="d-block w-100" alt="Service 2" />
                </div>
                <div className="carousel-item">
                  <img src={hero3} className="d-block w-100" alt="Service 3" />
                </div>
              </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
              </button>

              <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
