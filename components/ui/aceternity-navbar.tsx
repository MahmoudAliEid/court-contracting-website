"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun, Globe, ChevronDown, LogIn, ArrowRight, Sparkles } from "lucide-react"
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
  const token = getCookie('authToken') ;
  console.log("authToken from cookies:", token);

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    {
      name: t("nav.about"),
      href: "#about",
      dropdown: [
        {
          name: t("nav.about"),
          href: "#about",
          description: language === "ar" ? "تعرف على شركتنا" : "Learn about our company",
        },
        {
          name: t("nav.vision"),
          href: "#vision",
          description: language === "ar" ? "رؤيتنا ورسالتنا" : "Our vision and mission",
        },
        {
          name: t("nav.why-choose"),
          href: "#why-choose",
          description: language === "ar" ? "ما يميزنا عن الآخرين" : "What sets us apart",
        },
      ],
    },
    {
      name: t("nav.services"),
      href: "#services",
      dropdown: [
        {
          name: language === "ar" ? "إنشاء المباني" : "Building Construction",
          href: "#services",
          description: language === "ar" ? "مباني سكنية وتجارية" : "Residential & commercial buildings",
        },
        {
          name: language === "ar" ? "الترميم والتشطيب" : "Renovation & Finishing",
          href: "#services",
          description: language === "ar" ? "أعمال الترميم والتشطيبات" : "Restoration and finishing works",
        },
        {
          name: language === "ar" ? "التصميم الداخلي" : "Interior Design",
          href: "#services",
          description: language === "ar" ? "تصميم داخلي احترافي" : "Professional interior design",
        },
        {
          name: language === "ar" ? "الأعمال الكهربائية" : "Electrical Works",
          href: "#services",
          description: language === "ar" ? "أعمال كهربائية وميكانيكية" : "Electrical & mechanical works",
        },
      ],
    },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.contact"), href: "#contact" },
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
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo - Made Bigger */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-shrink-0 relative">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image
                  src="/images/court-logo.png"
                  alt="Court Contracting Company"
                  width={200}
                  height={65}
                  className="h-14 w-auto transition-all duration-300 group-hover:brightness-110"
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
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
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
                    <span className="relative z-10">{item.name}</span>
                    {item.dropdown && (
                      <ChevronDown
                        className={`${language === "ar" ? "mr-1.5" : "ml-1.5"} h-3.5 w-3.5  transition-transform  duration-300 group-hover:rotate-180`}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>

                {/* Enhanced Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`absolute top-full ${language === "ar" ? "right-0" : "left-0"} mt-2 w-80 bg-white/85 dark:bg-background/85 backdrop-blur-xl border border-gray-200/80 dark:border-border/80 rounded-2xl shadow-2xl overflow-hidden z-[200]`}
                      style={{ zIndex: 200 }}
                    >
                      <div className="p-2">
                        {item.dropdown.map((dropdownItem, dropIndex) => (
                          <motion.div
                            key={dropIndex}
                            initial={{ opacity: 0, x: language === "ar" ? 10 : -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: dropIndex * 0.05, duration: 0.3 }}
                          >
                            <Link
                              href={dropdownItem.href}
                              className={`group flex flex-col px-4 py-3 rounded-xl hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-all duration-300 border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50 ${language === "ar" ? "text-right" : "text-left"}`}
                            >
                              <div
                                className={`flex items-center justify-between ${language === "ar" ? "flex-row-reverse" : ""}`}
                              >
                                <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                                  {dropdownItem.name}
                                </span>
                                <ArrowRight
                                  className={`h-4 w-4 text-gray-400 group-hover:text-purple-500 transform ${language === "ar" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"} transition-all duration-300`}
                                />
                              </div>
                              {dropdownItem.description && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                                  {dropdownItem.description}
                                </span>
                              )}
                            </Link>
                          </motion.div>
                        ))}
                        <div className="mt-2 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                          <Button
                            size="sm"
                            onClick={scrollToContact}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <Sparkles className={`${language === "ar" ? "ml-2" : "mr-2"} w-3.5 h-3.5`} />
                            {language === "ar" ? "تواصل معنا" : "Contact Us"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
        
            {/* CTA Button - Changed to Contact Us */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="hidden sm:block">
              <Button
                size="sm"
                onClick={scrollToContact}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                <ArrowRight className={`${language === "ar" ? "ml-2" : "mr-2"} w-3.5 h-3.5`} />
                {language === "ar" ? "تواصل معنا" : "Contact Us"}
              </Button>
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
                  <div className="pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
                    <Image
                      src="/images/court-logo.png"
                      alt="Court Contracting Company"
                      width={180}
                      height={60}
                      className="h-14 w-auto"
                    />
                  </div>

                  {/* Mobile Controls */}
                  <div
                    className={`flex items-center justify-between pb-4 border-b border-gray-200/50 dark:border-gray-700/50 ${language === "ar" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`flex items-center ${language === "ar" ? "space-x-reverse" : "space-x-3"}`}>
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
                        <span>{item.name}</span>
                        <ArrowRight className={`${language === "ar" ? "ml-2" : "mr-2"} h-4 w-4 opacity-50`} />
                      </Link>
                      {item.dropdown && (
                        <div
                          className={`${language === "ar" ? "mr-4" : "ml-4"} mt-2 space-y-2 pb-4 border-b border-gray-200/30 dark:border-gray-700/30`}
                        >
                          {item.dropdown.map((dropdownItem, dropIndex) => (
                            <Link
                              key={dropIndex}
                              href={dropdownItem.href}
                              className="block text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
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

                  {/* Mobile CTA - Changed to Contact Us */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="pt-2"
                  >
                    <Button
                      size="lg"
                      onClick={scrollToContact}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                    >
                      <ArrowRight className={`${language === "ar" ? "ml-2" : "mr-2"} h-4 w-4`} />
                      {language === "ar" ? "تواصل معنا" : "Contact Us"}
                    </Button>
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
