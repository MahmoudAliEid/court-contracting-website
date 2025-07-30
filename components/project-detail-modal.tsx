"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, User, Building, Clock, CheckCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"

interface Project {
  id: number
  title: string
  ar_title?: string
  category: string
  images: string[]
  description: string
  ar_description?: string
  fullDescription?: string
  location?: string
  client?: string
  duration?: string
  completedDate?: string
  features?: string[]
  gallery?: string[]
  status?: string | string[]
}

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const { language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState(0)
       interface Status {
      id: string
      name: string
      ar_name?: string
    }
    
    const { data: status = [], isLoading: isLoadingStatus } = useQuery<Status[]>({
       queryKey: ['status'],
       queryFn: async () => {
        const response = await fetch('/api/status')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
       },
       refetchOnWindowFocus: false,
      })

      interface Category {
      id: string
      name: string
      ar_name?: string
    }
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    refetchOnWindowFocus: false,
  })

  if (!project) return null

  const projectDetails = {
    location: project.location || (language === "ar" ? "الرياض، السعودية" : "Riyadh, Saudi Arabia"),
    client: project.client || (language === "ar" ? "عميل خاص" : "Private Client"),
    duration: project.duration || (language === "ar" ? "12 شهر" : "12 Months"),
    completedDate: project.completedDate || "2023",
    features: project.features || [
      language === "ar" ? "تصميم معماري متميز" : "Distinguished Architectural Design",
      language === "ar" ? "مواد بناء عالية الجودة" : "High Quality Building Materials",
      language === "ar" ? "تشطيبات فاخرة" : "Luxury Finishes",
      language === "ar" ? "أنظمة ذكية متطورة" : "Advanced Smart Systems",
    ],
    gallery: project.images || [
      project.images[0] || "/placeholder.svg?height=400&width=600",
      project.images[1] || "/placeholder.svg?height=400&width=600",
      project.images[2] || "/placeholder.svg?height=400&width=600",
    ],
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`
          max-w-5xl w-[95vw] max-h-[95vh] 
          z-[1000] rounded-lg shadow-lg
          bg-white dark:bg-background border-gray-200 dark:border-border
          ${language === "ar" ? "rtl" : "ltr"} overflow-y-auto
        `}
      >
        <DialogHeader
          className={`border-b border-gray-200 dark:border-border pb-4 px-6 pt-6 ${language === "ar" ? "text-right" : "text-left"}`}
        >
          <DialogTitle
            className={`text-xl sm:text-2xl font-bold text-gray-900 dark:text-foreground mb-2 ${language === "ar" ? "text-right" : "text-left"}`}
          >
           {
            language === "ar" ? project.ar_title  : project.title
           }
          </DialogTitle>
          <div className={`flex items-center gap-2 ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}>
            <Badge
              variant="outline"
              className="capitalize border-purple-300 text-purple-700 bg-purple-50 dark:border-purple-500/30 dark:text-purple-300 dark:bg-purple-500/10"
            >
              {
                Array.isArray(project.category)
                  ? project.category.map((cat, idx) => {
                    const categoryObj = categories.find(c => c.id === cat)
                    return (
                      <span key={idx} className="mx-1">
                        {language === "ar" ? categoryObj?.ar_name || categoryObj?.name || cat : categoryObj?.name || cat}
                      </span>
                    )
                  })
                  :((() => {
                    const categoryObj = categories.find(c => c.id === project.category
                    )
                    return (
                      <span className="mx-1">
                        {language === "ar" ? categoryObj?.ar_name || categoryObj?.name || project.category : categoryObj?.name || project.category}
                      </span>
                    )
                  })()
                    )
              }
            </Badge>
            <Badge
              variant="outline"
              className="border-green-300 text-green-700 bg-green-50 dark:border-green-500/30 dark:text-green-300 dark:bg-green-500/10"
            >
              <CheckCircle className={`w-3 h-3 ${language === "ar" ? "ml-1" : "mr-1"}`} />
                {Array.isArray(project.status)
                  ? project.status.map((statusId, idx) => {
                    const statusObj = status.find(s => s.id === statusId)
                    return (
                    <span key={idx} className="mx-1">
                      {language === "ar"
                      ? statusObj?.ar_name || statusObj?.name || statusId
                      : statusObj?.name || statusId}
                    </span>
                    )
                  })
                  : (() => {
                    const statusObj = status.find(s => s.id === project.status)
                    return language === "ar"
                    ? statusObj?.ar_name || statusObj?.name || project.status || "مكتمل"
                    : statusObj?.name || project.status || "Completed"
                  })()
                }
            </Badge>
          </div>
        </DialogHeader>

        <div className=" max-h-[calc(95vh-120px)] p-4 sm:p-6">
          <div className="space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden"
              >
                <img
                  src={projectDetails.gallery[selectedImage] || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Thumbnail Gallery */}
              <div className={`flex gap-2 overflow-x-auto pb-2 ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                {projectDetails.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 sm:w-20 h-12 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Project Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Details */}
              {/* <div className={`space-y-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground">
                  {language === "ar" ? "تفاصيل المشروع" : "Project Details"}
                </h3>
                <div className="space-y-3">
                  <div
                    className={`flex items-center gap-3 text-gray-600 dark:text-gray-300 ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <span className="text-sm">{projectDetails.location}</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 text-gray-600 dark:text-gray-300 ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <User className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <span className="text-sm">{projectDetails.client}</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 text-gray-600 dark:text-gray-300 ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <span className="text-sm">{projectDetails.duration}</span>
                  </div>
                  <div
                    className={`flex items-center gap-3 text-gray-600 dark:text-gray-300 ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <span className="text-sm">{projectDetails.completedDate}</span>
                  </div>
                </div>
              </div> */}

              {/* Project Features */}
              <div className={`space-y-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground">
                  {language === "ar" ? "مميزات المشروع" : "Project Features"}
                </h3>
                <div className="space-y-2">
                  {projectDetails.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200 dark:bg-border" />

            {/* Description */}
            <div className={`space-y-4 ${language === "ar" ? "text-right" : "text-left"}`}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground">
                {language === "ar" ? "وصف المشروع" : "Project Description"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {language === "ar" ? project.ar_description : project.description 
                  || "No description available."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 py-4 ${language === "ar" ? "sm:flex-row-reverse" : ""}`}>
              <Button
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => {
                  // Navigate to contact form
                  onClose()
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Building className={`w-4 h-4 ${language === "ar" ? "ml-2" : "mr-2"}`} />
                {language === "ar" ? "طلب مشروع مماثل" : "Request Similar Project"}
              </Button>
                <Button
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-border dark:text-gray-300 dark:hover:bg-gray-800 bg-transparent"
                onClick={async () => {
                  // Updated share functionality with more data
                  if (navigator.share) {
                  await navigator.share({
                    title: language === "ar" ? project.ar_title || project.title : project.title,
                    text: language === "ar" ? project.ar_description || project.description : project.description,
                    url: window.location.href,
                  })
                  }
                }}
                >
                {language === "ar" ? "مشاركة المشروع" : "Share Project"}
                </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
