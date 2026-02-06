import { useState } from "react";

const Enquiry = () => {
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "59e0ff01-def9-41f6-a14f-91ed045de71c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("");
      alert("Enquiry sent successfully");
      event.target.reset();
    } else {
      alert(data.message);
      setResult("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      {/* Card */}
      <div
        className="w-full max-w-2xl rounded-2xl p-8 md:p-10
        bg-black/60 backdrop-blur-xl
        border border-yellow-500/30
        shadow-[0_0_40px_rgba(234,179,8,0.15)]"
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-wide
            bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
            bg-clip-text text-transparent"
          >
            Contact Us
          </h1>
          <p className="mt-3 text-gray-300">
            Let us help you find your next luxury property
          </p>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full bg-black/60 text-white
            border border-gray-600 rounded-xl px-4 py-3
            focus:outline-none focus:border-yellow-400
            focus:ring-1 focus:ring-yellow-400
            placeholder-gray-400 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full bg-black/60 text-white
            border border-gray-600 rounded-xl px-4 py-3
            focus:outline-none focus:border-yellow-400
            focus:ring-1 focus:ring-yellow-400
            placeholder-gray-400 transition"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full bg-black/60 text-white
            border border-gray-600 rounded-xl px-4 py-3
            focus:outline-none focus:border-yellow-400
            focus:ring-1 focus:ring-yellow-400
            placeholder-gray-400 transition resize-none"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-black
            bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
            hover:shadow-[0_0_20px_rgba(234,179,8,0.6)]
            transition-all duration-300"
          >
            {result ? result : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Enquiry;
