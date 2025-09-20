import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website',
  structuredData = null,
  canonicalUrl = null,
  noindex = false 
}) => {
  const location = useLocation();
  const currentUrl = `https://proximacloud.com${location.pathname}`;
  
  const defaultTitle = 'Proxima Cloud - Cloud Solutions & Web Development Services';
  const defaultDescription = 'Professional cloud migration, web development, mobile apps, and digital transformation services. Expert technology solutions for modern businesses.';
  const defaultImage = 'https://proximacloud.com/images/og-image.png';
  const defaultKeywords = 'cloud migration, web development, mobile apps, cloud solutions, digital transformation, AWS, Azure, React, Node.js, technology consulting';
  
  const pageTitle = title ? `${title} | Proxima Cloud` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageImage = image || defaultImage;
  const pageKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
  const pageCanonicalUrl = canonicalUrl || currentUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:alt" content={title || 'Proxima Cloud Services'} />
      <meta property="og:site_name" content="Proxima Cloud" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={pageImage} />
      <meta property="twitter:image:alt" content={title || 'Proxima Cloud Services'} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
