import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Article as ArticleIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  Code as CodeIcon,
  Cloud as CloudIcon,
  Security as SecurityIcon,
  DataObject as DataObjectIcon,
  Search as SearchIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getWebPageSchema } from '../utils/structuredData';
import teamMembers from '../data/teamMembers';
import blogPosts from '../data/blog';


const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2); // Initial number of visible posts

  const categories = [
    { id: 'all', name: 'All Posts', icon: <ArticleIcon /> },
    { id: 'cloud', name: 'Cloud Computing', icon: <CloudIcon /> },
    { id: 'development', name: 'Development', icon: <CodeIcon /> },
    { id: 'security', name: 'Security', icon: <SecurityIcon /> },
    { id: 'data', name: 'Data & Analytics', icon: <DataObjectIcon /> },
    { id: 'trends', name: 'Tech Trends', icon: <TrendingUpIcon /> }
  ];


  // Filter posts by category & search
  useEffect(() => {
    let filtered = blogPosts;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPosts(filtered);
    setVisibleCount(2); // Reset visible count on filter/search change
  }, [selectedCategory, searchTerm]);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const pageSchema = getWebPageSchema(
    "Blog & Insights - ProximaCloud",
    "Stay updated with the latest insights on cloud computing, software development, security, and technology trends from our expert team.",
    "https://proximacloud.com/blog"
  );

  // Load more posts handler
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  return (
    <>
      <SEO 
        title="Blog & Insights - ProximaCloud"
        description="Stay updated with the latest insights on cloud computing, software development, security, and technology trends from our expert team."
        keywords="cloud computing blog, software development insights, technology trends, security best practices, data analytics"
        structuredData={pageSchema}
      />

      <div className="py-20">
        <div className="container mx-auto px-4">

          {/* Hero Section */}
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <ArticleIcon className="text-6xl text-teal-400 mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Blog & <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Stay updated with the latest insights, best practices, and trends in cloud computing, software development, and emerging technologies.
            </p>
          </motion.div>

          {/* Search and Categories */}
          <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="relative max-w-md mx-auto mb-8">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <motion.button
                  key={category.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}{category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Featured Posts (No Images) */}
          {selectedCategory === 'all' && !searchTerm && featuredPosts.length > 0 && (
            <motion.section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">Featured Articles</h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {featuredPosts.map(post => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-teal-400 transition-colors"
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold text-white mb-2 hover:text-teal-400 transition-colors">{post.title}</h3>
                      <p className="text-slate-400 mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <PersonIcon fontSize="small" /> {post.author.name}
                        <AccessTimeIcon fontSize="small" /> {post.readTime}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Regular Posts with Load More */}
          <motion.section className="grid lg:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredPosts.filter(post => !post.featured).slice(0, visibleCount).map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <motion.article className="card overflow-hidden group cursor-pointer rounded-xl p-6 bg-slate-800 border border-slate-700 hover:border-teal-400 transition-colors" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">{post.title}</h3>
                      <p className="text-slate-400 mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <PersonIcon fontSize="small" /> {post.author.name}
                        <AccessTimeIcon fontSize="small" /> {post.readTime}
                      </div>
                      <div className="flex items-center text-teal-400 font-medium mt-3">
                        Read More
                        <ArrowForwardIcon className="ml-2" fontSize="small" />
                      </div>
                    </motion.article>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.section>

          {/* Load More Button */}
          {visibleCount < filteredPosts.filter(post => !post.featured).length && (
            <div className="flex justify-center mt-8">
              <motion.button
                className="px-6 py-3 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-400 transition-colors"
                onClick={handleLoadMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More
              </motion.button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Blog;
