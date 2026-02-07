export default function CustomerDetails() {
  return (
    <div className="card p-3">
      <h6>Customer Information</h6>
      <p>Alice Smith</p>
      <p>555-123-4567</p>
      <p>alice@email.com</p>

      <hr />

      <h6>Service Details</h6>
      <p>Deep Cleaning</p>
      <p>10:00 AM – 12:00 PM</p>
      <p>₹45/hr</p>

      <button className="btn btn-primary mt-3">
        Start Job
      </button>
    </div>
  );
}
