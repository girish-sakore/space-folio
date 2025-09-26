import React from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "../utils/projectUtils"; // ✅ fixed import
import SEO from "../components/SEO";
import { getArticleSchema } from "../utils/structuredData";
import LaunchIcon from '@mui/icons-material/Launch';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProjectDetail = () => {
  const { slug } = useParams();  // ✅ slug instead of id
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <>
        <SEO 
          title="Project Not Found"
          description="The project you're looking for doesn't exist."
          noindex={true}
        />
        <section className="container mx-auto py-20 text-center">
          <h1 className="text-4xl font-bold gradient-text">Project Not Found</h1>
          <p className="text-lg text-slate-400 mb-10">
            The project you're looking for doesn't exist.
          </p>
          <Link to="/portfolio" className="btn-primary">
            Back to Portfolio
          </Link>
        </section>
      </>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const renderTagSection = (tags, label) => {
    if (!tags || tags.length === 0) return null;
    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3">{label}</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // ✅ use slug instead of id for schema
  const projectSchema = getArticleSchema(
    project.title,
    project.description,
    "Proxima Cloud Team",
    project.startDate || new Date().toISOString(),
    new Date().toISOString(),
    project.image,
    `https://proximacloud.in/portfolio/${project.slug}`
  );

  return (
    <>
      <SEO 
        title={`${project.title} - Case Study`}
        description={`${project.description} - Learn about this ${project.technologies ? project.technologies.join(', ') : 'technology'} project by Proxima Cloud.`}
        keywords={`${project.title}, case study, ${project.technologies ? project.technologies.join(', ') : ''}, ${project.industries ? project.industries.join(', ') : ''}`}
        structuredData={projectSchema}
        image={project.image}
      />
      <section className="container mx-auto py-20 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            {project.description}
          </p>
          {project.link && project.link !== '#' && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-teal-400 hover:text-teal-300 transition-colors"
            >
              <LaunchIcon fontSize="small" />
              View Live Project
            </a>
          )}
        </div>

        {/* Project Image */}
        {project.image && (
          <div className="mb-12">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full max-w-4xl mx-auto rounded-xl shadow-2xl" 
            />
          </div>
        )}

        {/* Project Info Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Project Meta */}
          <div className="card p-4">
            <h3 className="text-xl font-bold text-white mb-4">Project Info</h3>
            <div className="space-y-3 text-slate-400">
              {project.client && (
                <div className="flex items-center gap-2">
                  <PersonIcon fontSize="small" />
                  <span><strong>Client:</strong> {project.client}</span>
                </div>
              )}
              {project.startDate && (
                <div className="flex items-center gap-2">
                  <CalendarTodayIcon fontSize="small" />
                  <span><strong>Duration:</strong> {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Ongoing'}</span>
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center gap-2">
                  <GroupIcon fontSize="small" />
                  <span><strong>Team Size:</strong> {project.teamSize} members</span>
                </div>
              )}
              {project.status && (
                <div className="flex items-center gap-2">
                  <CheckCircleIcon 
                    fontSize="small" 
                    className={project.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}
                  />
                  <span><strong>Status:</strong> {project.status}</span>
                </div>
              )}
              {project.complexity && (
                <div>
                  <strong>Complexity:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded text-sm ${
                    project.complexity === 'Complex' ? 'bg-red-900 text-red-200' :
                    project.complexity === 'Medium' ? 'bg-yellow-900 text-yellow-200' :
                    'bg-green-900 text-green-200'
                  }`}>
                    {project.complexity}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="card p-4">
            <h3 className="text-xl font-bold text-white mb-4">Challenge</h3>
            <p className="text-slate-400 mb-6">
              {project.challenges || 'No specific challenges documented.'}
            </p>
            <h4 className="text-lg font-semibold text-white mb-3">Solution</h4>
            <p className="text-slate-400">
              {project.solutions || 'Solution details not provided.'}
            </p>
          </div>

          {/* Results */}
          <div className="card p-4">
            <h3 className="text-xl font-bold text-white mb-4">Results</h3>
            <p className="text-slate-400">
              {project.results || 'Results and outcomes not documented.'}
            </p>
          </div>
        </div>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Key Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-800 rounded-lg">
                  <CheckCircleIcon className="text-teal-400 mt-1 flex-shrink-0" fontSize="small" />
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies & Tags */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            {renderTagSection(project.technologies, 'Technologies Used')}
            {renderTagSection(project.projectTypes, 'Project Types')}
          </div>
          <div>
            {renderTagSection(project.industries, 'Industries')}
            {renderTagSection(project.categories, 'Categories')}
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link to="/portfolio" className="btn-primary">
            ← Back to Portfolio
          </Link>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
