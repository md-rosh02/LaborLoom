import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Camera, Edit2, Check, Building2 } from 'lucide-react';

const LaborProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: 'John Doe',
    skills: ['Carpentry', 'Woodworking', 'Repairing'],
    experience: '5 years',
    location: 'New York, USA',
    rating: '4.8',
    jobsCompleted: 12,
    jobsPending: 3,
    totalEarnings: 15000,
    bio: 'Experienced carpenter with a passion for woodworking and furniture making.',
    hourlyRate: '25',
    profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop&crop=faces',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80',
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('laborProfile');
    if (storedData) {
      setEditData(JSON.parse(storedData));
    }
  }, []);

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('laborProfile', JSON.stringify(editData));
  }, [editData]);

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('laborProfile', JSON.stringify(editData));
  };

  const handleImageUpload = (type) => {
    alert(`Image upload for ${type} would be handled here`);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className="min-h-screen bg-white text-gray-900 font-sans"
    >
      {/* Header Section */}
      <motion.div 
        variants={fadeIn}
        className="relative h-80 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${editData.coverImage})` }}
        />
        
        {isEditing && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => handleImageUpload('cover')}
            className="absolute top-4 right-4 z-30 bg-white/80 p-2 rounded-lg backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors"
          >
            <Camera className="w-5 h-5 text-gray-700" />
          </motion.button>
        )}
        
        <div className="container mx-auto relative z-20 h-full flex items-end px-6 pb-12">
          <div className="flex items-end space-x-8">
            <div className="relative">
              <motion.img 
                src={editData.profileImage}
                alt={editData.name}
                className="h-40 w-40 rounded-xl object-cover border-2 border-gray-200 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              {isEditing && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => handleImageUpload('profile')}
                  className="absolute bottom-2 right-2 bg-white/80 p-2 rounded-lg backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors"
                >
                  <Camera className="w-4 h-4 text-gray-700" />
                </motion.button>
              )}
            </div>
            <div className="mb-2 flex-1">
              <div className="flex items-center justify-between">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="text-4xl font-bold tracking-tight mb-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500"
                  />
                ) : (
                  <motion.h1 variants={fadeIn} className="text-4xl font-bold tracking-tight mb-2">
                    {editData.name}
                  </motion.h1>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="ml-4 bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors flex items-center space-x-2"
                >
                  {isEditing ? (
                    <>
                      <Check className="w-4 h-4 text-gray-700" />
                      <span>Save</span>
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 text-gray-700" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </motion.button>
              </div>
              <div className="flex items-center space-x-6 text-gray-700">
                <motion.div variants={fadeIn} className="flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-yellow-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.rating}
                      onChange={(e) => setEditData(prev => ({ ...prev, rating: e.target.value }))}
                      className="w-16 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500"
                    />
                  ) : (
                    <span>{editData.rating}</span>
                  )}
                </motion.div>
                <motion.div variants={fadeIn} className="flex items-center">
                  {isEditing ? (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                        className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500"
                      />
                    </div>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{editData.location}</span>
                    </>
                  )}
                </motion.div>
                <motion.div variants={fadeIn} className="flex items-center">
                  {isEditing ? (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <input
                        type="text"
                        value={editData.experience}
                        onChange={(e) => setEditData(prev => ({ ...prev, experience: e.target.value }))}
                        className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500"
                      />
                    </div>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{editData.experience}</span>
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            {/* Job Statistics */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Jobs Completed</h3>
                {isEditing ? (
                  <input
                    type="number"
                    value={editData.jobsCompleted}
                    onChange={(e) => setEditData(prev => ({ ...prev, jobsCompleted: parseInt(e.target.value) }))}
                    className="w-full bg-white rounded-lg p-2 border border-gray-300 focus:outline-none focus:border-gray-500"
                  />
                ) : (
                  <p className="text-3xl font-bold">{editData.jobsCompleted}</p>
                )}
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Jobs Pending</h3>
                {isEditing ? (
                  <input
                    type="number"
                    value={editData.jobsPending}
                    onChange={(e) => setEditData(prev => ({ ...prev, jobsPending: parseInt(e.target.value) }))}
                    className="w-full bg-white rounded-lg p-2 border border-gray-300 focus:outline-none focus:border-gray-500"
                  />
                ) : (
                  <p className="text-3xl font-bold">{editData.jobsPending}</p>
                )}
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
                {isEditing ? (
                  <input
                    type="number"
                    value={editData.totalEarnings}
                    onChange={(e) => setEditData(prev => ({ ...prev, totalEarnings: parseInt(e.target.value) }))}
                    className="w-full bg-white rounded-lg p-2 border border-gray-300 focus:outline-none focus:border-gray-500"
                  />
                ) : (
                  <p className="text-3xl font-bold">${editData.totalEarnings}</p>
                )}
              </div>
            </motion.div>

            <motion.div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6">About Me</h2>
              {isEditing ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full bg-white rounded-lg p-4 border border-gray-300 focus:outline-none focus:border-gray-500"
                  rows={4}
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{editData.bio}</p>
              )}
            </motion.div>

            <motion.div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6">Skills & Expertise</h2>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.skills.join(', ')}
                  onChange={(e) => setEditData(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()) }))}
                  className="w-full bg-white rounded-lg p-4 border border-gray-300 focus:outline-none focus:border-gray-500"
                  placeholder="Enter skills separated by commas"
                />
              ) : (
                <div className="flex flex-wrap gap-3">
                  {editData.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white px-4 py-2 rounded-lg text-sm font-medium border border-gray-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6">Hourly Rate</h2>
              {isEditing ? (
                <div className="flex items-center">
                  <span className="text-gray-700 mr-2">$</span>
                  <input
                    type="number"
                    value={editData.hourlyRate}
                    onChange={(e) => setEditData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                    className="bg-white rounded-lg p-2 border border-gray-300 focus:outline-none focus:border-gray-500"
                  />
                  <span className="text-gray-700 ml-2">/hour</span>
                </div>
              ) : (
                <p className="text-gray-700">${editData.hourlyRate}/hour</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LaborProfile;