"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Menu, Moon, Sun, Globe, Home, User, Briefcase, Eye, Phone } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: t("nav.home"), link: "#home", icon: <Home className="h-4 w-4" /> },
    { name: t("nav.about"), link: "#about", icon: <User className="h-4 w-4" /> },
    { name: t("nav.services"), link: "#services", icon: <Briefcase className="h-4 w-4" /> },
    { name: t("nav.projects"), link: "#projects", icon: <Eye className="h-4 w-4" /> },
    { name: t("nav.contact"), link: "#contact", icon: <Phone className="h-4 w-4" /> },
  ]

  if (!mounted) return null

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/images/court-logo.png"
                  alt="Court Contracting Company"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.link}
                    className="text-sm font-medium hover:text-primary transition-colors duration-200 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              {/* Language Toggle */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                  className="hover-glow"
                >
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </motion.div>

              {/* Theme Toggle */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="relative hover-glow w-10 h-10"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </motion.div>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </motion.div>
                </SheetTrigger>
                <SheetContent side={language === "ar" ? "left" : "right"} className="glass-morphism">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ x: language === "ar" ? -20 : 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.link}
                          className="text-lg font-medium hover:text-primary transition-colors duration-200 flex items-center space-x-2"
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Floating Navigation */}
      <FloatingNav navItems={navItems} />
    </>
  )
}
