const appointments = [
  {
    id: 1,
    customer: "Alice Smith",
    service: "Deep Cleaning",
    time: "10:00 AM - 12:00 PM",
    status: "CONFIRMED",
  },
  {
    id: 2,
    customer: "Bob Johnson",
    service: "Lawn Mowing",
    time: "02:00 PM - 03:00 PM",
    status: "PENDING",
  },
];

export default function AppointmentsList() {
  return (
    <div className="card p-3">
      <h5>Upcoming Appointments</h5>

      {appointments.map((a) => (
        <div key={a.id} className="border rounded p-3 mt-2">
          <h6>{a.customer}</h6>
          <p>{a.service}</p>
          <small>{a.time}</small>

          {a.status === "PENDING" && (
            <div className="mt-2">
              <button className="btn btn-success btn-sm me-2">
                Accept
              </button>
              <button className="btn btn-outline-danger btn-sm">
                Decline
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
