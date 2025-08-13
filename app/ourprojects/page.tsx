import { AceternityNavbar } from "@/components/ui/aceternity-navbar"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <AceternityNavbar />
    
      <ProjectsSection />
      <Footer />
    </main>
  )
}
