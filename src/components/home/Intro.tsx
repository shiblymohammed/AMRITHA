import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// TypeScript Interfaces
interface SubCategory {
  name: string;
  subtitle: string;
  image: string;
}

interface Accommodation {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  subCategories: SubCategory[];
}

interface LoadedImages {
  [key: string]: boolean;
}

interface ImageErrors {
  [key: string]: boolean;
}

interface AccommodationCardProps {
  item: Accommodation;
  index: number;
  isInView: boolean;
  loadedImages: LoadedImages;
  imageErrors: ImageErrors;
  activeCard: string | null;
  setActiveCard: (id: string | null) => void;
}

// Custom hook for responsive dimensions
const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = useState({
    height: 320,
    hoverHeight: 336,
    lineWidth: 64,
    hoverLineWidth: 80
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth >= 1024) {
        setDimensions({
          height: 480,
          hoverHeight: 500,
          lineWidth: 80,
          hoverLineWidth: 100
        });
      } else if (window.innerWidth >= 768) {
        setDimensions({
          height: 420,
          hoverHeight: 440,
          lineWidth: 80,
          hoverLineWidth: 100
        });
      } else if (window.innerWidth >= 640) {
        setDimensions({
          height: 384,
          hoverHeight: 400,
          lineWidth: 64,
          hoverLineWidth: 80
        });
      } else {
        setDimensions({
          height: 320,
          hoverHeight: 336,
          lineWidth: 64,
          hoverLineWidth: 80
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
};

const OtelloHotelInterface = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [loadedImages, setLoadedImages] = useState<LoadedImages>({});
  const [imageErrors, setImageErrors] = useState<ImageErrors>({});
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const accommodations: Accommodation[] = [
    {
      id: 'rooms',
      title: 'Rooms',
      subtitle: 'DISCOVER YOUR PERFECT ROOM WITH US',
      description: 'Elegant chambers designed for ultimate comfort',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1600&auto=format&fit=crop',
      subCategories: [
        {
          name: 'Suites',
          subtitle: 'EXPERIENCE SUITE LUXURY AT ITS BEST',
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop'
        },
        {
          name: 'Villas',
          subtitle: 'PRIVATE VILLAS FOR YOUR EXCLUSIVE RETREAT',
          image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1600&auto=format&fit=crop'
        }
      ]
    },
    {
      id: 'dining',
      title: 'Dining',
      subtitle: 'EXCEPTIONAL CULINARY EXPERIENCES AWAIT',
      description: 'World-class cuisine in elegant settings',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop',
      subCategories: [
        {
          name: 'Fine Dining',
          subtitle: 'MICHELIN-STARRED CULINARY EXCELLENCE',
          image: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1600&auto=format&fit=crop'
        },
        {
          name: 'Bar & Lounge',
          subtitle: 'CRAFTED COCKTAILS IN INTIMATE SETTINGS',
          image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1600&auto=format&fit=crop'
        }
      ]
    },
    {
      id: 'events',
      title: 'Events',
      subtitle: 'MEMORABLE CELEBRATIONS & GATHERINGS',
      description: 'Sophisticated venues for special occasions',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600&auto=format&fit=crop',
      subCategories: [
        {
          name: 'Weddings',
          subtitle: 'YOUR PERFECT DAY IN ELEGANT SURROUNDINGS',
          image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?q=80&w=1600&auto=format&fit=crop'
        },
        {
          name: 'Conferences',
          subtitle: 'PROFESSIONAL MEETINGS WITH LUXURY COMFORT',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop'
        }
      ]
    }
  ];

  // Preload all images with error handling
  useEffect(() => {
    const preloadImage = (src: string, id: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => ({ ...prev, [id]: true }));
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          setImageErrors(prev => ({ ...prev, [id]: true }));
          reject(new Error(`Failed to load image: ${src}`));
        };
        img.src = src;
      });
    };

    const preloadAllImages = async () => {
      try {
        setIsLoading(true);
        const promises: Promise<void>[] = [];
        
        // Preload main images
        accommodations.forEach(item => {
          promises.push(preloadImage(item.image, item.id));
          // Preload subcategory images
          item.subCategories?.forEach(subItem => {
            promises.push(preloadImage(subItem.image, `${item.id}-${subItem.name}`));
          });
        });
        
        await Promise.allSettled(promises);
      } catch (error) {
        console.error('Error preloading images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    preloadAllImages();
  }, []);

  return (
    <div className="min-h-screen bg-[#1C1C1C] relative overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1C1C1C] z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-[#B8A483] border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-[#DCD4CB] font-light" style={{ fontFamily: 'Work Sans, sans-serif' }}>
              Loading Experience...
            </p>
          </div>
        </motion.div>
      )}

      {/* Top Gap and Logo Section */}
      <div className="pt-24 pb-16 relative">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.25, 0.25, 1] }}
          className="flex justify-center mb-8 relative z-10"
        >
          <div className="relative">
            <img 
              src="/assets/logo/logoGold.png" 
              alt="Otello Hotel Logo" 
              className="w-32 h-32 object-contain"
            />
          </div>
        </motion.div>

        {/* Horizontal Lines extending from logo center to page sides */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left Horizontal Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.25, 0.25, 1] }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2"
          >
            <div 
              className="h-1 bg-gradient-to-r from-[#B8A483] to-transparent ml-auto"
              style={{ 
                background: 'linear-gradient(to right, #B8A483 0%, transparent 100%)',
                width: 'calc(50% - 4rem)' // Extends from logo center to left edge
              }}
            />
          </motion.div>

          {/* Right Horizontal Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.25, 0.25, 1] }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2"
          >
            <div 
              className="h-1 bg-gradient-to-l from-[#B8A483] to-transparent mr-auto"
              style={{ 
                background: 'linear-gradient(to left, #B8A483 0%, transparent 100%)',
                width: 'calc(50% - 4rem)' // Extends from logo center to right edge
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main 
        ref={sectionRef}
        className="pb-32"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(184, 164, 131, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(80, 77, 74, 0.05) 0%, transparent 50%)',
        }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.25, 0.25, 1] }}
          className="text-center mb-20 px-4 sm:px-6"
        >
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-8 text-[#DCD4CB] leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Experience Unmatched
            <br />
            <span className="text-[#B8A483] italic">Comfort & Luxury</span>
          </h1>
          
          <p 
            className="text-base sm:text-lg md:text-xl text-[#9A9289] max-w-2xl mx-auto leading-relaxed font-light"
            style={{ fontFamily: 'Work Sans, sans-serif' }}
          >
            Escape to a world of sophistication and<br className="hidden sm:block" />
            serene Otello's beauty.
          </p>
        </motion.div>

        {/* Stacked Cards Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-6 md:space-y-8">
            {accommodations.map((item, index) => (
              <AccommodationCard
                key={item.id}
                item={item}
                index={index}
                isInView={isInView}
                loadedImages={loadedImages}
                imageErrors={imageErrors}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Grain Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

const AccommodationCard: React.FC<AccommodationCardProps> = ({ 
  item, 
  index, 
  isInView, 
  loadedImages, 
  imageErrors,
  activeCard, 
  setActiveCard 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredSubCard, setHoveredSubCard] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { height, hoverHeight, lineWidth, hoverLineWidth } = useResponsiveDimensions();

  const handleCardClick = () => {
    if (activeCard === item.id) {
      setActiveCard(null);
      setIsExpanded(false);
    } else {
      setActiveCard(item.id);
      setIsExpanded(true);
    }
  };

  // Fallback gradient for failed images
  const getFallbackGradient = (id: string) => {
    const gradients = {
      'rooms': 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
      'dining': 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
      'events': 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)'
    };
    return gradients[id as keyof typeof gradients] || gradients.rooms;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.3, ease: [0.25, 0.25, 0.25, 1] }}
      className="relative"
    >
      {/* Main Card */}
      <motion.div
        className="relative h-80 sm:h-96 md:h-[420px] lg:h-[480px] border-2 border-[#403F3E] cursor-pointer overflow-hidden group"
        style={{ margin: '2px' }}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4 }}
        animate={{
          borderColor: isExpanded ? '#B8A483' : isHovered ? '#666' : '#403F3E',
          height: isHovered ? hoverHeight : height
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${item.title} - ${item.subtitle}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          {loadedImages[item.id] && !imageErrors[item.id] && (
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.05, opacity: 1 }}
              animate={{ 
                scale: isHovered ? 1 : 1.05, 
                opacity: 1
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.25, 0.25, 1] }}
            />
          )}
          
          {/* Fallback gradient for failed images */}
          {imageErrors[item.id] && (
            <div 
              className="w-full h-full"
              style={{ background: getFallbackGradient(item.id) }}
            />
          )}
          
          {/* Curtain Reveal Overlay - Opens top to bottom, closes bottom to top */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-[#1C1C1C]/95 to-[#1C1C1C]/90"
            initial={{ y: "0%" }}
            animate={{ y: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 1] }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-8 md:px-12">
          <motion.div
            className="text-center"
            animate={{
              y: isExpanded ? -20 : isHovered ? -10 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.25, 0.25, 1] }}
          >
            <motion.h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-4 md:mb-6 text-[#DCD4CB]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
              animate={{
                scale: isHovered ? 1.05 : 1,
                color: isHovered ? '#F5F1EB' : '#DCD4CB'
              }}
              transition={{ duration: 0.3 }}
            >
              {item.title}
            </motion.h2>
            
            <motion.div 
              className="h-0.5 bg-[#B8A483] mx-auto mb-4 md:mb-6"
              animate={{
                width: isHovered ? hoverLineWidth : lineWidth,
                backgroundColor: isHovered ? '#D4C4A8' : '#B8A483'
              }}
              transition={{ duration: 0.4 }}
            />
            
            <motion.p 
              className="text-xs sm:text-sm tracking-[0.15em] text-[#9A9289] font-light"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
              animate={{
                opacity: isHovered ? 1 : 0.8,
                y: isHovered ? -5 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {item.subtitle}
            </motion.p>

            {/* Additional description on hover */}
            <motion.p
              className="text-sm sm:text-base text-[#B8A483] font-light mt-4 leading-relaxed max-w-lg mx-auto"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : 20 
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {item.description}
            </motion.p>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 border-2 border-[#B8A483] opacity-0"
          animate={{ opacity: isHovered ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Expanded Sub-cards */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease: [0.25, 0.25, 0.25, 1] }}
        className="overflow-hidden"
      >
        <div className="space-y-2 pt-2">
          {item.subCategories?.map((subItem, subIndex) => (
            <motion.div
              key={subItem.name}
              initial={{ opacity: 0, x: -30 }}
              animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: subIndex * 0.15 }}
              className="relative h-64 sm:h-72 md:h-80 lg:h-96 border-2 border-[#403F3E] cursor-pointer overflow-hidden group"
              style={{ margin: '2px' }}
              onMouseEnter={() => setHoveredSubCard(subItem.name)}
              onMouseLeave={() => setHoveredSubCard(null)}
              role="button"
              tabIndex={0}
              aria-label={`${subItem.name} - ${subItem.subtitle}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Handle sub-card click if needed
                }
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                {loadedImages[`${item.id}-${subItem.name}`] && !imageErrors[`${item.id}-${subItem.name}`] && (
                  <motion.img
                    src={subItem.image}
                    alt={subItem.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.05, opacity: 1 }}
                    animate={{ 
                      scale: hoveredSubCard === subItem.name ? 1 : 1.05, 
                      opacity: 1
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.25, 0.25, 1] }}
                  />
                )}
                
                {/* Fallback gradient for failed sub-images */}
                {imageErrors[`${item.id}-${subItem.name}`] && (
                  <div 
                    className="w-full h-full"
                    style={{ background: getFallbackGradient(item.id) }}
                  />
                )}
                
                {/* Curtain Reveal for Sub-cards - Opens top to bottom, closes bottom to top */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-[#1C1C1C]/95 to-[#1C1C1C]/90"
                  initial={{ y: "0%" }}
                  animate={{ y: hoveredSubCard === subItem.name ? "100%" : "0%" }}
                  transition={{ duration: 0.7, ease: [0.25, 0.25, 0.25, 1] }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-8 md:px-12">
                <motion.div
                  className="text-center"
                  animate={{
                    y: hoveredSubCard === subItem.name ? -12 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 md:mb-4 text-[#DCD4CB]"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    animate={{
                      scale: hoveredSubCard === subItem.name ? 1.03 : 1,
                      color: hoveredSubCard === subItem.name ? '#F5F1EB' : '#DCD4CB'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {subItem.name}
                  </motion.h3>
                  
                  <motion.div 
                    className="h-0.5 bg-[#B8A483] mx-auto mb-3 md:mb-4"
                    animate={{
                      width: hoveredSubCard === subItem.name ? (lineWidth * 0.8) : (lineWidth * 0.6),
                      backgroundColor: hoveredSubCard === subItem.name ? '#D4C4A8' : '#B8A483'
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <motion.p 
                    className="text-xs sm:text-sm tracking-[0.12em] text-[#9A9289] font-light"
                    style={{ fontFamily: 'Work Sans, sans-serif' }}
                    animate={{
                      opacity: hoveredSubCard === subItem.name ? 1 : 0.8,
                      y: hoveredSubCard === subItem.name ? -3 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {subItem.subtitle}
                  </motion.p>
                </motion.div>
              </div>

              {/* Hover Border Glow */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent"
                animate={{
                  borderColor: hoveredSubCard === subItem.name ? '#B8A483' : 'transparent',
                  boxShadow: hoveredSubCard === subItem.name ? '0 0 30px rgba(184, 164, 131, 0.2)' : '0 0 0px rgba(184, 164, 131, 0)'
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OtelloHotelInterface;













































