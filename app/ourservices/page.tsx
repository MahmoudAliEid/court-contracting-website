import Head from 'next/head'
import { AceternityNavbar } from "@/components/ui/aceternity-navbar"
import { ServicesSection } from "@/components/services-section"
import { Footer } from "@/components/footer"


export default function HomePage() {
  return (
    <>
      <Head>
        <title>Our Services |خدماتنا</title>
        <meta name="description" content="Discover the range of construction and contracting services offered by Court Contracting Company in Saudi Arabia. Residential, commercial, renovation, and more." />
        <meta name="keywords" content="services, construction, contracting, Saudi Arabia, residential, commercial, renovation" />
        <link rel="canonical" href="https://court.sa/ourservices" />
        <meta property="og:title" content="Our Services | خدماتنا" />
        <meta property="og:description" content="Discover the range of construction and contracting services offered by Court Contracting Company in Saudi Arabia. Residential, commercial, renovation, and more." />
        <meta property="og:url" content="https://court.sa/ourservices" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/court-logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Services | خدماتنا" />
        <meta name="twitter:description" content="Discover the range of construction and contracting services offered by Court Contracting Company in Saudi Arabia. Residential, commercial, renovation, and more." />
        <meta name="twitter:image" content="/images/court-logo.png" />
      </Head>
      <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <AceternityNavbar />
        <ServicesSection />
        <Footer />
      </main>
    </>
  )
}
