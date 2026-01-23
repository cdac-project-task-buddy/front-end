import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <h1 className="display-4 fw-bold text-danger">404</h1>
      <h4 className="mb-3">Page Not Found</h4>

      <p className="text-muted text-center mb-4">
        The page you are looking for doesn’t exist or was moved.
      </p>

      <button
        className="btn btn-primary"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
}
