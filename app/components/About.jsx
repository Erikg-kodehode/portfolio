// app/components/Skills.jsx
export default function Skills() {
  const skillsData = {
    backend: ['C#', '.NET', 'ASP.NET Core', 'SQL Server'],
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
    verktoyOgAnnet: ['Git & GitHub', 'Azure', 'Docker', 'VS Code'],
  };

  return (
    <section id="ferdigheter" className="py-16 md:py-24"> {/* Kun vertikal padding */}
      <div className="container mx-auto px-6 md:px-10 max-w-4xl bg-white p-8 md:p-12 rounded-lg shadow-lg"> {/* Inner div for innhold */}
        <h2 className="section-title-custom">Ferdigheter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {Object.entries(skillsData).map(([categoryKey, skillsList]) => {
            let categoryTitle = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
            if (categoryKey === "verktoyOgAnnet") categoryTitle = "Verktøy & Annet";

            return (
              <article key={categoryKey} className="bg-slate-50 p-6 rounded-lg shadow-md"> {/* Kategori-kort */}
                <h3 className="text-xl font-semibold text-blue-600 mb-4">{categoryTitle}</h3>
                <ul className="space-y-2">
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
      </div>
    </section>
  );
}