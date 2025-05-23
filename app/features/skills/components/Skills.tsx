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
    <section id="ferdigheter" className="max-w-5xl mx-auto px-4 py-2">
      <h2 className="text-2xl font-bold text-blue-800 mb-3 text-center">Ferdigheter</h2>
      
      <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 max-w-3xl mx-auto">
        <div className="p-5">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Tekniske Kompetanser</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Som en utvikler i startfasen av min karriere, fokuserer jeg på å bygge et solid fundament med følgende teknologier:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-2">Backend Utvikling</h4>
              <p className="text-slate-600 text-xs mb-2">Mitt hovedfokusområde med C# og .NET</p>
              <div className="flex flex-wrap gap-1.5">
                {skillsData.backendDevelopment.map((skill) => (
                  <span key={skill.name} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-3 border-t border-slate-200">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">Frontend Utvikling</h4>
              <p className="text-slate-600 text-xs mb-2">Grunnleggende ferdigheter jeg fortsetter å utvikle</p>
              <div className="flex flex-wrap gap-1.5">
                {skillsData.frontendDevelopment.map((skill) => (
                  <span key={skill.name} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-3 border-t border-slate-200">
              <h4 className="text-sm font-semibold text-slate-800 mb-2">Utviklingsverktøy</h4>
              <p className="text-slate-600 text-xs mb-2">Verktøy jeg bruker i arbeidsflyten min</p>
              <div className="flex flex-wrap gap-1.5">
                {skillsData.utviklingsverktoy.map((skill) => (
                  <span key={skill.name} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
