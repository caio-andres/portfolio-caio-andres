import { Suspense } from "react";
import { ProjectsGrid } from "@/components/home/panels/ProjectsGrid";
import { projects } from "@/lib/data/projects";
import { fetchAllStars } from "@/lib/github";

function ProjectsView({ stars }: { stars: Record<string, number> }) {
  return (
    <div>
      <h2 className="text-h2 font-bold text-white">Projetos</h2>
      <p className="mt-3 max-w-[60ch] text-body text-muted">
        Alguns do trabalho, outros de curiosidade. Os que têm código aberto estão com o link para o repositório.
      </p>
      <ProjectsGrid projects={projects} stars={stars} />
    </div>
  );
}

async function ProjectsWithLiveStars() {
  return <ProjectsView stars={await fetchAllStars(projects)} />;
}

/**
 * A página não espera o GitHub: sai na hora com as estrelas de lib/data e
 * troca pelas atuais assim que a API responder (cache de 24h, timeout de 2,5s).
 */
export function ProjectsPanel() {
  return (
    <Suspense fallback={<ProjectsView stars={{}} />}>
      <ProjectsWithLiveStars />
    </Suspense>
  );
}
