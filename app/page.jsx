// app/page.jsx
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer'; // Forutsatt at denne nå er fikset

export default function HomePage() {
  return (
    <> {/* React Fragment for å unngå unødvendig div */}
      <Hero />
      <main> {/* Semantisk main-element for hovedinnhold */}
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}