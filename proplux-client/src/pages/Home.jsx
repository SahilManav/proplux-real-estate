import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaHeadset,
  FaCrown,
  FaStar,
  FaHeart,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Stat = ({ label, value, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="text-center"
  >
    <motion.div
      initial={{ scale: 0.9 }}
      whileInView={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 120, delay }}
      className="text-4xl md:text-5xl font-extrabold
      bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
      bg-clip-text text-transparent"
    >
      {value}
    </motion.div>
    <p className="mt-2 text-gray-300 tracking-wide">{label}</p>
  </motion.div>
);

export default function Home() {
  const [testimonials, setTestimonials] = useState([]);
  const [featured] = useState([
    {
      title: "Ultra Luxury Villa",
      image:
        "https://res.cloudinary.com/dqmyi3x1y/image/upload/v1745834737/Villa_1_fxuinx.jpg",
      location: "Beverly Hills, USA",
    },
    {
      title: "Sky Penthouse",
      image:
        "https://res.cloudinary.com/dqmyi3x1y/image/upload/v1745854073/Villa_2_hlljkc.jpg",
      location: "New York, USA",
    },
    {
      title: "Beachside Mansion",
      image:
        "https://res.cloudinary.com/dqmyi3x1y/image/upload/v1745854074/Villa_3_lmcohw.jpg",
      location: "Malibu, USA",
    },
  ]);

  useEffect(() => {
    setTestimonials([
      {
        name: "Aarav Kapoor",
        comment:
          "PropLux helped me find my dream villa in no time. Highly recommend!",
      },
      {
        name: "Meera Shah",
        comment:
          "The booking experience was smooth and professional. Loved the luxury design!",
      },
      {
        name: "Rahul Mehta",
        comment:
          "Amazing properties and great support from the PropLux team.",
      },
    ]);
  }, []);

  return (
    <div>
      {/* Hero */}
      <div
        className="relative h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-5xl md:text-6xl font-extrabold mb-6 tracking-wide"
          >
            Welcome to PropLux
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-200 text-xl md:text-2xl mb-10 max-w-2xl"
          >
            Discover premium villas, modern apartments, and dream homes curated
            for luxury living.
          </motion.p>

          <Link
            to="/properties"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500
            text-black text-lg px-8 py-3 rounded-full font-semibold
            hover:shadow-[0_0_25px_rgba(234,179,8,0.7)] transition"
          >
            Explore Properties
          </Link>
        </div>
      </div>

      {/* HERO STATS (WOW FACTOR) */}
      <div className="bg-black py-14 px-6 border-t border-yellow-500/20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <Stat label="Premium Cities" value="10+" delay={0.1} />
          <Stat label="Luxury Properties" value="250+" delay={0.2} />
          <Stat label="Happy Clients" value="1,200+" delay={0.3} />
          <Stat label="Years of Trust" value="8+" delay={0.4} />
        </div>
      </div>

      {/* Featured Properties */}
      <div className="bg-black py-20 px-6">
        <div className="text-center mb-14">
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-wide
            bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
            bg-clip-text text-transparent"
          >
            Featured Properties
          </h2>
          <p className="text-gray-400 mt-4">
            Handpicked homes that define luxury living
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {featured.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-2xl overflow-hidden
              bg-black shadow-xl border border-yellow-500/20
              hover:shadow-[0_0_35px_rgba(234,179,8,0.35)] transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-64 w-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <span className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                FEATURED
              </span>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-[#0b0b0b] text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Why Choose PropLux?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <FaCrown className="text-yellow-400 text-4xl mb-4" />
            <p className="font-semibold">Luxury Properties</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-yellow-400 text-4xl mb-4" />
            <p className="font-semibold">Verified Listings</p>
          </div>
          <div className="flex flex-col items-center">
            <FaHeadset className="text-yellow-400 text-4xl mb-4" />
            <p className="font-semibold">24/7 Support</p>
          </div>
          <div className="flex flex-col items-center">
            <FaStar className="text-yellow-400 text-4xl mb-4" />
            <p className="font-semibold">Top Rated Service</p>
          </div>
        </div>
      </div>

      {/* Favorites CTA */}
      <div className="bg-black py-16 text-center">
        <h2 className="text-white text-3xl font-bold mb-4">
          Your Favorite Properties
        </h2>
        <p className="text-gray-400 mb-8">
          View and manage the homes you love in one place
        </p>

        <Link
          to="/favorites"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full
          bg-gradient-to-r from-yellow-400 to-yellow-500
          text-black font-semibold text-lg
          hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] transition"
        >
          <FaHeart className="text-red-600" />
          Go to Favorites
        </Link>
      </div>

      {/* Final CTA */}
      <div className="bg-[#0b0b0b] text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Find Your Dream Home?
        </h2>
        <p className="text-gray-400 mb-10">
          Browse listings or connect with our luxury experts today
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/enquiry"
            className="border border-white px-6 py-3 rounded-full font-semibold
            hover:bg-white hover:text-black transition"
          >
            Send Enquiry
          </Link>
          <Link
            to="/about"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500
            text-black px-6 py-3 rounded-full font-semibold
            hover:shadow-[0_0_20px_rgba(234,179,8,0.6)] transition"
          >
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
