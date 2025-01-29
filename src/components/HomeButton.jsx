import React from 'react';
import { motion } from 'framer-motion';
import { HomeIcon } from 'lucide-react';

const HomeButton = () => {
  return (
    <motion.div 
      className="fixed bottom-1 right-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.href = '/'}
        className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
      >
        <HomeIcon className="h-5 w-5" />
        <span>Home</span>
      </motion.button>
    </motion.div>
  );
};

export default HomeButton;