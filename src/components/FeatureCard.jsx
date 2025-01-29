import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const FeatureCard = ({ Icon, title, description }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center group"
    >
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="bg-white/5 p-8 rounded-full shadow-2xl group-hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10"
      >
        <Icon className="h-16 w-16 text-white" />
      </motion.div>
      <h3 className="text-2xl font-semibold mt-6 text-white">{title}</h3>
      <p className="mt-4 text-lg text-gray-400">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;