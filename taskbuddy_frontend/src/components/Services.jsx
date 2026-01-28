import { useNavigate } from 'react-router-dom';
import { serviceService } from '../api/serviceService';
import { useEffect, useState } from 'react';

export default function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchServices();
    // Get search query from URL if exists
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  const fetchServices = async () => {
    try {
      const data = await serviceService.getAllServices();
      setServices(data);
    } catch (err) {
      setError('Failed to load services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceClick = (serviceName) => {
    navigate(`/providers/${serviceName}`);
  };
  

  const serviceIcons = {
    PLUMBING: 'bi-wrench',
    ELECTRICIAN: 'bi-lightning-charge',
    CLEANING: 'bi-brush',
    CLOTHING: 'bi-scissors',
    PAINTING: 'bi-paint-bucket',
    DRIVER: 'bi-car-front',
    CARPENTER: 'bi-hammer',
  };

  // Filter services based on search query
  const filteredServices = searchQuery
    ? services.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : services;

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
      <h2 className="text-center mb-5">Available Services</h2>
      {searchQuery && (
        <div className="alert alert-info">
          Showing results for: <strong>{searchQuery}</strong>
        </div>
      )}
      {filteredServices.length === 0 ? (
        <div className="alert alert-warning text-center">
          No services found.
        </div>
      ) : (
        <div className="row g-4">
          {filteredServices.map((service) => (
          <div key={service.id} className="col-md-4">
            <div
              className="service-card text-center"
              onClick={() => handleServiceClick(service.name)}
              style={{ cursor: 'pointer' }}
            >
              <div className="service-icon mb-3">
                <i className={`bi ${serviceIcons[service.name] || 'bi-gear'}`}></i>
              </div>
              <h5>{service.name.replace('_', ' ')}</h5>
              <p className="text-muted">{service.description}</p>
              <p className="fw-bold">Starting from ₹{service.basePrice}</p>
              <button className="btn btn-primary btn-sm">
                View Providers
              </button>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}
