import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
