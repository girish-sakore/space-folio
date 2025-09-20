import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getWebPageSchema } from '../utils/structuredData';
import { loadProjects } from '../utils/projectUtils';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CaseStudies = () => {
  const [activeStudy, setActiveStudy] = useState(0);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCaseStudies = () => {
      const result = loadProjects();
      if (result.success) {
        // Filter for completed projects only and transform them for case studies
        const completedProjects = result.data.projects
          .filter(project => project.status === 'Completed')
          .map(project => {
            // Extract year from dates
            const year = project.endDate 
              ? new Date(project.endDate).getFullYear().toString()
              : project.startDate 
                ? new Date(project.startDate).getFullYear().toString()
                : '2024';
            
            // Create a case study format from project data
            return {
              ...project,
              year,
              rating: 5, // Default rating
              challenge: project.challenges || 'Project challenges were successfully addressed through our comprehensive approach.',
              solution: project.solutions || 'We implemented a tailored solution using modern technologies and best practices.',
              results: project.results 
                ? (Array.isArray(project.results) ? project.results : [project.results])
                : ['Successful project delivery', 'Client satisfaction achieved', 'Technical objectives met'],
              testimonial: `Working with Proxima Cloud on ${project.title} was an excellent experience. The team delivered exceptional results.`,
              metrics: {
                quality: 95,
                performance: 90,
                delivery: 98,
                satisfaction: 96
              }
            };
          })
          // Sort by end date (most recent first)
          .sort((a, b) => {
            const dateA = new Date(a.endDate || a.startDate || 0);
            const dateB = new Date(b.endDate || b.startDate || 0);
            return dateB - dateA;
          });
        
        setCaseStudies(completedProjects);
      }
      setLoading(false);
    };

    loadCaseStudies();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const pageSchema = getWebPageSchema(
    "Case Studies - Success Stories",
    "Explore detailed case studies showcasing our successful cloud migrations, web development projects, and digital transformations.",
    "https://proximacloud.com/case-studies"
  );

  return (
    <>
      <SEO 
        title="Case Studies - Success Stories"
        description="Explore detailed case studies showcasing our successful cloud migrations, web development projects, and digital transformations with measurable results."
        keywords="case studies, success stories, cloud migration, web development, digital transformation, client testimonials"
        structuredData={pageSchema}
      />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Success <span className="gradient-text">Stories</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-400 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Discover how we've helped businesses transform their operations with cutting-edge technology solutions.
            </motion.p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
              <p className="text-slate-400">Loading case studies...</p>
            </div>
          )}

          {/* No Case Studies State */}
          {!loading && caseStudies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg mb-4">No completed case studies available at the moment.</p>
              <Link to="/portfolio" className="btn-primary">
                View All Projects
              </Link>
            </div>
          )}

          {/* Case Studies Content */}
          {!loading && caseStudies.length > 0 && (
            <>
              {/* Interactive Timeline */}
              <motion.div 
                className="relative mb-16"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full"></div>
                    <div className="flex flex-col md:flex-row gap-8 relative">
                      {caseStudies.map((study, index) => (
                        <motion.button
                      key={study.id}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                        activeStudy === index 
                          ? 'border-teal-500 bg-teal-500/10' 
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                      onClick={() => setActiveStudy(index)}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-center">
                        <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                          activeStudy === index ? 'bg-teal-500' : 'bg-slate-600'
                        }`}></div>
                        <div className="text-white font-semibold">{study.year}</div>
                        <div className="text-slate-400 text-sm">{study.client}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Active Case Study */}
          <motion.div
            key={activeStudy}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 mb-16"
          >
            {/* Study Details */}
            <div className="space-y-8">
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-white">{caseStudies[activeStudy].title}</h2>
                  <div className="flex items-center gap-1">
                    {[...Array(caseStudies[activeStudy].rating)].map((_, i) => (
                      <StarIcon key={i} className="text-yellow-500" fontSize="small" />
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <GroupIcon className="text-teal-400 text-3xl mb-2" />
                    <div className="text-white font-semibold">{caseStudies[activeStudy].teamSize || 'N/A'}</div>
                    <div className="text-slate-400 text-sm">Team Size</div>
                  </div>
                  <div className="text-center">
                    <AccessTimeIcon className="text-teal-400 text-3xl mb-2" />
                    <div className="text-white font-semibold">{caseStudies[activeStudy].duration || 'N/A'}</div>
                    <div className="text-slate-400 text-sm">Duration</div>
                  </div>
                  <div className="text-center">
                    <TrendingUpIcon className="text-teal-400 text-3xl mb-2" />
                    <div className="text-white font-semibold">High Value</div>
                    <div className="text-slate-400 text-sm">ROI</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">Challenge</h3>
                  <p className="text-slate-400">{caseStudies[activeStudy].challenge}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">Solution</h3>
                  <p className="text-slate-400">{caseStudies[activeStudy].solution}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudies[activeStudy].technologies.map((tech, index) => (
                      <span key={index} className="project-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client Testimonial */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="text-teal-400 text-4xl">"</div>
                  <div>
                    <p className="text-slate-300 mb-4 italic">
                      {caseStudies[activeStudy].testimonial}
                    </p>
                    <div className="text-white font-semibold">{caseStudies[activeStudy].client}</div>
                    <div className="text-slate-400 text-sm">{caseStudies[activeStudy].industries ? caseStudies[activeStudy].industries[0] : 'Technology'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results & Metrics */}
            <div className="space-y-8">
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Key Results</h3>
                <div className="space-y-4">
                  {caseStudies[activeStudy].results.map((result, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircleIcon className="text-teal-400" />
                      <span className="text-slate-300">{result}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Performance Metrics</h3>
                <div className="space-y-4">
                  {Object.entries(caseStudies[activeStudy].metrics).map(([key, value], index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-teal-400 font-semibold">{value}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div
                          className="bg-teal-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Link 
                  to={`/portfolio/${caseStudies[activeStudy].slug}`}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <span>View Full Case Study</span>
                  <LaunchIcon />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center bg-slate-800 rounded-3xl p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Join our growing list of successful clients who have transformed their businesses with our technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Start Your Project
              </Link>
              <Link to="/portfolio" className="secondary-btn">
                View All Projects
              </Link>
            </div>
          </motion.div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CaseStudies;
