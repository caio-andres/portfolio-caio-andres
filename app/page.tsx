import { headers } from "next/headers";
import { Hero } from "@/components/home/Hero";
import { NowSection } from "@/components/home/NowSection";
import { Tabs } from "@/components/home/Tabs";
import { AboutPanel } from "@/components/home/panels/AboutPanel";
import { ContactPanel } from "@/components/home/panels/ContactPanel";
import { ExperiencePanel } from "@/components/home/panels/ExperiencePanel";
import { ProjectsPanel } from "@/components/home/panels/ProjectsPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { personJsonLd } from "@/lib/seo";

export default async function Home() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <JsonLd data={personJsonLd()} nonce={nonce} />
      <Hero />
      <NowSection />
      <div className="mt-20 md:mt-24">
        <Tabs
          label="Seções do portfolio"
          tabs={[
            { id: "about", label: "about", content: <AboutPanel /> },
            { id: "experience", label: "experience", content: <ExperiencePanel /> },
            { id: "projects", label: "projects", content: <ProjectsPanel /> },
            { id: "contact", label: "contact", content: <ContactPanel /> },
          ]}
        />
      </div>
    </>
  );
}
