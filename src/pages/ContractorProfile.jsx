import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Users, Briefcase, Award, Edit2, Plus, X, Check, Camera, Clock, Star } from 'lucide-react';

const ContractorProfile = () => {
  const [activeTab, setActiveTab] = useState('postings');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    id: '',
    title: '',
    location: '',
    description: '',
    requirements: '',
    salary: '',
    type: 'full-time',
    applicants: 0
  });

  const [editData, setEditData] = useState({
    companyName: 'ABC Construction Co.',
    established: '1995',
    location: 'New York, NY',
    employees: '50-100',
    rating: 4.7,
    completedProjects: 234,
    bio: 'Leading construction company specializing in commercial and residential projects. Known for quality workmanship and timely project completion.',
    specialties: ['Commercial Construction', 'Residential Development', 'Interior Renovation', 'Project Management'],
    certifications: ['ISO 9001:2015', 'LEED Certified', 'Safety First Contractor'],
    profileImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920'
  });

  // Load profile data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData) {
      setEditData(prev => ({
        ...prev,
        companyName: userData.companyName || prev.companyName,
        established: userData.established || prev.established,
        location: userData.location || prev.location,
        employees: userData.employees || prev.employees,
        rating: userData.rating || prev.rating,
        completedProjects: userData.completedProjects || prev.completedProjects,
        bio: userData.bio || prev.bio,
        specialties: userData.specialties || prev.specialties,
        certifications: userData.certifications || prev.certifications,
        profileImage: userData.profileImage || prev.profileImage,
        coverImage: userData.coverImage || prev.coverImage
      }));
    }
  }, []);

  // Load jobs from localStorage
  useEffect(() => {
    const storedJobs = localStorage.getItem('contractorJobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      const defaultJobs = [
        {
          id: '1',
          title: 'Senior Construction Manager',
          location: 'Manhattan, NY',
          description: 'Leading residential construction projects in downtown Manhattan',
          requirements: '10+ years experience in construction management',
          salary: '$120,000 - $150,000',
          type: 'full-time',
          applicants: 15,
          status: 'active'
        },
        {
          id: '2',
          title: 'Site Supervisor',
          location: 'Brooklyn, NY',
          description: 'Supervising construction sites and managing worker teams',
          requirements: '5+ years supervisory experience',
          salary: '$80,000 - $100,000',
          type: 'full-time',
          applicants: 8,
          status: 'active'
        }
      ];
      setJobs(defaultJobs);
      localStorage.setItem('contractorJobs', JSON.stringify(defaultJobs));
    }
  }, []);

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('contractorJobs', JSON.stringify(jobs));
  }, [jobs]);

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const updatedUserData = {
      ...userData,
      ...editData
    };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  }, [editData]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleAddJob = () => {
    if (newJob.title && newJob.location) {
      const jobToAdd = {
        ...newJob,
        id: Date.now().toString(),
        applicants: 0,
        status: 'active'
      };
      setJobs(prev => [...prev, jobToAdd]);
      setNewJob({
        id: '',
        title: '',
        location: '',
        description: '',
        requirements: '',
        salary: '',
        type: 'full-time',
        applicants: 0
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
                alt={editData.companyName}
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
                    value={editData.companyName}
                    onChange={(e) => setEditData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="text-4xl font-bold tracking-tight mb-2 bg-transparent border-b border-white/20 focus:outline-none focus:border-white"
                  />
                ) : (
                  <motion.h1 variants={fadeIn} className="text-4xl font-bold tracking-tight mb-2">
                    {editData.companyName}
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
      <motion.div variants={fadeIn} className="border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-lg z-30">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {['postings', 'company'].map((tab) => (
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
                <h2 className="text-2xl font-semibold">Active Job Postings</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddJob(true)}
                  className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors flex items-center space-x-2"
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
                      <label className="block text-sm font-medium text-white/80 mb-1">Description</label>
                      <textarea
                        value={newJob.description}
                        onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                        rows={3}
                        placeholder="Enter job description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-1">Requirements</label>
                      <textarea
                        value={newJob.requirements}
                        onChange={(e) => setNewJob(prev => ({ ...prev, requirements: e.target.value }))}
                        className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                        rows={3}
                        placeholder="Enter job requirements"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-1">Salary Range</label>
                      <input
                        type="text"
                        value={newJob.salary}
                        onChange={(e) => setNewJob(prev => ({ ...prev, salary: e.target.value }))}
                        className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                        placeholder="e.g., $80,000 - $100,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-1">Job Type</label>
                      <select
                        value={newJob.type}
                        onChange={(e) => setNewJob(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                      >
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                      </select>
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
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-6">
                    <div className="h-16 w-16 rounded-xl bg-white/10 flex items-center justify-center">
                      <Briefcase className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xl mb-1">{job.title}</h3>
                      <p className="text-white/60">{job.location}</p>
                      {job.description && (
                        <p className="text-white/60 mt-2">{job.description}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-white/60 text-sm">{job.type}</span>
                        {job.salary && (
                          <span className="text-white/60 text-sm">{job.salary}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{job.applicants}</p>
                      <p className="text-white/60">Applicants</p>
                    </div>
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
          ) : (
            <motion.div 
              key="company"
              {...fadeIn}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Main Info */}
              <div className="md:col-span-2 space-y-8">
                <motion.div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">About Company</h2>
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
                  <h2 className="text-2xl font-semibold mb-6">Specialties</h2>
                  <div className="flex flex-wrap gap-3">
                    {editData.specialties.map((specialty, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/10 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        {specialty}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">Certifications</h2>
                  <div className="space-y-4">
                    {editData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <Award className="w-6 h-6 text-white/60" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <motion.div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">Company Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Established</span>
                      <span className="font-medium">{editData.established}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Employees</span>
                      <span className="font-medium">{editData.employees}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Projects Completed</span>
                      <span className="font-medium">{editData.completedProjects}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-semibold mb-6">Contact</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/60 mb-1">Email</label>
                      <p className="font-medium">contact@abcconstruction.com</p>
                    </div>
                    <div>
                      <label className="block text-white/60 mb-1">Phone</label>
                      <p className="font-medium">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <label className="block text-white/60 mb-1">Address</label>
                      <p className="font-medium">{editData.location}</p>
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
        className="border-t border-white/10 py-8 mt-12"
      >
        <div className="container mx-auto px-6 text-center text-white/60">
          <p>&copy; 2025 LaborLoom. All Rights Reserved.</p>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default ContractorProfile;