export default function ProviderStats() {
  return (
    <div className="row g-3">
      <div className="col-md-3">
        <div className="card p-3">
          <h6>Today’s Jobs</h6>
          <h4>3</h4>
          <small>1 pending, 2 confirmed</small>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3">
          <h6>Upcoming</h6>
          <h4>8</h4>
          <small>Next 7 days</small>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card p-3">
          <h6>Earnings Today</h6>
          <h4>₹1200</h4>
        </div>
      </div>
    </div>
  );
}
