import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Search } from 'lucide-react';
import {auth ,db} from '../components/firebase'
import { getDoc, doc } from "firebase/firestore"

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [ user, setUser ] = useState();

  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  useEffect(() => {
    if (isAuthenticated) {
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

  const [userdetails , setUserDetails] = useState(null);

  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) =>{
      console.log(user);
      if(user){
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      }else{
        console.log('not logged in');
      }
    }
    });

  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleLogout(){
    try{
     await auth.signOut();
     window.location.href="/";
     console.log("User Logged out");
   } catch (error){
     console.log("Error Logging Out: ", error.message);
   }
 }

  const handleProfileClick = () => {
    
    setMenuOpen(false);
    if (userdetails.role === 'labor') {
      navigate('/profile/labor');
    } else if (userdetails.role === 'contractor') {
      navigate('/profile/contractor');
    }
  };

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white backdrop-blur-md flex justify-between items-center h-16 p-8 text-l fixed top-0 left-0 w-full z-50 border-b border-gray-200 shadow-sm"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <motion.h1 
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate('/')}
        className="font-semibold text-gray-800 hover:cursor-pointer text-3xl"
      >
        LaborLoom
      </motion.h1>

      <div className="flex items-center gap-8">
        <motion.div className="relative">
          {user ? (
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={profileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer border-2 border-gray-200"
                onClick={toggleMenu}
              />
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 bg-white backdrop-blur-md text-gray-800 shadow-lg rounded-lg w-48 overflow-hidden border border-gray-200"
                  >
                    <motion.div 
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                      onClick={handleProfileClick}
                      className="cursor-pointer px-4 py-3 font-semibold text-l"
                    >
                      Profile
                    </motion.div>
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 border border-blue-600 px-4 py-1 rounded-lg text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-l font-semibold shadow-md"
              onClick={handleLogin}
            >
              LOGIN
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;
