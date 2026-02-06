import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Enquiry", path: "/enquiry" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "About", path: "/about" },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => {
      setDropdownOpen(true);
    }, 250);
  };

  const handleMouseLeave = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4
      bg-black text-white border-b border-yellow-500/30 backdrop-blur">
      
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2 group">
        <img src="/logo.png" alt="PropLux Logo" className="h-10" />
        <span className="text-2xl font-extrabold tracking-wide text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(234,179,8,0.6)] transition">
          PropLux
        </span>
      </Link>

      {/* NAV LINKS */}
      <div className="flex items-center gap-8">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`relative text-sm font-semibold tracking-wide transition
                ${
                  active
                    ? "text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
            >
              {item.name}

              {/* ACTIVE UNDERLINE */}
              <span
                className={`absolute -bottom-2 left-0 h-[2px] bg-yellow-400 transition-all duration-300
                  ${active ? "w-full" : "w-0 group-hover:w-full"}`}
              />
            </Link>
          );
        })}

        {/* PROFILE */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-10 h-10 rounded-full border-2 border-yellow-400
            flex items-center justify-center overflow-hidden cursor-pointer
            hover:shadow-[0_0_12px_rgba(234,179,8,0.6)] transition bg-black">
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-yellow-400 font-bold">
                {user?.name?.charAt(0) || "U"}
              </span>
            )}
          </div>

          {/* DROPDOWN */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-4 w-52 bg-black border border-yellow-500/30
              rounded-xl shadow-2xl overflow-hidden animate-fadeIn"
            >
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-sm hover:bg-yellow-400 hover:text-black transition"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/favorites"
                    className="block px-4 py-3 text-sm hover:bg-yellow-400 hover:text-black transition"
                  >
                    Favorites
                  </Link>

                  {user.isAdmin && (
                    <Link
                      to="/admin/manage-properties"
                      className="block px-4 py-3 text-sm hover:bg-yellow-400 hover:text-black transition"
                    >
                      Manage Properties
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm
                      text-red-400 hover:bg-red-500 hover:text-white transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-sm hover:bg-yellow-400 hover:text-black transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-3 text-sm hover:bg-yellow-400 hover:text-black transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
