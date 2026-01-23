export default function ProviderBookings() {
  const requests = [
    {
      id: 1,
      customer: "Amit",
      date: "20 Jan 2026",
      address: "Pune"
    }
  ];

  return (
    <div className="container mt-4">
      <h4>Booking Requests</h4>

      {requests.map((r) => (
        <div key={r.id} className="card mb-3 p-3">
          <p><strong>Customer:</strong> {r.customer}</p>
          <p><strong>Date:</strong> {r.date}</p>
          <p><strong>Address:</strong> {r.address}</p>

          <button className="btn btn-success me-2">Accept</button>
          <button className="btn btn-danger">Reject</button>
        </div>
      ))}
    </div>
  );
}
