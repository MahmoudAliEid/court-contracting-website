"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const { language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { name, email, phone, projectType, message } = formData

    const subject = encodeURIComponent(
      language === "ar" ? `استفسار مشروع: ${projectType}` : `Project Inquiry: ${projectType}`,
    )
    const body = encodeURIComponent(
      (language === "ar" ? "الاسم الكامل: " : "Full Name: ") +
        name +
        "\n" +
        (language === "ar" ? "البريد الإلكتروني: " : "Email: ") +
        email +
        "\n" +
        (language === "ar" ? "رقم الهاتف: " : "Phone Number: ") +
        phone +
        "\n" +
        (language === "ar" ? "نوع المشروع: " : "Project Type: ") +
        projectTypes.find((type) => type.value === projectType)?.label +
        "\n" +
        (language === "ar" ? "تفاصيل المشروع: " : "Project Details: ") +
        message,
    )

    const mailtoUrl = `mailto:COURT.CO@HOTMAIL.COM?subject=${subject}&body=${body}`

    // Open the mailto link
    window.open(mailtoUrl, "_blank")

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form and close modal after a short delay
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      })
      onClose()
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const projectTypes = [
    { value: "residential", label: language === "ar" ? "مشروع سكني" : "Residential Project" },
    { value: "commercial", label: language === "ar" ? "مشروع تجاري" : "Commercial Project" },
    { value: "renovation", label: language === "ar" ? "ترميم وتجديد" : "Renovation & Renovation" },
    { value: "interior", label: language === "ar" ? "تصميم داخلي" : "Interior Design" },
    { value: "consultation", label: language === "ar" ? "استشارة هندسية" : "Engineering Consultation" },
    { value: "other", label: language === "ar" ? "أخرى" : "Other" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`
        max-w-2xl w-[95vw] max-h-[95vh] overflow-y-auto // Changed to overflow-y-auto
        bg-white dark:bg-background border-gray-200 dark:border-border
        ${language === "ar" ? "rtl" : "ltr"}
        z-[500] // Removed pt-20
      `}
      >
        <DialogHeader
          className={`border-b border-gray-200 dark:border-border pb-4 px-6 pt-6 // Added px-6 pt-6
        ${language === "ar" ? "text-right" : "text-left"}`}
        >
          {/* Removed the redundant close button here */}
          <DialogTitle
            className={`text-xl sm:text-2xl font-bold text-gray-900 dark:text-foreground mb-2 ${language === "ar" ? "text-right" : "text-left"}`}
          >
            {language === "ar" ? "تواصل معنا" : "Contact Us"}
          </DialogTitle>
          <p className="text-gray-600 dark:text-muted-foreground mt-2">
            {language === "ar"
              ? "نحن هنا لمساعدتك في تحقيق مشروعك. املأ النموذج وسنتواصل معك قريباً"
              : "We're here to help you achieve your project. Fill out the form and we'll contact you soon"}
          </p>
        </DialogHeader>

        <div className="p-6">
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-2">
                {language === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message Sent Successfully!"}
              </h3>
              <p className="text-gray-600 dark:text-muted-foreground">
                {language === "ar"
                  ? "شكراً لتواصلك معنا. سيتم فتح بريدك الإلكتروني لإرسال التفاصيل."
                  : "Thank you for contacting us. Your email client will open to send the details."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                    {language === "ar" ? "الاسم الكامل" : "Full Name"} *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                    required
                    className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                    {language === "ar" ? "البريد الإلكتروني" : "Email Address"} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email address"}
                    required
                    className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                    {language === "ar" ? "رقم الهاتف" : "Phone Number"} *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder={language === "ar" ? "أدخل رقم هاتفك" : "Enter your phone number"}
                    required
                    className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-gray-700 dark:text-gray-300">
                    {language === "ar" ? "نوع المشروع" : "Project Type"} *
                  </Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => handleInputChange("projectType", value)}
                  >
                    <SelectTrigger className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400">
                      <SelectValue placeholder={language === "ar" ? "اختر نوع المشروع" : "Select project type"} />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-background border-gray-200 dark:border-border">
                      {projectTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-gray-700 dark:text-gray-300">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
                  {language === "ar" ? "تفاصيل المشروع" : "Project Details"} *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder={
                    language === "ar"
                      ? "اكتب تفاصيل مشروعك، المساحة، الموقع، والمتطلبات الخاصة..."
                      : "Write your project details, area, location, and special requirements..."
                  }
                  rows={4}
                  required
                  className="border-gray-300 dark:border-border focus:border-purple-500 dark:focus:border-purple-400 resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      {language === "ar" ? "جاري الإرسال..." : "Sending..."}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className={`w-4 h-4 ${language === "ar" ? "ml-2" : "mr-2"}`} />
                      {language === "ar" ? "إرسال الرسالة" : "Send Message"}
                    </div>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-border dark:text-gray-300 dark:hover:bg-gray-800 bg-transparent"
                >
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </Button>
              </div>

              <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-300">
                  <p className="font-medium mb-1">{language === "ar" ? "معلومات مهمة:" : "Important Information:"}</p>
                  <ul className="space-y-1 text-xs">
                    <li>
                      {language === "ar"
                        ? "• سيتم فتح بريدك الإلكتروني لإرسال تفاصيل النموذج."
                        : "• Your email client will open to send the form details."}
                    </li>
                    <li>
                      {language === "ar"
                        ? "• جميع المعلومات المقدمة سرية ومحمية"
                        : "• All information provided is confidential and protected"}
                    </li>
                    <li>
                      {language === "ar"
                        ? "• يمكنك أيضاً التواصل معنا مباشرة على: 0566397317"
                        : "• You can also contact us directly at: 0566397317"}
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
