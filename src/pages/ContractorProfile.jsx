// ContractorProfile.jsx
import React, { useState } from 'react';

const ContractorProfile = () => {
  const [activeTab, setActiveTab] = useState('postings');
  const [jobs, setJobs] = useState([
    { id: 1, title: 'House Construction', location: 'Brooklyn', applicants: 15 },
    { id: 2, title: 'Office Renovation', location: 'Manhattan', applicants: 8 },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">ABC Construction Co.</h1>
                <p className="text-white">Verified Contractor</p>
              </div>
              <button className="bg-white text-blue-600 px-6 py-2 rounded">
                Post New Job
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b">
            <button
              className={`px-6 py-3 ${activeTab === 'postings' ? 'border-b-2 border-blue-600' : ''}`}
              onClick={() => setActiveTab('postings')}
            >
              Job Postings
            </button>
            <button
              className={`px-6 py-3 ${activeTab === 'company' ? 'border-b-2 border-blue-600' : ''}`}
              onClick={() => setActiveTab('company')}
            >
              Company Info
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'postings' ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p>{job.location}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{job.applicants}</p>
                        <p>Applicants</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>Company Information Form</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorProfile;