import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Journey } from '@/sections/Journey'
import { Projects } from '@/sections/Projects'
import { Music } from '@/sections/Music'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import { WelcomeIntro } from '@/components/WelcomeIntro'
import { Cursor } from '@/components/Cursor'
import { SunflowerThread } from '@/components/SunflowerThread'

function Bridge({ className }: { className: string }) {
  return <div className={`h-20 md:h-32 ${className}`} aria-hidden="true" />
}

export function Home() {
  return (
    <>
      <Cursor />
      <SunflowerThread />
      <WelcomeIntro />
      <Hero />
      <Bridge className="bg-gradient-to-b from-night via-night-secondary to-ivory" />
      <About />
      <Bridge className="bg-gradient-to-b from-ivory via-[#3F3422] to-ink" />
      <Journey />
      <Bridge className="bg-gradient-to-b from-ink via-night-secondary to-ivory" />
      <Projects />
      <Bridge className="bg-gradient-to-b from-ivory-warm via-night-secondary to-night" />
      <Music />
      <Bridge className="bg-gradient-to-b from-night via-night-light to-ivory" />
      <Contact />
      <Footer />
    </>
  )
}
