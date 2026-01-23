export default function MyBookings() {
  const bookings = [
    {
      id: 1,
      service: "Plumber",
      date: "20 Jan 2026",
      status: "Confirmed"
    },
    {
      id: 2,
      service: "Electrician",
      date: "15 Jan 2026",
      status: "Completed"
    }
  ];

  return (
    <div className="container mt-4">
      <h4>My Bookings</h4>

      {bookings.map((b) => (
        <div key={b.id} className="card mb-2 p-3">
          <p><strong>Service:</strong> {b.service}</p>
          <p><strong>Date:</strong> {b.date}</p>
          <p><strong>Status:</strong> {b.status}</p>
        </div>
      ))}
    </div>
  );
}
