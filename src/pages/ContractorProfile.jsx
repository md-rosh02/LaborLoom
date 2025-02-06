import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Users, Briefcase, Award, Edit2, Plus, X, Check, Camera, Clock, Star } from 'lucide-react';

const ContractorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('postings');
  const [showAddJob, setShowAddJob] = useState(false);
  const [editData, setEditData] = useState({
    companyName: 'ABC Construction',
    location: 'New York, USA',
    rating: '4.8',
    established: '1995',
    employees: '150',
    completedProjects: 250,
    bio: 'Leading construction company specializing in commercial and residential projects. With over 25 years of experience, we deliver quality workmanship and exceptional service.',
    specialties: ['Commercial Construction', 'Residential Development', 'Renovation', 'Project Management'],
    certifications: ['ISO 9001:2015', 'LEED Certified', 'Safety Management System'],
    profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop&crop=faces',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80',
  });

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Project Manager',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$80,000 - $120,000',
      description: 'Looking for an experienced project manager to oversee large-scale construction projects.',
      applicants: 24
    },
    {
      id: 2,
      title: 'Construction Site Supervisor',
      location: 'Brooklyn, NY',
      type: 'Full-time',
      salary: '$60,000 - $80,000',
      description: 'Seeking a site supervisor with 5+ years of experience in residential construction.',
      applicants: 18
    }
  ]);

  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    type: 'full-time',
    salary: '',
    description: '',
    requirements: ''
  });

  useEffect(() => {
    const storedData = localStorage.getItem('contractorProfile');
    if (storedData) {
      setEditData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contractorProfile', JSON.stringify(editData));
  }, [editData]);

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('contractorProfile', JSON.stringify(editData));
  };

  const handleAddJob = () => {
    setJobs(prev => [...prev, { ...newJob, id: Date.now(), applicants: 0 }]);
    setNewJob({
      title: '',
      location: '',
      type: 'full-time',
      salary: '',
      description: '',
      requirements: ''
    });
    setShowAddJob(false);
  };

  const handleRemoveJob = (jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
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
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans"
    >
      {/* Header Section */}
      <motion.div 
        variants={fadeIn}
        className="relative h-80 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${editData.coverImage})` }}
        />
        
        {isEditing && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4 z-30 bg-white/80 p-2 rounded-lg backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors"
          >
            <Camera className="w-5 h-5 text-gray-700" />
          </motion.button>
        )}
        
        <div className="container mx-auto relative z-20 h-full flex items-end px-6 pb-12">
          <div className="flex items-end space-x-8">
            <div className="relative group">
              <motion.img 
                src={editData.profileImage}
                alt={editData.companyName}
                className="h-40 w-40 rounded-xl object-cover border-2 border-white shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              {isEditing && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
                    value={editData.companyName}
                    onChange={(e) => setEditData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="text-4xl font-bold tracking-tight mb-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500"
                  />
                ) : (
                  <motion.h1 variants={fadeIn} className="text-4xl font-bold tracking-tight mb-2 text-gray-900">
                    {editData.companyName}
                  </motion.h1>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="ml-4 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center space-x-2"
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
              <div className="flex items-center space-x-6 text-gray-600">
                <motion.div variants={fadeIn} className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                  <span>{editData.rating}</span>
                </motion.div>
                <motion.div variants={fadeIn} className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{editData.location}</span>
                </motion.div>
                <motion.div variants={fadeIn} className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Est. {editData.established}</span>
                </motion.div>
                <motion.div variants={fadeIn} className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{editData.employees} employees</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div variants={fadeIn} className="border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-lg z-30 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {['postings', 'company'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.025)" }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-4 font-medium transition-all duration-300 ${
                  activeTab === tab 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'postings' ? 'Job Postings' : 'Company Info'}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'postings' ? (
            <motion.div 
              key="postings"
              {...fadeIn}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Active Job Postings</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddJob(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post New Job</span>
                </motion.button>
              </div>

              {showAddJob && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg mb-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={newJob.title}
                        onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="Enter job title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={newJob.location}
                        onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="Enter location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={newJob.description}
                        onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        rows={3}
                        placeholder="Enter job description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                      <textarea
                        value={newJob.requirements}
                        onChange={(e) => setNewJob(prev => ({ ...prev, requirements: e.target.value }))}
                        className="w-full bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        rows={3}
                        placeholder="Enter job requirements"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                      <input
                        type="text"
                        value={newJob.salary}
                        onChange={(e) => setNewJob(prev => ({ ...prev, salary: e.target.value }))}
                        className="w-full bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="e.g., $80,000 - $100,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                      <select
                        value={newJob.type}
                        onChange={(e) => setNewJob(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      >
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                      </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setShowAddJob(false)}
                        className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddJob}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                      >
                        Post Job
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {jobs.map((job) => (
                <motion.div 
                  key={job.id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-6">
                    <div className="h-16 w-16 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xl mb-1 text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.location}</p>
                      {job.description && (
                        <p className="text-gray-600 mt-2">{job.description}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {job.type}
                        </span>
                        {job.salary && (
                          <span className="text-gray-600 text-sm">{job.salary}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{job.applicants}</p>
                      <p className="text-gray-600">Applicants</p>
                    </div>
                    <button
                      onClick={() => handleRemoveJob(job.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="company"
              {...fadeIn}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Main Info */}
              <div className="md:col-span-2 space-y-8">
                <motion.div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">About Company</h2>
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full bg-gray-50 rounded-lg p-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-600 leading-relaxed">{editData.bio}</p>
                  )}
                </motion.div>

                <motion.div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">Specialties</h2>
                  <div className="flex flex-wrap gap-3">
                    {editData.specialties.map((specialty, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        {specialty}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">Certifications</h2>
                  <div className="space-y-4">
                    {editData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <Award className="w-6 h-6 text-blue-600" />
                        <span className="text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <motion.div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">Company Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Established</span>
                      <span className="font-medium text-gray-900">{editData.established}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Employees</span>
                      <span className="font-medium text-gray-900">{editData.employees}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Projects Completed</span>
                      <span className="font-medium text-gray-900">{editData.completedProjects}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">Contact</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-600 mb-1">Email</label>
                      <p className="font-medium text-gray-900">contact@abcconstruction.com</p>
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Phone</label>
                      <p className="font-medium text-gray-900">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Address</label>
                      <p className="font-medium text-gray-900">{editData.location}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.footer 
        variants={fadeIn}
        className="border-t border-gray-200 py-8 mt-12 bg-white"
      >
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2025 LaborLoom. All Rights Reserved.</p>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default ContractorProfile;