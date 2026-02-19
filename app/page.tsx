import Image from "next/image";
import Hero from "@/components/Hero";
import AboutContent from "@/components/AboutContent";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SectionLayout from "@/components/SectionLayout";
import Footer from "@/components/Footer";
import { StripedPattern } from "@/components/magicui/striped-pattern";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <StripedPattern className="fixed inset-0 z-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

      <div className="relative z-10 pt-8">
        <div className="container mx-auto max-w-5xl px-6">
          <Hero />
          <SectionLayout
            about={<AboutContent />}
            experience={<Experience />}
            projects={<Projects />}
            contact={<Contact />}
          />
          <Footer />
        </div>
      </div>
    </main>
  );
}
