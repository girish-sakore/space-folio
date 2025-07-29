import { Link } from 'react-router-dom';

export default function ProjectCard({ 
  project, 
  showTags = true, 
  linkTo = `/portfolio/${project.id}` 
}) {
  // Limit the number of visible tags to prevent overflow
  const maxVisibleTags = 3;
  const visibleTechnologies = project.technologies 
    ? project.technologies.slice(0, maxVisibleTags)
    : [];
  const hasMoreTags = project.technologies && project.technologies.length > maxVisibleTags;

  return (
    <div className="card">
      <img
        alt={project.title}
        className="w-full h-64 object-cover"
        src={project.image}
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-slate-400 mb-4 h-[50px] overflow-hidden">
          {project.description}
        </p>
        
        {showTags && project.technologies && project.technologies.length > 0 && (
          <div className="project-tag-list">
            {visibleTechnologies.map((tech, index) => (
              <span key={index} className="project-tag">
                {tech}
              </span>
            ))}
            {hasMoreTags && (
              <span className="project-tag">
                +{project.technologies.length - maxVisibleTags} more
              </span>
            )}
          </div>
        )}
        
        <Link
          to={linkTo}
          className="text-teal-400 font-semibold hover:text-teal-300 transition-colors pt-3 inline-block mt-4"
          aria-label={`View case study for ${project.title}`}
        >
          View Case Study →
        </Link>
      </div>
    </div>
  );
}