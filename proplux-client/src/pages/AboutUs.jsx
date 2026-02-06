import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="bg-black text-white overflow-hidden">
      {/* HERO */}
      <div className="relative h-[85vh] w-full">
        <img
          src="/AboutUs.jpg"
          alt="About PropLux"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold mb-6
            bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
            bg-clip-text text-transparent"
          >
            About PropLux
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-3xl text-gray-200"
          >
            Redefining luxury real estate through elegance, trust,
            and world-class living experiences.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 h-[2px] w-28 bg-gradient-to-r
            from-yellow-500 to-yellow-300 rounded-full origin-left"
          />
        </div>
      </div>

      {/* STORY */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold text-yellow-400 mb-6 text-center">
          Our Story
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto">
          PropLux was created with a simple vision — to make luxury living
          accessible, transparent, and seamless. We curate hand-picked
          premium properties across prime global locations, ensuring every
          listing meets the highest standards of elegance, comfort, and value.
          <br /><br />
          From modern penthouses to ultra-luxury villas, PropLux connects
          discerning buyers with homes that reflect their lifestyle and status.
        </p>
      </motion.div>

      {/* VALUES */}
      <div className="bg-[#0b0b0b] py-20 px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-14"
        >
          What We Stand For
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Our Mission",
              text:
                "To deliver premium real estate experiences through verified listings, seamless technology, and unmatched customer service.",
            },
            {
              title: "Our Vision",
              text:
                "To become the most trusted global luxury real estate platform, setting new standards for transparency and excellence.",
            },
            {
              title: "Our Values",
              text:
                "Integrity, innovation, and attention to detail guide everything we do — because luxury is in the details.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="bg-black p-8 rounded-2xl border border-yellow-500/20
              hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] transition"
            >
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-20 text-center px-6"
      >
        <h2 className="text-4xl font-bold mb-6">
          Experience Luxury Like Never Before
        </h2>

        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Explore hand-picked properties and take the next step toward
          extraordinary living with PropLux.
        </p>

        <a
          href="/properties"
          className="inline-block px-10 py-4 rounded-full
          bg-gradient-to-r from-yellow-400 to-yellow-500
          text-black font-semibold text-lg
          hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] transition"
        >
          Explore Properties
        </a>
      </motion.div>
    </div>
  );
}
