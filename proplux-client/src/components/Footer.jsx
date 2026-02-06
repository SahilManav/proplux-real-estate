import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-yellow-500/20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-extrabold text-yellow-400 mb-4">
            PropLux
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            PropLux is your trusted destination for premium luxury properties.
            Discover hand-picked homes, seamless bookings, and elite living
            experiences.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/properties" className="hover:text-yellow-400 transition">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-yellow-400 transition">
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/enquiry" className="hover:text-yellow-400 transition">
                Enquiry
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-400 transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Connect With Us
          </h3>
          <div className="flex gap-4 text-sm">
            <a
              href="#"
              className="px-4 py-2 border border-yellow-400/40 rounded-full
              hover:bg-yellow-400 hover:text-black transition"
            >
              Instagram
            </a>
            <a
              href="#"
              className="px-4 py-2 border border-yellow-400/40 rounded-full
              hover:bg-yellow-400 hover:text-black transition"
            >
              Facebook
            </a>
            <a
              href="#"
              className="px-4 py-2 border border-yellow-400/40 rounded-full
              hover:bg-yellow-400 hover:text-black transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-yellow-500/10 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} PropLux. All rights reserved.
      </div>
    </footer>
  );
}
