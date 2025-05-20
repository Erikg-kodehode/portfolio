// app/components/About.jsx
export default function About() {
  return (
    <section id="om-meg" className="section-container">
      <h2 className="section-title-custom">Om Meg</h2>
      
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-100 to-white p-8 rounded-lg shadow-sm border border-blue-200">
        <p className="text-slate-800 mb-4 leading-relaxed">
          Hei! Jeg er Erik, en utvikler i startfasen av min karriere med en sterk interesse for backend-utvikling med C# og .NET-økosystemet.
        </p>
        
        <p className="text-slate-700 mb-6 leading-relaxed">
          Min reise inn i programmeringsverdenen begynte med fascinasjonen for hvordan systemer er bygget, og dette har ledet meg mot backend-utvikling hvor jeg kan jobbe med arkitektur, logikk og dataflyt.
        </p>
        
        <div className="bg-white bg-opacity-50 p-6 rounded-md border-l-2 border-blue-400 mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Min tilnærming til utvikling:</h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Fokus på å lære gode praksiser for kodearkitektur og -struktur</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Bygge praktisk erfaring gjennom hands-on prosjekter</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Kontinuerlig forbedring av ferdigheter med C# og .NET-rammeverket</span>
            </li>
          </ul>
        </div>
        
        <p className="text-slate-700 leading-relaxed">
          For tiden jobber jeg med flere praktiske prosjekter for å styrke mine ferdigheter, inkludert backend for spill som Bomberman, konsollapplikasjoner som Hangman, og Discord-bots. Gjennom disse prosjektene får jeg verdifull erfaring med reelle programmeringsutfordringer og løsninger.
        </p>
      </div>
    </section>
  );
}
