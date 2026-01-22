import "./Trust.css";

const trustPoints = [
  {
    title: "Verified Professionals",
    icon: "bi-shield-check",
    desc: "All service providers are background verified and trained to ensure safety and quality."
  },
  {
    title: "Affordable Pricing",
    icon: "bi-currency-rupee",
    desc: "Transparent and competitive pricing with no hidden charges."
  },
  {
    title: "On-Time Service",
    icon: "bi-clock",
    desc: "Professionals arrive on schedule and complete work within committed time."
  },
  {
    title: "Customer Support",
    icon: "bi-headset",
    desc: "24/7 support team to resolve issues and ensure smooth service experience."
  }
];

export default function Trust() {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h3 className="fw-bold mb-5">Why Choose TaskBuddy?</h3>

        <div className="row g-4">
          {trustPoints.map((item, i) => (
            <div className="col-12 col-sm-6 col-md-3" key={i}>
              <div className="trust-card h-100">
                <i className={`bi ${item.icon} trust-icon`}></i>
                <h6 className="mt-3">{item.title}</h6>
                <p className="text-muted mt-2 small">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
