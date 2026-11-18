// Migration to JSON-based project data structure
// This file now imports project data from projects.json and uses utility functions
// from projectUtils.js while maintaining backward compatibility with existing components

import { loadProjects } from '../utils/projectUtils.js';

// Load project data from JSON
const { success, data: jsonProjects, error } = loadProjects();
let allProjects = [];
if (success) {
  console.log(jsonProjects);
  allProjects = jsonProjects.projects;
  console.log(`Successfully loaded ${allProjects.length} projects.`);
  // You can now use the allProjects array
} else {
  // Handle the error if the loading failed
  console.error('Failed to load projects:', error);
}
// Map JSON data to maintain backward compatibility with existing component structure
// This ensures FeaturedProjects.jsx, Portfolio.jsx, and ProjectDetail.jsx continue to work
const projects = allProjects.map(project => {

  return {
    // Core fields that existing components expect
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image,
    link: project.link,
    features: project.features || [],
    
    // Legacy fields for backward compatibility
    projectType: project.projectTypes ? project.projectTypes[0] : 'Web Application',
    technologiesUsed: project.technologies || [],
    
    // Additional fields from enhanced schema
    client: project.client,
    startDate: project.startDate,
    endDate: project.endDate,
    status: project.status,
    challenges: project.challenges,
    solutions: project.solutions,
    results: project.results,
    
    // New enhanced fields (available for future use)
    technologies: project.technologies,
    industries: project.industries,
    projectTypes: project.projectTypes,
    categories: project.categories,
    complexity: project.complexity,
    teamSize: project.teamSize,
    duration: project.duration
  };
});
// Export projects array in the same format as before for backward compatibility
// Existing components (FeaturedProjects.jsx, Portfolio.jsx, ProjectDetail.jsx) will continue to work
export default projects;
