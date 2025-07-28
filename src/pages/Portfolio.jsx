import React from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects";

const Portfolio = () => {
  return (
    <section className="container mx-auto py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold gradient-text">Our Portfolio</h1>
        <p className="text-lg text-slate-400">
          Explore our featured projects showcasing our expertise and innovation.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="card">
            <img
              alt={project.title}
              className="w-full h-64 object-cover rounded-t-lg"
              src={project.image}
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-slate-400 mb-4 h-[50px] overflow-hidden">
                {project.description}
              </p>
              <Link
                to={`/portfolio/${project.id}`}
                className="text-teal-400 font-semibold hover:text-teal-300 transition-colors"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;