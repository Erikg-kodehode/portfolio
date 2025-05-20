// app/components/Projects.jsx
import ProjectCard from './ProjectCard';

const projectData = [
  {
    id: 1, title: 'Avansert Oppgavebehandler API',
    description: 'Et robust RESTful API bygget med ASP.NET Core for å håndtere oppgaver, brukere og prosjekter.',
    imageUrl: '/prosjekt1_bilde.png', technologies: ['C#', 'ASP.NET Core', 'SQL Server'],
    sourceCodeUrl: '#',
  },
  {
    id: 2, title: 'Personlig Bloggplattform',
    description: 'En Next.js-applikasjon for min personlige blogg, med Markdown-støtte.',
    imageUrl: '/prosjekt2_bilde.jpg', technologies: ['Next.js', 'React', 'Tailwind CSS'],
    liveDemoUrl: '#', sourceCodeUrl: '#',
  },
];

export default function Projects() {
  return (
    <section id="prosjekter" className="py-16 md:py-24"> {/* Kun vertikal padding */}
      {/* Innholdet kan enten ha sin egen bakgrunnsboks som About, eller være direkte på section-bakgrunnen (som er body-bakgrunnen) */}
      {/* For variasjon, la oss la prosjektkortene ligge direkte på section-bakgrunnen (som er body-bakgrunnen, bg-slate-100) */}
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="section-title-custom">Mine Prosjekter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projectData.length > 0 ? (
            projectData.map((project) => <ProjectCard key={project.id} {...project} />)
          ) : (
            <p className="text-center text-slate-500 col-span-full">Ingen prosjekter lagt til enda.</p>
          )}
        </div>
      </div>
    </section>
  );
}