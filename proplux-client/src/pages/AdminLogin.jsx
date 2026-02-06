  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";

  const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Login failed");

        if (!data.user.isAdmin) {
          throw new Error("You are not an admin");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", true);
        toast.success("Admin logged in");
        navigate("/admin/properties");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-dark px-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-white text-black p-8 rounded-xl shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            className="form-field mb-4"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-field mb-6"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-white py-2 rounded-xl hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>
      </div>
    );
  };

  export default AdminLogin;
