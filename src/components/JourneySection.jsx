import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer"; // ✅ Corrected import
import { BoltIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import JobCard from './JobCard';

const JourneySection = ({ jobPosts }) => {
  const { ref: journeyRef, inView: journeyInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div 
      ref={journeyRef}
      initial={{ opacity: 0 }}
      animate={journeyInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-black z-0" />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 pb-4"
        >
          Our Journey & Vision
        </motion.h1>

        {/* Search and Post Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl mx-auto mb-16 relative"
        >
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed pb-20">
            From digital chaos to workforce harmony, we're rewriting the rules of how labor connects in the modern age.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for opportunities..."
                className="w-full px-6 py-4 bg-white/5 border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-white/10 focus:border-white/40 transition-all outline-none text-white placeholder-white/50 backdrop-blur-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <BoltIcon className="h-5 w-5 text-white" />
              </motion.button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors md:w-auto w-full"
            >
              <BoltIcon className="h-5 w-5" />
              <span>Post Job</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Job Posts Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-7xl mx-auto mb-24"
        >
          <h2 className="text-3xl font-bold mb-8 text-white">Trending on LaborLoom🔥</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobPosts.map((post, index) => (
              <JobCard key={index} {...post} />
            ))}
          </div>
          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-4 text-white">Breaking Barriers</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <h4 className="text-4xl font-bold text-white mb-2">10K+</h4>
              <p className="text-gray-400">Dreams Launched</p>
            </div>
            <div className="p-4">
              <h4 className="text-4xl font-bold text-white mb-2">95%</h4>
              <p className="text-gray-400">Success Rate</p>
            </div>
            <div className="p-4">
              <h4 className="text-4xl font-bold text-white mb-2">50+</h4>
              <p className="text-gray-400">Cities Revolutionized</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JourneySection;
