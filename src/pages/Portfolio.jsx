import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getPortfolioSchema, getWebPageSchema } from '../utils/structuredData';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import FilterAltOffSharpIcon from '@mui/icons-material/FilterAltOffSharp';

import { 
  loadProjects, 
  filterProjects, 
  getAllTechnologies, 
  getAllIndustries, 
  getAllProjectTypes, 
  getAllCategories 
} from '../utils/projectUtils';
import { Alert } from '@mui/material';

export default function Portfolio() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // State management for filters and projects
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    technologies: [],
    industries: [],
    projectTypes: [],
    categories: [],
    complexity: []
  });

  // State for available filter options
  const [filterOptions, setFilterOptions] = useState({
    technologies: [],
    industries: [],
    projectTypes: [],
    categories: [],
    complexity: ['Simple', 'Medium', 'Complex']
  });

  // Load projects and initialize filter options on component mount
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResult = loadProjects();

    if (loadResult.success) {
      const projects = loadResult.data.projects;
      setAllProjects(projects);
      setFilteredProjects(projects);
  
      // --- Extract all available filter options ---
      const techResult = getAllTechnologies(projects);
      const industryResult = getAllIndustries(projects);
      const typeResult = getAllProjectTypes(projects);
      const categoryResult = getAllCategories(projects);
  
      setFilterOptions(prev => ({
        ...prev,
        technologies: techResult.success ? techResult.data : [],
        industries: industryResult.success ? industryResult.data : [],
        projectTypes: typeResult.success ? typeResult.data : [],
        categories: categoryResult.success ? categoryResult.data : []
      }));
    } else {
      console.error("Failed to load project data:", loadResult.error);
      setError("Failed to load project data. Please try again later.");
    }
  }, []);

  // Apply filters whenever activeFilters change
  useEffect(() => {
    const hasActiveFilters = Object.values(activeFilters).some(
      (filter) => Array.isArray(filter) && filter.length > 0
    );

    if (!hasActiveFilters) {
      setFilteredProjects(allProjects);
    } else {
      const result = filterProjects(allProjects, activeFilters);
      setFilteredProjects(result.success ? result.data : []);
    }
  }, [activeFilters, allProjects]);

  const toggleAccordion = () => {
    setIsFilterOpen(prevIsOpen => !prevIsOpen);
  };

  // Toggle filter selection
  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const currentFilters = prev[category];
      const isSelected = currentFilters.includes(value);
      
      return {
        ...prev,
        [category]: isSelected 
          ? currentFilters.filter(item => item !== value)
          : [...currentFilters, value]
      };
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      technologies: [],
      industries: [],
      projectTypes: [],
      categories: [],
      complexity: []
    });
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(activeFilters).some(filterArray => filterArray.length > 0);

  // Render filter chips for a category
  const renderFilterChips = (category, options, label) => (
    <div className="filter-group">
      <label className="filter-label">{label}</label>
      <div className="filter-chips">
        {options.map(option => (
          <button
            key={option}
            className={`chip ${activeFilters[category].includes(option) ? 'chip-selected' : ''}`}
            onClick={() => toggleFilter(category, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  // Render project card
  const renderProjectCard = (project) => (
    <div key={project.id} className="card fade-in">
      <img
        alt={project.title}
        className="w-full h-64 object-cover"
        src={project.image || '/api/placeholder/400/300'}
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-slate-400 mb-4 h-[50px] overflow-hidden">
          {project.description}
        </p>
        
        {/* Technology tags */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-tag-list">
            {project.technologies.slice(0, 3).map(tech => (
              <span key={tech} className="project-tag">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="project-tag">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <Link
          to={`/portfolio/${project.slug}`}
          className="text-teal-400 font-semibold hover:text-teal-300 transition-colors pt-3 inline-block mt-4"
        >
          View Case Study →
        </Link>
      </div>
    </div>
  );

  // Create structured data for portfolio
  const portfolioProjects = filteredProjects.map(project => ({
    title: project.title,
    description: project.description,
    image: project.image,
    url: `https://proximacloud.com/portfolio/${project.slug}`
  }));

  const pageSchema = getWebPageSchema(
    "Our Portfolio - Showcase of Projects",
    "Explore our comprehensive collection of projects across various industries and technologies including cloud solutions and web development.",
    "https://proximacloud.com/portfolio"
  );

  const portfolioStructuredData = getPortfolioSchema(portfolioProjects);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [pageSchema, portfolioStructuredData]
  };

  return (
    <>
      <SEO 
        title="Our Portfolio - Showcase of Projects"
        description="Explore our comprehensive collection of projects across various industries and technologies including cloud solutions and web development."
        keywords="portfolio, case studies, web development projects, cloud migration projects, mobile apps, technology solutions"
        structuredData={combinedSchema}
      />
    <section className="py-20">
      <div className="container mx-auto px-4">
        {error && (
          <div className="px-5 mb-6">
            <Alert severity="error">{error}</Alert>
          </div>
        )}
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tighter">
            <span className="gradient-text">&nbsp;Our Portfolio&nbsp;</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Explore our comprehensive collection of projects across various industries and technologies. 
            Use the filters below to find projects that match your interests.
          </p>
        </div>

        {/* Filter Section */}
        <div className="px-5 py-10 bg-slate-800 rounded-3xl mx-5 my-5 glass-effect relative">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-200">Filter Projects</h2>
            <div className="">
              <button
                className="secondary-btn mr-1"
                onClick={toggleAccordion}
                tooltip="Toggle Filters"
              >
                <FilterAltSharpIcon />
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="secondary-btn"
                >
                  <FilterAltOffSharpIcon />
                </button>
              )}
            </div>
          </div>
          {isFilterOpen && (
            <div className={`mt-6 filter-content ${isFilterOpen ? 'open' : ''}`}>
              {/* Filter Groups */}
              {renderFilterChips('technologies', filterOptions.technologies, 'Technologies')}
              {renderFilterChips('industries', filterOptions.industries, 'Industries')}
              {renderFilterChips('projectTypes', filterOptions.projectTypes, 'Project Types')}
              {renderFilterChips('categories', filterOptions.categories, 'Categories')}
              {renderFilterChips('complexity', filterOptions.complexity, 'Complexity')}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="results-count px-5">
          Showing {filteredProjects.length} of {allProjects.length} projects
          {hasActiveFilters && (
            <span className="text-teal-400 ml-2">
              (filtered)
            </span>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="px-5 grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {filteredProjects.map(renderProjectCard)}
          </div>
        ) : (
          <div className="px-5 empty-state">
            <h3>No projects found</h3>
            <p>Try adjusting your filters to see more results.</p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="btn-primary mt-4"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
    </>
  );
}
