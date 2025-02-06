import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { BoltIcon, ChevronLeftIcon, ChevronRightIcon, Briefcase, MapPin, Trophy, Users } from 'lucide-react';
import JobCard from './JobCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

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

const JobSection = ({ title, emoji }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3;

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
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="max-w-7xl mx-auto mb-24"
    >
      <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center justify-center gap-2">
        {title} <span className="text-2xl">{emoji}</span>
      </h2>
      <div className="relative overflow-hidden mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent" />
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
              {getVisibleCards().map((post) => (
                <motion.div
                  key={post.key}
                  className="flex-1 min-w-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.company}</p>
                    <p className="text-gray-500 text-sm mb-6">{post.description}</p>
                    <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                      {post.buttonText}
                    </button>
                  </div>
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
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const JourneySection = () => {
  const { loggedIn } = useAuth();
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUserType(userData.accountType);
    setIsLoggedIn(!!userData.id);
  }, []);

  const { ref: journeyRef, inView: journeyInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const handleFindJobClick = () => {
    if (loggedIn === 'LoggedIn') {
      navigate('/available-jobs');
    } else if(loggedIn === 'LoggedOut'){
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const handlePostJobClick = () => {
    if (loggedIn === 'LoggedIn') {
      navigate('/post-job');
    } else if(loggedIn === 'LoggedOut'){
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <motion.div 
      ref={journeyRef}
      initial={{ opacity: 0 }}
      animate={journeyInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden bg-white"
    >
      {/* Ambient Lighting Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-20 -left-40 w-96 h-96 bg-blue-100/30 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100/30 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-100/30 rounded-full blur-[100px] animate-pulse-slow delay-500" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500 pb-8 pt-14"
        >
          Our Journey & Vision
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl mx-auto mb-40 relative"
        >
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed pb-30">
            From digital chaos to workforce harmony, we're rewriting the rules of how labor connects in the modern age.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for opportunities..."
                className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all outline-none text-gray-800 placeholder-gray-400 shadow-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-100 p-2 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <BoltIcon className="h-5 w-5 text-blue-600" />
              </motion.button>
            </div>
            
            <motion.div className="flex justify-center gap-4">
              {userType === 'labor' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFindJobClick}
                  className="bg-blue-600 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors md:w-auto w-full"
                >
                  <BoltIcon className="h-5 w-5" />
                  <span>Find Job</span>
                </motion.button>
              )}

              {userType === 'contractor' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePostJobClick}
                  className="bg-blue-600 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors md:w-auto w-full"
                >
                  <BoltIcon className="h-5 w-5" />
                  <span>Post Job</span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>

        <JobSection title="Trending on LaborLoom" emoji="🔥" />
        <JobSection title="Recommended Jobs" emoji="🎯" />
        <JobSection title="Featured Jobs" emoji="⭐" />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 p-8 bg-white rounded-2xl backdrop-blur-lg border border-gray-200 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-800">Breaking Barriers</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <Briefcase className="h-8 w-8 text-gray-700 mx-auto mb-4" />
              <h4 className="text-4xl font-bold text-gray-800 mb-2">10K+</h4>
              <p className="text-gray-600">Dreams Launched</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <Trophy className="h-8 w-8 text-gray-700 mx-auto mb-4" />
              <h4 className="text-4xl font-bold text-gray-800 mb-2">95%</h4>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <MapPin className="h-8 w-8 text-gray-700 mx-auto mb-4" />
              <h4 className="text-4xl font-bold text-gray-800 mb-2">50+</h4>
              <p className="text-gray-600">Cities Covered</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <Users className="h-8 w-8 text-gray-700 mx-auto mb-4" />
              <h4 className="text-4xl font-bold text-gray-800 mb-2">100K+</h4>
              <p className="text-gray-600">Active Users</p>
            </div>
          </div>
        </motion.div>

        <motion.footer
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 pt-6 border-t border-gray-200"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Your Journey?</h4>
              <p className="text-gray-600 mb-6">Join thousands of professionals finding their path to success.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                Get Started
                <BoltIcon className="h-5 w-5" />
              </motion.button>
            </div>
            <div className="text-right">
              <div className="inline-flex gap-4 items-center justify-end">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <BoltIcon className="h-6 w-6 text-blue-600" />
                </motion.div>
                <div>
                  <h5 className="text-gray-800 font-bold">LaborLoom</h5>
                  <p className="text-gray-600 text-sm">Connecting Dreams</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-gray-200 text-center text-gray-600 text-sm">
            © 2024 LaborLoom. All rights reserved.
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default JourneySection;