import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  /* ---------------- NORMAL LOGIN ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${API}/api/auth/login`,   // ✅ FIXED
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      const userObj = {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        isAdmin: data.user.isAdmin,
        image: null,
      };

      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAdmin", data.user.isAdmin);

      login(userObj);

      toast.success("Login successful!");
      navigate(data.user.isAdmin ? "/admin/properties" : "/profile");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- GOOGLE LOGIN ---------------- */
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const googleData = {
        name: decoded.name,
        email: decoded.email,
      };

      const res = await fetch(
        `${API}/api/auth/google-login`,   // ✅ FIXED
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(googleData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google Login failed");

      const userObj = {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        isAdmin: data.user.isAdmin,
        image: decoded.picture || null,
      };

      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAdmin", data.user.isAdmin);

      login(userObj);

      toast.success("Logged in with Google!");
      navigate(data.user.isAdmin ? "/admin/properties" : "/profile");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white text-black p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-field mb-4"
          required
        />

        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-field w-full pr-10"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <Link
          to="/forgot-password"
          className="text-sm text-right text-blue-600 mb-4 hover:underline block"
        >
          Forgot Password?
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-white py-2 rounded-xl hover:opacity-90 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="my-6 text-center text-gray-500">or</div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error("Google login failed")}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
