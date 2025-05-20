// app/components/ProjectCard.jsx
import Image from 'next/image';

export default function ProjectCard({ title, description, imageUrl, technologies, liveDemoUrl, sourceCodeUrl }) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"> {/* Semantisk article */}
      {imageUrl && (
        <div className="relative w-full h-56"> {/* Nødvendig for next/image layout="fill" */}
          <Image
            src={imageUrl}
            alt={`Skjermbilde av ${title}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      {/* div for padding og flex-grow for å skyve knapper ned */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">{description}</p>

        {technologies && technologies.length > 0 && (
          // div for å gruppere teknologier er greit for struktur
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Teknologier:</h4>
            <ul className="flex flex-wrap gap-2"> {/* Bruker ul for listen med teknologier */}
              {technologies.map((tech) => (
                <li key={tech} className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-full">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* div for å gruppere lenker og skyve dem til bunnen */}
        <div className="mt-auto pt-4 border-t border-slate-200 flex justify-start space-x-3">
          {liveDemoUrl && liveDemoUrl !== '#' && (
            <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-150 font-medium">
              Live Demo
            </a>
          )}
          {sourceCodeUrl && sourceCodeUrl !== '#' && (
            <a href={sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors duration-150 font-medium">
              Kildekode
            </a>
          )}
        </div>
      </div>
    </article>
  );
}