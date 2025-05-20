// app/components/Footer.jsx
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 bg-slate-900 text-slate-400 text-center">
      <p className="text-sm container mx-auto px-6">
        &copy; {currentYear} Erik Gulliksen. Bygget med Next.js & Tailwind CSS. {/* Oppdatert */}
      </p>
    </footer>
  );
}