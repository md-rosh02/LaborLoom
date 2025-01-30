import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Search } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [userType, setUserType] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch user type and profile data from localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUserType(userData.userType);
      setProfileImage(userData.profileImage || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400');
    }
  }, [isAuthenticated]);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      const results = simulateSearch(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchVisible(false);
      setSearchResults([]);
    }
  };

  const simulateSearch = (query) => {
    const dummyResults = [
      'Construction Worker',
      'Carpenter',
      'Plumber',
      'Electrician',
      'Painter'
    ];
    
    return dummyResults.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = (menu) => setOpenMenu(openMenu === menu ? null : menu);
  
  const handleLogin = () => {
    setMenuOpen(false);
    navigate('/login');
  };
  
  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(userData)
    console.log(userData.accountType)
    setMenuOpen(false);
    if (userData.accountType === 'labor') {
      navigate('/profile/labor');
    } else if (userData.accountType === 'contractor') {
      navigate('/profile/contractor');
    }
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
      className="bg-white/10 backdrop-blur-md flex justify-between items-center h-12 p-8 text-l fixed top-0 left-0 w-full z-50 border-b border-white/10"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl"
      >
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/')}
          className="font-semibold text-white hover:cursor-pointer"
        >
          LaborLoom
        </motion.h1>
      </motion.div>

      <div className="flex items-center gap-8">
        <motion.div className="flex items-center gap-2 relative">
          <AnimatePresence>
            {searchVisible && (
              <>
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "800px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleSearchSubmit}
                  placeholder="Search for workers..."
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 mx-3 focus:outline-none focus:border-white/40 text-white placeholder-white/50"
                />
                <AnimatePresence>
                  {searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-3 right-3 mt-2 bg-black/90 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden"
                    >
                      {searchResults.map((result, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                          className="px-4 py-2 cursor-pointer text-white"
                          onClick={() => {
                            navigate(`/search?q=${encodeURIComponent(result)}`);
                            setSearchVisible(false);
                            setSearchResults([]);
                          }}
                        >
                          {result}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </AnimatePresence>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer text-white"
            onClick={toggleSearch}
          >
            <Search size={24} />
          </motion.div>
        </motion.div>

        {isAuthenticated ? (
          <div className="relative">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={profileImage}
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
                  <motion.div 
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    onClick={handleProfileClick}
                    className="cursor-pointer"
                  >
                    <div className="block px-4 py-3 font-semibold text-l">
                      Profile
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                    <Link to="/settings" className="block px-4 py-3 font-semibold text-l">Settings</Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="px-4 py-3 cursor-pointer font-semibold text-l"
                    onClick={handleLogout}
                  >
                    Logout
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="relative">
              <motion.h1
                variants={navItemVariants}
                whileHover="hover"
                className="text-white hover:bg-white/10 px-4 py-2 font-semibold text-l rounded-lg transition-all duration-300 cursor-pointer"
                onClick={() => toggleDropdown('about')}
              >
                ENG / HIN
              </motion.h1>
              <AnimatePresence>
                {openMenu === 'about' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full mt-2 bg-black/90 backdrop-blur-md text-white shadow-lg w-30 rounded-lg overflow-hidden border border-white/10 text-center"
                  >
                    <motion.h1 whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }} className="px-4 py-3 cursor-pointer font-semibold text-l">ENGLISH</motion.h1>
                    <motion.h1 whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }} className="px-4 py-3 cursor-pointer font-semibold text-l">HINDI</motion.h1>
                    <motion.h1 whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }} className="px-4 py-3 cursor-pointer font-semibold text-l">KANNADA</motion.h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 px-4 py-1 rounded-lg text-white hover:bg-white/10 transition-all duration-300 text-l font-semibold"
              onClick={handleLogin}
            >
              LOGIN
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 border border-white/20 px-4 py-1 rounded-lg text-white hover:bg-white/20 transition-all duration-300 text-l font-semibold"
              onClick={() => navigate('/signup')}
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