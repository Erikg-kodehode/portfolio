// app/components/Projects.jsx
import ProjectCard from './ProjectCard';

const projectData = [
  {
    id: 1, 
    title: 'Bomberman Spillmotor (Backend)',
    description: 'Utviklet en solid backend-arkitektur for et Bomberman-spill, med fokus på robust spillogikk, kollisjonshåndtering, og flerspiller-støtte. Implementerte spillregler og gamestate management i C#.',
    technologies: ['C#', '.NET', 'Spill-logikk', 'State Management'],
    sourceCodeUrl: '#',
  },
  {
    id: 2, 
    title: 'Hangman Spill',
    description: 'Et enkelt men funksjonelt Hangman-spill som demonstrerer grunnleggende programmeringskonsepter, inkludert streng-manipulasjon, tilfeldig ordvalg fra en database, og logikk for spilltilstand.',
    technologies: ['C#', 'Console Application', 'Game Logic'],
    sourceCodeUrl: '#',
  },
  {
    id: 3, 
    title: 'Discord Bot',
    description: 'En modulær Discord-bot som kan utvides med nye kommandoer og funksjonalitet. Bygget med fokus på fleksibilitet og konfigurerbarhet, slik at boten enkelt kan få nye oppgaver.',
    technologies: ['JavaScript', 'Node.js', 'Discord API'],
    sourceCodeUrl: '#',
  },
];

export default function Projects() {
  return (
    <section id="prosjekter" className="section-container">
      <h2 className="section-title-custom">Mine Prosjekter</h2>
      <p className="text-center text-white mb-8 max-w-2xl mx-auto">
        Dette er noen av prosjektene jeg har jobbet med for å utvikle mine ferdigheter. 
        Jeg fokuserer på å bygge et solid fundament i backend-utvikling med C# og .NET.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {projectData.length > 0 ? (
          projectData.map((project) => <ProjectCard key={project.id} {...project} />)
        ) : (
          <p className="text-center text-blue-500 col-span-full">Ingen prosjekter lagt til enda.</p>
        )}
      </div>
    </section>
  );
}
