import "./Services.css";

const services = [
  { name: "Gardening", icon: "bi-flower1" },
  { name: "Cooking", icon: "bi-egg-fried" },
  { name: "Electrician", icon: "bi-lightning-charge" },
  { name: "Plumber", icon: "bi-droplet" },
  { name: "Cleaning", icon: "bi-bucket" },
  { name: "Carpenter", icon: "bi-hammer" },
  { name: "AC Repair", icon: "bi-snow" },
  { name: "Home Maintenance", icon: "bi-house-gear" },
];

export default function Services() {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h3 className="fw-bold mb-4">Services We Offer</h3>

        <div className="row g-4">
          {services.map((s, i) => (
            <div className="col-6 col-sm-4 col-md-3" key={i}>
              <div className="service-card h-100">
                <i className={`bi ${s.icon} service-icon`}></i>
                <h6 className="mt-3">{s.name}</h6>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

