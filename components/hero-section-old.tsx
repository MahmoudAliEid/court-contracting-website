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
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    onClick={scrollToContact}
                    className={`group bg-gradient-to-r my-2 sm:my-4 w-full sm:w-auto from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 rounded-2xl border-0 relative overflow-hidden ${
                      language === "ar" ? "sm:ml-4" : "sm:mr-4"
                    }`}
                  >
                    {/* Button glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
                    <span className="relative z-10">
                      {language === "ar" ? "ابدأ مشروعك" : "Start Your Project"}
                    </span>
                    <ArrowRight
                      className={`${
                        language === "ar" ? "mr-2" : "ml-2"
                      } h-5 w-5 transition-transform group-hover:${
                        language === "ar" ? "-translate-x-1" : "translate-x-1"
                      } relative z-10`}
                    />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={
                      () => router.push("/ourprojects")
                    }
                    className={`group border-2 border-white/30 my-2 sm:my-4 w-full sm:w-auto text-white hover:bg-white/10 hover:border-white/50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 bg-transparent backdrop-blur-sm rounded-2xl relative overflow-hidden ${
                      language === "ar" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Play
                      className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5 relative z-10`}
                    />
                    <span className="relative z-10">
                      {language === "ar" ? "شاهد أعمالنا" : "View Our Work"}
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
            {/* Background decorative elements */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "backOut" }}
              className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-xl"
            />
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "backOut" }}
              className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-full blur-xl"
            />

            {/* Moodboard Collage Container */}
            <div className="relative w-full max-w-[700px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] xl:h-[700px]">
              
              {/* Main Background Image - Largest (Living Room) */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                className="absolute inset-0 z-10"
              >
                <motion.div
                  animate={{ 
                    y: [0, -3, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-full h-full"
                >
                  <div className="bg-white p-4 rounded-2xl shadow-2xl overflow-hidden transform -rotate-1 w-full h-full">
                    <motion.img
                      src="/images/Court-Hero-1.JPG"
                      alt="Luxury Living Room"
                      className="w-full h-full object-cover rounded-xl"
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, delay: 0.4 }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Overlapping Image 1 - Top Right (Modern Hallway) */}
              <motion.div
                initial={{ x: 50, y: -30, opacity: 0, rotateY: 15 }}
                animate={{ x: 0, y: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="absolute top-[10%] right-[5%] z-20"
                whileHover={{ 
                  scale: 1.05,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -4, 0],
                    rotate: [2, 4, 2]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="relative"
                >
                  <div className="bg-white p-3 rounded-xl shadow-2xl overflow-hidden transform rotate-2">
                    <motion.img
                      src="/images/Court-Hero-2.png"
                      alt="Modern Hallway"
                      className="w-[140px] h-[100px] sm:w-[180px] sm:h-[130px] md:w-[220px] md:h-[160px] lg:w-[250px] lg:h-[180px] object-cover rounded-lg"
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, delay: 0.7 }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Overlapping Image 2 - Middle Right (Elegant Dining) */}
              <motion.div
                initial={{ x: 40, y: 20, opacity: 0, rotateY: -10 }}
                animate={{ x: 0, y: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                className="absolute top-[45%] right-[8%] z-25"
                whileHover={{ 
                  scale: 1.05,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  animate={{ 
                    y: [0, 3, 0],
                    rotate: [-2, 0, -2]
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                  className="relative"
                >
                  <div className="bg-white p-3 rounded-xl shadow-2xl overflow-hidden transform -rotate-2">
                    <motion.img
                      src="/images/Court-Hero-3.png"
                      alt="Elegant Dining"
                      className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] object-cover rounded-lg"
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, delay: 0.9 }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Overlapping Image 3 - Bottom Center (Luxury Bathroom) */}
              <motion.div
                initial={{ x: 20, y: 50, opacity: 0, rotateY: 5 }}
                animate={{ x: 0, y: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                className="absolute bottom-[8%] left-[50%] transform -translate-x-1/2 z-30"
                whileHover={{ 
                  scale: 1.05,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -2, 0],
                    rotate: [1, -1, 1]
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="relative"
                >
                  <div className="bg-white p-3 rounded-xl shadow-2xl overflow-hidden transform rotate-1">
                    <motion.img
                      src="/images/court-Hero-4.png"
                      alt="Luxury Bathroom"
                      className="w-[160px] h-[110px] sm:w-[200px] sm:h-[140px] md:w-[240px] md:h-[170px] lg:w-[280px] lg:h-[190px] object-cover rounded-lg"
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, delay: 1.1 }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Mobile-specific adjustments using CSS Grid fallback */}
              <div className="md:hidden absolute inset-0 z-0">
                <div className="grid grid-cols-2 gap-4 p-4 h-full opacity-0">
                  {/* Hidden grid for mobile layout reference */}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Floating Animation Pattern */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <motion.svg
              width="200"
              height="20"
              viewBox="0 0 200 20"
              className="opacity-30"
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.path
                d="M10,10 Q50,2 100,10 T190,10"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                  className="relative"
                >
                  <div className="bg-white p-2 rounded-xl shadow-2xl overflow-hidden transform rotate-3">
                    <motion.img
                      src="/images/Court-Hero-3.png"
                      alt="Elegant Dining"
                      className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] object-cover rounded-lg"
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, delay: 0.9 }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Image 3 - Bottom Right Medium (like 3 in your reference) */}
              <motion.div
                initial={{ x: 30, y: 50, opacity: 0, rotateY: 8 }}
                animate={{ x: 0, y: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                className="absolute bottom-0 right-0 z-15"
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
                  <div className="bg-white p-3 rounded-xl shadow-2xl overflow-hidden transform -rotate-2">
                    <motion.img
                      src="/images/court-Hero-4.png"
                      alt="Luxury Bathroom"
                      className="w-[140px] h-[120px] sm:w-[160px] sm:h-[140px] md:w-[180px] md:h-[160px] lg:w-[200px] lg:h-[180px] object-cover rounded-lg"
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, delay: 1.1 }}
                    />
                  </div>
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
