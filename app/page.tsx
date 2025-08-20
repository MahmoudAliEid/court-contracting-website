import Head from 'next/head'
import { AceternityNavbar } from "@/components/ui/aceternity-navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { VisionSection } from "@/components/vision-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Court Contracting Company | شركة كورت للمقاولات</title>
        <meta name="description" content="Professional construction and contracting services in Saudi Arabia. Residential, commercial, renovation, and finishing works." />
        <meta name="keywords" content="construction, contracting, Saudi Arabia, residential, commercial, renovation, finishing" />
        <link rel="canonical" href="https://court.sa/" />
        <meta property="og:title" content="Court Contracting Company | شركة كورت للمقاولات" />
        <meta property="og:description" content="Professional construction and contracting services in Saudi Arabia. Residential, commercial, renovation, and finishing works." />
        <meta property="og:url" content="https://court.sa/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/court-logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Court Contracting Company | شركة كورت للمقاولات" />
        <meta name="twitter:description" content="Professional construction and contracting services in Saudi Arabia. Residential, commercial, renovation, and finishing works." />
        <meta name="twitter:image" content="/images/court-logo.png" />
      </Head>
      <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <AceternityNavbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
