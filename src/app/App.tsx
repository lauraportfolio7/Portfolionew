import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Journey } from './components/Journey';
import { Projects } from './components/Projects';
import { Music } from './components/Music';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SectionWaveDivider } from './components/WaveformDivider';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <SectionWaveDivider fromColor="#0F1B3D" toColor="#FAFBFC" />
        <About />
        <SectionWaveDivider fromColor="#FAFBFC" toColor="#FAFBFC" />
        <Journey />
        <SectionWaveDivider fromColor="#FAFBFC" toColor="#F5F7FA" flip />
        <Projects />
        <SectionWaveDivider fromColor="#F5F7FA" toColor="#0F1B3D" />
        <Music />
        <SectionWaveDivider fromColor="#0F1B3D" toColor="#F5F7FA" flip />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
