import Image from 'next/image';

export default function BombermanProject() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 rounded-xl shadow-xl overflow-hidden">
      <div className="p-8 md:p-12">
        <h2 className="text-3xl font-bold text-white dark:text-green-white mb-4">Bomberman Clone</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-blue-700 dark:bg-blue-900 bg-opacity-50 dark:bg-opacity-30 p-6 rounded-lg">
            <p className="text-blue-100 dark:text-green-white mb-4 leading-relaxed">
              En JavaScript-implementasjon av det klassiske Bomberman-spillet. 
              Spillet inkluderer grunnleggende Bomberman-mekanikk som bombing, 
              veggødeleggelse og fiendekollisjon.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {['JavaScript', 'HTML Canvas', 'Game Loop', 'Collision Detection', 'Sprite Animation'].map(tech => (
                <span key={tech} className="px-3 py-1 bg-blue-900 text-blue-100 dark:text-green-white rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            
            <a 
              href="https://github.com/Erikg-kodehode/bomberman" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block py-2 px-4 bg-blue-900 text-white dark:text-green-white rounded-md hover:bg-blue-950 transition-colors"
            >
              Se kildekode
            </a>
          </div>
          
          <div className="bg-blue-700 dark:bg-blue-900 bg-opacity-30 dark:bg-opacity-20 rounded-lg flex items-center justify-center relative overflow-hidden aspect-video">
            <Image
              src="/assets/Bomberman.jpeg"
              alt="Bomberman gameplay preview"
              width={800}
              height={600}
              className="object-cover"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
              priority={false}
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 text-blue-100 dark:text-green-white">
          <div className="bg-blue-700 dark:bg-blue-900 bg-opacity-30 dark:bg-opacity-20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white dark:text-green-white mb-3">Tekniske detaljer</h3>
            <ul className="space-y-2 text-blue-100 dark:text-green-white">
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Implementerte game loop med requestAnimationFrame for jevn animasjon</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Utviklet kollisjonsdeteksjon for vegger, bomber og fiender</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Skapte sprite-basert animasjonssystem for karakterer</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Implementerte tile-basert kartgenerering</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-700 dark:bg-blue-900 bg-opacity-30 dark:bg-opacity-20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white dark:text-green-white mb-3">Utfordringer & Løsninger</h3>
            <ul className="space-y-2 text-blue-100 dark:text-green-white">
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Optimaliseringsutfordringer - implementerte sprite caching og object pooling</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Timing for bomber og eksplosjoner - utviklet et asynkront timingsystem</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-300 mr-2">•</span>
                <span>Bevegelsesflyt - fintunet kollisjonsresponsen for mer presis kontroll</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

