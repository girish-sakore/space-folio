import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      Alert.error("Failed to load project data. Please try again later.");
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
          to={`/portfolio/${project.id}`}
          className="text-teal-400 font-semibold hover:text-teal-300 transition-colors pt-3 inline-block mt-4"
        >
          View Case Study →
        </Link>
      </div>
    </div>
  );

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="gradient-text text-5xl font-bold mb-4">
            Our Portfolio
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Explore our comprehensive collection of projects across various industries and technologies. 
            Use the filters below to find projects that match your interests.
          </p>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-200">Filter Projects</h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="clear-filters-btn"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Filter Groups */}
          {renderFilterChips('technologies', filterOptions.technologies, 'Technologies')}
          {renderFilterChips('industries', filterOptions.industries, 'Industries')}
          {renderFilterChips('projectTypes', filterOptions.projectTypes, 'Project Types')}
          {renderFilterChips('categories', filterOptions.categories, 'Categories')}
          {renderFilterChips('complexity', filterOptions.complexity, 'Complexity')}
        </div>

        {/* Results Count */}
        <div className="results-count">
          Showing {filteredProjects.length} of {allProjects.length} projects
          {hasActiveFilters && (
            <span className="text-teal-400 ml-2">
              (filtered)
            </span>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {filteredProjects.map(renderProjectCard)}
          </div>
        ) : (
          <div className="empty-state">
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
  );
}