import "./HowItWorks.css";

const steps = [
  {
    title: "Choose a Service",
    desc: "Browse through a wide range of home services like cleaning, plumbing, electrical work and select what you need."
  },
  {
    title: "Book a Professional",
    desc: "Pick a verified professional based on ratings, availability and pricing, and schedule at your convenience."
  },
  {
    title: "Get the Job Done",
    desc: "The professional arrives on time and completes the service. Pay securely and leave feedback."
  }
];

export default function HowItWorks() {
  return (
    <section className="bg-light py-5">
      <div className="container text-center">
        <h3 className="fw-bold mb-5">How It Works</h3>

        <div className="row g-4">
          {steps.map((step, i) => (
            <div className="col-12 col-md-4" key={i}>
              <div className="step-card h-100">
                <div className="step-number">{i + 1}</div>
                <h5 className="mt-3">{step.title}</h5>
                <p className="text-muted mt-2">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
