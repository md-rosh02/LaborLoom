import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Briefcase, Upload, UserCircle, Brain, DollarSign, CheckCircle, Building2, AlertCircle } from 'lucide-react';

const steps = [
  { id: 1, title: 'Job Type', icon: <Briefcase className="w-6 h-6" /> },
  { id: 2, title: 'Personal Details', icon: <UserCircle className="w-6 h-6" /> },
  { id: 3, title: 'Skills', icon: <Brain className="w-6 h-6" /> },
  { id: 4, title: 'Documents', icon: <Upload className="w-6 h-6" /> },
  { id: 5, title: 'Preferences', icon: <Building2 className="w-6 h-6" /> },
  { id: 6, title: 'Review', icon: <CheckCircle className="w-6 h-6" /> }
];

const jobTypes = [
  'Plumber', 'Electrician', 'Mason', 'Painter', 'Carpenter'
];

const skillsList = [
  'Tool Handling', 'Safety Protocols', 'Blueprint Reading', 'Project Management',
  'Problem Solving', 'Customer Service', 'Team Collaboration', 'Quality Control'
];

const locations = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
  'Pune', 'Ahmedabad', 'Surat', 'Jaipur'
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRefs = {
    idProof: useRef(null),
    certifications: useRef(null),
    portfolio: useRef(null)
  };

  const [formData, setFormData] = useState({
    jobType: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    age: '',
    gender: '',
    skills: [],
    experience: '',
    availability: '',
    expectedSalary: '',
    location: '',
    willRelocate: false,
    documents: {
      idProof: null,
      certifications: null,
      portfolio: null
    },
    termsAccepted: false
  });

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.jobType) {
          newErrors.jobType = 'Please select a job type';
        }
        break;

      case 2:
        if (!formData.name) {
          newErrors.name = 'Name is required';
        }
        if (!formData.phone) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
          newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.age) {
          newErrors.age = 'Age is required';
        } else if (parseInt(formData.age) < 18 || parseInt(formData.age) > 65) {
          newErrors.age = 'Age must be between 18 and 65';
        }
        if (!formData.gender) {
          newErrors.gender = 'Please select your gender';
        }
        if (!formData.address) {
          newErrors.address = 'Address is required';
        }
        break;

      case 3:
        if (formData.skills.length === 0) {
          newErrors.skills = 'Please select at least one skill';
        }
        if (!formData.experience) {
          newErrors.experience = 'Years of experience is required';
        }
        if (!formData.availability) {
          newErrors.availability = 'Please select your availability';
        }
        break;

      case 4:
        if (!formData.documents.idProof) {
          newErrors.idProof = 'ID proof is required';
        }
        break;

      case 5:
        if (!formData.expectedSalary) {
          newErrors.expectedSalary = 'Expected salary is required';
        } else if (parseInt(formData.expectedSalary) < 100) {
          newErrors.expectedSalary = 'Please enter a valid salary amount';
        }
        if (!formData.location) {
          newErrors.location = 'Please select your preferred location';
        }
        break;

      case 6:
        if (!formData.termsAccepted) {
          newErrors.terms = 'Please accept the terms and conditions';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: e.target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSkillsChange = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
    if (errors.skills) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.skills;
        return newErrors;
      });
    }
  };

  const handleFileChange = async (name, file) => {
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [name]: 'File size should not exceed 5MB'
        }));
        return;
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [name]: 'Only PDF, JPEG, and PNG files are allowed'
        }));
        return;
      }

      // Create preview for images
      let preview = '';
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [name]: { file, preview }
        }
      }));

      // Clear error
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleFileButtonClick = (inputRef) => {
    inputRef.current?.click();
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success
        setSubmitSuccess(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            jobType: '',
            name: '',
            phone: '',
            email: '',
            address: '',
            age: '',
            gender: '',
            skills: [],
            experience: '',
            availability: '',
            expectedSalary: '',
            location: '',
            willRelocate: false,
            documents: {
              idProof: null,
              certifications: null,
              portfolio: null
            },
            termsAccepted: false
          });
          setCurrentStep(1);
          setSubmitSuccess(false);
        }, 3000);
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          submit: 'Failed to submit application. Please try again.'
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderError = (fieldName) => {
    if (errors[fieldName]) {
      return (
        <div className="flex items-center text-white mt-1">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span className="text-sm">{errors[fieldName]}</span>
        </div>
      );
    }
    return null;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Select Job Type</h2>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleInputChange}
              className="w-full p-3 border border-white rounded-lg bg-black text-white focus:ring-2 focus:ring-white"
            >
              <option value="">Select a job type</option>
              {jobTypes.map(job => (
                <option key={job} value={job}>{job}</option>
              ))}
            </select>
            {renderError('jobType')}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-white rounded-lg bg-black text-white focus:ring-2 focus:ring-white"
                />
                {renderError('name')}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-white rounded-lg bg-black text-white focus:ring-2 focus:ring-white"
                />
                {renderError('phone')}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email (Optional)"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-white rounded-lg bg-black text-white focus:ring-2 focus:ring-white"
                />
                {renderError('email')}
              </div>
              <div>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-white rounded-lg bg-black text-white focus:ring-2 focus:ring-white"
                />
                {renderError('age')}
              </div>
              <div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-white rounded-lg bg-black text-white focus:ring-2 focus:ring-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {renderError('gender')}
              </div>
              <div className="md:col-span-2">
                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-white rounded-lg bg-black text-white focus:ring-2 focus:ring-white"
                  rows={3}
                />
                {renderError('address')}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Skills & Experience</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {skillsList.map(skill => (
                  <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillsChange(skill)}
                      className="w-4 h-4 border-white bg-black"
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
              {renderError('skills')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="number"
                  name="experience"
                  placeholder="Years of Experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-white rounded-lg bg-black text-white focus:ring-2 focus:ring-white"
                />
                {renderError('experience')}
              </div>
              <div>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-white rounded-lg bg-black text-white focus:ring-2 focus:ring-white"
                >
                  <option value="">Select Availability</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                </select>
                {renderError('availability')}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Upload Documents</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-white rounded-lg p-6">
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4" />
                  <p className="mb-2">Upload ID Proof</p>
                  <p className="text-sm mb-4">(Aadhaar, PAN, etc.)</p>
                  <input
                    ref={fileInputRefs.idProof}
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange('idProof', e.target.files?.[0] || null)}
                  />
                  <button
                    onClick={() => handleFileButtonClick(fileInputRefs.idProof)}
                    className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition-colors"
                  >
                    Select File
                  </button>
                </div>
                {formData.documents.idProof && (
                  <div className="mt-4 text-center">
                    <p className="text-sm">Selected: {formData.documents.idProof.file.name}</p>
                    {formData.documents.idProof.preview && (
                      <img
                        src={formData.documents.idProof.preview}
                        alt="ID Preview"
                        className="mt-2 max-h-32 mx-auto"
                      />
                    )}
                  </div>
                )}
                {renderError('idProof')}
              </div>

              <div className="border-2 border-dashed border-white rounded-lg p-6">
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4" />
                  <p className="mb-2">Upload Certifications</p>
                  <p className="text-sm mb-4">(Optional)</p>
                  <input
                    ref={fileInputRefs.certifications}
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    multiple
                    onChange={(e) => handleFileChange('certifications', e.target.files?.[0] || null)}
                  />
                  <button
                    onClick={() => handleFileButtonClick(fileInputRefs.certifications)}
                    className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition-colors"
                  >
                    Select Files
                  </button>
                </div>
                {formData.documents.certifications && (
                  <div className="mt-4 text-center">
                    <p className="text-sm">Selected: {formData.documents.certifications.file.name}</p>
                  </div>
                )}
                {renderError('certifications')}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Work Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="number"
                  name="expectedSalary"
                  placeholder="Expected Daily Wage (₹)"
                  value={formData.expectedSalary}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-white rounded-lg bg-black text-white focus:ring-2 focus:ring-white"
                />
                {renderError('expectedSalary')}
              </div>
              <div>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-white rounded-lg bg-black text-white focus:ring-2 focus:ring-white"
                >
                  <option value="">Select Preferred Location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                {renderError('location')}
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="willRelocate"
                    checked={formData.willRelocate}
                    onChange={handleInputChange}
                    className="w-4 h-4 border-white bg-black"
                  />
                  <span>Willing to relocate if required</span>
                </label>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Review Your Application</h2>
            <div className="space-y-4">
              <div className="border border-white rounded-lg p-4">
                <h3 className="font-bold mb-2">Job Details</h3>
                <p>Position: {formData.jobType}</p>
                <p>Experience: {formData.experience} years</p>
                <p>Availability: {formData.availability}</p>
              </div>
              <div className="border border-white rounded-lg p-4">
                <h3 className="font-bold mb-2">Personal Information</h3>
                <p>Name: {formData.name}</p>
                <p>Phone: {formData.phone}</p>
                <p>Email: {formData.email || 'Not provided'}</p>
                <p>Age: {formData.age}</p>
                <p>Gender: {formData.gender}</p>
                <p>Address: {formData.address}</p>
              </div>
              <div className="border border-white rounded-lg p-4">
                <h3 className="font-bold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 border border-white rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border border-white rounded-lg p-4">
                <h3 className="font-bold mb-2">Documents</h3>
                <p>ID Proof: {formData.documents.idProof?.file.name || 'Not uploaded'}</p>
                <p>Certifications: {formData.documents.certifications?.file.name || 'Not uploaded'}</p>
              </div>
              <div className="border border-white rounded-lg p-4">
                <h3 className="font-bold mb-2">Preferences</h3>
                <p>Expected Daily Wage: ₹{formData.expectedSalary}</p>
                <p>Preferred Location: {formData.location}</p>
                <p>Willing to Relocate: {formData.willRelocate ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="w-4 h-4 border-white bg-black"
                  />
                  <span>I agree to the terms and conditions</span>
                </label>
                {renderError('terms')}
              </div>
            </div>
          </div>
        );
      default:
        return <div>Step {currentStep}</div>;
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Application Submitted Successfully!</h2>
          <p>Thank you for applying. We will contact you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Job Application Process</h1>
            <p className="text-white">Complete all steps to submit your application</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 
                      ${currentStep >= step.id 
                        ? 'border-white bg-white text-black' 
                        : 'border-white text-white'}`}
                  >
                    {step.icon}
                  </div>
                  <span className={`mt-2 text-sm ${currentStep >= step.id ? 'text-white' : 'text-white'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-4">
              <div className="absolute top-0 h-1 bg-white/20 w-full"></div>
              <div 
                className="absolute top-0 h-1 bg-white transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="border border-white rounded-xl p-8 mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg transition-all
                ${currentStep === 1 
                  ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-white/90'}`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
            <button
              onClick={currentStep === steps.length ? handleSubmit : nextStep}
              disabled={isSubmitting}
              className={`flex items-center px-6 py-3 rounded-lg transition-all
                ${isSubmitting
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-white/90'}`}
            >
              {currentStep === steps.length ? (
                isSubmitting ? 'Submitting...' : 'Submit'
              ) : (
                <>
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>

          {errors.submit && (
            <div className="mt-4 p-4 border border-white rounded-lg text-center">
              {errors.submit}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;