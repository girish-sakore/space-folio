import projectsData from '../data/projects.json';

// --- Utility Functions ---

// Slugify a string (convert title into URL-safe slug)
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace spaces/special chars with -
    .replace(/(^-|-$)+/g, '');   // trim hyphens
};

// --- Data Loading Functions ---

/**
 * Load and return project data from JSON (auto-generate slug if missing)
 */
export const loadProjects = () => {
  try {
    const projects = (projectsData.projects || []).map(p => ({
      ...p,
      slug: p.slug || generateSlug(p.title)
    }));
    return {
      success: true,
      data: {
        projects,
        tagCategories: projectsData.tagCategories || {}
      },
      error: null
    };
  } catch (error) {
    console.error('Error loading projects:', error);
    return { success: false, data: { projects: [], tagCategories: {} }, error: error.message };
  }
};

/**
 * Get project by slug
 */
export const getProjectBySlug = (slug) => {
  const { data } = loadProjects();
  return data.projects.find(project => project.slug === slug) || null;
};

/**
 * Get a limited number of featured projects
 */
export const getFeaturedProjects = (count = 3) => {
  try {
    const { data } = loadProjects();
    const sortedProjects = data.projects
      .filter(project => project.status === 'Completed')
      .sort((a, b) => new Date(b.endDate || b.startDate || 0) - new Date(a.endDate || a.startDate || 0));
    
    return { success: true, data: sortedProjects.slice(0, count), error: null };
  } catch (error) {
    console.error('Error getting featured projects:', error);
    return { success: false, data: [], error: error.message };
  }
};

// --- Filtering Functions ---

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

export const filterProjects = (projects, filters = {}) => {
  try {
    if (!Array.isArray(projects)) throw new Error("Initial projects data must be an array.");

    let currentProjects = [...projects];
    let result;

    if (filters.technologies?.length) {
      result = filterByTag(currentProjects, filters.technologies, 'technologies');
      if (!result.success) return result;
      currentProjects = result.data;
    }
    
    if (filters.industries?.length) {
      result = filterByTag(currentProjects, filters.industries, 'industries');
      if (!result.success) return result;
      currentProjects = result.data;
    }
    
    if (filters.projectTypes?.length) {
      result = filterByTag(currentProjects, filters.projectTypes, 'projectTypes');
      if (!result.success) return result;
      currentProjects = result.data;
    }

    if (filters.categories?.length) {
      result = filterByTag(currentProjects, filters.categories, 'categories');
      if (!result.success) return result;
      currentProjects = result.data;
    }
    
    if (filters.complexity?.length) {
      currentProjects = currentProjects.filter(p => filters.complexity.includes(p.complexity));
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
};

export const getAllTechnologies = (projects) => getAllUniqueTags(projects, 'technologies');
export const getAllIndustries = (projects) => getAllUniqueTags(projects, 'industries');
export const getAllProjectTypes = (projects) => getAllUniqueTags(projects, 'projectTypes');
export const getAllCategories = (projects) => getAllUniqueTags(projects, 'categories');

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

export const searchProjects = (projects, searchTerm) => {
  try {
    if (!Array.isArray(projects)) throw new Error("Projects must be an array.");
    const term = (searchTerm || '').toLowerCase().trim();
    if (!term) return { success: true, data: projects, error: null };

    const searchFields = ['title', 'client'];
    const tagFields = ['technologies', 'industries', 'projectTypes', 'categories'];

    const filtered = projects.filter(project => {
      // check title & client
      if (searchFields.some(field => project[field]?.toLowerCase().includes(term))) {
        return true;
      }
      // check description (string or array)
      if (Array.isArray(project.description)) {
        if (project.description.some(d => d.toLowerCase().includes(term))) return true;
      } else if (project.description?.toLowerCase().includes(term)) {
        return true;
      }
      // check tags
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

export const sortProjects = (projects, sortBy = 'date', order = 'desc') => {
  try {
    if (!Array.isArray(projects)) throw new Error("Projects must be an array.");

    const sorted = [...projects].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          const dateA = new Date(a.endDate || a.startDate || 0);
          const dateB = new Date(b.endDate || b.startDate || 0);
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

export const validateProject = (project) => {
  const errors = [];
  if (!project || typeof project !== 'object') {
    return { success: false, data: null, error: 'Project must be an object' };
  }
  
  // Required fields
  const requiredFields = ['id', 'title', 'description', 'status'];
  requiredFields.forEach(field => {
    if (!project[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Validate slug
  if (project.slug && typeof project.slug !== 'string') {
    errors.push('Slug must be a string');
  }

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

  // Validate image (if provided)
  if (project.image && typeof project.image === 'string') {
    const urlPattern = /^(http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(project.image)) {
      errors.push('Image must be a valid URL');
    }
  }
  
  return {
    success: errors.length === 0,
    data: project,
    error: errors.length > 0 ? errors : null
  };
};

// --- Helper ---

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
  getProjectBySlug,
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
  
  // Helper
  getTagCategories
};
