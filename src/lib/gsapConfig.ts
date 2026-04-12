import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function registerGSAP() {
  gsap.registerPlugin(ScrollTrigger)
}

export const ST_DEFAULTS: ScrollTrigger.Vars = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none none',
}
