import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import blogPostsContent from '../data/blogPost';
import {
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

const BlogPost = ({ onTagClick }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPostsContent.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!post) {
    return (
      <div className="text-center py-20 text-white">
        <h1 className="text-3xl font-bold mb-4">Blog post not found</h1>
        <button
          onClick={() => navigate('/blog')}
          className="mt-4 px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-400 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto py-20 px-4 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/blog')}
        className="flex items-center gap-2 mb-8 text-teal-400 hover:text-teal-300 transition-colors"
      >
        <ArrowBackIcon /> Back to Blog
      </button>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

      {/* Author & Meta */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-slate-400">
        <div className="flex items-center gap-2">
          <PersonIcon fontSize="small" /> {post.author?.name || 'Admin'}
        </div>
        {post.readTime && (
          <div className="flex items-center gap-2">
            <AccessTimeIcon fontSize="small" /> {post.readTime}
          </div>
        )}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <span
              key={tag}
              onClick={() => onTagClick && onTagClick(tag)}
              className="cursor-pointer bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm hover:bg-teal-500 hover:text-white transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Blog Content */}
      <div
        className="prose prose-invert max-w-3xl mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Share Buttons */}
      <div className="flex flex-wrap gap-4 mt-8">
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition-colors"
        >
          Share on Twitter
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?url=${window.location.href}&title=${post.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Share on LinkedIn
        </a>
      </div>
    </motion.div>
  );
};

export default BlogPost;
