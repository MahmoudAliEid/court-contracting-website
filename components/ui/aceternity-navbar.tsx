"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun, Globe, ChevronDown, LogIn, ArrowRight, Sparkles, Home, Info, Wrench, Briefcase, Phone } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  getCookie,
} from 'cookies-next/client';

export function AceternityNavbar() {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { theme, setTheme, systemTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  const navigate = useRouter()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Function to get navigation icons
  const getNavIcon = (itemName: string) => {
    const iconClass = "w-4 h-4";
    const lowerName = itemName.toLowerCase();
    
    if (lowerName.includes("home") || lowerName.includes("الرئيسية")) {
      return <Home className={iconClass} />;
    }
    if (lowerName.includes("about") || lowerName.includes("من نحن")) {
      return <Info className={iconClass} />;
    }
    if (lowerName.includes("services") || lowerName.includes("خدمات")) {
      return <Wrench className={iconClass} />;
    }
    if (lowerName.includes("projects") || lowerName.includes("أعمالنا")) {
      return <Briefcase className={iconClass} />;
    }
    if (lowerName.includes("contact") || lowerName.includes("تواصل")) {
      return <Phone className={iconClass} />;
    }
    return null;
  };
  const token = getCookie('authToken') ;
  console.log("authToken from cookies:", token);

  const navItems = [
    { name: t("nav.home"), href: "/" },
    {
      name: t("nav.about"),
      href: "/about",
      // dropdown: [
      //   {
      //     name: t("nav.about"),
      //     href: "#about",
      //     description: language === "ar" ? "تعرف على شركتنا" : "Learn about our company",
      //   },
      //   {
      //     name: t("nav.vision"),
      //     href: "#vision",
      //     description: language === "ar" ? "رؤيتنا ورسالتنا" : "Our vision and mission",
      //   },
      //   {
      //     name: t("nav.why-choose"),
      //     href: "#why-choose",
      //     description: language === "ar" ? "ما يميزنا عن الآخرين" : "What sets us apart",
      //   },
      // ],
    },
    {
      name: t("nav.services"),
      href: "/ourservices",
      // dropdown: [
      //   {
      //     name: language === "ar" ? "إنشاء المباني" : "Building Construction",
      //     href: "#services",
      //     description: language === "ar" ? "مباني سكنية وتجارية" : "Residential & commercial buildings",
      //   },
      //   {
      //     name: language === "ar" ? "الترميم والتشطيب" : "Renovation & Finishing",
      //     href: "#services",
      //     description: language === "ar" ? "أعمال الترميم والتشطيبات" : "Restoration and finishing works",
      //   },
      //   {
      //     name: language === "ar" ? "التصميم الداخلي" : "Interior Design",
      //     href: "#services",
      //     description: language === "ar" ? "تصميم داخلي احترافي" : "Professional interior design",
      //   },
      //   {
      //     name: language === "ar" ? "الأعمال الكهربائية" : "Electrical Works",
      //     href: "#services",
      //     description: language === "ar" ? "أعمال كهربائية وميكانيكية" : "Electrical & mechanical works",
      //   },
      // ],
    },
    { name: t("nav.projects"), href: "/ourprojects" },
    { name: t("nav.contact"), href: "/contactus" },
  ]

  const currentTheme = theme === "system" ? systemTheme : theme

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  if (!mounted) {
    return (
      <nav className="fixed top-0 w-full z-[100] h-20 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-gray-200/50 dark:border-border/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0">
              <div className="h-14 w-40 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
              <div className="w-10 h-10 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 dark:bg-background/95 backdrop-blur-xl shadow-lg border-b border-gray-200/80 dark:border-border/50"
          : "bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-gray-200/30 dark:border-border/30"
      }`}
      style={{ zIndex: 100 }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20 ">
          {/* Logo - Made Bigger */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-shrink-0 relative">
            <Link href="/" className="flex items-center  pb-1 flex-col group">
              <div className="relative flex items-center">
                <Image
                  src="/images/court-logo.webp"
                  alt="Court Contracting Company"
                  width={140}
                  height={45}
                  className="h-14 w-auto sm:h-16 md:h-20 transition-all duration-300 group-hover:brightness-110 rounded-md"
                  priority
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </div>
             
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center ${language === "ar" ? "space-x-reverse" : "space-x-1"}`}>
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className="relative"
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 py-2.5 text-sm font-medium rounded-lg
                      transition-all duration-300 relative group
                      ${
                        isScrolled
                          ? "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                          : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                      }
                      hover:bg-gray-100/80 dark:hover:bg-gray-800/50
                      ${language === "ar" ? "flex-row-reverse" : ""}
                    `}
                  >
                    {/* Navigation Icon */}
                    <span className={`${language === "ar" ? "ml-2" : "mr-2"} flex-shrink-0`}>
                      {getNavIcon(item.name)}
                    </span>
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className={`flex items-center space-x-3`}>
            {/* Language Toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50 transition-all duration-300 w-10 h-10 rounded-xl"
              >
                <Globe className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                <span className="sr-only">Toggle language</span>
              </Button>
            </motion.div>

            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50 transition-all duration-300 w-10 h-10 rounded-xl"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </motion.div>
            {/* Login/Dashboard Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="hidden md:block">
              {token ? (
                <Button
                  size="sm"
                  onClick={() => navigate.push("/admin/dashboard")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <LogIn className={`${language === "ar" ? "ml-2" : "mr-2"} h-3.5 w-3.5`} />
                  {language === "ar" ? "لوحة التحكم" : "Dashboard"}
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate.push("/admin/login")}
                  className="border-gray-300/80 text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 hover:border-gray-400/80 dark:border-gray-600/50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50 dark:hover:border-gray-500/50 px-4 py-2 rounded-xl transition-all duration-300"
                >
                  <LogIn className={`${language === "ar" ? "ml-2" : "mr-2"} h-3.5 w-3.5`} />
                  {language === "ar" ? "دخول" : "Login"}
                </Button>
              )}
            </motion.div>
        
            {/* WhatsApp Button - Replaced Contact Us */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="hidden sm:block">
              <motion.a
                href="https://wa.me/966566397317?text=أريد التواصل معكم وطلب خدمة من شركة كورت +966 56 639 7317"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"}`}
              >
                <svg className="w-4 h-4  text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                </svg>
               
                <span className="px-1">{language === "ar" ? "واتساب" : "WhatsApp"}</span>
              </motion.a>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet
           
            >
              <SheetTrigger asChild className="lg:hidden">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50 rounded-xl"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent
                side={language === "ar" ? "left" : "right"}
                className="bg-white/98 z-[999] dark:bg-background/98 backdrop-blur-xl border-gray-200/80 dark:border-border/80 w-80"
              >
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Logo - Made Bigger */}
                  <div className="pb-6 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
                   <Link href="/" className="flex items-center  pb-1 flex-col group">
              <div className="relative flex items-center">
                <Image
                  src="/images/logo-court-co.png"
                  alt="Court Contracting Company"
                  width={140}
                  height={45}
                  className="h-10 w-auto sm:h-12 md:h-14 transition-all duration-300 group-hover:brightness-110 rounded-md"
                  priority
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </div>
              
            </Link>
                    
                  
                  </div>

                  {/* Mobile Controls */}
                  <div
                    className={`flex items-center justify-between pb-4 border-b border-gray-200/50 dark:border-gray-700/50 ${language === "ar" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-3" : "space-x-3"}`}>
                      <Button variant="ghost" size="icon" onClick={toggleTheme} className="w-10 h-10 rounded-xl">
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                        className="w-10 h-10 rounded-xl"
                      >
                        <Globe className="h-4 w-4" />
                      </Button>
                      
                   
                         {/* Login/Dashboard Button */}
           
              {token ? (
                <Button
                  size="sm"
                  onClick={() => navigate.push("/admin/dashboard")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Use a dashboard icon instead of LogIn */}
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${language === "ar" ? "ml-2" : "mr-2"} h-4 w-4`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  >
                  <rect x="3" y="3" width="7" height="9" rx="2" />
                  <rect x="14" y="3" width="7" height="5" rx="2" />
                  <rect x="14" y="12" width="7" height="9" rx="2" />
                  <rect x="3" y="16" width="7" height="5" rx="2" />
                  </svg>  
                
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate.push("/admin/login")}
                  className="border-gray-300/80 text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 hover:border-gray-400/80 dark:border-gray-600/50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50 dark:hover:border-gray-500/50 px-4 py-2 rounded-xl transition-all duration-300"
                >
                  {/* Suabel icon for login */}
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${language === "ar" ? "ml-2" : "mr-2"} h-4 w-4`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5A2.25 2.25 0 003.75 5.25v13.5A2.25 2.25 0 006 21h7.5a2.25 2.25 0 002.25-2.25V15M18 12l-3-3m0 0l3-3m-3 3h9"
                  />
                  </svg>
                 
                </Button>
              )}
           
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {language === "ar" ? "الإعدادات" : "Settings"}
                    </span>
                  </div>

                  {/* Mobile Navigation */}
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: language === "ar" ? -20 : 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between text-lg font-medium text-gray-800 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400 transition-colors duration-300 py-3 px-2 rounded-xl hover:bg-gray-50/80 dark:hover:bg-gray-800/50 ${language === "ar" ? "flex-row-reverse" : ""}`}
                      >
                        <div className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                          {/* Mobile Navigation Icon */}
                          <span className={`${language === "ar" ? "ml-3" : "mr-3"} flex-shrink-0`}>
                            {getNavIcon(item.name)}
                          </span>
                          <span>{item.name}</span>
                        </div>
                        <ArrowRight className={`${language === "ar" ? "ml-2 rotate-180" : "mr-2"} h-4 w-4 opacity-50`} />
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Login */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="pt-4"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => (window.location.href = "/admin/login")}
                      className="w-full border-gray-300/80 text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 dark:border-gray-600/50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50 mb-4 rounded-xl"
                    >
                      <LogIn className={`${language === "ar" ? "ml-2" : "mr-2"} h-4 w-4`} />
                      {language === "ar" ? "تسجيل الدخول" : "Admin Login"}
                    </Button>
                  </motion.div>

                  {/* Mobile WhatsApp Button - Replaced Contact Us */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="pt-2 space-y-3"
                  >
                    {/* WhatsApp Contact Button - Mobile Menu */}
                    <motion.a
                      href="https://wa.me/966566397317?text=أريد التواصل معكم وطلب خدمة من شركة كورت +966 56 639 7317"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl py-3 px-4 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"}`}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                      </svg>
                      <span>{language === "ar" ? "واتساب" : "WhatsApp"}</span>
                    </motion.a>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
