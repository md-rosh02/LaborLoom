import React from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

function App() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-[50vh] relative overflow-hidden bg-black"
      >
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" 
          alt="Office" 
          className="w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h1 className="text-7xl font-bold text-white tracking-tight">Get in Touch</h1>
            <div className="h-1 w-24 bg-white mx-auto"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-16">
        {/* Contact Information */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <motion.div variants={fadeIn} className="space-y-4">
            <h2 className="text-4xl font-bold text-black tracking-tight">Contact Information</h2>
            <p className="text-black text-lg">We're here to help and answer any questions you might have.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="space-y-8">
            <div className="flex items-center space-x-6 group">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Our Location</h3>
                <p className="text-black">123 Business Avenue, Suite 100</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 group">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Phone Number</h3>
                <p className="text-black">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 group">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Email Address</h3>
                <p className="text-black">contact@company.com</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black p-12 rounded-3xl"
        >
          <form className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-4 bg-white border-2 border-white rounded-xl focus:ring-4 focus:ring-white/20 focus:border-white transition-all outline-none text-black"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-4 bg-white border-2 border-white rounded-xl focus:ring-4 focus:ring-white/20 focus:border-white transition-all outline-none text-black"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-4 bg-white border-2 border-white rounded-xl focus:ring-4 focus:ring-white/20 focus:border-white transition-all outline-none text-black"
                placeholder="Your message..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-white/90 transition-colors"
            >
              <span>Send Message</span>
              <Send className="w-5 h-5" />
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-20 h-20 bg-black text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white hover:border-4 transition-all"
      >
        <MessageSquare className="w-8 h-8" />
      </motion.button>
    </div>
  );
}

export default App;