import React, { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign, Star, Filter, ChevronDown, MessageSquare, X } from 'lucide-react';

// Mock data for demonstration
const jobCategories = ['All', 'Construction', 'Electrical', 'Plumbing', 'Painting', 'Carpentry'];

const jobs = [
  {
    id: 1,
    title: 'Experienced Carpenter Needed',
    category: 'Carpentry',
    location: 'Brooklyn, NY',
    type: 'Full-time',
    salary: '$25-35/hour',
    description: 'Looking for an experienced carpenter for custom furniture assembly...',
    postedDate: '2024-03-10',
    rating: 4.8,
    reviews: 24,
    experience: '3+ years',
    image: 'https://images.unsplash.com/photo-1601564921647-b446839a013f?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 2,
    title: 'Licensed Electrician for Commercial Project',
    category: 'Electrical',
    location: 'Manhattan, NY',
    type: 'Contract',
    salary: '$45-55/hour',
    description: 'Seeking licensed electrician for major commercial building rewiring project...',
    postedDate: '2024-03-12',
    rating: 4.9,
    reviews: 36,
    experience: '5+ years',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 3,
    title: 'Residential Plumber Needed',
    category: 'Plumbing',
    location: 'Queens, NY',
    type: 'Part-time',
    salary: '$30-40/hour',
    description: 'Immediate opening for experienced plumber for residential repairs...',
    postedDate: '2024-03-11',
    rating: 4.7,
    reviews: 18,
    experience: '2+ years',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=200'
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    experience: 'all',
    salary: 'all'
  });

  // Filter jobs based on search term, category, and other filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    
    const matchesType = filters.type === 'all' || job.type.toLowerCase() === filters.type;
    const matchesExperience = filters.experience === 'all' || 
                             (filters.experience === 'entry' && job.experience.includes('2')) ||
                             (filters.experience === 'mid' && job.experience.includes('3')) ||
                             (filters.experience === 'senior' && job.experience.includes('5'));
    
    return matchesSearch && matchesCategory && matchesType && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Fixed Header and Search Section */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-black border-b border-zinc-800">
        {/* Header */}
        

        {/* Search and Filters */}
        <div className="max-w-7xl mx-auto px-4 py-6 bg-black/80 backdrop-blur-sm">
  <div className="flex items-center justify-between space-x-4 animate-slide-down">
    {/* Search Bar */}
    <div className="relative group flex-grow">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5 transition-colors group-hover:text-white" />
      <input
        type="text"
        placeholder="Search jobs by keyword..."
        className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-950 border-2 border-zinc-800 text-white placeholder-zinc-500 
          focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300
          hover:border-zinc-700"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>

    {/* Filter Pills and Advanced Filters */}
    <div className="flex gap-4 items-center">
      {/* Job Categories */}
      <div className="flex gap-3 overflow-x-auto">
        {jobCategories.map((category) => (
          <button
            key={category}
            className={`px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-95 ${
              selectedCategory === category
                ? 'bg-white text-black shadow-lg shadow-white/20'
                : 'bg-zinc-950 text-white border-2 border-zinc-800 hover:border-white'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filter Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-6 py-3 bg-zinc-950 border-2 border-zinc-800 rounded-xl text-white 
          hover:border-white transition-all duration-300 transform hover:scale-105"
      >
        <Filter className="h-4 w-4" />
        Filters
        <ChevronDown className={`h-4 w-4 transform transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
      </button>
    </div>
  </div>

  {/* Filters Dropdown */}
  {showFilters && (
    <div className="absolute mt-2 p-6 bg-zinc-950 border-2 border-zinc-800 rounded-xl shadow-xl w-80 z-10 animate-scale-in right-0">
      <div className="space-y-6">
        {/* Job Type Filter */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Job Type</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full bg-black border-2 border-zinc-800 rounded-xl px-4 py-3 text-white 
              focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        {/* Experience Level Filter */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Experience Level</label>
          <select
            value={filters.experience}
            onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
            className="w-full bg-black border-2 border-zinc-800 rounded-xl px-4 py-3 text-white 
              focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
          >
            <option value="all">All Levels</option>
            <option value="entry">Entry Level (2+ years)</option>
            <option value="mid">Mid Level (3+ years)</option>
            <option value="senior">Senior Level (5+ years)</option>
          </select>
        </div>

        {/* Salary Range Filter */}
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Salary Range</label>
          <select
            value={filters.salary}
            onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
            className="w-full bg-black border-2 border-zinc-800 rounded-xl px-4 py-3 text-white 
              focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
          >
            <option value="all">All Ranges</option>
            <option value="0-30">$0-30/hour</option>
            <option value="30-50">$30-50/hour</option>
            <option value="50+">$50+/hour</option>
          </select>
        </div>
      </div>
    </div>
  )}
</div>

      </div>

      {/* Main Content with proper spacing from fixed header */}
      <main className="max-w-7xl mx-auto px-4 pt-55 pb-8">
        {/* Job Listings */}
        <div className="space-y-8">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <p className="text-zinc-400 text-xl">No jobs found matching your criteria</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setFilters({ type: 'all', experience: 'all', salary: 'all' });
                }}
                className="mt-6 px-8 py-3 bg-white text-black rounded-xl hover:bg-zinc-200 
                  transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/20"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <div 
                key={job.id} 
                className="group bg-zinc-950 rounded-xl border-2 border-zinc-800 p-8 
                  hover:border-white transition-all duration-500 transform hover:-translate-y-1
                  animate-slide-up hover:shadow-xl hover:shadow-white/10"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex gap-6">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="w-32 h-32 rounded-xl object-cover transition-transform duration-500 group-hover:scale-105 shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-semibold text-white group-hover:text-gray-200 transition-colors">
                          {job.title}
                        </h2>
                        <div className="flex items-center gap-6 mt-3 text-zinc-400">
                          <span className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(job.postedDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          {job.rating}
                        </span>
                        <span className="text-sm text-zinc-500">({job.reviews} reviews)</span>
                      </div>
                    </div>
                    <p className="mt-4 text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
                      {job.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex gap-3">
                        <span className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm">
                          {job.category}
                        </span>
                        <span className="px-4 py-2 bg-white/5 text-white rounded-xl text-sm">
                          {job.type}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 border-2 border-zinc-800 rounded-xl text-white 
                          hover:border-white transition-all duration-300 transform hover:scale-105">
                          <MessageSquare className="h-4 w-4" />
                          Message
                        </button>
                        <button className="px-6 py-3 bg-white text-black rounded-xl hover:bg-zinc-200 
                          transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/20">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <div className="mt-12 text-center animate-fade-in">
            <button className="px-8 py-4 bg-zinc-950 border-2 border-zinc-800 rounded-xl text-white 
              hover:border-white transition-all duration-300 transform hover:scale-105 animate-glow">
              Load More Jobs
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;