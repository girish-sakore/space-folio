import projectsData from '../data/projects.json';

// --- Data Loading Functions ---

/**
 * Load and return project data from JSON
 * @returns {{success: boolean, data: {projects: Array, tagCategories: Object}, error: string|null}}
 */
export const loadProjects = () => {
  try {
    const data = {
      projects: projectsData.projects || [],
      tagCategories: projectsData.tagCategories || {}
    };
    return { success: true, data, error: null };
  } catch (error) {
    console.error('Error loading projects:', error);
    return { success: false, data: { projects: [], tagCategories: {} }, error: error.message };
  }
};

/**
 * Find a specific project by ID
 * @param {number|string} id - The project ID to search for
 * @returns {{success: boolean, data: Object|null, error: string|null}} The project object or null if not found
 */
export const getProjectById = (id) => {
  try {
    const { data } = loadProjects();
    const project = data.projects.find(p => p.id === parseInt(id, 10)) || null;
    return { success: true, data: project, error: null };
  } catch (error) {
    console.error('Error getting project by ID:', error);
    return { success: false, data: null, error: error.message };
  }
};

/**
 * Get a limited number of featured projects
 * @param {number} count - Number of projects to return (default: 3)
 * @returns {{success: boolean, data: Array, error: string|null}} Array of featured projects
 */
export const getFeaturedProjects = (count = 3) => {
  try {
    const { data } = loadProjects();
    const sortedProjects = data.projects
      .filter(project => project.status === 'Completed')
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    
    return { success: true, data: sortedProjects.slice(0, count), error: null };
  } catch (error) {
    console.error('Error getting featured projects:', error);
    return { success: false, data: [], error: error.message };
  }
};


// --- Filtering Functions ---

/**
 * Filter projects by technology tags
 * @param {Array} projects - Array of project objects
 * @param {Array} technologies - Array of technology tags to filter by
 * @returns {{success: boolean, data: Array, error: string|null}} Filtered array of projects
 */
const filterByTag = (projects, tags, tagKey) => {
  try {
    if (!Array.isArray(projects)) throw new Error('Invalid projects array.');
    if (!Array.isArray(tags) || tags.length === 0) {
      return { success: true, data: projects, error: null };
    }
    
    const filtered = projects.filter(project => 
      project[tagKey] && tags.some(tag => project[tagKey].includes(tag))
    );
    return { success: true, data: filtered, error: null };
  } catch (error) {
     console.error(`Error filtering by ${tagKey}:`, error);
     return { success: false, data: projects, error: error.message };
  }
};

/**
 * Master filter function that applies multiple filter criteria
 * @param {Array} projects - Array of project objects
 * @param {Object} filters - Object containing filter criteria
 * @returns {{success: boolean, data: Array, error: string|null}} Filtered array of projects
 */
export const filterProjects = (projects, filters = {}) => {
  try {
    if (!Array.isArray(projects)) throw new Error("Initial projects data must be an array.");

    let currentProjects = [...projects];
    let result;

    if (filters.technologies && filters.technologies.length > 0) {
      result = filterByTag(currentProjects, filters.technologies, 'technologies');
      if (!result.success) return result;
      currentProjects = result.data;
    }
    
    if (filters.industries && filters.industries.length > 0) {
      result = filterByTag(currentProjects, filters.industries, 'industries');
      if (!result.success) return result;
      currentProjects = result.data;
    }
    
    if (filters.projectTypes && filters.projectTypes.length > 0) {
      result = filterByTag(currentProjects, filters.projectTypes, 'projectTypes');
      if (!result.success) return result;
      currentProjects = result.data;
    }

    if (filters.categories && filters.categories.length > 0) {
      result = filterByTag(currentProjects, filters.categories, 'categories');
      if (!result.success) return result;
      currentProjects = result.data;
    }
    
    if (filters.complexity && filters.complexity.length > 0) {
      currentProjects = currentProjects.filter(p => p.complexity === filters.complexity);
    }
    
    if (filters.status) {
      currentProjects = currentProjects.filter(p => p.status === filters.status);
    }
    return { success: true, data: currentProjects, error: null };
  } catch (error) {
    return { success: false, data: [], error: error.message };
  }
};

// --- Tag Management Functions ---

/**
 * Extract all unique tags from projects for a given key
 * @param {Array} projects - Array of project objects
 * @param {string} tagKey - The key for the tags (e.g., 'technologies')
 * @returns {{success: boolean, data: Array, error: string|null}}
 */
const getAllUniqueTags = (projects, tagKey) => {
    try {
        if (!Array.isArray(projects)) return { success: true, data: [], error: null };
        const tags = new Set();
        projects.forEach(project => {
            if (Array.isArray(project[tagKey])) {
                project[tagKey].forEach(tag => tags.add(tag));
            }
        });
        return { success: true, data: Array.from(tags).sort(), error: null };
    } catch(error) {
        console.error(`Error getting unique tags for ${tagKey}:`, error);
        return { success: false, data: [], error: error.message };
    }
}

export const getAllTechnologies = (projects) => getAllUniqueTags(projects, 'technologies');
export const getAllIndustries = (projects) => getAllUniqueTags(projects, 'industries');
export const getAllProjectTypes = (projects) => getAllUniqueTags(projects, 'projectTypes');
export const getAllCategories = (projects) => getAllUniqueTags(projects, 'categories');

/**
 * Get count of projects for each tag in a category
 * @param {Array} projects - Array of project objects
 * @param {string} tagType - Type of tag ('technologies', 'industries', etc.)
 * @returns {{success: boolean, data: Object, error: string|null}}
 */
export const getTagCounts = (projects, tagType) => {
  try {
    if (!Array.isArray(projects) || !tagType) {
      return { success: true, data: {}, error: null };
    }
    const tagCounts = {};
    projects.forEach(project => {
      const tags = project[tagType];
      if (Array.isArray(tags)) {
        tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    return { success: true, data: tagCounts, error: null };
  } catch (error) {
    console.error('Error getting tag counts:', error);
    return { success: false, data: {}, error: error.message };
  }
};

// --- Search and Sort Functions ---

/**
 * Search projects by title, description, or tags
 * @param {Array} projects - Array of project objects
 * @param {string} searchTerm - Term to search for
 * @returns {{success: boolean, data: Array, error: string|null}}
 */
export const searchProjects = (projects, searchTerm) => {
  try {
    if (!Array.isArray(projects)) throw new Error("Projects must be an array.");
    const term = (searchTerm || '').toLowerCase().trim();
    if (!term) return { success: true, data: projects, error: null };

    const searchFields = ['title', 'description', 'client'];
    const tagFields = ['technologies', 'industries', 'projectTypes', 'categories'];

    const filtered = projects.filter(project => {
      if (searchFields.some(field => project[field]?.toLowerCase().includes(term))) {
        return true;
      }
      if (tagFields.some(field => Array.isArray(project[field]) && project[field].some(tag => tag.toLowerCase().includes(term)))) {
          return true;
      }
      return false;
    });

    return { success: true, data: filtered, error: null };
  } catch (error) {
    console.error('Error searching projects:', error);
    return { success: false, data: [], error: error.message };
  }
};


/**
 * Sort projects by various criteria
 * @param {Array} projects - Array of project objects
 * @param {string} sortBy - Criteria to sort by ('date', 'title', 'complexity', 'client')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {{success: boolean, data: Array, error: string|null}}
 */
export const sortProjects = (projects, sortBy = 'date', order = 'desc') => {
  try {
    if (!Array.isArray(projects)) throw new Error("Projects must be an array.");

    const sorted = [...projects].sort((a, b) => {
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
          break;
      }
      return order === 'desc' ? -comparison : comparison;
    });
    return { success: true, data: sorted, error: null };
  } catch (error) {
    console.error('Error sorting projects:', error);
    return { success: false, data: projects, error: error.message };
  }
};


// --- Validation Functions ---

/**
 * Validate project data structure
 * @param {Object} project - Project object to validate
 * @returns {{isValid: boolean, errors: Array<string>}}
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

// ... (validateTags and getTagCategories are also fine, but getTagCategories can be improved for consistency)
/**
 * Helper function to get tag categories from loaded data
 * @returns {{success: boolean, data: Object, error: string|null}}
 */
export const getTagCategories = () => {
  try {
    const { data } = loadProjects();
    return { success: true, data: data.tagCategories || {}, error: null };
  } catch (error) {
    console.error('Error getting tag categories:', error);
    return { success: false, data: {}, error: error.message };
  }
};


// --- Default Export ---

export default {
  // Data Loading
  loadProjects,
  getProjectById,
  getFeaturedProjects,
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
  // validateTags,
  
  // Helper
  getTagCategories
};