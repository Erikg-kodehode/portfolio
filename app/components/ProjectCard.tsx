// app/components/ProjectCard.jsx
import ProjectImage from './ProjectImage';

export default function ProjectCard({ title, description, imageUrl, technologies, liveDemoUrl, sourceCodeUrl }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group h-full">
      {imageUrl && (
        <figure className="relative w-full aspect-[4/3]">
          <ProjectImage 
            src={imageUrl} 
            alt={`Skjermbilde av ${title}`} 
          />
        </figure>
      )}
      
      <section className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-3 flex-grow">{description}</p>

        {technologies?.length > 0 && (
          <section className="mb-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Teknologier:</h4>
            <ul className="flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <li key={tech} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-full">
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        )}
        
        <nav className="mt-auto pt-3 border-t border-slate-200 flex gap-2">
          {liveDemoUrl && liveDemoUrl !== '#' && (
            <a 
              href={liveDemoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1.5 text-xs bg-blue-600 text-white dark:text-green-white rounded hover:bg-blue-700 transition-colors duration-150 font-medium"
            >
              Live Demo
            </a>
          )}
          {sourceCodeUrl && sourceCodeUrl !== '#' && (
            <a 
              href={sourceCodeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1.5 text-xs bg-slate-600 text-white dark:text-green-white rounded hover:bg-slate-700 transition-colors duration-150 font-medium"
            >
              Kildekode
            </a>
          )}
        </nav>
      </section>
    </article>
  );
}
