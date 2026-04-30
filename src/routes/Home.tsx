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

export function Home() {
  return (
    <>
      <Cursor />
      <SunflowerThread />
      <WelcomeIntro />
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Music />
      <div className="h-24 md:h-32 bg-gradient-to-b from-night via-night-light to-ivory" aria-hidden="true" />
      <Contact />
      <Footer />
    </>
  )
}
