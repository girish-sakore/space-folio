import DoubleArrowSharpIcon from '@mui/icons-material/DoubleArrowSharp';
import projects from "../data/projects";
import { Link } from "react-router-dom";

export default function FeaturedProjects() {

  return (
    <section className="py-20" id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl font-bold">Featured Projects</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            See how we've helped leading companies achieve their goals.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="card">
              <img
                alt={project.title}
                className="w-full h-64 object-cover"
                src={project.image}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-4 h-[50px] overflow-hidden">{project.description}</p>
                <a
                  className="text-teal-400 font-semibold hover:text-teal-300 transition-colors pt-3"
                  href={project.link}
                >
                  View Case Study →
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className='mx-auto items-center flex justify-center'>
          <Link to="/portfolio" className="mt-8 btn-primary">
            <>
              <span>View All Projects</span>
              <DoubleArrowSharpIcon />
            </>
          </Link>
        </div>
      </div>
    </section>
  );
}
