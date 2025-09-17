import React from 'react';
import { Link } from 'react-router-dom';
import longLogo from '../assets/Proxima_Cloud_6-CSK-uDlf.png';
import SEO from '../components/SEO';
import { getAboutPageSchema, getLocalBusinessSchema } from '../utils/structuredData';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GroupIcon from '@mui/icons-material/Group';
import PublicIcon from '@mui/icons-material/Public';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SecurityIcon from '@mui/icons-material/Security';
import HandshakeIcon from '@mui/icons-material/Handshake';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedIcon from '@mui/icons-material/Verified';

const About = () => {
  const values = [
    {
      icon: <LightbulbIcon className="text-4xl text-teal-400" />,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and creative solutions to solve complex challenges."
    },
    {
      icon: <HandshakeIcon className="text-4xl text-teal-400" />,
      title: "Partnership",
      description: "We believe in building long-term relationships and working collaboratively with our clients."
    },
    {
      icon: <VerifiedIcon className="text-4xl text-teal-400" />,
      title: "Quality",
      description: "We deliver excellence in every project, ensuring reliability, security, and performance."
    },
    {
      icon: <TrendingUpIcon className="text-4xl text-teal-400" />,
      title: "Growth",
      description: "We help businesses scale and evolve with technology solutions that grow with them."
    }
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Chief Technology Officer",
      bio: "15+ years in cloud architecture and enterprise solutions. Former lead architect at major tech companies.",
      specialties: ["Cloud Architecture", "DevOps", "System Design"]
    },
    {
      name: "Sarah Johnson",
      role: "Head of Development",
      bio: "Full-stack developer with expertise in modern web technologies and mobile app development.",
      specialties: ["React/Node.js", "Mobile Development", "UI/UX"]
    },
    {
      name: "Michael Rodriguez",
      role: "Security & Compliance Lead",
      bio: "Cybersecurity expert with certifications in multiple security frameworks and compliance standards.",
      specialties: ["Security Audits", "Compliance", "Risk Assessment"]
    },
    {
      name: "Emily Davis",
      role: "Project Manager",
      bio: "Agile project management specialist ensuring smooth delivery and client satisfaction.",
      specialties: ["Project Management", "Client Relations", "Process Optimization"]
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "25+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "99.9%", label: "Uptime Guarantee" }
  ];

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      getAboutPageSchema(),
      getLocalBusinessSchema()
    ]
  };

  return (
    <>
      <SEO 
        title="About Us - Our Story, Mission & Team"
        description="Learn about Proxima Cloud's mission, vision, and expertise in cloud solutions. Meet our team of technology experts and discover our values."
        keywords="about proxima cloud, cloud experts, technology team, company mission, cloud consulting team"
        structuredData={combinedSchema}
      />
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tighter">
            About <span className="gradient-text">Proxima Cloud</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We're a passionate team of technologists dedicated to bridging the gap between 
            complex technology and business needs, helping organizations thrive in the digital age.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-slate-400 text-lg">
              <p>
                Founded in 2019 by a team of passionate technologists, Proxima Cloud emerged from 
                a simple observation: many businesses struggle to navigate the complex landscape 
                of cloud technologies and modern development practices.
              </p>
              <p>
                Our founders, having worked at leading tech companies, recognized the need for a 
                consultancy that could translate cutting-edge technology into practical, business-focused 
                solutions. We named ourselves after Proxima Centauri, the closest star to our solar system, 
                symbolizing our commitment to being the nearest, most accessible technology partner for our clients.
              </p>
              <p>
                Today, we've grown into a team of experts specializing in cloud migration, web development, 
                mobile applications, and digital transformation. Our mission remains the same: to provide 
                stellar service and innovative solutions that help our clients reach their full potential.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <img
              alt="Proxima Cloud team working"
              className="rounded-xl w-full"
              src={longLogo}
            />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-500/20 rounded-full -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full -z-10"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-slate-800 rounded-3xl p-8 md:p-12 mb-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-teal-400 mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="card p-8">
            <div className="flex items-center mb-6">
              <RocketLaunchIcon className="text-4xl text-teal-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed">
              To empower businesses with innovative cloud solutions and cutting-edge development services 
              that drive growth, efficiency, and competitive advantage. We strive to make advanced 
              technology accessible and manageable for organizations of all sizes.
            </p>
          </div>
          <div className="card p-8">
            <div className="flex items-center mb-6">
              <PublicIcon className="text-4xl text-teal-400 mr-4" />
              <h2 className="text-3xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed">
              To be the leading technology partner that organizations trust to navigate their digital 
              transformation journey. We envision a world where technology serves as a catalyst for 
              innovation, growth, and positive change across all industries.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              These core principles guide everything we do and define how we work with our clients and each other.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              <GroupIcon className="mr-3" />
              Meet Our Team
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Our diverse team of experts brings together decades of combined experience in 
              technology, business, and innovation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-teal-400 mb-3">{member.role}</p>
                <p className="text-slate-400 text-sm mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.specialties.map((specialty, idx) => (
                    <span key={idx} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Partnerships */}
        <div className="bg-slate-800 rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Certifications & Partnerships</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We maintain industry-leading certifications and partnerships to ensure we deliver the highest quality solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <SecurityIcon className="text-4xl text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Security Certified</h3>
              <p className="text-slate-400">ISO 27001, SOC 2, and industry security standards compliance</p>
            </div>
            <div className="p-6">
              <VerifiedIcon className="text-4xl text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Cloud Partners</h3>
              <p className="text-slate-400">Certified partners with AWS, Azure, and Google Cloud Platform</p>
            </div>
            <div className="p-6">
              <TrendingUpIcon className="text-4xl text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Agile Certified</h3>
              <p className="text-slate-400">Scrum Master and Agile project management certifications</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Let's work together to transform your business with technology that drives results. 
            Get in touch to discuss your project and see how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              <span>Get In Touch</span>
              <RocketLaunchIcon />
            </Link>
            <Link to="/services" className="secondary-btn">
              View Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
