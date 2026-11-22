import { fetchAllStars } from "@/lib/github";
import { projects } from "@/lib/data/projects";
import { ProjectsGrid } from "@/components/home/panels/ProjectsGrid";

export async function ProjectsPanel() {
  const stars = await fetchAllStars(projects);
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
