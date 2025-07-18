"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Clock, CheckCircle, DollarSign } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function WhyChooseSection() {
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

  const features = [
    {
      icon: Target,
      title: t("why-choose.planning.title"),
      description: t("why-choose.planning.description"),
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Clock,
      title: t("why-choose.delivery.title"),
      description: t("why-choose.delivery.description"),
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: CheckCircle,
      title: t("why-choose.execution.title"),
      description: t("why-choose.execution.description"),
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: DollarSign,
      title: t("why-choose.pricing.title"),
      description: t("why-choose.pricing.description"),
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <section id="why-choose" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 fade-in">
            <Badge variant="outline" className="mb-4">
              {t("why-choose.title")}
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{t("why-choose.title")}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "ar"
                ? "نتميز بمجموعة من الخصائص التي تجعلنا الخيار الأمثل لمشاريعكم"
                : "We are distinguished by a set of characteristics that make us the ideal choice for your projects"}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 slide-in-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div
                    className={`flex items-start ${language === "ar" ? "flex-row-reverse space-x-reverse" : "space-x-4"}`}
                  >
                    <div
                      className={`flex-shrink-0 w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center`}
                    >
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 fade-in">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 text-primary">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">
                {language === "ar" ? "أكثر من 200 مشروع مكتمل بنجاح" : "Over 200 Successfully Completed Projects"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
