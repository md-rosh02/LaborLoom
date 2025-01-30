import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Clock, Briefcase, Award, ChevronRight, Edit2, X, Check, Camera, Plus } from 'lucide-react';

const LaborProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [availability, setAvailability] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showAddJob, setShowAddJob] = useState(false);
  const [newJob, setNewJob] = useState({
    id: '',
    title: '',
    location: '',
    startDate: '',
    status: 'pending',
    description: ''
  });

  const [editData, setEditData] = useState({
    name: 'John Doe',
    skills: ['Carpentry', 'Masonry', 'Electrical', 'Plumbing', 'Painting'],
    experience: '5 years',
    location: 'New York',
    rating: 4.8,
    completedJobs: 127,
    bio: 'Professional carpenter with extensive experience in residential and commercial projects.',
    hourlyRate: 45,
    profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop&crop=faces',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80'
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData) {
      setEditData(prev => ({
        ...prev,
        name: userData.name || prev.name,
        skills: userData.skills || prev.skills,
        experience: userData.experience || prev.experience,
        location: userData.location || prev.location,
        rating: userData.rating || prev.rating,
        completedJobs: userData.completedJobs || prev.completedJobs,
        bio: userData.bio || prev.bio,
        hourlyRate: userData.hourlyRate || prev.hourlyRate,
        profileImage: userData.profileImage || prev.profileImage,
        coverImage: userData.coverImage || prev.coverImage
      }));
      setAvailability(userData.availability !== undefined ? userData.availability : true);
    }
  }, []);

  // Load jobs from localStorage on component mount
  useEffect(() => {
    const storedJobs = localStorage.getItem('laborerJobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      // Set some default jobs if none exist
      const defaultJobs = [
        {
          id: '1',
          title: 'Home Renovation Project',
          location: 'Downtown Area',
          startDate: '2024-03-15',
          status: 'in-progress',
          description: 'Complete home renovation including kitchen and bathroom remodeling.'
        },
        {
          id: '2',
          title: 'Office Space Construction',
          location: 'Business District',
          startDate: '2024-03-20',
          status: 'pending',
          description: 'New office space construction project requiring skilled carpentry work.'
        }
      ];
      setJobs(defaultJobs);
      localStorage.setItem('laborerJobs', JSON.stringify(defaultJobs));
    }
  }, []);

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('laborerJobs', JSON.stringify(jobs));
  }, [jobs]);

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const updatedUserData = {
      ...userData,
      ...editData,
      availability
    };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  }, [editData, availability]);

  const [newSkill, setNewSkill] = useState('');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Data is automatically saved to localStorage through the useEffect
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      setEditData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddJob = () => {
    if (newJob.title && newJob.location && newJob.startDate) {
      const jobToAdd = {
        ...newJob,
        id: Date.now().toString()
      };
      setJobs(prev => [...prev, jobToAdd]);
      setNewJob({
        id: '',
        title: '',
        location: '',
        startDate: '',
        status: 'pending',
        description: ''
      });
      setShowAddJob(false);
    }
  };

  const handleRemoveJob = (jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className="min-h-screen bg-black text-white font-sans"
    >
      {/* Header Section */}
      <motion.div 
        variants={fadeIn}
        className="relative h-80 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${editData.coverImage})` }}
        />
        
        {isEditing && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4 z-30 bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
          >
            <Camera className="w-5 h-5" />
          </motion.button>
        )}
        
        <div className="container mx-auto relative z-20 h-full flex items-end px-6 pb-12">
          <div className="flex items-end space-x-8">
            <div className="relative group">
              <motion.img 
                src={editData.profileImage}
                alt={editData.name}
                className="h-40 w-40 rounded-xl object-cover border-2 border-white/20 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              {isEditing && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-2 right-2 bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <Camera className="w-4 h-4" />
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
                    className="text-4xl font-bold tracking-tight mb-2 bg-transparent border-b border-white/20 focus:outline-none focus:border-white"
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
                  className="ml-4 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors flex items-center space-x-2"
                >
                  {isEditing ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save</span>
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </motion.button>
              </div>
              <div className="flex items-center space-x-6 text-white/80">
                <motion.div variants={fadeIn} className="flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-white" />
                  <span>{editData.rating}</span>
                </motion.div>
                <motion.div variants={fadeIn} className="flex items-center">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                      className="bg-transparent border-b border-white/20 focus:outline-none focus:border-white"
                    />
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{editData.location}</span>
                    </>
                  )}
                </motion.div>
                <motion.div variants={fadeIn} className="flex items-center">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.experience}
                      onChange={(e) => setEditData(prev => ({ ...prev, experience: e.target.value }))}
                      className="bg-transparent border-b border-white/20 focus:outline-none focus:border-white"
                    />
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

      {/* Navigation Tabs */}
      <motion.div variants={fadeIn} className="border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-lg z-30">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {['profile', 'jobs'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-4 font-medium transition-all duration-300 ${
                  activeTab === tab 
                    ? 'border-b-2 border-white text-white' 
                    : 'text-white/60 hover:text-white'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' ? (
            <motion.div 
              key="profile"
              {...fadeIn}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Main Info */}
              <div className="md:col-span-2 space-y-8">
                <motion.div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">About Me</h2>
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full bg-white/5 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-white/20"
                      rows={4}
                    />
                  ) : (
                    <p className="text-white/80 leading-relaxed">{editData.bio}</p>
                  )}
                </motion.div>

                <motion.div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">Skills & Expertise</h2>
                  <div className="flex flex-wrap gap-3">
                    {editData.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/10 px-4 py-2 rounded-lg text-sm font-medium group relative"
                      >
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </motion.span>
                    ))}
                    {isEditing && (
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={handleAddSkill}
                        placeholder="Add skill..."
                        className="bg-white/10 px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-white/20"
                      />
                    )}
                  </div>
                </motion.div>

                <motion.div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">Work Experience</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Briefcase className="w-10 h-10 p-2 bg-white/10 rounded-lg" />
                        <div>
                          <h3 className="font-medium">Senior Carpenter</h3>
                          <p className="text-white/60 text-sm">BuildRight Construction</p>
                        </div>
                      </div>
                      <span className="text-white/60">2018 - Present</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <motion.div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">Availability</h2>
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={availability}
                        onChange={(e) => setAvailability(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-white/20 peer-focus:ring-2 peer-focus:ring-white/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-white/40"></div>
                    </label>
                  </div>
                </motion.div>

                <motion.div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">Hourly Rate</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">$</span>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editData.hourlyRate}
                        onChange={(e) => setEditData(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) }))}
                        className="bg-transparent text-2xl font-bold w-20 border-b border-white/20 focus:outline-none focus:border-white"
                      />
                    ) : (
                      <span className="text-2xl font-bold">{editData.hourlyRate}</span>
                    )}
                    <span className="text-white/60">/hour</span>
                  </div>
                </motion.div>

                <motion.div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">Statistics</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Completed Jobs</span>
                      <span className="font-medium">{editData.completedJobs}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Success Rate</span>
                      <span className="font-medium">98%</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="jobs"
              {...fadeIn}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Current Jobs</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddJob(true)}
                  className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Job</span>
                </motion.button>
              </div>

              {showAddJob && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={newJob.title}
                        onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                        placeholder="Enter job title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-1">Location</label>
                      <input
                        type="text"
                        value={newJob.location}
                        onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                        placeholder="Enter location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={newJob.startDate}
                        onChange={(e) => setNewJob(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-1">Description</label>
                      <textarea
                        value={newJob.description}
                        onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                        rows={3}
                        placeholder="Enter job description"
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setShowAddJob(false)}
                        className="px-4 py-2 rounded-lg text-white/60 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddJob}
                        className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
                      >
                        Add Job
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {jobs.map((job) => (
                <motion.div 
                  key={job.id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-6">
                    <div className="h-16 w-16 rounded-xl bg-white/10 flex items-center justify-center">
                      <Award className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{job.title}</h3>
                      <p className="text-white/60 text-sm">{job.location} • Starting {new Date(job.startDate).toLocaleDateString()}</p>
                      {job.description && (
                        <p className="text-white/60 text-sm mt-2">{job.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      job.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                      job.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                    <button
                      onClick={() => handleRemoveJob(job.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.footer 
        variants={fadeIn}
        className="border-t border-white/10 py-8 mt-12"
      >
        <div className="container mx-auto px-6 text-center text-white/60">
          <p>&copy; 2025 LaborLoom. All Rights Reserved.</p>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default LaborProfile;