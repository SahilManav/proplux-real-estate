import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      const userObj = {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        isAdmin: data.user.isAdmin,
        image: "", // No image for manual signup
      };

      login(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAdmin", data.user.isAdmin);

      toast.success("Signup successful!");
      navigate(data.user.isAdmin ? "/admin/properties" : "/profile");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const googleData = {
        name: decoded.name,
        email: decoded.email,
        google: true,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google Login failed");

      const userObj = {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        isAdmin: data.user.isAdmin,
        image: decoded.picture, // ✅ Store Google profile image
      };

      login(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAdmin", data.user.isAdmin); // ✅ Fixed this

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
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-field mb-4"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
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
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <div className="text-center my-4 text-sm text-gray-500">OR</div>

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => toast.error("Google login failed")}
        />
      </form>
    </div>
  );
};

export default Signup;
