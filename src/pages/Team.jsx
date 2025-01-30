import React from 'react';
import { Briefcase, Github, Linkedin, Mail } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      
      name: "Roshan",
      role: "Project Lead & Full Stack Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
      bio: "10+ years of experience in building scalable platforms. Passionate about creating technology that makes a difference in people's lives.",
      linkedin: "#",
      github: "#",
      email: "sarah@projectmestri.com"
    },
    {
      name: "Manoj",
      role: "Project Lead & Full Stack Developer",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
      bio: "Design expert focused on creating intuitive and accessible interfaces. Advocates for user-centered design principles.",
      linkedin: "#",
      github: "#",
      email: "michael@projectmestri.com"
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen py-16 pt-26">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Our Team
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-white max-w-2xl mx-auto text-lg">
            Meet the dedicated professionals behind Project Mestri who are working to revolutionize the labor hiring process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-black rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 border border-white hover:bg-white hover:text-black group"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="md:w-3/5 p-8">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <p className="group-hover:text-black">{member.role}</p>
                  </div>
                  <p className="mb-6 leading-relaxed">{member.bio}</p>
                  <div className="flex space-x-6">
                    <a href={member.linkedin} className="hover:text-black transition-colors duration-300">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={member.github} className="hover:text-black transition-colors duration-300">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href={`mailto:${member.email}`} className="hover:text-black transition-colors duration-300">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;