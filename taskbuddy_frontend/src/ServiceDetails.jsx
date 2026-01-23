import { useNavigate, useParams } from "react-router-dom";

export default function ServiceDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // provider id (can be dummy)

  const provider = {
    id,
    name: "Rahul Plumbing Services",
    category: "Plumber",
    experience: 5,
    price: 500,
    rating: 4.5
  };

  return (
    <div className="container mt-4">
      <h3>{provider.name}</h3>
      <p><strong>Category:</strong> {provider.category}</p>
      <p><strong>Experience:</strong> {provider.experience} years</p>
      <p><strong>Price:</strong> ₹{provider.price}</p>
      <p><strong>Rating:</strong> ⭐ {provider.rating}</p>

      <button
        className="btn btn-primary"
        onClick={() => navigate(`/book-service/${provider.id}`)}
      >
        Book Service
      </button>
    </div>
  );
}