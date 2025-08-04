import React ,{useState}from "react";
import { Link ,useNavigate} from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
    }

    try {
      const response = await registerUser(formData);
      console.log("registration Successful", response);
      alert("Registration successfull")
      setSuccess("Registration successfull");
      setFormData({ name: "", email: "", password: "" });
      navigate('/login');
    } catch (err) {
      const errormessage = err.error || "Registration failed";
      setError(errormessage);
      console.error(err);
    }

    console.log("Received details:", formData);
  };
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 mt-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">
          Create your Account
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Join us for creating your own short links
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Already have an account{" "}
          {
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login Here
            </Link>
          }
        </p>
        {error && (<p className="mt-4 text-center text-red-500">{error}</p>)}
      {success && (<p className="mt-4 text-center text-green-500">{success}</p>)}
      </div>
    </div>
  );
};

export default Register;
