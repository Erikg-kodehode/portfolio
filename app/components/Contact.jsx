// app/components/Contact.jsx
export default function Contact() {
  const contactLinks = [
    { href: 'mailto:erik.gulliksen@example.com', text: 'erik.gulliksen@example.com' }, // Eksempel
    { href: 'https://linkedin.com/in/erikgulliksen', text: 'LinkedIn Profil' }, // Eksempel
    { href: 'https://github.com/erikgulliksen', text: 'GitHub Profil' }, // Eksempel
  ];

  return (
    // Seksjonen har mørk bakgrunn og vertikal padding
    <section id="kontakt" className="py-16 md:py-24 bg-slate-800 text-slate-100">
      {/* Inner div for container-logikk og maks bredde */}
      <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-white section-title-custom !border-sky-400">Kontakt Meg</h2>
        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
          Jeg er alltid interessert i å høre om nye muligheter eller spennende prosjekter.
          Ikke nøl med å ta kontakt!
        </p>
        <ul className="space-y-4">
          {contactLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : '_self'}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center text-lg text-sky-300 hover:text-sky-100 hover:underline transition-colors duration-150 font-medium group"
              >
                <span>{link.text}</span>
                {link.href.startsWith('http') && (
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.19a.75.75 0 0 0 .053 1.06Z" clipRule="evenodd" />
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}