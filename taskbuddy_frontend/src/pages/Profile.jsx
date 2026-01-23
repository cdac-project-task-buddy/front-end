import { useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Rahul",
    phone: "9999999999",
    address: "Pune"
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Profile:", profile);
    alert("Profile updated");
  };

  return (
    <div className="container mt-4">
      <h4>My Profile</h4>

      <input
        name="name"
        className="form-control mb-2"
        value={profile.name}
        onChange={handleChange}
      />

      <input
        name="phone"
        className="form-control mb-2"
        value={profile.phone}
        onChange={handleChange}
      />

      <textarea
        name="address"
        className="form-control mb-3"
        value={profile.address}
        onChange={handleChange}
      />

      <button className="btn btn-primary" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}
