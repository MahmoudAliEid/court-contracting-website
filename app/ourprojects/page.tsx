import { AceternityNavbar } from "@/components/ui/aceternity-navbar"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Our Projects | أعمالنا</title>
        <meta name="description" content="Explore completed and ongoing projects by Court Contracting Company. See our portfolio of construction and contracting work in Saudi Arabia." />
        <meta name="keywords" content="projects, portfolio, court contracting, construction, Saudi Arabia, completed, ongoing" />
        <link rel="canonical" href="https://court.sa/ourprojects" />
        <meta property="og:title" content="Our Projects | أعمالنا" />
        <meta property="og:description" content="Explore completed and ongoing projects by Court Contracting Company. See our portfolio of construction and contracting work in Saudi Arabia." />
        <meta property="og:url" content="https://court.sa/ourprojects" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/court-logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Projects | أعمالنا" />
        <meta name="twitter:description" content="Explore completed and ongoing projects by Court Contracting Company. See our portfolio of construction and contracting work in Saudi Arabia." />
        <meta name="twitter:image" content="/images/court-logo.png" />
      </Head>
      <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <AceternityNavbar />
        <ProjectsSection />
        <Footer />
      </main>
    </>
  )
}
