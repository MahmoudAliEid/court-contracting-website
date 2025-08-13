"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, ArrowRight, Target, Shield, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function AboutSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // GSAP entrance animations (not scroll-triggered)
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window

      // Stagger animation for feature cards
      gsap.fromTo(
        ".feature-card",
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", stagger: 0.1, delay: 0.5 },
      )

      // Stats animation
      gsap.fromTo(
        ".stat-item",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.1, delay: 1 },
      )

      // Floating animation for decorative elements
      gsap.to(".floating-element", {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-10, 10)",
        duration: "random(6, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      })
    }
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const features = [
    {
      icon: Target,
      title: language === "ar" ? "دقة في التنفيذ" : "Precision in Execution",
      description:
        language === "ar"
          ? "نلتزم بأعلى معايير الدقة في تنفيذ جميع مشاريعنا"
          : "We commit to the highest precision standards in all our projects",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Shield,
      title: language === "ar" ? "الأمان والجودة" : "Safety & Quality",
      description:
        language === "ar" ? "نضع السلامة والجودة في المقدمة دائماً" : "We always prioritize safety and quality first",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Zap,
      title: language === "ar" ? "تقنيات متطورة" : "Advanced Technology",
      description:
        language === "ar" ? "نستخدم أحدث التقنيات في مجال البناء" : "We use the latest technologies in construction",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Award,
      title: language === "ar" ? "خبرة معتمدة" : "Certified Expertise",
      description:
        language === "ar"
          ? "فريق من الخبراء المعتمدين في مجال البناء"
          : "Team of certified experts in construction field",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  const stats = [
    { number: "200+", label: language === "ar" ? "مشروع مكتمل" : "Completed Projects" },
    { number: "15+", label: language === "ar" ? "سنة خبرة" : "Years Experience" },
    { number: "100%", label: language === "ar" ? "رضا العملاء" : "Client Satisfaction" },
    { number: "50+", label: language === "ar" ? "فريق متخصص" : "Expert Team" },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <div className="floating-element absolute top-20 right-20 w-32 h-32 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-32 left-16 w-24 h-24 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-1/2 left-1/3 w-40 h-40 bg-pink-200/20 dark:bg-pink-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-20 `}>
            <Badge
              variant="outline"
              className="mb-6 px-6 py-2 text-sm font-medium border-purple-200 text-purple-700 bg-purple-50 dark:border-purple-500/30 dark:text-purple-300 dark:bg-purple-500/10"
            >
              {language === "ar" ? "من نحن" : "About Us"}
            </Badge>

            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight text-start`}
            >
              {language === "ar" ? (
                <>
                  <span className="block py-4">التميز في البناء</span>
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    منذ 2008
                  </span>
                </>
              ) : (
                <>
                  <span className="block">Excellence in Construction</span>
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Since 2008
                  </span>
                </>
              )}
            </h2>

            <p
              className={`text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed text-start`}
            >
              {language === "ar"
                ? "نحن في شركة كورت للمقاولات نفخر بتقديم خدمات البناء والمقاولات بأعلى معايير الجودة والاحترافية، مع التزامنا بالابتكار والتطوير المستمر لتلبية تطلعات عملائنا."
                : "At Court Contracting Company, we pride ourselves on delivering construction and contracting services with the highest standards of quality and professionalism, committed to continuous innovation and development to meet our clients' aspirations."}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="feature-card group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  {/* <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p> */}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-1 text-start gap-16 items-center mb-20 max-w-3xl mx-auto ">
            {/* Content Side */}
            <div className="space-y-8 text-center">
              <div className="space-y-6">
                <h3 className="text-3xl sm:text-4xl text-start font-bold text-gray-900 dark:text-white">
                  {language === "ar"
                    ? "نبني أحلامكم بأيدي خبيرة وتقنيات متطورة"
                    : "Building Your Dreams with Expert Hands and Advanced Technology"}
                </h3>

                <p className="text-lg text-gray-600 text-start dark:text-gray-300 leading-relaxed">
                  {language === "ar"
                    ? "مع خبرة تمتد لأكثر من 15 عاماً في مجال البناء والمقاولات، نقدم حلولاً شاملة ومتكاملة تشمل التصميم والتنفيذ والإشراف، مع ضمان الجودة والالتزام بالمواعيد."
                    : "With over 15 years of experience in construction and contracting, we provide comprehensive and integrated solutions including design, execution, and supervision, ensuring quality and commitment to deadlines."}
                </p>
              </div>

              {/* Key Points */}
              <div className="space-y-4">
                {[
                  language === "ar" ? "مقاولات عامة شاملة" : "Comprehensive General Contracting",
                  language === "ar" ? "تشطيبات داخلية وخارجية" : "Interior and Exterior Finishing",
                  language === "ar" ? "إدارة وإشراف هندسي" : "Engineering Management and Supervision",
                  language === "ar" ? "ضمان الجودة والسلامة" : "Quality and Safety Assurance",
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center  group gap-2 `}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-150 transition-transform duration-300 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                onClick={scrollToContact}
                size="lg"
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl"
              >
                {language === "ar" ? "تواصل معنا" : "Contact Us"}
                <ArrowRight
                  className={`${language === "ar" ? "mr-2" : "ml-2"} h-5 w-5 transition-transform group-hover:${language === "ar" ? "-translate-x-1" : "translate-x-1"}`}
                />
              </Button>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-12">
              {language === "ar" ? "إنجازاتنا بالأرقام" : "Our Achievements in Numbers"}
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-purple-100 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
