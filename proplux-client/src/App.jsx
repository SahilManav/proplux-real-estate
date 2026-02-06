import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Enquiry from "./pages/Enquiry";
import Testimonials from "./pages/Testimonials";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import AdminEnquiries from "./pages/AdminEnquiries";
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import AdminProperties from "./pages/AdminProperties";
import EditProperty from "./pages/EditProperty";
import AdminAddProperty from "./pages/AdminAddProperty";
import BookVisit from "./pages/BookVisit";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import ManageProperties from "./pages/ManageProperties";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/ForgotPassword";
import AdminFavorites from "./pages/AdminFavorites";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <main className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="h-full"
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/book/:id" element={<BookVisit />} />
              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <Favorites />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/enquiry" element={<Enquiry />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/favorites" element={<AdminFavorites />} />
              <Route
                path="/admin/properties"
                element={
                  <PrivateAdminRoute>
                    <AdminProperties />
                  </PrivateAdminRoute>
                }
              />
              <Route
                path="/admin/add-property"
                element={
                  <PrivateAdminRoute>
                    <AdminAddProperty />
                  </PrivateAdminRoute>
                }
              />
              <Route
                path="/admin/enquiries"
                element={
                  <PrivateAdminRoute>
                    <AdminEnquiries />
                  </PrivateAdminRoute>
                }
              />
              <Route
                path="/edit-property/:id"
                element={
                  <PrivateAdminRoute>
                    <EditProperty />
                  </PrivateAdminRoute>
                }
              />
              <Route
                path="/admin/manage-properties"
                element={
                  <PrivateAdminRoute>
                    <ManageProperties />
                  </PrivateAdminRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
