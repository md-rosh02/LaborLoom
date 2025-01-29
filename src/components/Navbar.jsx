import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../assets/img/search.png";
import profileImg from "../assets/img/profile.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSearch = () => setSearchVisible(!searchVisible);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = (menu) => setOpenMenu(openMenu === menu ? null : menu);
  
  const handleLogin = () => {
    setMenuOpen(false);
    navigate('/login'); // Redirect to the login page
  };
  

  const handleLogout = () => {
    setLoggedIn(false);
    setMenuOpen(false);
    navigate('/');
  };

  const navItemVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/10 backdrop-blur-md flex justify-between items-center h-16 p-10 text-l fixed top-0 left-0 w-full z-50 border-b border-white/10"
    >
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl"
      >
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          className="font-semibold text-white"
        >
          LaborLoom
        </motion.h1>
      </motion.div>

      {/* Navbar Items */}
      <div className="flex items-center gap-8">
        {/* Home */}
        <motion.div variants={navItemVariants} whileHover="hover">
          <Link to="/" className="text-white hover:bg-white/10 px-4 py-2 font-semibold text-xl rounded-lg transition-all duration-300">
            HOME
          </Link>
        </motion.div>

        {/* Jobs Section with Dropdown */}
        <div className="relative">
          <motion.h1
            variants={navItemVariants}
            whileHover="hover"
            className="text-white hover:bg-white/10 px-4 py-2 font-semibold text-xl rounded-lg transition-all duration-300 cursor-pointer"
            onClick={() => toggleDropdown('jobs')}
          >
            JOBS
          </motion.h1>
          <AnimatePresence>
            {openMenu === 'jobs' && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-full mt-2 bg-black/90 backdrop-blur-md text-white shadow-lg w-64 rounded-lg overflow-hidden border border-white/10"
              >
                <motion.h1 whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }} className="px-4 py-3 cursor-pointer font-semibold text-l">AVAILABLE JOBS</motion.h1>
                <motion.h1 whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }} className="px-4 py-3 cursor-pointer font-semibold text-l">JOB CATEGORIES</motion.h1>
                <motion.h1 whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }} className="px-4 py-3 cursor-pointer font-semibold text-l">JOB APPLICATION PROCESS</motion.h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* About Section with Dropdown */}
        <div className="relative">
          <motion.h1
            variants={navItemVariants}
            whileHover="hover"
            className="text-white hover:bg-white/10 px-4 py-2 font-semibold text-xl rounded-lg transition-all duration-300 cursor-pointer"
            onClick={() => toggleDropdown('about')}
          >
            ABOUT
          </motion.h1>
          <AnimatePresence>
            {openMenu === 'about' && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-full mt-2 bg-black/90 backdrop-blur-md text-white shadow-lg w-64 rounded-lg overflow-hidden border border-white/10"
              >
                <motion.h1 whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }} className="px-4 py-3 cursor-pointer font-semibold text-l">MISSION & VISION</motion.h1>
                <motion.h1 whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }} className="px-4 py-3 cursor-pointer font-semibold text-l">HOW IT WORKS</motion.h1>
                <motion.h1 whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }} className="px-4 py-3 cursor-pointer font-semibold text-l">BLOG's</motion.h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Section */}
        <motion.h1
          variants={navItemVariants}
          whileHover="hover"
          onClick={() => navigate('/contact')}
          className="text-white hover:bg-white/10 px-4 py-2 font-semibold text-xl rounded-lg transition-all duration-300 cursor-pointer"
        >
          CONTACT US
        </motion.h1>

        {/* Search Section */}
        <motion.div className="flex items-center gap-2 relative">
          <AnimatePresence>
            {searchVisible && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "200px", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                type="text"
                placeholder="Search..."
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 focus:outline-none focus:border-white/40 text-white placeholder-white/50"
              />
            )}
          </AnimatePresence>
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="h-6 cursor-pointer invert"
            src={logo}
            alt="Search"
            onClick={toggleSearch}
          />
        </motion.div>

        {/* Profile Section */}
        {loggedIn ? (
          <div className="relative">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={profileImg}
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer border-2 border-white/20"
              onClick={toggleMenu}
            />
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-2 bg-black/90 backdrop-blur-md text-white shadow-lg rounded-lg w-48 overflow-hidden border border-white/10"
                >
                  <motion.div whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                    <Link to="/profile" className="block px-4 py-3 font-semibold text-l">Profile</Link>
                  </motion.div>
                  <motion.div whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                    <Link to="/settings" className="block px-4 py-3 font-semibold text-l">Settings</Link>
                  </motion.div>
                  <motion.h1
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="px-4 py-3 cursor-pointer font-semibold text-l"
                    onClick={handleLogout}
                  >
                    Logout
                  </motion.h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 px-5 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300 text-l font-semibold"
              onClick={handleLogin}
            >
              LOGIN
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 border border-white/20 px-5 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300 text-l font-semibold"
                onClick={() => navigate('/signup')} // 👈 Add navigation
              >
                SIGNUP
              </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;