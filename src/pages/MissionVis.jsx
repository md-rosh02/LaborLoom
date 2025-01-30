import React from 'react';
import { Target, Users } from 'lucide-react';

const MissionVis = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16 pt-26">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Mission & Vision
          </h1>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="bg-black p-8 rounded-2xl border border-white hover:bg-white hover:text-black transition-all duration-300 group">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-white rounded-full mr-4 group-hover:bg-black">
                <Target className="h-8 w-8 text-black group-hover:text-white" />
              </div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="leading-relaxed text-lg">
              To revolutionize the labor hiring process by creating a transparent, efficient, and fair platform that connects skilled laborers with meaningful work opportunities while ensuring quality, reliability, and fair compensation for all parties involved.
            </p>
          </div>

          <div className="bg-black p-8 rounded-2xl border border-white hover:bg-white hover:text-black transition-all duration-300 group">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-white rounded-full mr-4 group-hover:bg-black">
                <Users className="h-8 w-8 text-black group-hover:text-white" />
              </div>
              <h2 className="text-3xl font-bold">Our Vision</h2>
            </div>
            <p className="leading-relaxed text-lg">
              To become the most trusted and comprehensive labor hiring platform, empowering workers to build sustainable careers while helping businesses find the right talent efficiently. We envision a future where quality work meets fair opportunity, creating positive impact in communities worldwide.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-2xl border border-white hover:bg-white hover:text-black transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-center">Transparency</h3>
              <div className="w-12 h-1 bg-white mx-auto mb-4 group-hover:bg-black"></div>
              <p className="text-center">Clear communication and honest dealings in all interactions</p>
            </div>
            <div className="bg-black p-8 rounded-2xl border border-white hover:bg-white hover:text-black transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-center">Quality</h3>
              <div className="w-12 h-1 bg-white mx-auto mb-4 group-hover:bg-black"></div>
              <p className="text-center">Maintaining high standards in service delivery and platform operations</p>
            </div>
            <div className="bg-black p-8 rounded-2xl border border-white hover:bg-white hover:text-black transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-center">Fairness</h3>
              <div className="w-12 h-1 bg-white mx-auto mb-4 group-hover:bg-black"></div>
              <p className="text-center">Equal opportunities and fair compensation for all stakeholders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVis;