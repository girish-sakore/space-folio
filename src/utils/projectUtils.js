import projectsData from '../data/projects.json';

// Data Loading Functions

/**
 * Load and return project data from JSON
 * @returns {Object} Object containing projects array and tag categories
 */
export const loadProjects = () => {
  try {
    return {
      projects: projectsData.projects || [],
      tagCategories: projectsData.tagCategories || {}
    };
  } catch (error) {
    console.error('Error loading projects:', error);
    return {
      projects: [],
      tagCategories: {}
    };
  }
};

/**
 * Find a specific project by ID
 * @param {number|string} id - The project ID to search for
 * @returns {Object|null} The project object or null if not found
 */
export const getProjectById = (id) => {
  try {
    const { projects } = loadProjects();
    const project = projects.find(project => project.id === parseInt(id));
    return {
      success: true,
      data: project,
      error: null,
    };
  } catch (error) {
    console.error('Error getting project by ID:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

/**
 * Get a limited number of featured projects
 * @param {number} count - Number of projects to return (default: 3)
 * @returns {Array} Array of featured projects
 */
export const getFeaturedProjects = (count = 3) => {
  try {
    const { projects } = loadProjects();
    // Prioritize completed projects, then sort by end date (most recent first)
    const sortedProjects = projects
      .filter(project => project.status === 'Completed')
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    
      return {
        success: true,
        data: sortedProjects.slice(0, count),
        error: null,
      };
  } catch (error) {
    console.error('Error getting featured projects:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

// Filtering Functions

/**
 * Filter projects by technology tags
 * @param {Array} projects - Array of project objects
 * @param {Array} technologies - Array of technology tags to filter by
 * @returns {Array} Filtered array of projects
 */
export const filterProjectsByTechnology = (projects, technologies) => {
  let filteredProjects;
  if (!Array.isArray(projects) || !Array.isArray(technologies) || technologies.length === 0) {
    filteredProjects = projects;
  } else {
    filteredProjects = projects.filter(project => 
      project.technologies && 
      technologies.some(tech => project.technologies.includes(tech))
    );
  }

  return {
    success: true,
    data: filteredProjects,
    error: null,
  };
};

/**
 * Filter projects by industry tags
 * @param {Array} projects - Array of project objects
 * @param {Array} industries - Array of industry tags to filter by
 * @returns {Array} Filtered array of projects
 */
export const filterProjectsByIndustry = (projects, industries) => {
  let filteredProjects;
  if (!Array.isArray(projects) || !Array.isArray(industries) || industries.length === 0) {
    filteredProjects =  projects;
  }
  
  filteredProjects = projects.filter(project => 
    project.industries && 
    industries.some(industry => project.industries.includes(industry))
  );

  return {
    success: true,
    data: filteredProjects,
    error: null,
  };
};

/**
 * Filter projects by project type tags
 * @param {Array} projects - Array of project objects
 * @param {Array} types - Array of project type tags to filter by
 * @returns {Array} Filtered array of projects
 */
export const filterProjectsByProjectType = (projects, types) => {
  let filteredProjects;
  if (!Array.isArray(projects) || !Array.isArray(types) || types.length === 0) {
    filteredProjects = projects;
  }
  
  filteredProjects = projects.filter(project => 
    project.projectTypes && 
    types.some(type => project.projectTypes.includes(type))
  );
  return {
    success: true,
    data: filteredProjects,
    error: null,
  };
};

/**
 * Filter projects by category tags
 * @param {Array} projects - Array of project objects
 * @param {Array} categories - Array of category tags to filter by
 * @returns {Array} Filtered array of projects
 */
export const filterProjectsByCategory = (projects, categories) => {
  let filteredProjects;
  if (!Array.isArray(projects) || !Array.isArray(categories) || categories.length === 0) {
    filteredProjects = projects;
  }
  
  filteredProjects = projects.filter(project => 
    project.categories && 
    categories.some(category => project.categories.includes(category))
  );
  return {
    success: true,
    data: filteredProjects,
    error: null,
  };
};

/**
 * Filter projects by complexity level
 * @param {Array} projects - Array of project objects
 * @param {string} complexity - Complexity level to filter by
 * @returns {Array} Filtered array of projects
 */
export const filterProjectsByComplexity = (projects, complexity) => {
  let filteredProjects;
  if (!Array.isArray(projects) || !complexity) {
    filteredProjects = projects;
  }
  
  filteredProjects = projects.filter(project => project.complexity === complexity);
  return {
    success: true,
    data: filteredProjects,
    error: null,
  };
};

/**
 * Master filter function that applies multiple filter criteria
 * @param {Array} projects - Array of project objects
 * @param {Object} filters - Object containing filter criteria
 * @param {Array} filters.technologies - Technology tags to filter by
 * @param {Array} filters.industries - Industry tags to filter by
 * @param {Array} filters.projectTypes - Project type tags to filter by
 * @param {Array} filters.categories - Category tags to filter by
 * @param {string} filters.complexity - Complexity level to filter by
 * @param {string} filters.status - Status to filter by
 * @returns {Array} Filtered array of projects
 */
export const filterProjects = (projects, filters = {}) => {
  if (!Array.isArray(projects)) {
    return [];
  }
  
  let filteredProjects = [...projects];
  
  try {
    if (filters.technologies && filters.technologies.length > 0) {
      filteredProjects = filterProjectsByTechnology(filteredProjects, filters.technologies);
    }
    
    if (filters.industries && filters.industries.length > 0) {
      filteredProjects = filterProjectsByIndustry(filteredProjects, filters.industries);
    }
    
    if (filters.projectTypes && filters.projectTypes.length > 0) {
      filteredProjects = filterProjectsByProjectType(filteredProjects, filters.projectTypes);
    }
    
    if (filters.categories && filters.categories.length > 0) {
      filteredProjects = filterProjectsByCategory(filteredProjects, filters.categories);
    }
    
    if (filters.complexity) {
      filteredProjects = filterProjectsByComplexity(filteredProjects, filters.complexity);
    }
    
    if (filters.status) {
      filteredProjects = filteredProjects.filter(project => project.status === filters.status);
    }
    
    return {
      success: true,
      data: filteredProjects,
      error: null,
    };
  } catch (error) {
    console.error('Error filtering projects:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

// Tag Management Functions

/**
 * Extract all unique technology tags from projects
 * @param {Array} projects - Array of project objects
 * @returns {Array} Array of unique technology tags
 */
export const getAllTechnologies = (projects) => {
  if (!Array.isArray(projects)) {
    return [];
  }
  
  const technologies = new Set();
  projects.forEach(project => {
    if (project.technologies && Array.isArray(project.technologies)) {
      project.technologies.forEach(tech => technologies.add(tech));
    }
  });
  
  return Array.from(technologies).sort();
};

/**
 * Extract all unique industry tags from projects
 * @param {Array} projects - Array of project objects
 * @returns {Array} Array of unique industry tags
 */
export const getAllIndustries = (projects) => {
  if (!Array.isArray(projects)) {
    return [];
  }
  
  const industries = new Set();
  projects.forEach(project => {
    if (project.industries && Array.isArray(project.industries)) {
      project.industries.forEach(industry => industries.add(industry));
    }
  });
  
  return Array.from(industries).sort();
};

/**
 * Extract all unique project type tags from projects
 * @param {Array} projects - Array of project objects
 * @returns {Array} Array of unique project type tags
 */
export const getAllProjectTypes = (projects) => {
  if (!Array.isArray(projects)) {
    return [];
  }
  
  const projectTypes = new Set();
  projects.forEach(project => {
    if (project.projectTypes && Array.isArray(project.projectTypes)) {
      project.projectTypes.forEach(type => projectTypes.add(type));
    }
  });
  
  return Array.from(projectTypes).sort();
};

/**
 * Extract all unique category tags from projects
 * @param {Array} projects - Array of project objects
 * @returns {Array} Array of unique category tags
 */
export const getAllCategories = (projects) => {
  if (!Array.isArray(projects)) {
    return [];
  }
  
  const categories = new Set();
  projects.forEach(project => {
    if (project.categories && Array.isArray(project.categories)) {
      project.categories.forEach(category => categories.add(category));
    }
  });
  
  return Array.from(categories).sort();
};

/**
 * Get count of projects for each tag in a category
 * @param {Array} projects - Array of project objects
 * @param {string} tagType - Type of tag ('technologies', 'industries', 'projectTypes', 'categories')
 * @returns {Object} Object with tag names as keys and counts as values
 */
export const getTagCounts = (projects, tagType) => {
  if (!Array.isArray(projects) || !tagType) {
    return {};
  }
  
  const tagCounts = {};
  
  projects.forEach(project => {
    const tags = project[tagType];
    if (tags && Array.isArray(tags)) {
      tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });
  
  return tagCounts;
};

// Search and Sort Functions

/**
 * Search projects by title, description, or tags
 * @param {Array} projects - Array of project objects
 * @param {string} searchTerm - Term to search for
 * @returns {Array} Array of projects matching the search term
 */
export const searchProjects = (projects, searchTerm) => {
  if (!Array.isArray(projects) || !searchTerm || typeof searchTerm !== 'string') {
    return projects;
  }
  
  const term = searchTerm.toLowerCase().trim();
  if (!term) {
    return projects;
  }
  
  return projects.filter(project => {
    // Search in title
    if (project.title && project.title.toLowerCase().includes(term)) {
      return true;
    }
    
    // Search in description
    if (project.description && project.description.toLowerCase().includes(term)) {
      return true;
    }
    
    // Search in client
    if (project.client && project.client.toLowerCase().includes(term)) {
      return true;
    }
    
    // Search in technologies
    if (project.technologies && Array.isArray(project.technologies)) {
      if (project.technologies.some(tech => tech.toLowerCase().includes(term))) {
        return true;
      }
    }
    
    // Search in industries
    if (project.industries && Array.isArray(project.industries)) {
      if (project.industries.some(industry => industry.toLowerCase().includes(term))) {
        return true;
      }
    }
    
    // Search in project types
    if (project.projectTypes && Array.isArray(project.projectTypes)) {
      if (project.projectTypes.some(type => type.toLowerCase().includes(term))) {
        return true;
      }
    }
    
    // Search in categories
    if (project.categories && Array.isArray(project.categories)) {
      if (project.categories.some(category => category.toLowerCase().includes(term))) {
        return true;
      }
    }
    
    return false;
  });
};

/**
 * Sort projects by various criteria
 * @param {Array} projects - Array of project objects
 * @param {string} sortBy - Criteria to sort by ('date', 'title', 'complexity', 'client')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted array of projects
 */
export const sortProjects = (projects, sortBy = 'date', order = 'desc') => {
  if (!Array.isArray(projects)) {
    return [];
  }
  
  const sortedProjects = [...projects];
  
  try {
    sortedProjects.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          const dateA = new Date(a.endDate || a.startDate);
          const dateB = new Date(b.endDate || b.startDate);
          comparison = dateA - dateB;
          break;
          
        case 'title':
          comparison = (a.title || '').localeCompare(b.title || '');
          break;
          
        case 'complexity':
          const complexityOrder = { 'Simple': 1, 'Medium': 2, 'Complex': 3 };
          comparison = (complexityOrder[a.complexity] || 0) - (complexityOrder[b.complexity] || 0);
          break;
          
        case 'client':
          comparison = (a.client || '').localeCompare(b.client || '');
          break;
          
        default:
          comparison = 0;
      }
      
      return order === 'desc' ? -comparison : comparison;
    });
    
    return sortedProjects;
  } catch (error) {
    console.error('Error sorting projects:', error);
    return projects;
  }
};

// Validation Functions

/**
 * Validate project data structure
 * @param {Object} project - Project object to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateProject = (project) => {
  const errors = [];
  
  if (!project || typeof project !== 'object') {
    return { isValid: false, errors: ['Project must be an object'] };
  }
  
  // Required fields
  const requiredFields = ['id', 'title', 'description'];
  requiredFields.forEach(field => {
    if (!project[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Validate ID
  if (project.id && (typeof project.id !== 'number' || project.id <= 0)) {
    errors.push('ID must be a positive number');
  }
  
  // Validate arrays
  const arrayFields = ['technologies', 'industries', 'projectTypes', 'categories', 'features'];
  arrayFields.forEach(field => {
    if (project[field] && !Array.isArray(project[field])) {
      errors.push(`${field} must be an array`);
    }
  });
  
  // Validate complexity
  if (project.complexity && !['Simple', 'Medium', 'Complex'].includes(project.complexity)) {
    errors.push('Complexity must be Simple, Medium, or Complex');
  }
  
  // Validate status
  const validStatuses = ['Completed', 'In Progress', 'On Hold', 'Cancelled', 'Maintenance'];
  if (project.status && !validStatuses.includes(project.status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }
  
  // Validate dates
  if (project.startDate && isNaN(Date.parse(project.startDate))) {
    errors.push('Start date must be a valid date');
  }
  
  if (project.endDate && isNaN(Date.parse(project.endDate))) {
    errors.push('End date must be a valid date');
  }
  
  // Validate team size
  if (project.teamSize && (typeof project.teamSize !== 'number' || project.teamSize <= 0)) {
    errors.push('Team size must be a positive number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate tags against predefined categories
 * @param {Array} tags - Array of tags to validate
 * @param {Array} allowedTags - Array of allowed tags
 * @returns {Object} Validation result with isValid boolean and invalidTags array
 */
export const validateTags = (tags, allowedTags) => {
  if (!Array.isArray(tags)) {
    return { isValid: false, invalidTags: [], errors: ['Tags must be an array'] };
  }
  
  if (!Array.isArray(allowedTags)) {
    return { isValid: false, invalidTags: [], errors: ['Allowed tags must be an array'] };
  }
  
  const invalidTags = tags.filter(tag => !allowedTags.includes(tag));
  
  return {
    isValid: invalidTags.length === 0,
    invalidTags,
    errors: invalidTags.length > 0 ? [`Invalid tags: ${invalidTags.join(', ')}`] : []
  };
};

// Helper function to get tag categories from loaded data
export const getTagCategories = () => {
  try {
    const { tagCategories } = loadProjects();
    return tagCategories;
  } catch (error) {
    console.error('Error getting tag categories:', error);
    return {};
  }
};

// Export default object with all functions for convenience
export default {
  // Data Loading
  loadProjects,
  getProjectById,
  getFeaturedProjects,
  
  // Filtering
  filterProjectsByTechnology,
  filterProjectsByIndustry,
  filterProjectsByProjectType,
  filterProjectsByCategory,
  filterProjectsByComplexity,
  filterProjects,
  
  // Tag Management
  getAllTechnologies,
  getAllIndustries,
  getAllProjectTypes,
  getAllCategories,
  getTagCounts,
  
  // Search and Sort
  searchProjects,
  sortProjects,
  
  // Validation
  validateProject,
  validateTags,
  
  // Helper
  getTagCategories
};