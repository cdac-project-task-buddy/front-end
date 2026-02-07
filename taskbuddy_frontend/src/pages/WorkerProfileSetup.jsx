import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { workerService } from '../api/workerService';
import { serviceService } from '../api/serviceService';
import { toast } from 'react-toastify';

export default function WorkerProfileSetup() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    experienceInYears: 0,
    fees: 0,
    serviceIds: [],
    address: {
      street: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await serviceService.getAllServices();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) || value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: { ...formData.address, [name]: value }
    });
  };

  const handleServiceToggle = (serviceId) => {
    const serviceIds = formData.serviceIds.includes(serviceId)
      ? formData.serviceIds.filter(id => id !== serviceId)
      : [...formData.serviceIds, serviceId];
    setFormData({ ...formData, serviceIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.serviceIds.length === 0) {
      setError('Please select at least one service');
      toast.error('Please select at least one service');
      setLoading(false);
      return;
    }

    try {
      await workerService.updateWorkerProfile(formData);
      toast.success('Profile setup complete!');
      navigate('/provider-dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update profile';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Complete Your Worker Profile</h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                {/* Experience */}
                <div className="mb-3">
                  <label className="form-label">Experience (Years)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="experienceInYears"
                    value={formData.experienceInYears}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

                {/* Fees */}
                <div className="mb-3">
                  <label className="form-label">Service Fees (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

                {/* Services */}
                <div className="mb-3">
                  <label className="form-label">Services You Provide</label>
                  <div className="row">
                    {services.map(service => (
                      <div key={service.id} className="col-md-6 mb-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={formData.serviceIds.includes(service.id)}
                            onChange={() => handleServiceToggle(service.id)}
                          />
                          <label className="form-check-label">
                            {service.name.replace('_', ' ')}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <h5 className="mt-4 mb-3">Address</h5>

                <div className="mb-3">
                  <label className="form-label">Street</label>
                  <input
                    type="text"
                    className="form-control"
                    name="street"
                    value={formData.address.street}
                    onChange={handleAddressChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Area</label>
                  <input
                    type="text"
                    className="form-control"
                    name="area"
                    value={formData.address.area}
                    onChange={handleAddressChange}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.address.city}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={formData.address.state}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    value={formData.address.pincode}
                    onChange={handleAddressChange}
                    pattern="[0-9]{6}"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Complete Profile'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
