"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.why-choose": "Why Choose Us",
    "nav.vision": "Our Vision",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero Section
    "hero.title": "Court Contracting Company",
    "hero.subtitle": "Building Excellence, Delivering Dreams",
    "hero.description":
      "We provide comprehensive construction services with the highest quality and professionalism, specializing in residential and commercial buildings, renovation, and finishing works.",
    "hero.cta": "Start Your Project",
    "hero.learn-more": "Explore Our Work",

    // About Section
    "about.title": "About Court",
    "about.subtitle": "Excellence in Construction Since 2008",
    "about.description":
      "We execute contracts for construction and maintenance of buildings, interior and exterior decoration works, mechanical and electrical works, water and sewage networks, insulation works of all kinds, and restoration up to delivery.",
    "about.values.experience": "Extensive Experience",
    "about.values.quality": "Quality and Mastery",
    "about.values.punctuality": "Punctuality",
    "about.values.innovation": "Innovative Solutions",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive Construction Solutions",
    "services.construction.title": "Construction of Residential & Commercial Buildings",
    "services.construction.description":
      "We manage and supervise all general contracting services from building the necessary concrete structures for construction and foundations using the latest technology and innovative materials in construction in accordance with the requirements and specifications of the Saudi Code for Construction.",
    "services.renovation.title": "Restoration & Finishing",
    "services.renovation.description":
      "We carry out all the restoration work and interior and exterior finishes of buildings including the works of plaster, paint, establishment of electricity and plumbing works, installation of tiles, marble, stone and all interiors of borrowed ceilings and gypsum board with the addition of distinct and elegant artistic touches to suit the aspirations of our customers.",
    "services.design.title": "Interior Design",
    "services.design.description":
      "Professional interior design services with elegant artistic touches to suit our clients' aspirations.",
    "services.electrical.title": "Electrical & Mechanical Works",
    "services.electrical.description":
      "All electrical and mechanical works, water and sewage networks with the highest safety standards.",

    // Why Choose Us
    "why-choose.title": "What Distinguishes Court",
    "why-choose.subtitle": "What Makes Us Different",
    "why-choose.planning.title": "Careful Planning",
    "why-choose.planning.description":
      "We have a specialized executive, advisory and administrative team with previous experience, to work on defining the budget and requirements of the work, selecting the best implementation team and appropriate engineering supervision.",
    "why-choose.delivery.title": "Compliance with Delivery Deadline",
    "why-choose.delivery.description":
      "Projects are completed and delivered on time, adhering to quality and safety standards due to our commitment to the plan developed in advance by the company's team.",
    "why-choose.execution.title": "Accuracy of Execution",
    "why-choose.execution.description":
      "Court Contracting Company is committed to the accuracy and speed of project execution and attention to the accuracy of details while adhering to quality standards and timing to reach the project to the ideal implementation required.",
    "why-choose.pricing.title": "Flexibility of Pricing",
    "why-choose.pricing.description":
      "We provide flexibility of pricing projects according to the reading of the economic situation during the project planning taking into account the costs and availability of equipment, labour and construction materials, and considering competition, to give a desired competitive price.",

    // Vision
    "vision.title": "Our Vision",
    "vision.subtitle": "Building Tomorrow's Saudi Arabia",
    "vision.description":
      "Honesty in work, accuracy in implementation, commitment to time, renewal and evolution of ideas and finding durable solutions of the highest quality are among our top priorities and objectives to satisfy our customers and gain their confidence.",

    // Projects
    "projects.title": "Our Projects",
    "projects.subtitle": "Portfolio of Excellence",
    "projects.view-all": "View All Projects",

    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle": "Ready to Start Your Project?",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.website": "Website",
    "contact.location": "Location",

    // Footer
    "footer.credit": "Project created by Soft Masters",
    "footer.rights": "All rights reserved",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.why-choose": "ما يميز كورت",
    "nav.vision": "رؤيتنا",
    "nav.services": "خدماتنا",
    "nav.projects": "أعمالنا",
    "nav.contact": "للتواصل",

    // Hero Section
    "hero.title": "شركة كورت للمقاولات",
    "hero.subtitle": "نبني التميز، نحقق الأحلام",
    "hero.description":
      "نحن في شركة كورت للمقاولات نقدم خدماتنا في جميع جوانب المقاولات العامة بأعلى مستوى من الجودة والاحترافية ويتوفر طاقم متخصص لذلك، مما يضمن رضا العملاء ويحقق طموح موظفينا.",
    "hero.cta": "ابدأ مشروعك",
    "hero.learn-more": "استكشف أعمالنا",

    // About Section
    "about.title": "عن كورت",
    "about.subtitle": "التميز في البناء منذ 2008",
    "about.description":
      "نقوم بتنفيذ عقود البناء وصيانة المباني وأعمال الديكور الداخلي والخارجي والأعمال الميكانيكية والكهربائية وشبكات المياه والصرف الصحي وأعمال العزل بجميع أنواعها والأعمال المتعلقة بها والترميم حتى التسليم.",
    "about.values.experience": "خبرة واسعة",
    "about.values.quality": "جودة وإتقان",
    "about.values.punctuality": "الالتزام بالوقت",
    "about.values.innovation": "حلول مبتكرة",

    // Services
    "services.title": "خدماتنا",
    "services.subtitle": "حلول البناء الشاملة",
    "services.construction.title": "إنشاء المباني السكنية والتجارية",
    "services.construction.description":
      "نقوم بالإدارة والإشراف على كافة خدمات المقاولات العامة من بناء الهياكل الخرسانية اللازمة للإنشاءات والأساسات باستخدام أحدث التقنيات والمواد المبتكرة في البناء وفقا لاشتراطات ومواصفات الكود السعودي للبناء.",
    "services.renovation.title": "الترميم والتشطيب",
    "services.renovation.description":
      "نقوم بتنفيذ جميع أعمال الترميم والتشطيبات الداخلية والخارجية للمباني بما في ذلك أعمال اللياسة والدهان وتأسيس أعمال الكهرباء والسباكة وتركيب البلاط والرخام والحجر وجميع الديكورات الداخلية من أسقف مستعارة وجبس بورد مع إضافة لمسات فنية متميزة وأنيقة بما يلائم تطلعات عملائنا.",
    "services.design.title": "التصميم الداخلي",
    "services.design.description": "خدمات التصميم الداخلي الاحترافية مع لمسات فنية أنيقة تناسب تطلعات عملائنا.",
    "services.electrical.title": "الأعمال الكهربائية والميكانيكية",
    "services.electrical.description":
      "جميع الأعمال الكهربائية والميكانيكية وشبكات المياه والصرف الصحي بأعلى معايير السلامة.",

    // Why Choose Us
    "why-choose.title": "ما يميز كورت",
    "why-choose.subtitle": "ما يميزنا عن الآخرين",
    "why-choose.planning.title": "التخطيط الدقيق",
    "why-choose.planning.description":
      "حيث يوجد لدينا فريق عمل تنفيذي واستشاري وإداري متخصص من ذوي الخبرات السابقة للعمل على تحديد ميزانية ومتطلبات العمل واختيار فريق التنفيذ والإشراف الهندسي المناسب.",
    "why-choose.delivery.title": "الالتزام بموعد التسليم",
    "why-choose.delivery.description":
      "ويتم إنجاز المشاريع وتسليمها في مواعيدها المحددة، مع الالتزام بمعايير الجودة والسلامة نظرا لالتزامنا بالخطة الموضوعة مسبقا من فريق العمل بالشركة.",
    "why-choose.execution.title": "دقة التنفيذ",
    "why-choose.execution.description":
      "تلتزم شركة كورت للمقاولات بدقة وسرعة تنفيذ المشاريع والاهتمام بدقة التفاصيل مع الالتزام بمعايير الجودة والتوقيت للوصول بالمشروع إلى التنفيذ المثالي المطلوب.",
    "why-choose.pricing.title": "مرونة التسعير",
    "why-choose.pricing.description":
      "وتأتي مرونة التسعير وفقا لقراءة الوضع الاقتصادي أثناء التخطيط للمشروع في الاعتبار تكاليف المعدات والعمالة ومواد البناء وتوفرها مع مراعاة المنافسة لإعطاء سعر تنافسي مرغوب.",

    // Vision
    "vision.title": "رؤيتنا",
    "vision.subtitle": "نبني السعودية الغد",
    "vision.description":
      "الصدق في العمل ودقة التنفيذ والالتزام بالوقت وتجديد وتطوير الأفكار وإيجاد حلول دائمة بأعلى جودة من أولوياتنا وأهدافنا العليا لإرضاء عملائنا وكسب ثقتهم.",

    // Projects
    "projects.title": "أعمالنا",
    "projects.subtitle": "محفظة التميز",
    "projects.view-all": "عرض جميع المشاريع",

    // Contact
    "contact.title": "للتواصل",
    "contact.subtitle": "مستعد لبدء مشروعك؟",
    "contact.phone": "الهاتف",
    "contact.email": "البريد الإلكتروني",
    "contact.website": "الموقع الإلكتروني",
    "contact.location": "الموقع",

    // Footer
    "footer.credit": "المشروع من تنفيذ Soft Masters",
    "footer.rights": "جميع الحقوق محفوظة",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.body.className = language === "ar" ? "rtl font-arabic" : "ltr font-english"
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
