// app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'Portefølje - Erik Gulliksen', // Oppdatert
  description: 'En portefølje bygget med Next.js og Tailwind CSS, som viser Erik Gulliksens prosjekter og ferdigheter.', // Oppdatert
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body>
        {children}
      </body>
    </html>
  );
}