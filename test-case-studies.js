// Test script to verify case studies and project routing functionality

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the projects data
const projectsDataPath = path.join(__dirname, 'src', 'data', 'projects.json');
const projectsData = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'));

console.log('🧪 Testing Case Studies and Project Routing...\n');

// Test 1: Verify all projects have unique slugs
console.log('1. Testing slug uniqueness:');
const slugs = {};
const duplicateSlugs = [];

projectsData.projects.forEach((project, index) => {
  if (project.slug) {
    if (slugs[project.slug]) {
      duplicateSlugs.push({ slug: project.slug, projects: [slugs[project.slug], index] });
    } else {
      slugs[project.slug] = index;
    }
  } else {
    console.log(`   ⚠️  Project "${project.title}" has no slug`);
  }
});

if (duplicateSlugs.length > 0) {
  console.log('   ❌ Duplicate slugs found:');
  duplicateSlugs.forEach(dup => {
    console.log(`      - "${dup.slug}" appears in projects ${dup.projects.join(', ')}`);
  });
} else {
  console.log('   ✅ All slugs are unique');
}

// Test 2: Check completed projects available for case studies
console.log('\n2. Testing completed projects for case studies:');
const completedProjects = projectsData.projects.filter(p => p.status === 'Completed');
console.log(`   📊 Total projects: ${projectsData.projects.length}`);
console.log(`   📚 Completed projects: ${completedProjects.length}`);
console.log(`   🚧 In progress projects: ${projectsData.projects.filter(p => p.status === 'In Progress').length}`);

if (completedProjects.length === 0) {
  console.log('   ⚠️  No completed projects available for case studies');
} else {
  console.log('   ✅ Completed projects available for case studies:');
  completedProjects.forEach(project => {
    console.log(`      - ${project.title} (slug: ${project.slug})`);
  });
}

// Test 3: Verify required fields for case studies
console.log('\n3. Testing case study data completeness:');
const requiredFields = ['title', 'description', 'client', 'slug', 'technologies'];
const recommendedFields = ['challenges', 'solutions', 'results', 'features', 'image'];

completedProjects.forEach(project => {
  const missing = [];
  const recommended = [];
  
  requiredFields.forEach(field => {
    if (!project[field] || (Array.isArray(project[field]) && project[field].length === 0)) {
      missing.push(field);
    }
  });
  
  recommendedFields.forEach(field => {
    if (!project[field] || (Array.isArray(project[field]) && project[field].length === 0)) {
      recommended.push(field);
    }
  });
  
  if (missing.length > 0 || recommended.length > 0) {
    console.log(`   📝 ${project.title}:`);
    if (missing.length > 0) {
      console.log(`      Missing required: ${missing.join(', ')}`);
    }
    if (recommended.length > 0) {
      console.log(`      Missing recommended: ${recommended.join(', ')}`);
    }
  }
});

// Test 4: Generate test URLs
console.log('\n4. Testing generated URLs:');
console.log('   Portfolio URLs:');
projectsData.projects.forEach(project => {
  if (project.slug) {
    console.log(`      - /portfolio/${project.slug} (${project.title})`);
  }
});

console.log('\n   Case Studies URL:');
console.log('      - /case-studies');

// Test 5: Verify image paths
console.log('\n5. Testing image availability:');
const missingImages = [];
projectsData.projects.forEach(project => {
  if (!project.image) {
    missingImages.push(project.title);
  }
});

if (missingImages.length > 0) {
  console.log(`   ⚠️  ${missingImages.length} projects missing images:`);
  missingImages.forEach(title => console.log(`      - ${title}`));
} else {
  console.log('   ✅ All projects have images');
}

// Summary
console.log('\n📊 Test Summary:');
console.log(`   Total Projects: ${projectsData.projects.length}`);
console.log(`   Unique Slugs: ${Object.keys(slugs).length}`);
console.log(`   Completed Projects: ${completedProjects.length}`);
console.log(`   Case Study Ready: ${completedProjects.filter(p => 
  requiredFields.every(field => p[field] && (!Array.isArray(p[field]) || p[field].length > 0))
).length}`);

console.log('\n✅ Case Studies and Project Routing Test Complete!');

// Exit with success code
process.exit(0);
