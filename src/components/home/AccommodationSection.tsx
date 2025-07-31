// import React, { useRef, useEffect, useState } from "react";
// import { motion, useMotionValue, useTransform, useScroll, useSpring, useInView } from "framer-motion";

// const accommodations = [
//   {
//     id: "presidential-suite",
//     title: "Presidential Suite",
//     subtitle: "Ultimate Luxury Experience",
//     price: "from 850 € / person / 2 nights",
//     image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
//     features: ["Ocean View", "Private Balcony", "Butler Service"],
//   },
//   {
//     id: "infinity-pool-villa",
//     title: "Infinity Pool Villa",
//     subtitle: "Private Paradise",
//     price: "from 650 € / person / 2 nights",
//     image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
//     features: ["Private Pool", "Garden View", "Spa Access"],
//   },
//   {
//     id: "relax-spa",
//     title: "Relax & Spa Suite",
//     subtitle: "Sunday - Thursday",
//     price: "from 450 € / person / 2 nights",
//     image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
//     features: ["Spa Access", "Wellness Package", "Meditation Room"],
//   },
//   {
//     id: "luxury-suite",
//     title: "Luxury Mountain Suite",
//     subtitle: "Friday - Saturday",
//     price: "from 350 € / person / 2 nights",
//     image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
//     features: ["Mountain View", "Fireplace", "Premium Amenities"],
//   },
//   {
//     id: "family-getaway",
//     title: "Family Getaway",
//     subtitle: "All Week",
//     price: "from 280 € / person / 2 nights",
//     image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
//     features: ["Family Room", "Kids Activities", "Connecting Rooms"],
//   },
// ];

// const AccommodationSection = () => {
//   const containerRef = useRef(null);
//   const carouselRef = useRef(null);
//   const heroRef = useRef(null);
//   const parallaxRef = useRef(null);
  
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });
  
//   const { scrollYProgress: heroProgress } = useScroll({
//     target: heroRef,
//     offset: ["start end", "end start"]
//   });
  
//   const { scrollYProgress: parallaxProgress } = useScroll({
//     target: parallaxRef,
//     offset: ["start end", "end start"]
//   });
  
//   const isInView = useInView(containerRef, { once: false, amount: 0.1 });
//   const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  
//   // Smooth spring animations
//   const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
//   const heroSmoothProgress = useSpring(heroProgress, { stiffness: 100, damping: 30 });
//   const parallaxSmoothProgress = useSpring(parallaxProgress, { stiffness: 100, damping: 30 });
  
//   // Transform values for parallax effects
//   const y = useTransform(smoothProgress, [0, 1], [0, -200]);
//   const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
//   const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
//   const heroY = useTransform(heroSmoothProgress, [0, 1], [0, -300]);
//   const heroScale = useTransform(heroSmoothProgress, [0, 0.5, 1], [1.2, 1, 0.9]);
//   const heroOpacity = useTransform(heroSmoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
//   const parallaxY = useTransform(parallaxSmoothProgress, [0, 1], [0, -400]);
//   const parallaxScale = useTransform(parallaxSmoothProgress, [0, 1], [1.1, 1]);
  
//   // Carousel drag constraints
//   const x = useMotionValue(0);
//   const dragConstraints = { left: -((accommodations.length - 1) * 420), right: 0 };
  
//   // Mouse tracking for interactive effects
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth) * 2 - 1,
//         y: (e.clientY / window.innerHeight) * 2 - 1,
//       });
//     };
    
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);
  
//   const mouseX = useTransform(useMotionValue(mousePosition.x), [-1, 1], [-50, 50]);
//   const mouseY = useTransform(useMotionValue(mousePosition.y), [-1, 1], [-30, 30]);

//   return (
//     <div className="bg-[#0A0A0A] w-full min-h-[400vh] relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 pointer-events-none">
//         <motion.div
//           className="absolute top-20 left-10 w-2 h-2 bg-[#B8A483] rounded-full opacity-20"
//           animate={{
//             y: [0, -100, 0],
//             x: [0, 50, 0],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-40 right-16 w-1 h-1 bg-[#B8A483] rounded-full opacity-15"
//           animate={{
//             y: [0, 80, 0],
//             x: [0, -30, 0],
//           }}
//           transition={{
//             duration: 6,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 2,
//           }}
//         />
//       </div>

//       {/* Hero Section */}
//       <motion.section
//         ref={heroRef}
//         className="relative h-screen flex items-center justify-center overflow-hidden"
//         style={{ opacity: heroOpacity }}
//       >
//         <motion.div
//           className="absolute inset-0"
//           style={{
//             y: heroY,
//             scale: heroScale,
//           }}
//         >
//           <img
//             src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
//             alt="Luxury Hotel"
//             className="w-full h-full object-cover"
//           />
//           {/* Stronger overlay for better text contrast */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />
//         </motion.div>
        
//         <motion.div
//           className="relative z-10 text-center px-6 max-w-4xl"
//           initial={{ opacity: 0, y: 100 }}
//           animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
//           transition={{ duration: 1.2, ease: "easeOut" }}
//         >
//           <motion.span
//             className="text-[#B8A483] text-sm md:text-lg font-light tracking-[0.3em] mb-6 block"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
//             transition={{ duration: 1, delay: 0.3 }}
//           >
//             LUXURY ACCOMMODATIONS
//           </motion.span>
          
//           <motion.h1
//             className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight"
//             style={{ fontFamily: "Cormorant Garamond, serif", textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
//             transition={{ duration: 1.5, delay: 0.5 }}
//           >
//             Experience
//             <br />
//             <span className="text-[#B8A483] italic">Perfection</span>
//           </motion.h1>
          
//           <motion.p
//             className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
//             transition={{ duration: 1, delay: 0.8 }}
//           >
//             Discover our collection of meticulously crafted accommodations, 
//             where every detail is designed to exceed your expectations.
//           </motion.p>
//         </motion.div>
//       </motion.section>

//       {/* Accommodation Showcase */}
//       <motion.section
//         ref={containerRef}
//         className="relative min-h-[200vh] py-32 px-4"
//         style={{ y, opacity, scale }}
//       >
//         <div className="max-w-7xl mx-auto">
//           {/* Section Header */}
//           <motion.div
//             className="text-center mb-20"
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
//             transition={{ duration: 1.2 }}
//           >
//             <motion.span
//               className="text-[#B8A483] text-sm md:text-base font-light tracking-[0.2em] mb-4 block"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: isInView ? 1 : 0 }}
//               transition={{ duration: 1, delay: 0.3 }}
//             >
//               OUR PREMIUM COLLECTION
//             </motion.span>
            
//             <motion.h2
//               className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6"
//               style={{ fontFamily: "Cormorant Garamond, serif" }}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
//               transition={{ duration: 1.2, delay: 0.5 }}
//             >
//               Curated Spaces
//             </motion.h2>
//           </motion.div>

//           {/* Enhanced Carousel */}
//           <div className="relative mb-32">
//             <div className="overflow-hidden">
//               <motion.div
//                 ref={carouselRef}
//                 className="flex gap-8 cursor-grab active:cursor-grabbing pb-8"
//                 drag="x"
//                 dragConstraints={dragConstraints}
//                 style={{ x }}
//                 dragElastic={0.1}
//                 dragTransition={{ bounceStiffness: 300, bounceDamping: 40 }}
//               >
//                 {accommodations.map((acc, idx) => (
//                   <motion.div
//                     key={acc.id}
//                     className="relative min-w-[350px] sm:min-w-[400px] lg:min-w-[450px] h-[600px] group"
//                     initial={{ opacity: 0, y: 100 }}
//                     animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
//                     transition={{ duration: 1, delay: idx * 0.2 }}
//                     whileHover={{ y: -20 }}
//                   >
//                     {/* Card Container */}
//                     <motion.div
//                       className="relative w-full h-full rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm border border-[#B8A483]/20 shadow-2xl"
//                       whileHover={{ scale: 1.02 }}
//                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                     >
//                       {/* Image with parallax */}
//                       <motion.div
//                         className="absolute inset-0 overflow-hidden"
//                         style={{
//                           x: mouseX,
//                           y: mouseY,
//                         }}
//                       >
//                         <motion.img
//                           src={acc.image}
//                           alt={acc.title}
//                           className="w-full h-full object-cover scale-110"
//                           whileHover={{ scale: 1.15 }}
//                           transition={{ duration: 0.8, ease: "easeOut" }}
//                         />
//                       </motion.div>
                      
//                       {/* Gradient Overlay */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      
//                       {/* Content */}
//                       <div className="relative z-10 flex flex-col justify-end h-full p-8">
//                         <motion.div
//                           initial={{ opacity: 0, y: 30 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.8, delay: idx * 0.1 + 0.3 }}
//                         >
//                           <span className="text-[#B8A483] text-sm font-light tracking-wider mb-2 block">
//                             {acc.subtitle}
//                           </span>
                          
//                           <h3
//                             className="text-2xl md:text-3xl font-light text-white mb-4 leading-tight"
//                             style={{ fontFamily: "Cormorant Garamond, serif" }}
//                           >
//                             {acc.title}
//                           </h3>
                          
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {acc.features.map((feature, fidx) => (
//                               <span
//                                 key={fidx}
//                                 className="text-xs text-[#B8A483] bg-[#B8A483]/10 px-3 py-1 rounded-full border border-[#B8A483]/20"
//                               >
//                                 {feature}
//                               </span>
//                             ))}
//                           </div>
                          
//                           <p className="text-[#B8A483] text-lg font-light mb-6">
//                             {acc.price}
//                           </p>
                          
//                           <motion.button
//                             className="bg-white/5 border border-[#B8A483] text-white px-8 py-3 rounded-full font-light text-sm flex items-center gap-2 hover:bg-[#B8A483] hover:text-[#0A0A0A] transition-all duration-300 backdrop-blur-sm"
//                             whileHover={{ scale: 1.05, y: -2 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             View Details
//                             <motion.span
//                               className="text-xs"
//                               animate={{ x: [0, 5, 0] }}
//                               transition={{ duration: 1.5, repeat: Infinity }}
//                             >
//                               →
//                             </motion.span>
//                           </motion.button>
//                         </motion.div>
//                       </div>
                      
//                       {/* Hover Effect Overlay */}
//                       <motion.div
//                         className="absolute inset-0 bg-[#B8A483]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                         initial={false}
//                       />
//                     </motion.div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>
            
//             <motion.div
//               className="text-center text-sm text-[#B8A483]/70 mt-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: isInView ? 1 : 0 }}
//               transition={{ duration: 1, delay: 1 }}
//             >
//               <span className="flex items-center justify-center gap-2">
//                 <motion.span
//                   animate={{ x: [-10, 10, -10] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   ←
//                 </motion.span>
//                 Drag to explore our luxury accommodations
//                 <motion.span
//                   animate={{ x: [10, -10, 10] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   →
//                 </motion.span>
//               </span>
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>

//       {/* Enhanced Parallax CTA Section */}
//       <motion.section
//         ref={parallaxRef}
//         className="relative h-screen flex items-center justify-center overflow-hidden"
//       >
//         <motion.div
//           className="absolute inset-0"
//           style={{
//             y: parallaxY,
//             scale: parallaxScale,
//           }}
//         >
//           <img
//             src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
//             alt="Luxury Resort"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
//         </motion.div>
        
//         <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-6 max-w-5xl mx-auto">
//           <motion.span
//             className="text-[#B8A483] text-sm md:text-base font-light tracking-[0.3em] mb-6 block"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
//             transition={{ duration: 1, delay: 0.2 }}
//           >
//             EXCLUSIVE BOOKING
//           </motion.span>
          
//           <motion.h2
//             className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight"
//             style={{ fontFamily: "Cormorant Garamond, serif" }}
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 100 }}
//             transition={{ duration: 1.2, delay: 0.4 }}
//           >
//             Your Journey to
//             <br />
//             <span className="text-[#B8A483] italic">Excellence</span>
//             <br />
//             Begins Here
//           </motion.h2>
          
//           <motion.p
//             className="text-white/80 text-lg md:text-xl font-light max-w-3xl mx-auto mb-12 leading-relaxed"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
//             transition={{ duration: 1, delay: 0.6 }}
//           >
//             Reserve your extraordinary escape and immerse yourself in unparalleled luxury. 
//             Every moment crafted to perfection, every detail designed to inspire.
//           </motion.p>
          
//           <motion.div
//             className="flex flex-col sm:flex-row gap-6 items-center"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
//             transition={{ duration: 1, delay: 0.8 }}
//           >
//             <motion.button
//               className="bg-[#B8A483] text-[#0A0A0A] px-12 py-4 rounded-full font-medium text-lg shadow-2xl hover:bg-[#a38c5c] transition-all duration-300 relative overflow-hidden group"
//               whileHover={{ scale: 1.05, y: -3 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <motion.span
//                 className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
//               />
//               <span className="relative">Book Your Stay</span>
//             </motion.button>
            
//             <motion.button
//               className="border-2 border-[#B8A483] text-[#B8A483] px-12 py-4 rounded-full font-light text-lg hover:bg-[#B8A483] hover:text-[#0A0A0A] transition-all duration-300 backdrop-blur-sm"
//               whileHover={{ scale: 1.05, y: -3 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Explore Amenities
//             </motion.button>
//           </motion.div>
          
//           <motion.div
//             className="mt-16 text-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: heroInView ? 1 : 0 }}
//             transition={{ duration: 1, delay: 1.2 }}
//           >
//             <motion.div
//               className="w-px h-16 bg-gradient-to-b from-transparent via-[#B8A483] to-transparent mx-auto mb-4"
//               animate={{ scaleY: [0, 1, 0] }}
//               transition={{ duration: 2, repeat: Infinity, delay: 1 }}
//             />
//             <span className="text-[#B8A483]/70 text-sm tracking-wider">
//               Scroll to discover more
//             </span>
//           </motion.div>
//         </div>
//       </motion.section>
//     </div>
//   );
// };

// export default AccommodationSection;




















import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll, useSpring, useInView } from "framer-motion";

const accommodations = [
  {
    id: "presidential-suite",
    title: "Presidential Suite",
    subtitle: "Ultimate Luxury Experience",
    price: "from 850 € / person / 2 nights",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    features: ["Ocean View", "Private Balcony", "Butler Service"],
    quote: "Where luxury meets perfection in every detail"
  },
  {
    id: "infinity-pool-villa",
    title: "Infinity Pool Villa",
    subtitle: "Private Paradise",
    price: "from 650 € / person / 2 nights",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    features: ["Private Pool", "Garden View", "Spa Access"],
    quote: "Your own slice of paradise awaits"
  },
  {
    id: "relax-spa",
    title: "Relax & Spa Suite",
    subtitle: "Sunday - Thursday",
    price: "from 450 € / person / 2 nights",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    features: ["Spa Access", "Wellness Package", "Meditation Room"],
    quote: "Rejuvenate your mind, body and soul"
  },
  {
    id: "luxury-suite",
    title: "Luxury Mountain Suite",
    subtitle: "Friday - Saturday",
    price: "from 350 € / person / 2 nights",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    features: ["Mountain View", "Fireplace", "Premium Amenities"],
    quote: "Embrace the serenity of mountain peaks"
  },
  {
    id: "family-getaway",
    title: "Family Getaway",
    subtitle: "All Week",
    price: "from 280 € / person / 2 nights",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    features: ["Family Room", "Kids Activities", "Connecting Rooms"],
    quote: "Creating memories that last a lifetime"
  },
];

const AccommodationSection = () => {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const heroInView = useInView(heroRef, { once: false, amount: 0.2 });
  const parallaxInView = useInView(parallaxRef, { once: false, amount: 0.3 });
  
  // Smooth spring animations
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroSmoothProgress = useSpring(heroProgress, { stiffness: 100, damping: 30 });
  const parallaxSmoothProgress = useSpring(parallaxProgress, { stiffness: 100, damping: 30 });
  
  // Transform values for parallax effects
  const y = useTransform(smoothProgress, [0, 1], [0, -100]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  const heroY = useTransform(heroSmoothProgress, [0, 1], [0, -150]);
  const heroScale = useTransform(heroSmoothProgress, [0, 0.5, 1], [1.1, 1, 0.95]);
  const heroOpacity = useTransform(heroSmoothProgress, [0, 0.8, 1], [1, 1, 0.3]);
  
  const parallaxY = useTransform(parallaxSmoothProgress, [0, 1], [0, -200]);
  const parallaxScale = useTransform(parallaxSmoothProgress, [0, 1], [1.05, 1]);
  
  // Carousel drag constraints
  const x = useMotionValue(0);
  const dragConstraints = { left: -((accommodations.length - 1) * 480), right: 0 };
  
  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const mouseX = useTransform(useMotionValue(mousePosition.x), [-1, 1], [-30, 30]);
  const mouseY = useTransform(useMotionValue(mousePosition.y), [-1, 1], [-20, 20]);

  return (
    <div className="bg-[#0A0A0A] w-full min-h-[300vh] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-[#B8A483] rounded-full opacity-20"
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 right-16 w-1 h-1 bg-[#B8A483] rounded-full opacity-15"
          animate={{
            y: [0, 80, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            y: heroY,
            scale: heroScale,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />
        </motion.div>
        
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl"
          animate={{ 
            opacity: heroInView ? 1 : 0, 
            y: heroInView ? 0 : 100 
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.span
            className="text-[#B8A483] text-sm md:text-lg font-light tracking-[0.3em] mb-6 block"
            animate={{ 
              opacity: heroInView ? 1 : 0, 
              y: heroInView ? 0 : 50 
            }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            LUXURY ACCOMMODATIONS
          </motion.span>
          
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight"
            style={{ fontFamily: "Cormorant Garamond, serif", textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            animate={{ 
              opacity: heroInView ? 1 : 0, 
              y: heroInView ? 0 : 100 
            }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Experience
            <br />
            <span className="text-[#B8A483] italic">Perfection</span>
          </motion.h1>
          
          <motion.p
            className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed"
            animate={{ 
              opacity: heroInView ? 1 : 0, 
              y: heroInView ? 0 : 50 
            }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Discover our collection of meticulously crafted accommodations, 
            where every detail is designed to exceed your expectations.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 items-center justify-center"
            animate={{ 
              opacity: heroInView ? 1 : 0, 
              y: heroInView ? 0 : 50 
            }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.button
              className="bg-[#B8A483] text-[#0A0A0A] px-10 py-4 font-medium text-lg shadow-2xl hover:bg-[#a38c5c] transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              />
              <span className="relative">Book Your Stay</span>
            </motion.button>
            
            <motion.button
              className="border-2 border-[#B8A483] text-[#B8A483] px-10 py-4 font-light text-lg hover:bg-[#B8A483] hover:text-[#0A0A0A] transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Suites
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Accommodation Showcase */}
      <motion.section
        ref={containerRef}
        className="relative min-h-[150vh] py-24 px-4"
        style={{ y, opacity, scale }}
      >
        <div className="max-w-8xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            animate={{ 
              opacity: isInView ? 1 : 0, 
              y: isInView ? 0 : 100 
            }}
            transition={{ duration: 1.2 }}
          >
            <motion.span
              className="text-[#B8A483] text-sm md:text-base font-light tracking-[0.2em] mb-4 block"
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              OUR PREMIUM COLLECTION
            </motion.span>
            
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                y: isInView ? 0 : 50 
              }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              Curated Spaces
            </motion.h2>

            <motion.p
              className="text-white/70 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed italic"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                y: isInView ? 0 : 30 
              }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              "In every room, a story unfolds. In every detail, excellence is revealed. 
              This is where memories are crafted and dreams become reality."
            </motion.p>
          </motion.div>

          {/* Enhanced Carousel */}
          <div className="relative mb-32">
            <div className="overflow-hidden">
              <motion.div
                ref={carouselRef}
                className="flex gap-8 cursor-grab active:cursor-grabbing pb-8"
                drag="x"
                dragConstraints={dragConstraints}
                style={{ x }}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 40 }}
              >
                {accommodations.map((acc, idx) => (
                  <motion.div
                    key={acc.id}
                    className="relative min-w-[400px] sm:min-w-[450px] lg:min-w-[500px] h-[650px] group"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                    whileHover={{ y: -20 }}
                  >
                    {/* Card Container - Sharp corners, no rounding */}
                    <motion.div
                      className="relative w-full h-full overflow-hidden bg-black/20 backdrop-blur-sm border border-[#B8A483]/20 shadow-2xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {/* Image with parallax */}
                      <motion.div
                        className="absolute inset-0 overflow-hidden"
                        style={{
                          x: mouseX,
                          y: mouseY,
                        }}
                      >
                        <motion.img
                          src={acc.image}
                          alt={acc.title}
                          className="w-full h-full object-cover scale-110"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </motion.div>
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
                      
                      {/* Content */}
                      <div className="relative z-10 flex flex-col justify-end h-full p-8">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: idx * 0.1 + 0.3 }}
                        >
                          <span className="text-[#B8A483] text-sm font-light tracking-wider mb-2 block">
                            {acc.subtitle}
                          </span>
                          
                          <h3
                            className="text-2xl md:text-3xl font-light text-white mb-3 leading-tight"
                            style={{ fontFamily: "Cormorant Garamond, serif" }}
                          >
                            {acc.title}
                          </h3>

                          <p 
                            className="text-white/80 text-base italic mb-4 leading-relaxed"
                            style={{ fontFamily: "Cormorant Garamond, serif" }}
                          >
                            "{acc.quote}"
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {acc.features.map((feature, fidx) => (
                              <span
                                key={fidx}
                                className="text-xs text-[#B8A483] bg-[#B8A483]/10 px-3 py-1 border border-[#B8A483]/20"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                          
                          <p className="text-[#B8A483] text-lg font-light mb-6">
                            {acc.price}
                          </p>
                          
                          <motion.button
                            className="bg-white/5 border border-[#B8A483] text-white px-8 py-3 font-light text-sm flex items-center gap-2 hover:bg-[#B8A483] hover:text-[#0A0A0A] transition-all duration-300 backdrop-blur-sm"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Details
                            <motion.span
                              className="text-xs"
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              →
                            </motion.span>
                          </motion.button>
                        </motion.div>
                      </div>
                      
                      {/* Hover Effect Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-[#B8A483]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <motion.div
              className="text-center text-sm text-[#B8A483]/70 mt-8"
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ x: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ←
                </motion.span>
                Drag to explore our luxury accommodations
                <motion.span
                  animate={{ x: [10, -10, 10] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.div>

            {/* Additional Quote Section */}
            <motion.div
              className="text-center mt-20"
              animate={{ 
                opacity: isInView ? 1 : 0, 
                y: isInView ? 0 : 50 
              }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <p 
                className="text-2xl md:text-3xl text-white/90 italic max-w-4xl mx-auto leading-relaxed"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                "Luxury is not about having the most expensive things. 
                It's about having the experiences that money can't truly buy, 
                but we make possible."
              </p>
              <span className="text-[#B8A483] text-sm tracking-wider mt-4 block">
                — Executive Director of Hospitality
              </span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Parallax CTA Section */}
      <motion.section
        ref={parallaxRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            y: parallaxY,
            scale: parallaxScale,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury Resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
        </motion.div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-6 max-w-5xl mx-auto">
          <motion.span
            className="text-[#B8A483] text-sm md:text-base font-light tracking-[0.3em] mb-6 block"
            animate={{ 
              opacity: parallaxInView ? 1 : 0, 
              y: parallaxInView ? 0 : 50 
            }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            EXCLUSIVE BOOKING
          </motion.span>
          
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
            animate={{ 
              opacity: parallaxInView ? 1 : 0, 
              y: parallaxInView ? 0 : 100 
            }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Your Journey to
            <br />
            <span className="text-[#B8A483] italic">Excellence</span>
            <br />
            Begins Here
          </motion.h2>
          
          <motion.p
            className="text-white/80 text-lg md:text-xl font-light max-w-3xl mx-auto mb-8 leading-relaxed"
            animate={{ 
              opacity: parallaxInView ? 1 : 0, 
              y: parallaxInView ? 0 : 50 
            }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Reserve your extraordinary escape and immerse yourself in unparalleled luxury. 
            Every moment crafted to perfection, every detail designed to inspire.
          </motion.p>

          <motion.p
            className="text-2xl md:text-3xl text-white/90 italic max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
            animate={{ 
              opacity: parallaxInView ? 1 : 0, 
              y: parallaxInView ? 0 : 30 
            }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            "The art of hospitality is making guests feel at home, 
            even when they're far from it."
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 items-center"
            animate={{ 
              opacity: parallaxInView ? 1 : 0, 
              y: parallaxInView ? 0 : 50 
            }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.button
              className="bg-[#B8A483] text-[#0A0A0A] px-12 py-4 font-medium text-lg shadow-2xl hover:bg-[#a38c5c] transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              />
              <span className="relative">Book Your Stay</span>
            </motion.button>
            
            <motion.button
              className="border-2 border-[#B8A483] text-[#B8A483] px-12 py-4 font-light text-lg hover:bg-[#B8A483] hover:text-[#0A0A0A] transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Amenities
            </motion.button>
          </motion.div>
          
          <motion.div
            className="mt-16 text-center"
            animate={{ opacity: parallaxInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-transparent via-[#B8A483] to-transparent mx-auto mb-4"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <span className="text-[#B8A483]/70 text-sm tracking-wider">
              Scroll to discover more
            </span>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AccommodationSection;