import { useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {


    
  // 🔹 Admin Info
  const admin = {
    name: "Admin",
    email: "admin@taskbuddy.com",
    role: "Administrator",
  };

  // 🔹 Providers
  const [providers, setProviders] = useState([
    { id: 1, name: "Rahul Plumber", service: "Plumbing", verified: false },
    { id: 2, name: "Amit Electrician", service: "Electrical", verified: true },
  ]);

  // 🔹 Users
  const [users, setUsers] = useState([
    { id: 1, name: "Neha", email: "neha@gmail.com" },
    { id: 2, name: "Rohit", email: "rohit@gmail.com" },
  ]);

  // 🔹 Bookings
  const bookings = [
    { id: 1, service: "Plumbing", user: "Neha", status: "Completed" },
    { id: 2, service: "Cleaning", user: "Rohit", status: "Pending" },
  ];

  // 🔹 Verify Provider
  const verifyProvider = (id) => {
    setProviders(
      providers.map((p) =>
        p.id === id ? { ...p, verified: true } : p
      )
    );
  };

  // 🔹 Delete Provider
  const deleteProvider = (id) => {
    setProviders(providers.filter((p) => p.id !== id));
  };

  // 🔹 Delete User
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
            <h5 className="mb-0">
                Welcome back 👋
            </h5>
            <small className="text-muted">
                {admin?.email || "Customer"}
            </small>
            </div>

            <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => navigate("/profile")}
            >
            My Profile
            </button>
      </div>

      {/* 🔹 ADMIN PROFILE */}
      <div className="card p-3 mb-4">
        <h5>Admin Profile</h5>
        <p><b>Name:</b> {admin.name}</p>
        <p><b>Email:</b> {admin.email}</p>
        <p><b>Role:</b> {admin.role}</p>
      </div>

      {/* 🔹 PLATFORM STATS */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card p-3">
            <h6>Total Users</h6>
            <h4>{users.length}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Service Providers</h6>
            <h4>{providers.length}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Total Bookings</h6>
            <h4>{bookings.length}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h6>Pending Providers</h6>
            <h4>{providers.filter(p => !p.verified).length}</h4>
          </div>
        </div>
      </div>

      {/* 🔹 PROVIDER MANAGEMENT */}
      <div className="card mb-4 p-3">
        <h5>Manage Service Providers</h5>

        {providers.map((p) => (
          <div
            key={p.id}
            className="d-flex justify-content-between align-items-center border-bottom py-2"
          >
            <div>
              <strong>{p.name}</strong> – {p.service}
              <br />
              {p.verified ? (
                <span className="badge bg-success">Verified</span>
              ) : (
                <span className="badge bg-warning text-dark">Pending</span>
              )}
            </div>

            <div className="d-flex gap-2">
              {!p.verified && (
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => verifyProvider(p.id)}
                >
                  Verify
                </button>
              )}

              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteProvider(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 USER MANAGEMENT */}
      <div className="card mb-4 p-3">
        <h5>Manage Users</h5>

        {users.map((u) => (
          <div
            key={u.id}
            className="d-flex justify-content-between align-items-center border-bottom py-2"
          >
            <div>
              {u.name} – {u.email}
            </div>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteUser(u.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* 🔹 BOOKINGS MONITORING */}
      <div className="card p-3">
        <h5>All Bookings</h5>

        {bookings.map((b) => (
          <div
            key={b.id}
            className="d-flex justify-content-between border-bottom py-2"
          >
            <span>{b.service}</span>
            <span>{b.user}</span>
            <span
              className={`badge ${
                b.status === "Completed"
                  ? "bg-success"
                  : "bg-warning text-dark"
              }`}
            >
              {b.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
