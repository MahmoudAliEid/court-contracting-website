"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t, language } = useLanguage();

  const quickLinks = [
    { href: "#home", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#services", label: t("nav.services") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const services = [
    {
      label:
        language === "ar"
          ? "إنشاء المباني السكنية والتجارية"
          : "Construction of Residential & Commercial Buildings",
    },
    {
      label: language === "ar" ? "الترميم والتشطيب" : "Restoration & Finishing",
    },
    {
      label: language === "ar" ? "التصميم الداخلي" : "Interior Design",
    },
    {
      label:
        language === "ar"
          ? "الأعمال الكهربائية والميكانيكية"
          : "Electrical & Mechanical Works",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="footer-theme no-overlap relative z-10">
      <div className="container mx-auto px-4 py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/court-logo.webp"
                alt="Court Contracting Company"
                width={140}
                height={45}
                className="h-14 w-auto sm:h-16 md:h-20 transition-all duration-300 group-hover:brightness-110 rounded-md"
                priority
              />
            </Link>
            <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
              {language === "ar"
                ? "شركة كورت للمقاولات - نبني المستقبل بخبرة وإتقان. نقدم خدمات البناء والمقاولات بأعلى معايير الجودة والاحترافية."
                : "Court Contracting Company - Building the future with expertise and excellence. We provide construction and contracting services with the highest standards of quality and professionalism."}
            </p>
            <div
              className={`flex ${
                language === "ar" ? "space-x-reverse" : "space-x-4"
              }`}
            >
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-purple-100 dark:bg-primary/10 rounded-lg flex items-center justify-center hover:bg-purple-200 dark:hover:bg-primary hover:text-purple-700 dark:hover:text-primary-foreground transition-colors duration-300 text-purple-600 dark:text-purple-400"
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-purple-600 dark:text-muted-foreground dark:hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground">
              {language === "ar" ? "خدماتنا" : "Our Services"}
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-600 dark:text-muted-foreground text-sm">
                    {service.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-foreground">
              {language === "ar" ? "معلومات التواصل" : "Contact Info"}
            </h3>
            <div className="space-y-3">
              <div className={`flex items-center gap-2 `}>
                <Phone className="h-4 w-4 text-purple-600 dark:text-primary flex-shrink-0" />
                <span className="text-gray-600 dark:text-muted-foreground">
                  0566397317
                </span>
              </div>
              <div className={`flex items-center gap-2 `}>
                <Mail className="h-4 w-4 text-purple-600 dark:text-primary flex-shrink-0" />
                <span className="text-gray-600 dark:text-muted-foreground">
                  info@court.sa
                </span>
              </div>
              <div className={`flex items-center gap-2 `}>
                <MapPin className="h-4 w-4 text-purple-600 dark:text-primary flex-shrink-0" />
                <span className="text-gray-600 dark:text-muted-foreground">
                  {language === "ar"
                    ? "الرياض، المملكة العربية السعودية"
                    : "Riyadh, Saudi Arabia"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-200 dark:bg-border" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 w-full">
          <div className="text-gray-600 dark:text-muted-foreground text-sm">
            © {new Date().getFullYear()}{" "}
            {language === "ar"
              ? "شركة كورت للمقاولات"
              : "Court Contracting Company"}
            . {t("footer.rights")}.
          </div>
            <button
              className="text-gray-600 dark:text-muted-foreground text-sm hover:text-purple-600 transition-all duration-500"
              onClick={() => window.open("https://wa.me/01158531550")}
              type="button"
            >
              {t("footer.credit")}
            </button>
        </div>
      </div>
    </footer>
  );
}
