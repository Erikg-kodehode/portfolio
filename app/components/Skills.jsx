// app/components/Skills.jsx
export default function Skills() {
  const skillsData = {
    backend: ['C#', '.NET', 'ASP.NET Core', 'SQL Server'],
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
    verktoyOgAnnet: ['Git & GitHub', 'Azure', 'Docker', 'VS Code'],
  };

  return (
    <section id="ferdigheter" className="py-16 md:py-24 bg-white container mx-auto px-6 md:px-10 rounded-lg shadow-lg my-10"> {/* Container-klasser direkte på section */}
      <h2 className="section-title-custom">Ferdigheter</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"> {/* Nødvendig div for grid */}
        {Object.entries(skillsData).map(([categoryKey, skillsList]) => {
          let categoryTitle = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
          if (categoryKey === "verktoyOgAnnet") categoryTitle = "Verktøy & Annet";

          return (
            // Hver kategori kan være en egen <article> eller <section> for semantikk
            <article key={categoryKey} className="bg-slate-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">{categoryTitle}</h3>
              <ul className="space-y-2"> {/* ul for listen med ferdigheter */}
                {skillsList.map((skill) => (
                  <li key={skill} className="px-3 py-2 bg-slate-200 text-slate-700 rounded-md text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}