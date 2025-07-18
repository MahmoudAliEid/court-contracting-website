"use client"

import { useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowRight, Eye } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "@/components/ui/card-3d"
import { ProjectDetailModal } from "@/components/project-detail-modal"

interface Project {
  id: number
  title: string
  category: string
  image: string
  description: string
  fullDescription?: string
  location?: string
  client?: string
  duration?: string
  completedDate?: string
  features?: string[]
  gallery?: string[]
}

export function ProjectsSection() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = [
    { id: "all", label: language === "ar" ? "جميع المشاريع" : "All Projects" },
    { id: "residential", label: language === "ar" ? "سكني" : "Residential" },
    { id: "commercial", label: language === "ar" ? "تجاري" : "Commercial" },
    { id: "renovation", label: language === "ar" ? "ترميم" : "Renovation" },
  ]

  const projects: Project[] = [
    {
      id: 1,
      title: language === "ar" ? "مؤسسة النقد السعودي البنك المركزي" : "Saudi Central Bank",
      category: "commercial",
      image: "/placeholder.svg?height=300&width=400",
      description:
        language === "ar"
          ? "مشروع تطوير وتجديد مبنى البنك المركزي"
          : "Central Bank building development and renovation project",
      fullDescription:
        language === "ar"
          ? "مشروع متميز لتطوير وتجديد مبنى مؤسسة النقد السعودي البنك المركزي، تم تنفيذه بأعلى معايير الجودة والأمان المصرفي. يتضمن المشروع تحديث البنية التحتية التقنية وتطوير المرافق الإدارية مع الحفاظ على الطابع المعماري المتميز للمبنى."
          : "A distinguished project for the development and renovation of the Saudi Central Bank building, executed with the highest standards of quality and banking security. The project includes updating the technical infrastructure and developing administrative facilities while preserving the building's distinctive architectural character.",
      location: language === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia",
      client: language === "ar" ? "مؤسسة النقد السعودي" : "Saudi Central Bank",
      duration: language === "ar" ? "18 شهر" : "18 Months",
      completedDate: "2023",
      features: [
        language === "ar" ? "أنظمة أمان متطورة" : "Advanced Security Systems",
        language === "ar" ? "تقنيات ذكية للمباني" : "Smart Building Technologies",
        language === "ar" ? "تصميم معماري مؤسسي" : "Institutional Architectural Design",
        language === "ar" ? "مواد بناء عالية الجودة" : "High Quality Building Materials",
      ],
    },
    {
      id: 2,
      title: language === "ar" ? "المستشفى السعودي البريطاني" : "Saudi British Hospital",
      category: "commercial",
      image: "/placeholder.svg?height=300&width=400",
      description: language === "ar" ? "أعمال التشطيب والتجهيز الطبي" : "Medical finishing and equipment works",
      fullDescription:
        language === "ar"
          ? "مشروع شامل لأعمال التشطيب والتجهيز الطبي للمستشفى السعودي البريطاني، يتضمن تركيب أحدث الأجهزة الطبية وتطوير البنية التحتية الطبية وفقاً للمعايير الدولية للرعاية الصحية."
          : "A comprehensive project for medical finishing and equipment works at Saudi British Hospital, including installation of the latest medical equipment and development of medical infrastructure according to international healthcare standards.",
      location: language === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia",
      client: language === "ar" ? "المستشفى السعودي البريطاني" : "Saudi British Hospital",
      duration: language === "ar" ? "14 شهر" : "14 Months",
      completedDate: "2023",
    },
    {
      id: 3,
      title: language === "ar" ? "قصر سمو الأمير محمد بن بندر" : "Prince Mohammed bin Bandar Palace",
      category: "residential",
      image: "/placeholder.svg?height=300&width=400",
      description:
        language === "ar" ? "قصر فاخر بتصميم معماري متميز" : "Luxury palace with distinctive architectural design",
      fullDescription:
        language === "ar"
          ? "قصر ملكي فاخر يجمع بين الطراز المعماري التراثي والتقنيات الحديثة، تم تصميمه وتنفيذه بأرقى المواد والتشطيبات الفاخرة مع الاهتمام بكافة التفاصيل الجمالية والوظيفية."
          : "A luxurious royal palace that combines traditional architectural style with modern technologies, designed and executed with the finest materials and luxury finishes with attention to all aesthetic and functional details.",
      location: language === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia",
      client: language === "ar" ? "سمو الأمير محمد بن بندر" : "His Highness Prince Mohammed bin Bandar",
      duration: language === "ar" ? "24 شهر" : "24 Months",
      completedDate: "2022",
    },
    {
      id: 4,
      title: language === "ar" ? "عمائر سنتريا بالعليا" : "Centria Buildings in Al-Olaya",
      category: "commercial",
      image: "/placeholder.svg?height=300&width=400",
      description: language === "ar" ? "مجمع تجاري وسكني متكامل" : "Integrated commercial and residential complex",
      location: language === "ar" ? "العليا، الرياض" : "Al-Olaya, Riyadh",
      duration: language === "ar" ? "20 شهر" : "20 Months",
      completedDate: "2023",
    },
    {
      id: 5,
      title: language === "ar" ? "مسجد العيينة" : "Al-Uyayna Mosque",
      category: "commercial",
      image: "/placeholder.svg?height=300&width=400",
      description: language === "ar" ? "مسجد بتصميم إسلامي أصيل" : "Mosque with authentic Islamic design",
      location: language === "ar" ? "العيينة، الرياض" : "Al-Uyayna, Riyadh",
      duration: language === "ar" ? "10 شهر" : "10 Months",
      completedDate: "2023",
    },
    {
      id: 6,
      title: language === "ar" ? "فيلا الدكتور حسين الدوسري" : "Dr. Hussein Al-Dosari Villa",
      category: "residential",
      image: "/placeholder.svg?height=300&width=400",
      description: language === "ar" ? "فيلا عصرية بمواصفات عالية" : "Modern villa with high specifications",
      location: language === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia",
      duration: language === "ar" ? "16 شهر" : "16 Months",
      completedDate: "2023",
    },
  ]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

  const handleViewProject = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="section-spacing-responsive bg-gray-50/50 dark:bg-muted/30 relative overflow-hidden"
      >
        <div className="container mx-auto relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <Badge variant="outline" className="badge-theme mb-4">
                {t("projects.title")}
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-foreground">
                {t("projects.title")}
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
                {language === "ar"
                  ? "نفخر بمجموعة متنوعة من المشاريع المتميزة التي نفذناها بأعلى معايير الجودة"
                  : "We are proud of a diverse range of distinguished projects that we have implemented with the highest quality standards"}
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12 px-4"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                      : "border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:border-border dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-accent/50"
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </motion.div>

            {/* Projects Grid with 3D Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-4">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CardContainer className="inter-var p-0">
                    <CardBody className="bg-white dark:bg-background relative group/card border border-gray-200 dark:border-border hover:shadow-xl hover:shadow-purple-500/[0.1] w-full h-auto rounded-xl p-6 backdrop-blur-sm transition-all duration-300">
                      <CardItem translateZ="50" className="text-xl font-bold text-gray-900 dark:text-foreground mb-2">
                        {project.title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-gray-600 dark:text-muted-foreground text-sm max-w-sm mb-4"
                      >
                        {project.description}
                      </CardItem>
                      <CardItem translateZ="100" className="w-full mb-4">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-all duration-300"
                        />
                      </CardItem>
                      <div className="flex justify-between items-center gap-2">
                        <CardItem
                          translateZ={20}
                          as="button"
                          onClick={() => handleViewProject(project)}
                          className="px-4 py-2 rounded-xl text-xs font-normal text-gray-600 dark:text-muted-foreground border border-gray-300 dark:border-border hover:bg-gray-50 dark:hover:bg-accent/50 transition-colors flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          {language === "ar" ? "عرض التفاصيل" : "View Details"}
                        </CardItem>
                        <CardItem
                          translateZ={20}
                          as="button"
                          onClick={() => handleViewProject(project)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {language === "ar" ? "مشاهدة" : "View"}
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center px-4"
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("projects.view-all")}
                <ArrowRight
                  className={`${language === "ar" ? "mr-2" : "ml-2"} h-4 w-4 transition-transform group-hover:${language === "ar" ? "-translate-x-1" : "translate-x-1"}`}
                />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProject(null)
        }}
      />
    </>
  )
}
