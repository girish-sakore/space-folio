import { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  loading = 'lazy',
  placeholder = '/images/placeholder.svg',
  onError = null,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef();

  useEffect(() => {
    if (priority || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  // Generate srcset for responsive images
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return '';
    
    const srcSets = [
      `${baseSrc}?w=480&q=${quality} 480w`,
      `${baseSrc}?w=768&q=${quality} 768w`,
      `${baseSrc}?w=1200&q=${quality} 1200w`,
      `${baseSrc}?w=1920&q=${quality} 1920w`
    ];
    
    return srcSets.join(', ');
  };

  // Ensure alt text is descriptive for SEO
  const getAltText = () => {
    if (!alt || alt.trim() === '') {
      console.warn('Missing alt text for image:', src);
      return 'Image'; // Fallback, but should be avoided
    }
    return alt;
  };

  const imageProps = {
    ref: imgRef,
    alt: getAltText(),
    className: `${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`,
    onLoad: handleLoad,
    onError: handleError,
    loading: priority ? 'eager' : loading,
    decoding: 'async',
    ...(width && { width }),
    ...(height && { height }),
    ...(sizes && { sizes })
  };

  return (
    <div className="relative overflow-hidden">
      {/* Placeholder/Loading state */}
      {!isLoaded && !hasError && (
        <div className={`${className} bg-slate-200 animate-pulse flex items-center justify-center`}>
          <svg 
            className="w-8 h-8 text-slate-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      )}

      {/* Main Image */}
      {isInView && !hasError && (
        <img
          {...imageProps}
          src={src}
          srcSet={generateSrcSet(src)}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className={`${className} bg-slate-100 flex items-center justify-center`}>
          <div className="text-slate-500 text-center p-4">
            <svg 
              className="w-12 h-12 mx-auto mb-2 text-slate-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
