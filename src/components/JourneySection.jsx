import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { BoltIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import JobCard from './JobCard';

// Sample job posts data
const sampleJobPosts = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    description: "Join our team to build next-generation web applications using React and modern web technologies.",
    buttonText: "Apply Now"
  },
  {
    title: "Full Stack Engineer",
    company: "Innovation Labs",
    description: "Looking for a passionate developer to work on cutting-edge projects with latest technologies.",
    buttonText: "Learn More"
  },
  {
    title: "UI/UX Designer",
    company: "Creative Studios",
    description: "Create beautiful and intuitive user experiences for our flagship products.",
    buttonText: "View Position"
  },
  {
    title: "DevOps Engineer",
    company: "Cloud Systems Inc",
    description: "Help us build and maintain robust cloud infrastructure and deployment pipelines.",
    buttonText: "Join Us"
  }
];

const JourneySection = () => {
  const { ref: journeyRef, inView: journeyInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3;

  // Create a circular array for infinite scrolling
  const getCircularIndex = (index) => {
    const length = sampleJobPosts.length;
    return ((index % length) + length) % length;
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < cardsToShow; i++) {
      const index = getCircularIndex(currentIndex + i);
      cards.push({
        ...sampleJobPosts[index],
        key: `${index}-${currentIndex}`
      });
    }
    return cards;
  };

  const nextSlide = () => {
    setCurrentIndex(prev => getCircularIndex(prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => getCircularIndex(prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      ref={journeyRef}
      initial={{ opacity: 0 }}
      animate={journeyInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden bg-black"
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
          <div className="relative overflow-hidden mx-auto" style={{ maxWidth: "1200px" }}>
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent" />
            </div>
            <div className="relative overflow-hidden mx-auto px-16">
              <AnimatePresence mode="popLayout">
                <motion.div 
                  className="flex gap-8"
                  key={currentIndex}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {getVisibleCards().map((post, index) => (
                    <motion.div
                      key={post.key}
                      className="flex-1 min-w-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <JobCard {...post} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
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