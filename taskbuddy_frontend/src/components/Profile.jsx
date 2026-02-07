import { useState, useEffect } from "react";
import { userService } from "../api/userService";
import { workerService } from "../api/workerService";
import { serviceService } from "../api/serviceService";
import { toast } from "react-toastify";
import Loading from "./Loading";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isWorker = user?.role === "ROLE_WORKER";
  
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      country: "India"
    }
  });
  
  const [workerProfile, setWorkerProfile] = useState({
    experienceInYears: 0,
    fees: 0,
    serviceIds: []
  });
  
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = await userService.getProfile();
      setProfile({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || {
          street: "",
          area: "",
          city: "",
          state: "",
          pincode: "",
          country: "India"
        }
      });

      if (isWorker) {
        const allServices = await serviceService.getAllServices();
        setServices(allServices);
        
        const workers = await workerService.getAllWorkers();
        const currentWorker = workers.find(w => w.email === user?.email);
        if (currentWorker) {
          setWorkerProfile({
            experienceInYears: currentWorker.experienceInYears || 0,
            fees: currentWorker.fees || 0,
            serviceIds: currentWorker.services?.map(s => s.id) || []
          });
          if (currentWorker.address) {
            setProfile(prev => ({ ...prev, address: currentWorker.address }));
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setProfile({
      ...profile,
      address: { ...profile.address, [e.target.name]: e.target.value }
    });
  };

  const handleWorkerChange = (e) => {
    setWorkerProfile({ ...workerProfile, [e.target.name]: parseInt(e.target.value) || e.target.value });
  };

  const handleServiceToggle = (serviceId) => {
    const serviceIds = workerProfile.serviceIds.includes(serviceId)
      ? workerProfile.serviceIds.filter(id => id !== serviceId)
      : [...workerProfile.serviceIds, serviceId];
    setWorkerProfile({ ...workerProfile, serviceIds });
  };

  const handleSave = async () => {
    setError("");
    
    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      const errorMsg = "First name and last name are required";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (profile.phone && !/^[0-9]{10,14}$/.test(profile.phone)) {
      const errorMsg = "Phone number must be 10-14 digits";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setSaving(true);
    try {
      await userService.updateProfile(profile);
      
      if (isWorker) {
        await workerService.updateWorkerProfile({
          ...workerProfile,
          address: profile.address
        });
      }
      
      toast.success("Profile updated successfully");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to update profile";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="mb-4">My Profile</h2>

              {error && <div className="alert alert-danger">{error}</div>}

              {/* Basic Info */}
              <h5 className="mb-3">Basic Information</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    name="firstName"
                    className="form-control"
                    value={profile.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    name="lastName"
                    className="form-control"
                    value={profile.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={profile.email}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  className="form-control"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Worker-specific fields */}
              {isWorker && (
                <>
                  <hr className="my-4" />
                  <h5 className="mb-3">Professional Details</h5>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Experience (Years)</label>
                      <input
                        name="experienceInYears"
                        type="number"
                        className="form-control"
                        value={workerProfile.experienceInYears}
                        onChange={handleWorkerChange}
                        min="0"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Service Fees (₹)</label>
                      <input
                        name="fees"
                        type="number"
                        className="form-control"
                        value={workerProfile.fees}
                        onChange={handleWorkerChange}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Services Provided</label>
                    <div className="row">
                      {services.map(service => (
                        <div key={service.id} className="col-md-6 mb-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={workerProfile.serviceIds.includes(service.id)}
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
                </>
              )}

              {/* Address */}
              <hr className="my-4" />
              <h5 className="mb-3">Address</h5>
              
              <div className="mb-3">
                <label className="form-label">Street</label>
                <input
                  name="street"
                  className="form-control"
                  value={profile.address.street}
                  onChange={handleAddressChange}
                  placeholder="House/Flat No., Building Name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Area/Locality</label>
                <input
                  name="area"
                  className="form-control"
                  value={profile.address.area}
                  onChange={handleAddressChange}
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">City</label>
                  <input
                    name="city"
                    className="form-control"
                    value={profile.address.city}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">State</label>
                  <input
                    name="state"
                    className="form-control"
                    value={profile.address.state}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Pincode</label>
                <input
                  name="pincode"
                  className="form-control"
                  value={profile.address.pincode}
                  onChange={handleAddressChange}
                  pattern="[0-9]{6}"
                  maxLength="6"
                />
              </div>

              <button 
                className="btn btn-primary w-100" 
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
