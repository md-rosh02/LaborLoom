import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, DollarSign, Star, Filter, ChevronDown, Mail, X, Heart, ArrowUpDown } from 'lucide-react';

// Mock data for demonstration
const jobCategories = ['All', 'Construction', 'Electrical', 'Plumbing', 'Painting', 'Carpentry'];

const jobs = [
  // ... your jobs array stays the same
  { id: 1, title: 'Masonry Expert Needed', category: 'Masonry', location: 'Bronx, NY', type: 'Full-time', salary: '$28-38/hour', description: 'Hiring experienced masonry worker for bricklaying and stonework...', postedDate: '2024-03-08', rating: 4.6, reviews: 22, experience: '4+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 2, title: 'General Construction Worker', category: 'Construction', location: 'Newark, NJ', type: 'Full-time', salary: '$20-30/hour', description: 'Looking for general construction workers with site experience...', postedDate: '2024-03-09', rating: 4.5, reviews: 15, experience: '1+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 3, title: 'Roofing Contractor', category: 'Roofing', location: 'Philadelphia, PA', type: 'Contract', salary: '$35-50/hour', description: 'Seeking experienced roofing contractors for residential projects...', postedDate: '2024-03-07', rating: 4.8, reviews: 30, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 4, title: 'Industrial Welder', category: 'Welding', location: 'Boston, MA', type: 'Full-time', salary: '$40-55/hour', description: 'Experienced welder needed for industrial metal fabrication...', postedDate: '2024-03-05', rating: 4.9, reviews: 40, experience: '5+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 5, title: 'Certified HVAC Technician', category: 'HVAC', location: 'Chicago, IL', type: 'Full-time', salary: '$30-45/hour', description: 'Hiring certified HVAC technician for heating and cooling maintenance...', postedDate: '2024-03-06', rating: 4.7, reviews: 28, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 6, title: 'Experienced Painter', category: 'Painting', location: 'Los Angeles, CA', type: 'Part-time', salary: '$22-35/hour', description: 'Looking for professional painters for residential and commercial jobs...', postedDate: '2024-03-04', rating: 4.5, reviews: 18, experience: '2+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 7, title: 'Concrete Worker', category: 'Concrete', location: 'San Francisco, CA', type: 'Contract', salary: '$28-40/hour', description: 'Seeking concrete workers for foundation and pavement projects...', postedDate: '2024-03-03', rating: 4.6, reviews: 20, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 8, title: 'Masonry Expert Needed', category: 'Masonry', location: 'Bronx, NY', type: 'Full-time', salary: '$28-38/hour', description: 'Hiring experienced masonry worker for bricklaying and stonework...', postedDate: '2024-03-08', rating: 4.6, reviews: 22, experience: '4+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 9, title: 'General Construction Worker', category: 'Construction', location: 'Newark, NJ', type: 'Full-time', salary: '$20-30/hour', description: 'Looking for general construction workers with site experience...', postedDate: '2024-03-09', rating: 4.5, reviews: 15, experience: '1+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 10, title: 'Roofing Contractor', category: 'Roofing', location: 'Philadelphia, PA', type: 'Contract', salary: '$35-50/hour', description: 'Seeking experienced roofing contractors for residential projects...', postedDate: '2024-03-07', rating: 4.8, reviews: 30, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 11, title: 'Industrial Welder', category: 'Welding', location: 'Boston, MA', type: 'Full-time', salary: '$40-55/hour', description: 'Experienced welder needed for industrial metal fabrication...', postedDate: '2024-03-05', rating: 4.9, reviews: 40, experience: '5+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 12, title: 'Certified HVAC Technician', category: 'HVAC', location: 'Chicago, IL', type: 'Full-time', salary: '$30-45/hour', description: 'Hiring certified HVAC technician for heating and cooling maintenance...', postedDate: '2024-03-06', rating: 4.7, reviews: 28, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 13, title: 'Experienced Painter', category: 'Painting', location: 'Los Angeles, CA', type: 'Part-time', salary: '$22-35/hour', description: 'Looking for professional painters for residential and commercial jobs...', postedDate: '2024-03-04', rating: 4.5, reviews: 18, experience: '2+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 14, title: 'Concrete Worker', category: 'Concrete', location: 'San Francisco, CA', type: 'Contract', salary: '$28-40/hour', description: 'Seeking concrete workers for foundation and pavement projects...', postedDate: '2024-03-03', rating: 4.6, reviews: 20, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' }, 
  { id: 15, title: 'General Construction Worker', category: 'Construction', location: 'Newark, NJ', type: 'Full-time', salary: '$20-30/hour', description: 'Looking for general construction workers with site experience...', postedDate: '2024-03-09', rating: 4.5, reviews: 15, experience: '1+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 16, title: 'Roofing Contractor', category: 'Roofing', location: 'Philadelphia, PA', type: 'Contract', salary: '$35-50/hour', description: 'Seeking experienced roofing contractors for residential projects...', postedDate: '2024-03-07', rating: 4.8, reviews: 30, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 17, title: 'Industrial Welder', category: 'Welding', location: 'Boston, MA', type: 'Full-time', salary: '$40-55/hour', description: 'Experienced welder needed for industrial metal fabrication...', postedDate: '2024-03-05', rating: 4.9, reviews: 40, experience: '5+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 18, title: 'Certified HVAC Technician', category: 'HVAC', location: 'Chicago, IL', type: 'Full-time', salary: '$30-45/hour', description: 'Hiring certified HVAC technician for heating and cooling maintenance...', postedDate: '2024-03-06', rating: 4.7, reviews: 28, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 19, title: 'Experienced Painter', category: 'Painting', location: 'Los Angeles, CA', type: 'Part-time', salary: '$22-35/hour', description: 'Looking for professional painters for residential and commercial jobs...', postedDate: '2024-03-04', rating: 4.5, reviews: 18, experience: '2+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 20, title: 'Concrete Worker', category: 'Concrete', location: 'San Francisco, CA', type: 'Contract', salary: '$28-40/hour', description: 'Seeking concrete workers for foundation and pavement projects...', postedDate: '2024-03-03', rating: 4.6, reviews: 20, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },  
  { id: 21, title: 'General Construction Worker', category: 'Construction', location: 'Newark, NJ', type: 'Full-time', salary: '$20-30/hour', description: 'Looking for general construction workers with site experience...', postedDate: '2024-03-09', rating: 4.5, reviews: 15, experience: '1+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 22, title: 'Roofing Contractor', category: 'Roofing', location: 'Philadelphia, PA', type: 'Contract', salary: '$35-50/hour', description: 'Seeking experienced roofing contractors for residential projects...', postedDate: '2024-03-07', rating: 4.8, reviews: 30, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 23, title: 'Industrial Welder', category: 'Welding', location: 'Boston, MA', type: 'Full-time', salary: '$40-55/hour', description: 'Experienced welder needed for industrial metal fabrication...', postedDate: '2024-03-05', rating: 4.9, reviews: 40, experience: '5+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 24, title: 'Certified HVAC Technician', category: 'HVAC', location: 'Chicago, IL', type: 'Full-time', salary: '$30-45/hour', description: 'Hiring certified HVAC technician for heating and cooling maintenance...', postedDate: '2024-03-06', rating: 4.7, reviews: 28, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 25, title: 'Experienced Painter', category: 'Painting', location: 'Los Angeles, CA', type: 'Part-time', salary: '$22-35/hour', description: 'Looking for professional painters for residential and commercial jobs...', postedDate: '2024-03-04', rating: 4.5, reviews: 18, experience: '2+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 26, title: 'Concrete Worker', category: 'Concrete', location: 'San Francisco, CA', type: 'Contract', salary: '$28-40/hour', description: 'Seeking concrete workers for foundation and pavement projects...', postedDate: '2024-03-03', rating: 4.6, reviews: 20, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' }, 
  { id: 27, title: 'General Construction Worker', category: 'Construction', location: 'Newark, NJ', type: 'Full-time', salary: '$20-30/hour', description: 'Looking for general construction workers with site experience...', postedDate: '2024-03-09', rating: 4.5, reviews: 15, experience: '1+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 28, title: 'Roofing Contractor', category: 'Roofing', location: 'Philadelphia, PA', type: 'Contract', salary: '$35-50/hour', description: 'Seeking experienced roofing contractors for residential projects...', postedDate: '2024-03-07', rating: 4.8, reviews: 30, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 29, title: 'Industrial Welder', category: 'Welding', location: 'Boston, MA', type: 'Full-time', salary: '$40-55/hour', description: 'Experienced welder needed for industrial metal fabrication...', postedDate: '2024-03-05', rating: 4.9, reviews: 40, experience: '5+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 30, title: 'Certified HVAC Technician', category: 'HVAC', location: 'Chicago, IL', type: 'Full-time', salary: '$30-45/hour', description: 'Hiring certified HVAC technician for heating and cooling maintenance...', postedDate: '2024-03-06', rating: 4.7, reviews: 28, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 31, title: 'Experienced Painter', category: 'Painting', location: 'Los Angeles, CA', type: 'Part-time', salary: '$22-35/hour', description: 'Looking for professional painters for residential and commercial jobs...', postedDate: '2024-03-04', rating: 4.5, reviews: 18, experience: '2+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 32, title: 'Concrete Worker', category: 'Concrete', location: 'San Francisco, CA', type: 'Contract', salary: '$28-40/hour', description: 'Seeking concrete workers for foundation and pavement projects...', postedDate: '2024-03-03', rating: 4.6, reviews: 20, experience: '3+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 33, title: 'Masonry Expert Needed', category: 'Masonry', location: 'Bronx, NY', type: 'Full-time', salary: '$28-38/hour', description: 'Hiring experienced masonry worker for bricklaying and stonework...', postedDate: '2024-03-08', rating: 4.6, reviews: 22, experience: '4+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 34, title: 'Masonry Expert Needed', category: 'Masonry', location: 'Bronx, NY', type: 'Full-time', salary: '$28-38/hour', description: 'Hiring experienced masonry worker for bricklaying and stonework...', postedDate: '2024-03-08', rating: 4.6, reviews: 22, experience: '4+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
  { id: 35, title: 'Masonry Expert Needed', category: 'Masonry', location: 'Bronx, NY', type: 'Full-time', salary: '$28-38/hour', description: 'Hiring experienced masonry worker for bricklaying and stonework...', postedDate: '2024-03-08', rating: 4.6, reviews: 22, experience: '4+ years', image: 'https://www.42gears.com/wp-content/uploads/2020/01/4-benefits-of-frontline-worker-technologies-Banner-01.png' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState(20);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [contactModalOpen, setContactModalOpen] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    experience: 'all',
    salary: 'all'
  });
  const [favorites, setFavorites] = useState(new Set()); // Track favorite jobs
  const [sortBy, setSortBy] = useState('date'); // Sorting by date, salary, or rating

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset visible jobs when filters change
  useEffect(() => {
    setVisibleJobs(20);
  }, [debouncedSearchTerm, selectedCategory, filters, sortBy]);

  // Filter and sort jobs
  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      
      const matchesType = filters.type === 'all' || job.type.toLowerCase() === filters.type;
      const matchesExperience = filters.experience === 'all' || 
                               (filters.experience === 'entry' && job.experience.includes('2')) ||
                               (filters.experience === 'mid' && job.experience.includes('3')) ||
                               (filters.experience === 'senior' && job.experience.includes('5'));
      
      return matchesSearch && matchesCategory && matchesType && matchesExperience;
    })
    .sort((a, b) => {
      if (sortBy === 'salary') {
        return parseFloat(b.salary.replace(/[^0-9.]/g, '')) - parseFloat(a.salary.replace(/[^0-9.]/g, ''));
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else {
        return new Date(b.postedDate) - new Date(a.postedDate);
      }
    });

  const displayedJobs = filteredJobs.slice(0, visibleJobs);
  const hasMoreJobs = filteredJobs.length > visibleJobs;

  const loadMore = () => {
    setVisibleJobs(prev => prev + 20);
  };

  const handleApply = (jobId) => {
    window.open(`/apply/${jobId}`, '_blank');
  };

  const handleContact = (jobId) => {
    setContactModalOpen(jobId);
  };
  
  const [value, setValue] = React.useState("");

  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log('submitted')
  }

const closeContactModal = () => {
    setMessageSent(true);
    setContactModalOpen(null);
    
    // Reset the messageSent status after 3 seconds
    setTimeout(() => setMessageSent(false), 3000);
};


  const toggleFavorite = (jobId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(jobId)) {
        newFavorites.delete(jobId);
      } else {
        newFavorites.add(jobId);
      }
      return newFavorites;
    });
  };

  // Click outside to close modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilters) {
        const filterMenu = document.getElementById('filter-menu');
        if (filterMenu && !filterMenu.contains(event.target)) {
          setShowFilters(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilters]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Fixed Header */}
      <div className="fixed top-15 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[2000px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by keyword..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 
                  placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {jobCategories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {showFilters && (
                <div id="filter-menu" className="absolute right-0 mt-2 w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-xl">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Job Type</label>
                      <select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-900"
                      >
                        <option value="all">All Types</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Experience Level</label>
                      <select
                        value={filters.experience}
                        onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                        className="w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-900"
                      >
                        <option value="all">All Levels</option>
                        <option value="entry">Entry Level</option>
                        <option value="mid">Mid Level</option>
                        <option value="senior">Senior Level</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-900"
                      >
                        <option value="date">Date Posted</option>
                        <option value="salary">Salary</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-44 px-16 pb-20 max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayedJobs.map((job) => (
            <div 
              key={job.id}
              className="group flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all h-[440px]"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/80 rounded-full px-2 py-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-700">{job.rating}</span>
                </div>
                <button
                  onClick={() => toggleFavorite(job.id)}
                  className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart className={`h-4 w-4 ${favorites.has(job.id) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-4 justify-between">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold line-clamp-1">{job.title}</h2>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-sm rounded">{job.category}</span>
                    <span className="px-2 py-1 bg-gray-100 text-sm rounded">{job.type}</span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 shrink-0" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-200 items-center justify-center">
                  <div className='flex items-center justify-center w-70'>
                    <button 
                      onClick={() => handleContact(job.id)}
                      className="px-8 py-2.5 bg-blue-500 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 "
                    >
                      <Mail className="h-4 w-4" />
                      <span>Contact</span>
                    </button>
                  
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMoreJobs && (
          <div className="mt-12 text-center">
            <button 
              onClick={loadMore}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Load More Jobs
            </button>
          </div>
        )}
      </main>

      {/* Contact Modal */}
      {contactModalOpen !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Contact Employer</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Your Message</label>
                <textarea 
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 resize-none"
                  rows={4}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Write your message here..."
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeContactModal}
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button type="submit"
                  onClick={closeContactModal}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Send Message
                </button>
              </div>
              {messageSent && (
                  <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md">
                    Message sent successfully!
                  </div>
                )}

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;