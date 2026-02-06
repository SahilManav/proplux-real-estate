import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

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
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2
          className="text-4xl md:text-5xl font-extrabold tracking-wide
          bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
          bg-clip-text text-transparent"
        >
          What Our Clients Say
        </h2>
        <p className="mt-4 text-gray-400">
          Trusted by clients who value luxury and excellence
        </p>
        <div className="mx-auto mt-5 h-[2px] w-24 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full" />
      </div>

      {/* Testimonials */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative rounded-2xl p-8
            bg-black/60 backdrop-blur-xl
            border border-yellow-500/30
            shadow-[0_0_30px_rgba(234,179,8,0.12)]
            hover:shadow-[0_0_45px_rgba(234,179,8,0.35)]
            transition-all duration-300"
          >
            {/* Quote Icon */}
            <div className="absolute -top-4 -left-4
              bg-gradient-to-r from-yellow-400 to-yellow-500
              text-black rounded-full w-10 h-10 flex items-center justify-center
              text-xl font-bold shadow-lg">
              “
            </div>

            {/* Comment */}
            <p className="text-gray-200 italic leading-relaxed mb-6">
              “{t.comment}”
            </p>

            {/* Divider */}
            <div className="h-[1px] w-16 bg-yellow-500/40 mb-4" />

            {/* Name */}
            <p className="text-yellow-400 font-semibold tracking-wide">
              — {t.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
