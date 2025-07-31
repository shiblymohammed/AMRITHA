import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

const HeritageHero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isLowBandwidth, setIsLowBandwidth] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false) // New state for lazy loading
  const [videoError, setVideoError] = useState(false) // Track video loading errors
  const heroRef = useRef(null)
  const videoContainerRef = useRef(null) // Ref for the video container to observe
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  // IntersectionObserver for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true)
            observer.disconnect() // Stop observing once video starts loading
          }
        })
      },
      {
        root: null, // Use viewport as root
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.1 // Trigger when 10% of the element is visible
      }
    )

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Check for reduced motion preference and bandwidth
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const connection = (navigator as any).connection
    
    if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
      setIsLowBandwidth(true)
    }
  }, [])

  // Handle video loading success
  const handleVideoLoad = () => {
    setVideoLoaded(true)
    setVideoError(false)
  }

  // Handle video loading error
  const handleVideoError = () => {
    setVideoError(true)
    setVideoLoaded(false)
  }

  // Animation variants - properly typed
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  } as const

  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  } as const

  const headlineVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      letterSpacing: "0.2em"
    },
    visible: {
      opacity: 1,
      y: 0,
      letterSpacing: "0.02em"
    }
  } as const

  const subheadingVariants = {
    hidden: { 
      opacity: 0, 
      x: 100 
    },
    visible: {
      opacity: 1,
      x: 0
    }
  } as const

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1
    },
    hover: {
      scale: 1.05
    },
    tap: {
      scale: 0.95
    }
  } as const

  const underlineVariants = {
    initial: { scaleX: 0, originX: 0 },
    hover: { 
      scaleX: 1
    }
  } as const

  // Loading skeleton animation
  const skeletonVariants = {
    initial: { opacity: 0.4 },
    animate: { 
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-slate-900"
    >
      {/* Background Video Container with Lazy Loading */}
      <motion.div 
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full"
        style={{ y: yVideo }}
      >
        {!shouldLoadVideo ? (
          // Loading Placeholder - shown before IntersectionObserver triggers
          <motion.div
            className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 flex items-center justify-center"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Elegant loading indicator */}
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-2 border-white/20 border-t-white/60 rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-white/60 text-sm font-light" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Loading Experience...
              </p>
            </div>
          </motion.div>
        ) : !isLowBandwidth ? (
          // Lazy-loaded Video - only renders when shouldLoadVideo is true
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full relative"
          >
            {!videoLoaded && !videoError && (
              // Video loading skeleton
              <motion.div
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 flex items-center justify-center z-10"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-12 h-12 border-2 border-teal-400/40 border-t-teal-400/80 rounded-full mx-auto mb-3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-white/60 text-xs font-light" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Loading Video...
                  </p>
                </div>
              </motion.div>
            )}

            <motion.video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ 
                scale: videoLoaded ? 1.05 : 1,
                opacity: videoLoaded ? 1 : 0
              }}
              transition={{ 
                scale: {
                  duration: 20, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "linear"
                },
                opacity: {
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
            >
              {/* Video sources - these will only load when shouldLoadVideo is true */}
              <source src="/assets/video/hero.mp4" type="video/mp4" />
              <source src="/path/to/your/heritage-hotel-video.webm" type="video/webm" />
            </motion.video>

            {/* Fallback image for video load failure */}
            {videoError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url('/path/to/your/heritage-hotel-hero-image.jpg')`,
                }}
              >
                <div className="absolute inset-0 bg-slate-900/20" />
              </motion.div>
            )}
          </motion.div>
        ) : (
          // Low bandwidth fallback - static image
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('/path/to/your/heritage-hotel-hero-image.jpg')`,
            }}
          />
        )}
        
        {/* Ambient light flicker overlay - only show when video is loaded or fallback is shown */}
        {(videoLoaded || videoError || isLowBandwidth) && (
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-teal-400/10 via-transparent to-transparent"
            animate={{
              opacity: [0.2, 0.4, 0.3, 0.5, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/70" />
      
      {/* Teal accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-transparent to-cyan-900/20" />

      {/* Content Container */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ y: yText }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center max-w-6xl mx-auto">
          {/* Subtitle */}
          <motion.p
            variants={subtitleVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-white/70 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6 font-light tracking-wide px-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Wellness & Spa Hotel Amritha Heritage
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            variants={headlineVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light text-white mb-4 sm:mb-6 md:mb-8 leading-tight px-4"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
            }}
          >
            <span className="block text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">Step into History at</span>
            <span className="font-normal block">Amritha Heritage</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={subheadingVariants}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-12 md:mb-16 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-light px-4"
            style={{ 
              fontFamily: "'Poppins', sans-serif",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
            }}
          >
            Where the elegance of colonial Travancore meets modern comfort 
            in the heart of Thiruvananthapuram.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-6 justify-center items-center px-4"
            variants={containerVariants}
          >
            {/* Primary CTA */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group relative px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-medium border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 w-full xs:w-auto max-w-xs"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="relative z-10 text-xs xs:text-sm sm:text-base">Explore Rooms</span>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-white"
                variants={underlineVariants}
                initial="initial"
                whileHover="hover"
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ width: '100%' }}
              />
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group relative px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 bg-transparent text-white font-medium border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 w-full xs:w-auto max-w-xs"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="relative z-10 text-xs xs:text-sm sm:text-base">Dine at Kohinoor</span>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-white"
                variants={underlineVariants}
                initial="initial"
                whileHover="hover"
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ width: '100%' }}
              />
            </motion.button>
          </motion.div>

          {/* Award Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 sm:mt-12 md:mt-16 flex justify-center"
          >
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 border border-white/30 rounded-full flex items-center justify-center">
                <div className="text-white/70 text-xs sm:text-sm">★★★★★</div>
              </div>
              <p className="text-white/60 text-xs sm:text-sm font-light">
                Tripadvisor<br />
                <span className="text-xs">CHOICE AWARDS<br />2023</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/40 text-center"
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border border-white/30 rounded-full mx-auto flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-0.5 h-2 sm:w-1 sm:h-3 bg-white/40 rounded-full mt-1.5 sm:mt-2"
            />
          </div>
          <p className="text-xs mt-1 sm:mt-2 font-light hidden xs:block" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Scroll to explore
          </p>
        </motion.div>
      </motion.div>

      {/* Side Info Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute left-3 sm:left-4 md:left-6 bottom-12 sm:bottom-16 md:bottom-20 text-white/60 text-sm hidden sm:block"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-white/30 rounded-full flex items-center justify-center mb-3 sm:mb-4">
          <span className="text-xs font-medium">INFO</span>
        </div>
      </motion.div>
    </section>
  )
}

export default HeritageHero