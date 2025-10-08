import teamMembers from './teamMembers';

const blogPosts = [
  {
    id: 1,
    title: 'Introducing CorruptZero: An AI-Powered App to Combat Corruption in India',
    slug: 'introducing-corruptzero-ai-powered-app-combat-corruption-india',
    excerpt: 'An AI-powered mobile app designed to empower citizens to report corruption anonymously and efficiently in India.',
    category: 'AI',
    author: teamMembers[0],
    readTime: '8 min read',
    featured: true,
    tags: ['AI', 'Civic Tech', 'Anti-Corruption', 'Mobile App', 'Digital India', 'Flutter', 'Social Impact'],
  },
  {
    id: 2,
    title: "The Future of Cloud-Native Applications",
    slug: "future-of-cloud-native-applications",
    excerpt: "Exploring how cloud-native architectures are revolutionizing software development and deployment strategies.",
    category: 'cloud',
    author: teamMembers[0],
    readTime: '8 min read',
    featured: false,
    tags: ['Cloud', 'Microservices', 'Kubernetes', 'DevOps']
  },
  {
    id: 3,
    title: "Building Scalable APIs with Modern Architecture",
    slug: "building-scalable-apis-modern-architecture",
    excerpt: "Best practices for designing and implementing APIs that can handle millions of requests efficiently.",
    category: 'development',
    author: teamMembers[1],
    readTime: '12 min read',
    featured: false,
    tags: ['API', 'Architecture', 'Scalability', 'Performance']
  },
  {
    id: 4,
    title: "Zero Trust Security in Cloud Environments",
    slug: "zero-trust-security-cloud-environments",
    excerpt: "Implementing comprehensive security strategies that assume no implicit trust in cloud infrastructures.",
    category: 'security',
    author: teamMembers[0],
    readTime: '10 min read',
    featured: true,
    tags: ['Security', 'Zero Trust', 'Cloud', 'Compliance']
  },
  {
    id: 5,
    title: "Data Analytics Trends in 2025",
    slug: "data-analytics-trends-2025",
    excerpt: "Explore the upcoming trends in big data, analytics, and AI-driven insights for businesses.",
    category: 'data',
    author: teamMembers[1],
    readTime: '9 min read',
    featured: false,
    tags: ['Data', 'AI', 'Analytics']
  },
  {
    id: 6,
    title: "Serverless Computing: Pros & Cons",
    slug: "serverless-computing-pros-cons",
    excerpt: "Analyzing the benefits and limitations of serverless architectures for modern applications.",
    category: 'cloud',
    author: teamMembers[0],
    readTime: '7 min read',
    featured: false,
    tags: ['Cloud', 'Serverless', 'Architecture']
  },
  {
    id: 7,
    title: "Top 10 JavaScript Frameworks in 2025",
    slug: "top-10-javascript-frameworks-2025",
    excerpt: "A comprehensive guide to the most popular and emerging JavaScript frameworks for developers.",
    category: 'development',
    author: teamMembers[1],
    readTime: '11 min read',
    featured: false,
    tags: ['JavaScript', 'React', 'Vue', 'Frameworks']
  },
  {
    id: 8,
    title: "AI-Driven Cybersecurity Solutions",
    slug: "ai-driven-cybersecurity-solutions",
    excerpt: "Leveraging artificial intelligence to detect threats and strengthen organizational security posture.",
    category: 'security',
    author: teamMembers[0],
    readTime: '10 min read',
    featured: false,
    tags: ['AI', 'Cybersecurity', 'Threat Detection']
  },
  {
    id: 9,
    title: "Modern Data Warehousing Strategies",
    slug: "modern-data-warehousing-strategies",
    excerpt: "Learn about cloud-based data warehouses, ETL pipelines, and best practices for analytics teams.",
    category: 'data',
    author: teamMembers[1],
    readTime: '9 min read',
    featured: false,
    tags: ['Data', 'ETL', 'Warehousing', 'Analytics']
  },
  {
    id: 10,
    title: "Top DevOps Tools You Should Know",
    slug: "top-devops-tools",
    excerpt: "An overview of essential DevOps tools for CI/CD, automation, monitoring, and collaboration.",
    category: 'development',
    author: teamMembers[0],
    readTime: '8 min read',
    featured: false,
    tags: ['DevOps', 'CI/CD', 'Automation']
  },
  {
    id: 11,
    title: "Emerging Cloud Security Challenges",
    slug: "emerging-cloud-security-challenges",
    excerpt: "Identifying new security threats in cloud environments and how to mitigate them effectively.",
    category: 'security',
    author: teamMembers[1],
    readTime: '12 min read',
    featured: false,
    tags: ['Cloud', 'Security', 'Threats']
  }
];

export default blogPosts;
