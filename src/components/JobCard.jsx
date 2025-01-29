import React from 'react';
import { motion } from 'framer-motion';

const JobCard = ({ title, company, description, buttonText }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 flex flex-col h-full"
    >
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{company}</p>
        <p className="text-gray-300 mb-6">{description}</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full"
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
};

export default JobCard;