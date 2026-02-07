// import { useNavigate, useParams } from "react-router-dom";
// import "./ServiceProviders.css";

// const providers = [
//   {
//     id: 1,
//     service: "cooking",
//     name: "Chef Isabella Rossi",
//     bio: "Expert in Italian cuisine using fresh local ingredients",
//     rating: 4.8,
//     rate: 45,
//     image: "https://i.pravatar.cc/100?img=11",
//   },
//   {
//     id: 2,
//     service: "cooking",
//     name: "Chef Marcus Dubois",
//     bio: "French fusion specialist with 10+ years experience",
//     rating: 4.9,
//     rate: 55,
//     image: "https://i.pravatar.cc/100?img=12",
//   },
//   {
//     id: 3,
//     service: "cleaning",
//     name: "Amit Cleaning Services",
//     bio: "Professional home & office cleaning",
//     rating: 4.6,
//     rate: 20,
//     image: "https://i.pravatar.cc/100?img=13",
//   },
// ];

// export default function ServiceProviders() {
//   const { serviceName } = useParams();
//   const navigate = useNavigate();
//   const { id } = useParams(); // provider id (can be dummy)

//   // URL → service name mapping (home-maintenance → home maintenance)
// const normalizedService = serviceName
//   ? serviceName.replace("-", " ")
//   : "";

//   const filteredProviders = providers.filter((p) => p.service === serviceName);

//   return (
//     <div className="container py-4">
//       <h4 className="fw-bold text-capitalize">{normalizedService}</h4>
//       <p className="text-muted">
//         Professionals offering {normalizedService} services
//       </p>

//       {/* Search + Filters (UI only for now) */}
//       <div className="providers-filter mb-3">
//         <input
//           type="text"
//           placeholder="Search providers..."
//           className="form-control"
//         />
//       </div>

//       {/* Providers List */}
//       {filteredProviders.length === 0 ? (
//         <p>No providers available for this service.</p>
//       ) : (
//         filteredProviders.map((p) => (
//           <div className="provider-card" key={p.id}>
//             {/* LEFT: Image */}
//             <img src={p.image} alt={p.name} />

//             {/* MIDDLE: Info */}
//             <div className="provider-info">
//               <h6>{p.name}</h6>
//               <p>{p.bio}</p>
//               <span>⭐ {p.rating}</span>
//             </div>

//             {/* RIGHT: Action */}
//             <div className="provider-action">
//               <p className="rate">₹{p.rate}/hr</p>
//               <button
//                 className="btn btn-primary"
//                 onClick={() => navigate(`/book-service/${p.id}`)}
//               >
//                 Book Service
//               </button>
//             </div>
//           </div>
//         ))
//       )}

//       {/* Backend integration later */}
//       {/* axios.get(`/api/providers?service=${serviceName}`) */}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workerService } from '../api/workerService';
import { serviceService } from '../api/serviceService';
import { toast } from 'react-toastify';

export default function ServiceProviders() {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [serviceId, setServiceId] = useState(null);

  useEffect(() => {
    fetchServiceAndWorkers();
  }, [serviceName]);

 const fetchServiceAndWorkers = async () => {
  try {
    const services = await serviceService.getAllServices();
    const service = services.find(s => s.name === serviceName);
    
    if (service) {
      setServiceId(service.id);
      
      const workersData = await workerService.getWorkersByService(service.id);
      // Filter only verified workers
      const verifiedWorkers = (workersData || []).filter(w => w.verified === true);
      setWorkers(verifiedWorkers);
    } else {
      setError('Service not found');
    }
  } catch (err) {
    console.error("Error details:", err);
    if (err.response?.status === 404) {
      setWorkers([]);
    } else {
      setError('Failed to load service providers');
    }
  } finally {
    setLoading(false);
  }
};



  const handleBookNow = (workerId) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || !user.userId) {
      toast.error('Please login to book a service');
      // Store booking intent in localStorage
      localStorage.setItem('bookingIntent', JSON.stringify({
        workerId,
        serviceId,
        serviceName,
        returnTo: `/book-service/${workerId}`
      }));
      navigate('/login');
      return;
    }

    if (user.role !== 'ROLE_CUSTOMER') {
      toast.error('Only customers can book services');
      return;
    }

    navigate(`/book-service/${workerId}`, {
      state: { serviceId, serviceName }
    });
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{serviceName} Service Providers</h2>
      
      {workers.length === 0 ? (
        <div className="alert alert-info">
          No service providers available for this service yet.
        </div>
      ) : (
        <div className="row g-4">
          {workers.map((worker) => (
            <div key={worker.id} className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {worker.firstName} {worker.lastName}
                  </h5>
                  <p className="card-text">
                    <i className="bi bi-star-fill text-warning"></i> {worker.rating.toFixed(1)} Rating
                  </p>
                  <p className="card-text">
                    <i className="bi bi-briefcase"></i> {worker.experienceInYears} years experience
                  </p>
                  <p className="card-text">
                    <i className="bi bi-currency-rupee"></i> ₹{worker.fees} per service
                  </p>
                  <p className="card-text">
                    <i className="bi bi-telephone"></i> {worker.phone}
                  </p>
                  {worker.address && (
                    <p className="card-text text-muted">
                      <i className="bi bi-geo-alt"></i> {worker.address.city}, {worker.address.state}
                    </p>
                  )}
                  <div className="d-flex gap-2 align-items-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleBookNow(worker.id)}
                      disabled={!worker.availablity}
                    >
                      {worker.availablity ? 'Book Now' : 'Not Available'}
                    </button>
                    {!worker.availablity && (
                      <span className="badge bg-secondary">Currently Unavailable</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}