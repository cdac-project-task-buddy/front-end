import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminService } from "../api/adminService";
import { serviceService } from "../api/serviceService";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  
  // Data States
  const [stats, setStats] = useState({ users: 0, workers: 0, bookings: 0, pendingWorkers: 0 });
  const [users, setUsers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  // Search & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal States
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({ name: "", description: "", basePrice: 0 });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "overview") {
        const statsData = await adminService.getStats();
        setStats(statsData);
      } else if (activeTab === "users") {
        const usersData = await adminService.getAllUsers();
        setUsers(usersData || []);
      } else if (activeTab === "workers") {
        const workersData = await adminService.getAllWorkers();
        setWorkers(workersData || []);
      } else if (activeTab === "bookings") {
        const bookingsData = await adminService.getAllBookings();
        setBookings(bookingsData || []);
      } else if (activeTab === "services") {
        const servicesData = await serviceService.getAllServices();
        setServices(servicesData || []);
      } else if (activeTab === "reviews") {
        const reviewsData = await adminService.getAllReviews();
        setReviews(reviewsData || []);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      toast.error(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // User Management
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Delete this user?")) {
      try {
        await adminService.deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
        toast.success("User deleted");
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  // Worker Management
  const handleVerifyWorker = async (workerId) => {
    try {
      await adminService.verifyWorker(workerId);
      setWorkers(workers.map(w => w.id === workerId ? { ...w, verified: true } : w));
      toast.success("Worker verified");
    } catch (err) {
      toast.error("Failed to verify worker");
    }
  };

  const handleDeleteWorker = async (workerId) => {
    if (window.confirm("Delete this worker?")) {
      try {
        await adminService.deleteWorker(workerId);
        setWorkers(workers.filter(w => w.id !== workerId));
        toast.success("Worker deleted");
      } catch (err) {
        toast.error("Failed to delete worker");
      }
    }
  };

  // Booking Management
  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      await adminService.updateBookingStatus(bookingId, status);
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
      toast.success("Booking status updated");
    } catch (err) {
      toast.error("Failed to update booking");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm("Delete this booking?")) {
      try {
        await adminService.deleteBooking(bookingId);
        setBookings(bookings.filter(b => b.id !== bookingId));
        toast.success("Booking deleted");
      } catch (err) {
        toast.error("Failed to delete booking");
      }
    }
  };

  // Service Management
  const handleSaveService = async () => {
    try {
      if (editingService) {
        await adminService.updateService(editingService.id, serviceForm);
        setServices(services.map(s => s.id === editingService.id ? { ...s, ...serviceForm } : s));
        toast.success("Service updated");
      } else {
        const newService = await adminService.createService(serviceForm);
        setServices([...services, newService]);
        toast.success("Service created");
      }
      setShowServiceModal(false);
      setServiceForm({ name: "", description: "", basePrice: 0 });
      setEditingService(null);
    } catch (err) {
      toast.error("Failed to save service");
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Delete this service?")) {
      try {
        await adminService.deleteService(serviceId);
        setServices(services.filter(s => s.id !== serviceId));
        toast.success("Service deleted");
      } catch (err) {
        toast.error("Failed to delete service");
      }
    }
  };

  const openEditService = (service) => {
    setEditingService(service);
    setServiceForm({ name: service.name, description: service.description, basePrice: service.basePrice });
    setShowServiceModal(true);
  };

  // Review Management
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Delete this review?")) {
      try {
        await adminService.deleteReview(reviewId);
        setReviews(reviews.filter(r => r.id !== reviewId));
        toast.success("Review deleted");
      } catch (err) {
        toast.error("Failed to delete review");
      }
    }
  };

  // Search & Pagination
  const getFilteredData = () => {
    let data = [];
    if (activeTab === "users") data = users;
    else if (activeTab === "workers") data = workers;
    else if (activeTab === "bookings") data = bookings;
    else if (activeTab === "services") data = services;
    else if (activeTab === "reviews") data = reviews;

    if (searchQuery) {
      data = data.filter(item => 
        JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  };

  const paginatedData = () => {
    const filtered = getFilteredData();
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  };

  const totalPages = Math.ceil(getFilteredData().length / itemsPerPage);

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-0">Admin Dashboard 👋</h5>
          <small className="text-muted">{admin?.email}</small>
        </div>
        <button className="btn btn-outline-primary btn-sm" onClick={() => navigate("/profile")}>
          My Profile
        </button>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        {["overview", "users", "workers", "bookings", "services", "reviews"].map(tab => (
          <li className="nav-item" key={tab}>
            <button 
              className={`nav-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* Search Bar */}
      {activeTab !== "overview" && (
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
      )}

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card p-3">
              <h6>Total Users</h6>
              <h4>{stats.users}</h4>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card p-3">
              <h6>Service Providers</h6>
              <h4>{stats.workers}</h4>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card p-3">
              <h6>Total Bookings</h6>
              <h4>{stats.bookings}</h4>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card p-3">
              <h6>Pending Verifications</h6>
              <h4>{stats.pendingWorkers}</h4>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="card p-3">
          <h5>Manage Users</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData().map(user => (
                  <tr key={user.id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Workers Tab */}
      {activeTab === "workers" && (
        <div className="card p-3">
          <h5>Manage Workers</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData().map(worker => (
                  <tr key={worker.id}>
                    <td>{worker.firstName} {worker.lastName}</td>
                    <td>{worker.email}</td>
                    <td>{worker.experienceInYears} years</td>
                    <td>
                      <span className={`badge ${worker.verified ? "bg-success" : "bg-warning"}`}>
                        {worker.verified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td>
                      {!worker.verified && (
                        <button className="btn btn-sm btn-success me-2" onClick={() => handleVerifyWorker(worker.id)}>
                          Verify
                        </button>
                      )}
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteWorker(worker.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="card p-3">
          <h5>Manage Bookings</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Customer</th>
                  <th>Worker</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData().map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.serviceName}</td>
                    <td>{booking.customerName}</td>
                    <td>{booking.workerName}</td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td>
                      <select 
                        className="form-select form-select-sm" 
                        value={booking.status}
                        onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBooking(booking.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === "services" && (
        <div className="card p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Manage Services</h5>
            <button className="btn btn-primary btn-sm" onClick={() => setShowServiceModal(true)}>
              Add Service
            </button>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Base Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData().map(service => (
                  <tr key={service.id}>
                    <td>{service.name}</td>
                    <td>{service.description}</td>
                    <td>₹{service.basePrice}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => openEditService(service)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteService(service.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <div className="card p-3">
          <h5>Manage Reviews</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Worker</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData().map(review => (
                  <tr key={review.id}>
                    <td>{review.customerName}</td>
                    <td>{review.workerName}</td>
                    <td>{review.rating} ⭐</td>
                    <td>{review.comment}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteReview(review.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {activeTab !== "overview" && totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{editingService ? "Edit Service" : "Add Service"}</h5>
                <button className="btn-close" onClick={() => { setShowServiceModal(false); setEditingService(null); }}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Base Price</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={serviceForm.basePrice}
                    onChange={(e) => setServiceForm({ ...serviceForm, basePrice: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => { setShowServiceModal(false); setEditingService(null); }}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveService}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}
