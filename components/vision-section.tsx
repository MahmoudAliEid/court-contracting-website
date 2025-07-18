"use client"

import { useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Target, Zap, Shield } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function VisionSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const values = [
    {
      icon: Heart,
      title: language === "ar" ? "الصدق في العمل" : "Honesty in Work",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      icon: Target,
      title: language === "ar" ? "دقة التنفيذ" : "Accuracy in Implementation",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Zap,
      title: language === "ar" ? "الالتزام بالوقت" : "Commitment to Time",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Shield,
      title: language === "ar" ? "الجودة العالية" : "High Quality",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ]

  return (
    <section id="vision" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <Badge variant="outline" className="mb-4">
              {t("vision.title")}
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{t("vision.title")}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t("vision.description")}
            </p>
          </div>

          {/* Vision Content */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 ${language === "ar" ? "lg:grid-cols-2-rtl" : ""}`}
          >
            <div className={`${language === "ar" ? "slide-in-right" : "slide-in-left"}`}>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-3xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Our Vision"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />
              </div>
            </div>

            <div className={`${language === "ar" ? "slide-in-left" : "slide-in-right"}`}>
              <div className={`space-y-6 ${language === "ar" ? "text-right" : "text-left"}`}>
                <h3 className="text-2xl md:text-3xl font-bold">
                  {language === "ar"
                    ? "نحو مستقبل أفضل في عالم البناء والتشييد"
                    : "Towards a Better Future in Construction and Building"}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {language === "ar"
                    ? "نسعى لأن نكون الشركة الرائدة في مجال المقاولات والبناء، من خلال تقديم خدمات متميزة تلبي تطلعات عملائنا وتساهم في بناء مستقبل أفضل للمملكة العربية السعودية."
                    : "We strive to be the leading company in contracting and construction, by providing distinguished services that meet our clients' aspirations and contribute to building a better future for the Kingdom of Saudi Arabia."}
                </p>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${value.bgColor} rounded-2xl mb-4`}
                  >
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
