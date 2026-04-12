import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function registerGSAP() {
  gsap.registerPlugin(ScrollTrigger)
}
