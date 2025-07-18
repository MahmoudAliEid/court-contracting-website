"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Wrench, Palette, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"

export function ServicesSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && isInView) {
      const { gsap } = window

      gsap.fromTo(
        ".service-card",
        {
          y: 100,
          opacity: 0,
          rotationX: 45,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
      )
    }
  }, [isInView])

  const services = [
    {
      icon: Building2,
      title: t("services.construction.title"),
      description: t("services.construction.description"),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: Wrench,
      title: t("services.renovation.title"),
      description: t("services.renovation.description"),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      iconColor: "text-green-500",
    },
    {
      icon: Palette,
      title: t("services.design.title"),
      description: t("services.design.description"),
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      icon: Zap,
      title: t("services.electrical.title"),
      description: t("services.electrical.description"),
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="section-spacing section-bg-muted relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge variant="outline" className="mb-4 badge-theme">
              {t("services.title")}
            </Badge>
            <h2 className="text-responsive-3xl font-bold mb-4 sm:mb-6 text-gradient-light">{t("services.title")}</h2>
            <p className="text-responsive-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
              {t("services.subtitle")}
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card"
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 card-theme h-full">
                  <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                    <div
                      className={`flex items-start ${language === "ar" ? "flex-row-reverse space-x-reverse" : "space-x-4"} mb-6`}
                    >
                      <div
                        className={`flex-shrink-0 w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed flex-grow group-hover:text-foreground transition-colors duration-300">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
