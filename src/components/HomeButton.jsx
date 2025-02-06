import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const HomeButton = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: -20, 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Available Jobs', path: '/available-jobs' },
    { title: 'Job Application Process', path: '/job-app-pro' },
    { title: 'Contact', path: '/contact' },
    { title: 'Mission & Vision', path: '/mission' },
    { title: 'Team', path: '/team' }
  ];

  return (
    <div className="fixed bottom-1 left-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpenMenu(!openMenu)}
        className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: openMenu ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp className="h-6 w-6" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence mode="wait">
        {openMenu && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-full mb-4 bg-black text-white shadow-2xl rounded-2xl overflow-hidden border border-white/10 w-[250px] backdrop-blur-lg"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.path}
                variants={itemVariants}
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  x: 10,
                  transition: { duration: 0.2 }
                }}
                className="px-6 py-3 cursor-pointer font-medium text-sm border-b border-white/5 last:border-b-0 flex items-center"
                onClick={() => setOpenMenu(false)}
              >
                <Link 
                  to={item.path} 
                  className="w-full block"
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeButton;