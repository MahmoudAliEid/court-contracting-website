import Head from 'next/head'

import { AboutSection } from '@/components/about-section';
import { VisionSection } from '@/components/vision-section';
import { WhyChooseSection } from '@/components/why-choose-section';
import { Footer } from "@/components/footer"
import { AceternityNavbar } from "@/components/ui/aceternity-navbar"



export default function HomePage() {
  return (
    <>
      <Head>
        <title>About Us | Court Contracting Company | من نحن</title>
        <meta name="description" content="Learn about Court Contracting Company, our vision, values, and why clients choose us for construction and contracting services in Saudi Arabia." />
        <meta name="keywords" content="about, court contracting, construction, Saudi Arabia, company, vision, values" />
        <link rel="canonical" href="https://court.sa/about" />
        <meta property="og:title" content="About Us | Court Contracting Company" />
        <meta property="og:description" content="Learn about Court Contracting Company, our vision, values, and why clients choose us for construction and contracting services in Saudi Arabia." />
        <meta property="og:url" content="https://court.sa/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/court-logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Court Contracting Company" />
        <meta name="twitter:description" content="Learn about Court Contracting Company, our vision, values, and why clients choose us for construction and contracting services in Saudi Arabia." />
        <meta name="twitter:image" content="/images/court-logo.png" />
      </Head>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <AceternityNavbar />
        <AboutSection />
        <WhyChooseSection />
        <VisionSection />
        <Footer/>
      </div>
    </>
  )
}
