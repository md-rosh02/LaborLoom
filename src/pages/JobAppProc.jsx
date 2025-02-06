import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, UserCircle, Briefcase, GraduationCap, ShieldCheck, Users, CheckCircle, AlertCircle, Plus, Trash2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const steps = [
  { id: 1, title: 'Personal Details', icon: <UserCircle className="w-6 h-6" /> },
  { id: 2, title: 'Employment History', icon: <Briefcase className="w-6 h-6" /> },
  { id: 3, title: 'Education', icon: <GraduationCap className="w-6 h-6" /> },
  { id: 4, title: 'Certifications', icon: <ShieldCheck className="w-6 h-6"/> },
  { id: 5, title: 'References', icon: <Users className="w-6 h-6" /> },
  { id: 6, title: 'Review', icon: <CheckCircle className="w-6 h-6" /> }
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      dob: null
    },
    employment: [{
      company: '',
      position: '',
      startDate: null,
      endDate: null,
      current: false,
      responsibilities: ''
    }],
    education: [{
      institution: '',
      degree: '',
      field: '',
      completionYear: ''
    }],
    certifications: [{
      name: '',
      issuingOrg: '',
      dateIssued: null,
      credentialId: ''
    }],
    references: [{
      name: '',
      relationship: '',
      email: '',
      phone: ''
    }],
    termsAccepted: false
  });

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.personal.firstName) newErrors.firstName = 'Required';
        if (!formData.personal.lastName) newErrors.lastName = 'Required';
        if (!formData.personal.phone) newErrors.phone = 'Required';
        if (!formData.personal.email) newErrors.email = 'Required';
        if (!formData.personal.dob) newErrors.dob = 'Required';
        break;

      case 2:
        formData.employment.forEach((emp, index) => {
          if (!emp.company) newErrors[`employment${index}company`] = 'Required';
          if (!emp.position) newErrors[`employment${index}position`] = 'Required';
          if (!emp.startDate) newErrors[`employment${index}startDate`] = 'Required';
        });
        break;

      case 3:
        formData.education.forEach((edu, index) => {
          if (!edu.institution) newErrors[`education${index}institution`] = 'Required';
          if (!edu.degree) newErrors[`education${index}degree`] = 'Required';
        });
        break;

      case 6:
        if (!formData.termsAccepted) newErrors.terms = 'Please accept terms';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleArrayInputChange = (arrayName, index, field, value) => {
    const updatedArray = formData[arrayName].map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFormData(prev => ({ ...prev, [arrayName]: updatedArray }));
  };

  const addArrayItem = (arrayName, template) => {
    setFormData(prev => ({ ...prev, [arrayName]: [...prev[arrayName], template] }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({ 
      ...prev, 
      [arrayName]: prev[arrayName].filter((_, i) => i !== index) 
    }));
  };

  const renderEmploymentHistory = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Employment History</h2>
      {formData.employment.map((emp, index) => (
        <div key={index} className="border rounded-lg p-4 mb-4 relative">
          <button
            onClick={() => removeArrayItem('employment', index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                value={emp.company}
                onChange={(e) => handleArrayInputChange('employment', index, 'company', e.target.value)}
                className="w-full p-2 border rounded"
              />
              {errors[`employment${index}company`] && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Position</label>
              <input
                value={emp.position}
                onChange={(e) => handleArrayInputChange('employment', index, 'position', e.target.value)}
                className="w-full p-2 border rounded"
              />
              {errors[`employment${index}position`] && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <DatePicker
                selected={emp.startDate}
                onChange={(date) => handleArrayInputChange('employment', index, 'startDate', date)}
                className="w-full p-2 border rounded"
              />
              {errors[`employment${index}startDate`] && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <DatePicker
                selected={emp.endDate}
                onChange={(date) => handleArrayInputChange('employment', index, 'endDate', date)}
                className="w-full p-2 border rounded"
                disabled={emp.current}
              />
              <label className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  checked={emp.current}
                  onChange={(e) => handleArrayInputChange('employment', index, 'current', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Current Employment</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Responsibilities</label>
              <textarea
                value={emp.responsibilities}
                onChange={(e) => handleArrayInputChange('employment', index, 'responsibilities', e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => addArrayItem('employment', {
          company: '',
          position: '',
          startDate: null,
          endDate: null,
          current: false,
          responsibilities: ''
        })}
        className="flex items-center text-blue-600 hover:text-blue-800"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Employment
      </button>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                value={formData.personal.firstName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, firstName: e.target.value }
                }))}
                className="w-full p-2 border rounded"
              />
              {errors.firstName && <span className="text-red-500 text-sm">Required</span>}
            </div>
            {/* Add other personal details fields */}
          </div>
        </div>
      );
      case 2: return renderEmploymentHistory();
      // Add cases for other steps
      default: return <div>Step {currentStep}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {step.icon}
                </div>
                <span className="mt-2 text-sm text-gray-600">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-4">
          <button
            onClick={() => setCurrentStep(p => p - 1)}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-lg disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => currentStep === steps.length ? handleSubmit() : setCurrentStep(p => p + 1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {currentStep === steps.length ? 'Submit Application' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

