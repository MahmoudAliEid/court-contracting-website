"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams"; // Import BackgroundBeams

export function HeroSection() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

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

      // Background orbs animation (if still present, though BackgroundBeams will replace this visual)
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse text-start lg:flex-row  justify-between gap-12 lg:gap-20">
          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2 align-start  flex flex-col  lg:items-start text-start ">
            <div className="hero-content text-start space-y-8 w-full">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex  justify-start text-start   px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium"
              >
                <Star
                  className={`$${language === "ar" ? "ml-2" : "mr-2"} w-4 h-4 text-yellow-400`}
                />
                {language === "ar"
                  ? "الشركة الرائدة في المقاولات"
                  : "Leading Construction Company"}
              </motion.div>

              {/* Main Heading */}
              <h1
                className={`text-5xl sm:text-6xl py-4 lg:text-7xl xl:text-8xl font-bold text-white leading-tight `
                }
              >
                {language === "ar" ? (
                  <>
                    <span className="block py-4">نبني</span>
                    <span className="block py-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                      المستقبل
                    </span>
                    <span className="block  text-4xl sm:text-5xl lg:text-6xl text-gray-300 font-normal">
                      بإتقان وتميز
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block">Building</span>
                    <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                      Tomorrow
                    </span>
                    <span className="block text-4xl sm:text-5xl lg:text-6xl text-gray-300 font-normal">
                      With Excellence
                    </span>
                  </>
                )}
              </h1>

              {/* Description */}
              <p
                dir={`${language === "ar" ? "rtl" : "ltr"}`}
                className={`text-xl sm:text-2xl text-gray-300 text-start leading-relaxed max-w-2xl mx-auto `}
              >
                {language === "ar"
                  ? "شركة كورت للمقاولات - رائدة في تقديم حلول البناء المبتكرة والمتطورة في المملكة العربية السعودية منذ عام 2008"
                  : "Court Contracting Company - Leading innovative and advanced construction solutions in Saudi Arabia since 2008"}
              </p>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start ${
                  language === "ar" ? "sm:flex-row-reverse" : ""
                }`}
              >
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className={`group bg-gradient-to-r my-4 from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 rounded-2xl border-0 ${
                    language === "ar" ? "ml-4" : "mr-4"
                  }`}
                >
                  {language === "ar" ? "ابدأ مشروعك" : "Start Your Project"}
                  <ArrowRight
                    className={`$${
                      language === "ar" ? "mr-2" : "ml-2"
                    } h-5 w-5 transition-transform group-hover:$${
                      language === "ar" ? "-translate-x-1" : "translate-x-1"
                    }`}
                  />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToProjects}
                  className={`group border-2 border-white/30 my-4 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 text-lg transition-all duration-300 bg-transparent backdrop-blur-sm rounded-2xl ${
                    language === "ar" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Play
                    className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`}
                  />
                  {language === "ar" ? "شاهد أعمالنا" : "View Our Work"}
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Modern Image with Animated BG */}
          <div className="w-full lg:w-1/2 flex items-center justify-center relative">
            {/* Animated blob background */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] md:w-[480px] md:h-[480px] bg-gradient-to-tr from-yellow-200/60 via-purple-200/40 to-pink-200/60 rounded-[60%_40%_60%_40%/40%_60%_40%_60%] blur-2xl z-0 animate-pulse"
              aria-hidden="true"
            />
            {/* Dummy image with modern mask */}
            <div className="relative z-10">
              <img
                src="/court (9).jpeg"
                alt="Modern Construction"
                className="w-[520px] h-[520px] md:w-[500px] md:h-[500px] object-cover object-center shadow-2xl rounded-[60%_40%_60%_40%/40%_60%_40%_60%] border-4 border-white/20"
                style={{ maskImage: 'radial-gradient(circle at 60% 40%, white 80%, transparent 100%)' }}
              />
            </div>
            {/* <div className="relative z-10">
              <img
                src="/court (10).jpeg"
                alt="Modern Construction"
                className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] object-cover object-center shadow-2xl rounded-[60%_40%_60%_40%/40%_60%_40%_60%] border-4 border-white/20"
                style={{ maskImage: 'radial-gradient(circle at 60% 40%, white 80%, transparent 100%)' }}
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
