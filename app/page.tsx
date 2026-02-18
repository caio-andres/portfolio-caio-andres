import Hero from "@/components/Hero";
import AboutContent from "@/components/AboutContent";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SectionLayout from "@/components/SectionLayout";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <div className="pt-8">
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
