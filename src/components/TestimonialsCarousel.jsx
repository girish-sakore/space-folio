import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Create a small SVG data-URI placeholder with the project name.
 * This avoids external network requests and never breaks.
 */
const svgPlaceholder = (label, size = 150, bg = "#0f172a", fg = "#cbd5e1") => {
  const short = label.length > 18 ? label.slice(0, 18) + "…" : label;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
    <rect width='100%' height='100%' rx='16' ry='16' fill='${bg}' />
    <text x='50%' y='50%' fill='${fg}' font-family='Inter, Arial, Helvetica, sans-serif' font-size='14' dominant-baseline='middle' text-anchor='middle'>${short}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "MyneLeap2024",
      role: "Fintech Platform",
      company: "Myne",
      image: "/images/234844.png",
      rating: 5,
      text: "A complete wealth solution built for your financial well-being.",
      industry: "Fintech",
    },
    {
      id: 2,
      name: "Hapchi",
      role: "Child Safety & Education",
      company: "Hapchi",
      image: "/images/000032.png",
      rating: 5,
      text: "India's first child safety digital platform addressing concerns from early childhood to adolescence.",
      industry: "Child Safety, Education",
    },
    {
      id: 3,
      name: "Social Media App",
      role: "Creative Networking",
      company: "Internal Project",
      image: "https://images.unsplash.com/photo-1675703818188-cee153b831f3",
      rating: 4,
      text: "A social platform for connecting creative professionals with real-time messaging and networking features.",
      industry: "Social Media, Entertainment",
    },
    {
      id: 5,
      name: "Cyberi3Secure",
      role: "Cybersecurity Services",
      company: "Cyberi3Secure Consultants LLP",
      image: "/images/000033.png",
      rating: 5,
      text: "Professional cybersecurity website specializing in privileged access management and identity security solutions.",
      industry: "Cybersecurity, IT Services",
    },
    {
      id: 6,
      name: "Pallotti College Website",
      role: "Education & Institution",
      company: "St. Vincent Pallotti College of Engineering & Technology",
      image: "/images/Palloti.png",
      rating: 4,
      text: "An institutional website presenting courses, admissions, and events in a user-friendly manner.",
      industry: "Education, Institution",
    },
    {
      id: 7,
      name: "Inheritance Infra Website",
      role: "Construction & Infrastructure",
      company: "Inheritance Infrastructure Pvt. Ltd.",
      image: "/images/Inheritance_Infra.png",
      rating: 5,
      text: "A corporate website showcasing infrastructure projects, services, and sustainability commitment.",
      industry: "Construction, Infrastructure",
    },
    {
      id: 8,
      name: "CRN Portfolio Website",
      role: "Personal Branding",
      company: "CRN",
      image: "/images/crn-portfolio.png",
      rating: 4,
      text: "A professional Next.js portfolio highlighting skills, projects, and SEO optimization.",
      industry: "Portfolio, Personal Branding",
    },
  ];

  // guard: if no testimonials, render nothing
  if (!testimonials || testimonials.length === 0) return null;

  const [index, setIndex] = useState(0);

  // Auto slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const current = testimonials[index];

  return (
    <section className="relative rounded-3xl mx-5 my-5 glass-effect py-16 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-12">
          What Our Clients Say
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${current.id}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 lg:p-12 shadow-xl"
            >
              {/* Stars (Unicode) */}
              <div className="flex justify-center mb-4">
                {[...Array(Math.max(0, current.rating || 0))].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl" aria-hidden>
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-lg lg:text-xl text-slate-200 italic mb-6">
                "{current.text}"
              </p>

              {/* Author info + image with robust fallback */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <img
                  src={current.image || svgPlaceholder(current.name)}
                  alt={current.name}
                  loading="lazy"
                  onError={(e) => {
                    // assign inline svg placeholder if the original image fails
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = svgPlaceholder(current.name);
                  }}
                  className="w-16 h-16 rounded-full mb-3 border-2 border-purple-400 object-cover"
                />

                <h4 className="text-white font-semibold text-lg">{current.name}</h4>
                <p className="text-slate-300 text-sm">
                  {current.role}, {current.company}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-purple-400" : "bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
