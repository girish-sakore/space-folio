import { loadProjects, validateProject } from './projectUtils.js';

// Function to validate all projects
export const validateAllProjects = () => {
  const result = loadProjects();
  
  if (!result.success) {
    console.error('Failed to load projects:', result.error);
    return { success: false, error: result.error };
  }

  const projects = result.data.projects;
  const validationResults = {
    totalProjects: projects.length,
    validProjects: 0,
    invalidProjects: 0,
    errors: [],
    warnings: [],
    slugDuplicates: []
  };

  // Check for slug duplicates
  const slugCounts = {};
  projects.forEach(project => {
    if (project.slug) {
      slugCounts[project.slug] = (slugCounts[project.slug] || 0) + 1;
    }
  });

  Object.entries(slugCounts).forEach(([slug, count]) => {
    if (count > 1) {
      validationResults.slugDuplicates.push({ slug, count });
    }
  });

  // Validate each project
  projects.forEach((project, index) => {
    const validation = validateProject(project);
    
    if (validation.success) {
      validationResults.validProjects++;
    } else {
      validationResults.invalidProjects++;
      validationResults.errors.push({
        projectIndex: index,
        projectTitle: project.title || `Project ${index + 1}`,
        errors: validation.error
      });
    }

    // Additional checks
    if (!project.slug) {
      validationResults.warnings.push(`Project "${project.title}" has no slug`);
    }
    
    if (!project.image) {
      validationResults.warnings.push(`Project "${project.title}" has no image`);
    }
    
    if (!project.client) {
      validationResults.warnings.push(`Project "${project.title}" has no client information`);
    }
  });

  return {
    success: validationResults.errors.length === 0,
    data: validationResults,
    error: validationResults.errors.length > 0 ? 'Validation errors found' : null
  };
};

// Function to check case study completeness
export const validateCaseStudies = () => {
  const result = loadProjects();
  
  if (!result.success) {
    return { success: false, error: result.error };
  }

  const completedProjects = result.data.projects.filter(p => p.status === 'Completed');
  const caseStudyResults = {
    totalCompleted: completedProjects.length,
    readyForCaseStudy: 0,
    missingInfo: []
  };

  const requiredFields = ['title', 'description', 'client', 'slug', 'technologies'];
  const recommendedFields = ['challenges', 'solutions', 'results', 'features', 'image'];

  completedProjects.forEach(project => {
    const missing = [];
    const recommended = [];

    // Check required fields
    requiredFields.forEach(field => {
      if (!project[field] || (Array.isArray(project[field]) && project[field].length === 0)) {
        missing.push(field);
      }
    });

    // Check recommended fields
    recommendedFields.forEach(field => {
      if (!project[field] || (Array.isArray(project[field]) && project[field].length === 0)) {
        recommended.push(field);
      }
    });

    if (missing.length === 0) {
      caseStudyResults.readyForCaseStudy++;
    } else {
      caseStudyResults.missingInfo.push({
        title: project.title,
        slug: project.slug,
        missingRequired: missing,
        missingRecommended: recommended
      });
    }
  });

  return {
    success: true,
    data: caseStudyResults,
    error: null
  };
};

// Function to run all validations and log results
export const runValidation = () => {
  console.log('🔍 Starting project validation...\n');

  // Validate all projects
  const projectValidation = validateAllProjects();
  console.log('📊 Project Validation Results:');
  console.log(`Total Projects: ${projectValidation.data.totalProjects}`);
  console.log(`Valid Projects: ${projectValidation.data.validProjects}`);
  console.log(`Invalid Projects: ${projectValidation.data.invalidProjects}`);
  
  if (projectValidation.data.slugDuplicates.length > 0) {
    console.log('\n⚠️  Slug Duplicates Found:');
    projectValidation.data.slugDuplicates.forEach(dup => {
      console.log(`  - "${dup.slug}" appears ${dup.count} times`);
    });
  }

  if (projectValidation.data.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    projectValidation.data.warnings.forEach(warning => {
      console.log(`  - ${warning}`);
    });
  }

  if (projectValidation.data.errors.length > 0) {
    console.log('\n❌ Validation Errors:');
    projectValidation.data.errors.forEach(error => {
      console.log(`  - ${error.projectTitle}:`);
      if (Array.isArray(error.errors)) {
        error.errors.forEach(err => console.log(`    * ${err}`));
      }
    });
  }

  // Validate case studies
  const caseStudyValidation = validateCaseStudies();
  console.log('\n📚 Case Study Readiness:');
  console.log(`Completed Projects: ${caseStudyValidation.data.totalCompleted}`);
  console.log(`Ready for Case Study: ${caseStudyValidation.data.readyForCaseStudy}`);

  if (caseStudyValidation.data.missingInfo.length > 0) {
    console.log('\n📝 Projects needing more information:');
    caseStudyValidation.data.missingInfo.forEach(project => {
      console.log(`  - ${project.title} (/${project.slug}):`);
      if (project.missingRequired.length > 0) {
        console.log(`    Required: ${project.missingRequired.join(', ')}`);
      }
      if (project.missingRecommended.length > 0) {
        console.log(`    Recommended: ${project.missingRecommended.join(', ')}`);
      }
    });
  }

  console.log('\n✅ Validation complete!');
  return {
    projectValidation,
    caseStudyValidation
  };
};

export default {
  validateAllProjects,
  validateCaseStudies,
  runValidation
};
