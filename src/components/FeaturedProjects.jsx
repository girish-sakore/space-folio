import myne_logo from '../assets/234844.png';
import hapchi_logo from '../assets/000032.png';
import DoubleArrowSharpIcon from '@mui/icons-material/DoubleArrowSharp';

export default function FeaturedProjects() {
  const projects = [
    {
      title: "MyneLeap2024",
      description:
        "A complete wealth solution built for your financial well-being.",
      image: myne_logo,
      link: "https://joinmyne.com/",
      features: [
        "International payments",
        "Global Timezone Appointment Booking",
        "User Subscriptions",
        "Financial Data Analytics",
        "Multiple Currencies",
        "Multirole Users",
        "Admin Console",
      ],
      client: "Myne",
      projectType: "Web Application",
      startDate: "2023-01-15",
      endDate: "2024-03-01",
      technologiesUsed: [
        "Ruby on Rails",
        "React",
        "React Native",
        "PostgreSQL",
      ],
      challenges:
        "Integrating diverse financial services and ensuring secure transactions.",
      solutions:
        "Developed a robust API and implemented strong encryption and authentication protocols.",
      results:
        "Successful launch with positive user feedback and increased customer engagement.",
      id: 1,
    },
    {
      title: "Hapchi",
      description:
        "India's first child safety digital platform focuses on every child safety concern that a child encounters during their journey from early childhood to adolescence.",
      image: hapchi_logo,
      link: "https://hapchi.in/",
      features: [
        "Assesments and Questionaires",
        "Test Evaluations",
        "Reports Generators",
        "Multirole Users",
        "Admin Console",
      ],
      client: "Hapchi",
      projectType: "Web and IOS/Android Application",
      startDate: "2022-05-01",
      endDate: "2023-08-15",
      technologiesUsed: ["Ruby on Rails", "React", "React Native", "MySQL"],
      challenges:
        "Creating a user-friendly interface for sensitive child safety data.",
      solutions:
        "Implemented intuitive UI/UX design and strict data privacy measures.",
      results:
        "Positive feedback from parents and educators, demonstrating the platform's effectiveness.",
      id: 2,
    },
    // {
    //   title: "Social Media App",
    //   description: "A social platform for connecting creative professionals",
    //   image: "https://images.unsplash.com/photo-1675703818188-cee153b831f3",
    //   link: "#",
    //   features: [],
    //   projectType: "Mobile Application",
    //   id: 3,
    // },
    {
      title: "Portfolio Generator",
      description: "Tool for creating beautiful portfolio websites",
      image: "https://images.unsplash.com/photo-1739514984003-330f7c1d2007",
      link: "#",
      projectType: "Web Tool",
      id: 4,
      features: [],
    },
  ];

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
          {projects.map((project) => (
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
          <a className="mt-8 btn-primary" href='#'>
            <span>View All Projects</span>
            <DoubleArrowSharpIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
