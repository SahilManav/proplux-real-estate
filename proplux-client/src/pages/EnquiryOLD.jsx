import { useState } from "react";
import { toast } from "react-toastify";

const Enquiry = () => {
  // OLD
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   message: "",
  // });

  // const [loading, setLoading] = useState(false);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const token = localStorage.getItem("token");
  //     const user = JSON.parse(localStorage.getItem("user"));

  //     if (!token || !user?._id) {
  //       throw new Error("Please log in to submit an enquiry");
  //     }

  //     const res = await fetch(`${import.meta.env.VITE_API_URL}/enquiries`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         ...formData,
  //         userId: user._id,
  //         propertyId: null, // Optional, can be set dynamically later
  //       }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) throw new Error(data.message || "Enquiry failed");

  //     toast.success("Enquiry submitted!");
  //     setFormData({ name: "", email: "", message: "" });
  //   } catch (err) {
  //     toast.error(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // OLD

  // const [result, setResult] = React.useState("");

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   setResult("Sending....");
  //   const formData = new FormData(event.target);

  //   formData.append("access_key", "59e0ff01-def9-41f6-a14f-91ed045de71c");

  //   const response = await fetch("https://api.web3forms.com/submit", {
  //     method: "POST",
  //     body: formData
  //   });

  //   const data = await response.json();

  //   if (data.success) {
  //     setResult("");
  //     alert("Form Submitted Successfully");
  //     event.target.reset();
  //   } else {
  //     console.log("Error", data);
  //     alert(data.message)
  //     setResult("");
  //   }
  // };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

      <form
        // onSubmit={onSubmit}
        className="bg-white p-6 rounded-xl shadow-xl text-black space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="form-field"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="form-field"
          required
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="form-field"
          required
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          {/* {loading ? "Sending..." : "Send Enquiry"} */}
          {result ? result : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
};

export default Enquiry;
