
import { AboutSection } from '@/components/about-section';
import { VisionSection } from '@/components/vision-section';
import { WhyChooseSection } from '@/components/why-choose-section';
import { Footer } from "@/components/footer"
import { AceternityNavbar } from "@/components/ui/aceternity-navbar"



export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <AceternityNavbar />

      <AboutSection />
      <WhyChooseSection />
      <VisionSection />
              <Footer/>

    
    </div>
  )
}
