import { AceternityNavbar } from "@/components/ui/aceternity-navbar"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Contact Us | تواصل معنا</title>
        <meta name="description" content="Contact Court Contracting Company for professional construction and contracting services in Saudi Arabia. Get in touch for project inquiries, quotes, and support." />
        <meta name="keywords" content="contact, court contracting, construction, Saudi Arabia, project, inquiry, support" />
        <link rel="canonical" href="https://court.sa/contactus" />
        <meta property="og:title" content="Contact Us | تواصل معنا" />
        <meta property="og:description" content="Contact Court Contracting Company for professional construction and contracting services in Saudi Arabia. Get in touch for project inquiries, quotes, and support." />
        <meta property="og:url" content="https://court.sa/contactus" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/court-logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | تواصل معنا" />
        <meta name="twitter:description" content="Contact Court Contracting Company for professional construction and contracting services in Saudi Arabia. Get in touch for project inquiries, quotes, and support." />
        <meta name="twitter:image" content="/images/court-logo.png" />
      </Head>
      <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <AceternityNavbar />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
