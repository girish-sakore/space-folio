import React from 'react';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';
import teamMembers from '../data/teamMembers'; // <-- import the external file

const TeamShowcase = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const memberVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div className="py-16" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={memberVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Meet Our <span className="gradient-text">Expert Team</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our team combines technical excellence and design innovation to drive cloud-native success.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {teamMembers.map(member => (
            <motion.div key={member.id} className="card p-6 relative overflow-hidden" variants={memberVariants}>
              <div className="relative z-10">
                {/* Avatar */}
                <div className="relative mb-6 flex justify-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-teal-400"
                  />
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`text-yellow-500 ${i < Math.floor(member.rating) ? '' : 'opacity-30'}`}
                      fontSize="small"
                    />
                  ))}
                  <span className="text-slate-400 text-sm ml-1">{member.rating}</span>
                </div>

                {/* Basic Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-teal-400 mb-3">{member.role}</p>
                  <p className="text-slate-400 text-sm">{member.bio}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                  <div>
                    <div className="text-white font-bold text-lg">{member.experience}</div>
                    <div className="text-slate-400 text-xs">Experience</div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{member.projects}+</div>
                    <div className="text-slate-400 text-xs">Projects</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-6 flex flex-wrap gap-1 justify-center">
                  {member.specialties.map((specialty, idx) => (
                    <span key={idx} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  {member.social.linkedin && (
                    <motion.a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <LinkedInIcon fontSize="small" />
                    </motion.a>
                  )}
                  {member.social.twitter && (
                    <motion.a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-300 transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <TwitterIcon fontSize="small" />
                    </motion.a>
                  )}
                  {member.social.github && (
                    <motion.a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <GitHubIcon fontSize="small" />
                    </motion.a>
                  )}
                  <motion.a
                    href={`mailto:${member.social.email}`}
                    className="text-slate-400 hover:text-teal-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <EmailIcon fontSize="small" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div className="mt-16 bg-slate-800 rounded-3xl p-8 md:p-12" variants={memberVariants}>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <div className="text-4xl font-bold text-teal-400 mb-2">8+</div>
              <div className="text-slate-300">Years Combined Experience</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <div className="text-4xl font-bold text-teal-400 mb-2">50+</div>
              <div className="text-slate-300">Projects Completed</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <div className="text-4xl font-bold text-teal-400 mb-2">4.9</div>
              <div className="text-slate-300">Average Team Rating</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamShowcase;
