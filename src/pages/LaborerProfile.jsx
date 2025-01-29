import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LaborerProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [availability, setAvailability] = useState(true);

  const laborerData = {
    name: 'John Doe',
    skills: ['Carpentry', 'Masonry', 'Electrical'],
    experience: '5 years',
    location: 'New York',
    rating: 4.8,
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className="min-h-screen pt-20 bg-black text-white"
    >
      {/* Header Section */}
      <motion.div 
        variants={fadeIn}
        className="bg-white/10 backdrop-blur-md p-8 border-b border-white/10"
      >
        <div className="container mx-auto flex items-center space-x-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="h-32 w-32 bg-white/20 rounded-full border-2 border-white/20"
          /> {/* Placeholder for Profile Image */}
          <div>
            <motion.h1 
              variants={fadeIn}
              className="text-3xl font-bold"
            >
              {laborerData.name}
            </motion.h1>
            <motion.p variants={fadeIn} className="text-white/80">⭐ {laborerData.rating} Rating</motion.p>
            <motion.p variants={fadeIn} className="text-white/80">{laborerData.location}</motion.p>
            <motion.p variants={fadeIn} className="text-white/80">{laborerData.experience} of Experience</motion.p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div variants={fadeIn} className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="flex justify-center">
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 transition-all duration-300 ${
              activeTab === 'profile' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 transition-all duration-300 ${
              activeTab === 'jobs' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setActiveTab('jobs')}
          >
            Job Matches
          </motion.button>
        </div>
      </motion.div>

      {/* Profile Content Section */}
      <motion.div 
        variants={fadeIn}
        className="container mx-auto p-8"
      >
        {activeTab === 'profile' ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/10"
          >
            <motion.h2 variants={fadeIn} className="text-2xl font-semibold mb-4">Skills</motion.h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {laborerData.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 px-4 py-2 rounded-full border border-white/20"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <motion.h2 variants={fadeIn} className="text-2xl font-semibold mb-4">Experience</motion.h2>
            <motion.p variants={fadeIn} className="text-white/80">{laborerData.experience}</motion.p>

            <motion.h2 variants={fadeIn} className="text-2xl font-semibold mt-4 mb-4">Availability</motion.h2>
            <motion.div variants={fadeIn} className="flex items-center space-x-4">
              <span>Available:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability}
                  onChange={(e) => setAvailability(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/40"></div>
              </label>
              <span>{availability ? 'Yes' : 'No'}</span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/10"
          >
            <motion.h2 variants={fadeIn} className="text-2xl font-semibold mb-4">Job Matches</motion.h2>
            <motion.p variants={fadeIn} className="text-white/80">
              Here, job matches based on your profile and availability would be displayed.
            </motion.p>
          </motion.div>
        )}
      </motion.div>

      {/* Footer Section */}
      <motion.footer 
        variants={fadeIn}
        className="bg-white/10 backdrop-blur-md text-white text-center py-4 border-t border-white/10"
      >
        <p className="text-white/80">&copy; 2025 LaborLoom. All Rights Reserved.</p>
      </motion.footer>
    </motion.div>
  );
};

export default LaborerProfile;