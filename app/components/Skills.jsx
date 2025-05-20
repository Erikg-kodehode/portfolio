// app/components/Skills.jsx
export default function Skills() {
  // More modest representation of skills with clearer categories
  const skillsData = {
    backendDevelopment: [
      { name: 'C#', level: 'Grunnleggende til middels' },
      { name: '.NET', level: 'Grunnleggende til middels' },
      { name: 'ASP.NET Core', level: 'Grunnleggende' },
      { name: 'SQL', level: 'Grunnleggende' }
    ],
    frontendDevelopment: [
      { name: 'HTML', level: 'Grunnleggende' },
      { name: 'CSS', level: 'Grunnleggende' },
      { name: 'JavaScript', level: 'Nybegynner til grunnleggende' },
      { name: 'React', level: 'Nybegynner til grunnleggende' },
      { name: 'Next.js', level: 'Nybegynner til grunnleggende' },
      { name: 'Tailwind CSS', level: 'Nybegynner til grunnleggende' }
    ],
    utviklingsverktoy: [
      { name: 'Git & GitHub', level: 'Grunnleggende' },
      { name: 'VS Code', level: 'Grunnleggende' }
    ]
  };

  return (
    <section id="ferdigheter" className="section-container">
      <h2 className="section-title-custom">Ferdigheter under utvikling</h2>
      <p className="text-center text-white mb-8 max-w-2xl mx-auto">
        Som en utvikler tidlig i karrieren, fortsetter jeg å bygge på mitt fundament av ferdigheter. 
        Her er områdene jeg fokuserer på for øyeblikket:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {Object.entries(skillsData).map(([categoryKey, skillsList]) => {
          let categoryTitle;
          let categoryDescription = "";
          
          if (categoryKey === "backendDevelopment") {
            categoryTitle = "Backend Utvikling";
            categoryDescription = "Mitt hovedfokusområde med C# og .NET";
          } else if (categoryKey === "frontendDevelopment") {
            categoryTitle = "Frontend Utvikling";
            categoryDescription = "Grunnleggende ferdigheter jeg fortsetter å utvikle";
          } else if (categoryKey === "utviklingsverktoy") {
            categoryTitle = "Utviklingsverktøy";
            categoryDescription = "Verktøy jeg bruker i arbeidsflyten min";
          }

          return (
            <article key={categoryKey} className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg shadow-md border border-blue-500">
              <h3 className="text-xl font-semibold text-white mb-2">{categoryTitle}</h3>
              <p className="text-white text-sm mb-4">{categoryDescription}</p>
              <ul className="space-y-2">
                {skillsList.map((skill) => (
                  <li key={skill.name} className="px-3 py-2 bg-blue-800 bg-opacity-30 text-white rounded-md text-sm border-l-2 border-blue-300 flex justify-between items-center">
                    <span>{skill.name}</span>
                    <span className="text-xs text-blue-200 font-light">{skill.level}</span>
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
