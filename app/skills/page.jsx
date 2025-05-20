// app/skills/page.jsx
export const metadata = {
  title: 'Ferdigheter - Erik Gulliksen',
  description: 'Mine tekniske ferdigheter innen backend-utvikling med C# og .NET, samt frontend-teknologier og utviklingsverktøy.',
};

export default function SkillsPage() {
  const skillCategories = [
    {
      id: 'backend',
      title: 'Backend Utvikling',
      description: 'Mit hovedfokus er backend-utvikling med C# og .NET økosystemet. Jeg bygger stadig på denne kompetansen gjennom praktiske prosjekter.',
      skills: [
        { name: 'C#', level: 65, description: 'Grunnleggende til middels kunnskaper. Jobbet med konsollapplikasjoner og backend-logikk.' },
        { name: '.NET', level: 60, description: 'Erfaring med .NET rammeverket og dets økosystem.' },
        { name: 'ASP.NET Core', level: 50, description: 'Grunnleggende forståelse av web API-utvikling.' },
        { name: 'SQL', level: 45, description: 'Grunnleggende databasespørringer og -design.' },
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Utvikling',
      description: 'Jeg har grunnleggende frontend-ferdigheter som jeg fortsetter å utvikle og forbedre. Disse ferdighetene støtter mitt fokus på backend-utvikling.',
      skills: [
        { name: 'HTML', level: 50, description: 'Grunnleggende strukturering av nettsider.' },
        { name: 'CSS', level: 45, description: 'Styling og layout av nettsider.' },
        { name: 'JavaScript', level: 40, description: 'Grunnleggende programmering for nettlesere.' },
        { name: 'React', level: 35, description: 'Nybegynner med grunnleggende komponentutvikling.' },
        { name: 'Next.js', level: 30, description: 'Nybegynner, brukt til denne porteføljen.' },
        { name: 'Tailwind CSS', level: 40, description: 'Grunnleggende bruk for effektiv styling.' },
      ]
    },
    {
      id: 'tools',
      title: 'Utviklingsverktøy',
      description: 'Verktøyene jeg bruker i min utviklingsarbeidsflyt for å øke produktiviteten og samarbeidet.',
      skills: [
        { name: 'Git & GitHub', level: 55, description: 'Versjonskontroll og samarbeid.' },
        { name: 'VS Code', level: 60, description: 'Min foretrukne kode-editor.' },
        { name: 'Debugging', level: 50, description: 'Feilsøking og problemløsning.' },
        { name: 'Testing', level: 40, description: 'Grunnleggende teststrategi og -implementering.' },
      ]
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">Mine Ferdigheter</h1>
        <p className="text-xl text-blue-700 max-w-3xl mx-auto">
          Som utvikler tidlig i karrieren fokuserer jeg på å bygge et solid fundament av 
          ferdigheter, med spesiell vekt på backend-utvikling med C# og .NET.
        </p>
      </header>

      <section className="mb-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 md:p-12 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-6">Min Læringsvei</h2>
        <p className="text-xl text-blue-100 mb-6 leading-relaxed">
          Min utviklerreise har vært fokusert og målrettet. Jeg begynte med C# og har gradvis 
          utviklet meg til å omfatte relaterte teknologier i .NET-økosystemet.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Min Tilnærming til Læring</h3>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Prosjektbasert læring gjennom praktiske utfordringer</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Systematisk utforskning av dokumentasjon og best practices</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Problemløsning som driver for å lære nye teknologier</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Bygge på grunnleggende konsepter før avanserte teknikker</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Fremtidige Læringsmål</h3>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Fordype meg i avanserte C# konsepter og design patterns</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Utforske .NET MAUI for cross-platform applikasjoner</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Lære mer om sikkerhet og ytelsesoptimalisering</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Utvikle sterkere ferdigheter innen CI/CD og DevOps</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="space-y-16">
        {skillCategories.map((category) => (
          <section key={category.id} className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 md:p-12 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl">{category.description}</p>
            
            <div className="space-y-8">
              {category.skills.map((skill) => (
                <div key={skill.name} className="bg-blue-700 bg-opacity-30 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold">{skill.name}</h3>
                    <span className="text-blue-200 text-sm font-medium">
                      {skill.level < 40 ? 'Nybegynner' : 
                        skill.level < 60 ? 'Grunnleggende' : 
                        skill.level < 80 ? 'Middels' : 'Avansert'}
                    </span>
                  </div>
                  
                  <div className="w-full bg-blue-900 rounded-full h-4 mb-4">
                    <div 
                      className="bg-gradient-to-r from-blue-300 to-blue-100 h-4 rounded-full transition-all duration-1000" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-blue-100">{skill.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Kontinuerlig Utvikling</h2>
        <p className="text-blue-700 max-w-2xl mx-auto mb-8">
          Teknologi utvikler seg raskt, og jeg er forpliktet til å fortsette min læringsvei. 
          Jeg ser frem til å utvide mine ferdigheter og ta på meg nye utfordringer.
        </p>
        <a 
          href="/contact" 
          className="inline-block py-3 px-8 bg-blue-700 text-white rounded-md shadow-md hover:bg-blue-800 transition-colors"
        >
          Ta kontakt for samarbeid
        </a>
      </section>
    </div>
  );
}

