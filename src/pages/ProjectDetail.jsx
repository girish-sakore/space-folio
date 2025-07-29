import React from "react";
import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id, 10));

  if (!project) {
    return (
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold gradient-text">Project Not Found</h1>
        <p className="text-lg text-slate-400 mb-10">
          The project you're looking for doesn't exist.
        </p>
        <Link to="/portfolio" className="btn-primary">
          Back to Portfolio
        </Link>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold gradient-text">{project.title}</h1>
        <p className="text-lg text-slate-400">{project.description}</p>
      </div>
      <img src={project.image} alt={project.title} className="rounded-lg mb-10" />
      <div className="text-slate-400">{project.details}</div>
      <Link to="/portfolio" className="btn-primary mt-10 inline-block">
        Back to Portfolio
      </Link>
    </section>
  );
};

export default ProjectDetail;