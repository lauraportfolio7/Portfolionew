import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Journey } from '@/sections/Journey'
import { Projects } from '@/sections/Projects'
import { Music } from '@/sections/Music'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import { SectionWaveDivider } from '@/components/WaveformDivider'
import { WaveformDivider } from '@/components/WaveformDivider'

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <SectionWaveDivider />
      <WaveformDivider className="py-6" />
      <Journey />
      <SectionWaveDivider />
      <Projects />
      <SectionWaveDivider fromColor="#F6F9FD" toColor="#0F1B3D" />
      <Music />
      <div className="h-32 md:h-40 bg-gradient-to-b from-night via-night-light to-ivory" aria-hidden="true" />
      <Contact />
      <Footer />
    </>
  )
}
