// app/components/Navbar.jsx
'use client';

export default function Navbar() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'om-meg', label: 'Om Meg' },
    { id: 'prosjekter', label: 'Prosjekter' },
    { id: 'ferdigheter', label: 'Ferdigheter' },
    { id: 'kontakt', label: 'Kontakt' },
  ];

  return (
    <nav className="absolute top-6 right-6 md:right-10 z-10"> {/* Semantisk nav-element */}
      <ul className="flex space-x-3 md:space-x-5"> {/* Direkte styling på ul */}
        {navItems.map((item) => (
          <li key={item.id}> {/* li er nødvendig for listestruktur */}
            <a
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-100 hover:text-white hover:bg-blue-500 transition-colors duration-150"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}