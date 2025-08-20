"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    // GSAP entrance animations (not scroll-triggered)
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window;

      // Hero content entrance
      gsap.fromTo(
        ".hero-content",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );

      // Background orbs animation
      gsap.to(".bg-orb", {
        x: "random(-50, 50)",
        y: "random(-30, 30)",
        scale: "random(0.8, 1.2)",
        duration: "random(8, 12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1,
      });
    }
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950"
      style={{ paddingTop: "100px" }}
    >
      {/* Animated Background Beams */}
      <div className="absolute inset-0">
        <BackgroundBeams className="absolute inset-0 z-0" />
      </div>

      {/* Additional floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {typeof window !== 'undefined' && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (window.innerWidth || 1920),
              y: Math.random() * (window.innerHeight || 1080),
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * (window.innerHeight || 1080)],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Grid overlay for modern design */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M30 0v30H0v30h30V30h30V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col-reverse text-start lg:flex-row justify-between gap-8 sm:gap-12 lg:gap-16 xl:gap-20 relative items-center lg:items-start"
        >
          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2 align-start flex flex-col lg:items-start text-start px-4 sm:px-6 lg:px-0">
            <div className="hero-content text-start space-y-6 sm:space-y-8 w-full">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex justify-start text-start px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Star
                  className={`${language === "ar" ? "ml-2" : "mr-2"} w-4 h-4 text-yellow-400`}
                />
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent font-semibold">
                  {language === "ar"
                    ? "الشركة الرائدة في المقاولات"
                    : "Leading Construction Company"}
                </span>
              </motion.div>

              {/* Main Heading with staggered animation */}
              <div className="space-y-2">
                {language === "ar" ? (
                  <>
                    <motion.span
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl py-2 sm:py-4 font-bold text-white leading-tight"
                    >
                      نبني
                    </motion.span>
                    <motion.span
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="block py-2 sm:py-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                    >
                      المستقبل
                    </motion.span>
                    <motion.span
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-300 font-normal"
                    >
                      بإتقان وتميز
                    </motion.span>
                  </>
                ) : (
                  <>
                    <motion.span
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl py-2 sm:py-4 font-bold text-white leading-tight"
                    >
                      Building
                    </motion.span>
                    <motion.span
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                    >
                      Tomorrow
                    </motion.span>
                    <motion.span
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-300 font-normal"
                    >
                      With Excellence
                    </motion.span>
                  </>
                )}
              </div>

              {/* Description */}
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                dir={`${language === "ar" ? "rtl" : "ltr"}`}
                className="text-xl sm:text-2xl text-gray-300 text-start leading-relaxed max-w-2xl mx-auto"
              >
                {language === "ar"
                  ? "شركة كورت للمقاولات - رائدة في تقديم حلول البناء المبتكرة والمتطورة في المملكة العربية السعودية منذ عام 2008"
                  : "Court Contracting Company - Leading innovative and advanced construction solutions in Saudi Arabia since 2008"}
              </motion.p>

              {/* CTA Buttons with enhanced animations */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center lg:justify-start ${
                  language === "ar" ? "sm:flex-row-reverse" : ""
                }`}
              >
                <motion.div
                  initial={{ x: language === "ar" ? 100 : -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.25 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ direction: language === "ar" ? "rtl" : "ltr" }}
                >
                  <Button
                    size="lg"
                    onClick={() => {
                      router.push('/ourservices')
                    }}
                    className={`group bg-gradient-to-r my-2 sm:my-4 w-full sm:w-auto from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 rounded-2xl border-0 relative overflow-hidden ${
                      language === "ar" ? "sm:ml-4" : "sm:mr-4"
                    }`}
                  >
                    {/* Button glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
                    <span className="relative z-10">
                      {language === "ar" ? "خدماتنا" : "Our Services"}
                    </span>
                      <ArrowRight
                      className={`${
                        language === "ar" ? "ml-2 rotate-180" : "mr-2"
                      } h-5 w-5 transition-transform group-hover:${
                        language === "ar" ? "translate-x-1" : "-translate-x-1"
                      } relative z-10`}
                    />
                  
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ x: language === "ar" ? 100 : -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ direction: language === "ar" ? "rtl" : "ltr" }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => router.push("/about")}
                    className={`group border-2 border-white/30 my-2 sm:my-4 w-full sm:w-auto text-white hover:bg-white/10 hover:border-white/50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 bg-transparent backdrop-blur-sm rounded-2xl relative overflow-hidden ${
                      language === "ar" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                      <ArrowRight
                      className={`${
                        language === "ar" ? "ml-2 rotate-180" : "mr-2"
                      } h-5 w-5 transition-transform group-hover:${
                        language === "ar" ? "translate-x-1" : "-translate-x-1"
                      } relative z-10`}
                    />
                    <span className="relative z-10">
                      {language === "ar" ? "معلومات عنا" : "About Us"}
                    </span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-4 sm:pt-6"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    150+
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    {language === "ar" ? "مشروع مكتمل" : "Projects Completed"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    15+
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    {language === "ar" ? "سنة خبرة" : "Years Experience"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    50+
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    {language === "ar" ? "عميل سعيد" : "Happy Clients"}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Modern 4-Image Overlapping Layout */}
          <div className="w-full lg:w-1/2 flex items-center justify-center relative order-1 lg:order-2 px-4 sm:px-6 lg:px-0">
            {/* Responsive Decorative Orbs */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "backOut" }}
              className="absolute -top-10 -left-10 w-32 h-32 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl"
            />
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "backOut" }}
              className="absolute -bottom-10 -right-10 w-24 h-24 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-full blur-xl"
            />

            {/* Main Container for Overlapping Mood Board Layout */}
            <div className="relative w-full max-w-[600px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
              
              {/* Image 1 - Large Left Vertical (like A in your reference) */}
                <motion.div
                initial={{ x: -50, opacity: 0, rotateY: -10 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                // Responsive position and size
                className="
                  absolute 
                  top-0 right-10 z-30 transform rotate-2
                  sm:top-2 sm:right-4
                  md:top-4 md:right-8
                  lg:top-0 lg:right-10
                "
                whileHover={{
                  scale: 1.02,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                >
                <motion.div
                  animate={{
                  y: [0, -5, 0]
                  }}
                  transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <motion.img
                  src="/images/Court-Hero-2.png"
                  alt="Modern Hallway"
                  className="
                    w-[120px] h-[180px]
                    sm:w-[100px] sm:h-[160px]
                    md:w-[120px] md:h-[200px]
                    lg:w-[180px] lg:h-[280px]
                    object-cover rounded-lg shadow-2xl transform rotate-2
                  "
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  />
                </motion.div>
                </motion.div>

              {/* Image 2 - Top Right Horizontal (like 2 in your reference) */}
                <motion.div
                initial={{ x: 50, y: -30, opacity: 0, rotateY: 10 }}
                animate={{ x: 0, y: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                // Responsive position and size
                className="
                  absolute 
                  top-[40px] left-[60px] z-20
                  sm:top-[60px] sm:left-[80px]
                  md:top-[80px] md:left-[100px]
                  lg:top-[100px] lg:left-[120px]
                "
                whileHover={{ 
                  scale: 1.02,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                >
                <motion.div
                  animate={{ 
                  y: [0, -3, 0]
                  }}
                  transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                  }}
                  className="relative"
                >
                  <motion.img
                  src="/images/Court-Hero-1.JPG"
                  alt="Modern Office"
                  className="
                    w-[160px] h-[100px]
                    sm:w-[180px] sm:h-[120px]
                    md:w-[220px] md:h-[140px]
                    lg:w-[260px] lg:h-[160px]
                    object-cover rounded-lg shadow-2xl transform -rotate-1
                  "
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.7 }}
                  />
                </motion.div>
                </motion.div>

              {/* Image 4 - Small Bottom Left (like 4 in your reference) */}
                <motion.div
                initial={{ x: -30, y: 50, opacity: 0, rotateY: -8 }}
                animate={{ x: 0, y: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                // Make it bigger and overlap image 2
                className="
                  absolute 
                  bottom-[310px] right-[120px] z-30 transform -rotate-3
                  sm:bottom-[220px] sm:right-[80px]
                  md:bottom-[260px] md:right-[100px]
                  lg:bottom-[310px] lg:right-[120px]
                "
                style={{ pointerEvents: "auto" }}
                whileHover={{ 
                  scale: 1.05,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                >
                <motion.div
                  animate={{ 
                  y: [0, 8, 0]
                  }}
                  transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                  }}
                  className="relative"
                >
                  <motion.img
                    src="/images/Court-Hero-3.png"
                    alt="Elegant Dining"
                    className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[240px] lg:h-[240px] object-cover rounded-lg shadow-2xl transform rotate-3"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.9 }}
                  />
                </motion.div>
                </motion.div>

              {/* Image 3 - Bottom Right Medium (like 3 in your reference) */}
              <motion.div
                initial={{ x: 30, y: 50, opacity: 0, rotateY: 8 }}
                animate={{ x: 0, y: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                className="
                  absolute 
                  bottom-[170px] right-[-10px] z-15 transform rotate-3
                  sm:bottom-[120px] sm:right-[0px]
                  md:bottom-[140px] md:right-[10px]
                  lg:bottom-[170px] lg:right-[-10px]
                "
                whileHover={{ 
                  scale: 1.02,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  animate={{ 
                    y: [0, 6, 0]
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="relative"
                >
                  <motion.img
                    src="/images/Court-Hero-4.png"
                    alt="Luxury Bathroom"
                    className="
                      w-[140px] h-[120px]
                      sm:w-[120px] sm:h-[100px]
                      md:w-[160px] md:h-[120px]
                      lg:w-[200px] lg:h-[180px]
                      object-cover rounded-lg shadow-2xl transform -rotate-2
                    "
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, delay: 1.1 }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Simple connecting lines */}
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.1 }}
              transition={{ duration: 3, delay: 2.5 }}
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 500 600"
            >
              <motion.path
                d="M 120 100 Q 200 200 380 100"
                stroke="url(#gradient)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="3,3"
                animate={{
                  strokeDashoffset: [0, -15, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
