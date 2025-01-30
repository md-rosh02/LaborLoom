import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BriefcaseIcon, MapPinIcon, CalendarIcon, DollarSignIcon, ClockIcon, UsersIcon, CheckCircle2, Navigation } from 'lucide-react';
import { z } from 'zod';
import { Navigate, useNavigate } from 'react-router-dom';


const jobFormSchema = z.object({
  title: z.string().min(1, 'Job title is required').max(100),
  company: z.string().min(1, 'Company name is required').max(100),
  location: z.string().min(1, 'Location is required').max(100),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Freelance']),
  salary: z.string().min(1, 'Salary range is required').max(50),
  description: z.string().min(50, 'Description must be at least 50 characters').max(5000),
  requirements: z.string().min(30, 'Requirements must be at least 30 characters').max(2000),
  benefits: z.string().min(30, 'Benefits must be at least 30 characters').max(2000),
});

const saveJob = (jobData) => {
  const jobs = getJobs();
  
  const newJob = {
    ...jobData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  
  jobs.push(newJob);
  localStorage.setItem('jobPosts', JSON.stringify(jobs));
  
  return newJob;
};

const getJobs = () => {
  const jobsJson = localStorage.getItem('jobPosts');
  return jobsJson ? JSON.parse(jobsJson) : [];
};

const PostJob = () => {
    const navigate = useNavigate();
    const [formStep, setFormStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    benefits: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step) => {
    try {
      if (step === 0) {
        jobFormSchema.pick({
          title: true,
          company: true,
          location: true,
          type: true,
          salary: true
        }).parse(formData);
      } else {
        jobFormSchema.pick({
          description: true,
          requirements: true,
          benefits: true
        }).parse(formData);
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(0)) {
      setFormStep(1);
    }
  };

  const handleBack = () => {
    setFormStep(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(1)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const savedJob = saveJob(formData);
      console.log('Job posted successfully:', savedJob);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error saving job:', error);
      setErrors({ submit: 'Failed to save job. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    initial: {
      opacity: 0,
      x: 50
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  const inputClasses = "w-full px-3 py-2 bg-white/5 border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-white/10 focus:border-white/40 transition-all outline-none text-white placeholder-white/50 backdrop-blur-sm";
  const labelClasses = "block text-white/80 text-sm font-medium mb-2";
  const errorClasses = "text-red-400 text-sm mt-1";

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black text-white p-6 pt-40 pb-30">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto mb-6"
          >
            <CheckCircle2 className="w-full h-full text-green-400" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Job Posted Successfully!</h1>
          <p className="text-white/60 mb-8">Your job listing has been published and is now live.</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setIsSuccess(false);
              setFormStep(0);
              setFormData({
                title: '',
                company: '',
                location: '',
                type: 'Full-time',
                salary: '',
                description: '',
                requirements: '',
                benefits: ''
              });
            }}
            className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors mx-5"
          >
            Post Another Job
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            Return to Home
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-20 pb-30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-3">Post a New Job</h1>
          <p className="text-white/60">Create an opportunity that attracts the perfect candidate</p>
        </motion.div>

        <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {formStep === 0 && (
                <motion.div
                  key="step1"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">1</div>
                    <h2 className="text-lg font-semibold">Basic Information</h2>
                  </div>

                  <div>
                    <label htmlFor="title" className={labelClasses}>Job Title</label>
                    <div className="relative">
                      <BriefcaseIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className={`${inputClasses} pl-10 ${errors.title ? 'border-red-400' : ''}`}
                        placeholder="e.g. Senior Frontend Developer"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.title && <p className={errorClasses}>{errors.title}</p>}
                  </div>

                  <div>
                    <label htmlFor="company" className={labelClasses}>Company Name</label>
                    <div className="relative">
                      <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className={`${inputClasses} pl-10 ${errors.company ? 'border-red-400' : ''}`}
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.company && <p className={errorClasses}>{errors.company}</p>}
                  </div>

                  <div>
                    <label htmlFor="location" className={labelClasses}>Location</label>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className={`${inputClasses} pl-10 ${errors.location ? 'border-red-400' : ''}`}
                        placeholder="e.g. New York, NY (Remote)"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.location && <p className={errorClasses}>{errors.location}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="type" className={labelClasses}>Employment Type</label>
                      <div className="relative">
                        <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <select
                          id="type"
                          name="type"
                          className={`${inputClasses} pl-10 appearance-none ${errors.type ? 'border-red-400' : ''}`}
                          value={formData.type}
                          onChange={handleChange}
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Freelance">Freelance</option>
                        </select>
                      </div>
                      {errors.type && <p className={errorClasses}>{errors.type}</p>}
                    </div>

                    <div>
                      <label htmlFor="salary" className={labelClasses}>Salary Range</label>
                      <div className="relative">
                        <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <input
                          type="text"
                          id="salary"
                          name="salary"
                          className={`${inputClasses} pl-10 ${errors.salary ? 'border-red-400' : ''}`}
                          placeholder="e.g. $80,000 - $100,000"
                          value={formData.salary}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.salary && <p className={errorClasses}>{errors.salary}</p>}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleNext}
                    className="w-full py-3 bg-white text-black rounded-xl font-bold mt-6 hover:bg-gray-100 transition-colors"
                  >
                    Continue
                  </motion.button>
                </motion.div>
              )}

              {formStep === 1 && (
                <motion.div
                  key="step2"
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">2</div>
                    <h2 className="text-lg font-semibold">Job Details</h2>
                  </div>

                  <div>
                    <label htmlFor="description" className={labelClasses}>Job Description</label>
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      className={`${inputClasses} ${errors.description ? 'border-red-400' : ''}`}
                      placeholder="Describe the role and responsibilities"
                      value={formData.description}
                      onChange={handleChange}
                    />
                    {errors.description && <p className={errorClasses}>{errors.description}</p>}
                  </div>

                  <div>
                    <label htmlFor="requirements" className={labelClasses}>Requirements</label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={3}
                      className={`${inputClasses} ${errors.requirements ? 'border-red-400' : ''}`}
                      placeholder="List the key requirements and qualifications"
                      value={formData.requirements}
                      onChange={handleChange}
                    />
                    {errors.requirements && <p className={errorClasses}>{errors.requirements}</p>}
                  </div>

                  <div>
                    <label htmlFor="benefits" className={labelClasses}>Benefits</label>
                    <textarea
                      id="benefits"
                      name="benefits"
                      rows={3}
                      className={`${inputClasses} ${errors.benefits ? 'border-red-400' : ''}`}
                      placeholder="List the benefits and perks"
                      value={formData.benefits}
                      onChange={handleChange}
                    />
                    {errors.benefits && <p className={errorClasses}>{errors.benefits}</p>}
                  </div>

                  {errors.submit && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{errors.submit}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Posting...' : 'Post Job'}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PostJob;