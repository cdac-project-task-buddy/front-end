import { useParams } from "react-router-dom";
import "./ServiceProviders.css";

const providers = [
  {
    id: 1,
    service: "cooking",
    name: "Chef Isabella Rossi",
    bio: "Expert in Italian cuisine using fresh local ingredients",
    rating: 4.8,
    rate: 45,
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 2,
    service: "cooking",
    name: "Chef Marcus Dubois",
    bio: "French fusion specialist with 10+ years experience",
    rating: 4.9,
    rate: 55,
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 3,
    service: "cleaning",
    name: "Amit Cleaning Services",
    bio: "Professional home & office cleaning",
    rating: 4.6,
    rate: 20,
    image: "https://i.pravatar.cc/100?img=13",
  },
];

export default function ServiceProviders() {
  const { serviceName } = useParams();

  // URL → service name mapping (home-maintenance → home maintenance)
  const normalizedService = serviceName.replace("-", " ");

  const filteredProviders = providers.filter(
    (p) => p.service === serviceName
  );

  return (
    <div className="container py-4">
      <h4 className="fw-bold text-capitalize">
        {normalizedService}
      </h4>
      <p className="text-muted">
        Professionals offering {normalizedService} services
      </p>

      {/* Search + Filters (UI only for now) */}
      <div className="providers-filter mb-3">
        <input
          type="text"
          placeholder="Search providers..."
          className="form-control"
        />
      </div>

      {/* Providers List */}
      {filteredProviders.length === 0 ? (
        <p>No providers available for this service.</p>
      ) : (
        filteredProviders.map((p) => (
          <div className="provider-card" key={p.id}>
            {/* LEFT: Image */}
            <img src={p.image} alt={p.name} />

            {/* MIDDLE: Info */}
            <div className="provider-info">
              <h6>{p.name}</h6>
              <p>{p.bio}</p>
              <span>⭐ {p.rating}</span>
            </div>

            {/* RIGHT: Action */}
            <div className="provider-action">
              <p className="rate">₹{p.rate}/hr</p>
              <button className="btn btn-primary btn-sm">
                Book
              </button>
            </div>
          </div>
        ))
      )}

      {/* Backend integration later */}
      {/* axios.get(`/api/providers?service=${serviceName}`) */}
    </div>
  );
}
