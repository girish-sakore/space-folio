export default function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      title: "Project Nebula",
      description: "A comprehensive cloud platform for a leading tech startup, boosting their performance by 300%.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCdeZfoCBtZM1qCvPjYmOETGMstRiOZ6PvrmmzshgIzHRpE8mwPkr9phcETqr3u_fjwifmFzBYu1yNdrwlZ17pWmbR41FeDAsfiXZSW5HgW0ld6-057OoCfQ9VO3Gs7_sFAaRZkWDyQzHWRC12-B91pHYknsgD7xyZNg_6IDEUQ9uCUL4-TnTHExJ_1LNAnYGOVfnzA2PQj7flSHV_-rvkYGTUKrGF56YYEsMpWy4JflA5EMw3csLdyDxBvfyjUwcnu5cPi_yiQVc",
      alt: "Project Nebula screenshot"
    },
    {
      id: 2,
      title: "Project Nebula",
      description: "A comprehensive cloud platform for a leading tech startup, boosting their performance by 300%.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCdeZfoCBtZM1qCvPjYmOETGMstRiOZ6PvrmmzshgIzHRpE8mwPkr9phcETqr3u_fjwifmFzBYu1yNdrwlZ17pWmbR41FeDAsfiXZSW5HgW0ld6-057OoCfQ9VO3Gs7_sFAaRZkWDyQzHWRC12-B91pHYknsgD7xyZNg_6IDEUQ9uCUL4-TnTHExJ_1LNAnYGOVfnzA2PQj7flSHV_-rvkYGTUKrGF56YYEsMpWy4JflA5EMw3csLdyDxBvfyjUwcnu5cPi_yiQVc",
      alt: "Project Nebula screenshot"
    },
    {
      id: 3,
      title: "Project Galileo",
      description: "Developed an interactive data visualization dashboard for a major financial institution.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6fFuy-SWOCfIgW0p0KtaU-0sZEg2qRzGEAkb15poMiiRNPmTuuhdcBy-seg6xSc9cw-2ws_zwChTsO3gq67ueV0x7ObomFl9f4wuQdHyvtTZ7tEEWJlbjKCrUCfrYWGo04R8dQ82bOQhqpWVRfB-P1M0gwgG6dJeqpcF0niLVhmTAy0l5ijfHAoQG7tpAlGj7E4nXf_zWQebDI0dnqauUueIiwBzcVyNNnaM9nde2g6R0ZKs0qSESAnnu3Ggq9FbXAoM3wbCt4aY",
      alt: "Project Galileo screenshot"
    }
  ];

  return (
    <section className="py-20" id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl">Featured Projects</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            See how we've helped leading companies achieve their goals.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="card">
              <img
                alt={project.alt}
                className="w-full h-64 object-cover"
                src={project.image}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-4">
                  {project.description}
                </p>
                <a
                  className="text-teal-400 font-semibold hover:text-teal-300 transition-colors"
                  href="#"
                >
                  View Case Study →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}