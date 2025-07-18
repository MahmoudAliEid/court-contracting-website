"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Globe, MapPin, Send, MessageCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ContactFormModal } from "@/components/contact-form-modal"

export function ContactSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)

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

  const contactInfo = [
    {
      icon: Phone,
      title: t("contact.phone"),
      value: "0566397317",
      href: "tel:0566397317",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-500/10",
    },
    {
      icon: Mail,
      title: t("contact.email"),
      value: "COURT.CO@HOTMAIL.COM",
      href: "mailto:COURT.CO@HOTMAIL.COM",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-500/10",
    },
    {
      icon: Globe,
      title: t("contact.website"),
      value: "www.court.com",
      href: "https://www.court.com",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-500/10",
    },
    {
      icon: MapPin,
      title: language === "ar" ? "الموقع" : "Location",
      value: language === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia",
      href: "#",
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-500/10",
    },
  ]

  return (
    <>
      <section id="contact" ref={sectionRef} className="section-spacing-responsive bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 fade-in">
              <Badge variant="outline" className="badge-theme mb-4">
                {t("contact.title")}
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-gray-900 dark:text-foreground">
                {t("contact.title")}
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-muted-foreground max-w-3xl mx-auto">
                {language === "ar"
                  ? "نحن هنا لخدمتكم ومساعدتكم في تحقيق مشاريعكم. تواصلوا معنا اليوم"
                  : "We are here to serve you and help you achieve your projects. Contact us today"}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="slide-in-left">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-foreground">
                    {language === "ar" ? "معلومات التواصل" : "Contact Information"}
                  </h3>

                  {contactInfo.map((info, index) => (
                    <Card
                      key={index}
                      className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-background border-gray-200 dark:border-border"
                    >
                      <CardContent className="p-6">
                        <div
                          className={`flex items-center ${language === "ar" ? "flex-row-reverse space-x-reverse" : "space-x-4"}`}
                        >
                          <div
                            className={`flex-shrink-0 w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center`}
                          >
                            <info.icon className={`h-6 w-6 ${info.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-gray-600 dark:text-muted-foreground mb-1">
                              {info.title}
                            </h4>
                            <a
                              href={info.href}
                              className="text-lg font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 text-gray-900 dark:text-foreground"
                            >
                              {info.value}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="slide-in-right">
                <Card className="shadow-lg bg-white dark:bg-background border-gray-200 dark:border-border">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl flex items-center justify-center mx-auto">
                        <MessageCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                      </div>

                      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-foreground">
                        {language === "ar" ? "ابدأ مشروعك معنا" : "Start Your Project With Us"}
                      </h3>

                      <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                        {language === "ar"
                          ? "هل لديك مشروع في ذهنك؟ نحن هنا لمساعدتك في تحويل أفكارك إلى واقع. املأ النموذج وسنتواصل معك لمناقشة التفاصيل."
                          : "Do you have a project in mind? We're here to help you turn your ideas into reality. Fill out the form and we'll contact you to discuss the details."}
                      </p>

                      <div className="space-y-4">
                        <Button
                          onClick={() => setIsFormModalOpen(true)}
                          size="lg"
                          className="w-full group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Send className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                          {language === "ar" ? "تواصل معنا الآن" : "Contact Us Now"}
                        </Button>

                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>{language === "ar" ? "أو اتصل مباشرة:" : "Or call directly:"}</span>
                          <a
                            href="tel:0566397317"
                            className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                          >
                            0566397317
                          </a>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-200 dark:border-border">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">24/7</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {language === "ar" ? "دعم العملاء" : "Customer Support"}
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{"<24h"}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {language === "ar" ? "وقت الاستجابة" : "Response Time"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <ContactFormModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} />
    </>
  )
}
