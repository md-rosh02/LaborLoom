import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

const FeaturesGrid = ({ features }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="py-24 px-6 md:px-12"
    >
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
      >
        Who We Are: The Innovators of Labor Connections
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            Icon={feature.Icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturesGrid;