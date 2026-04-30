import { Hero } from '@/sections/v2/Hero'
import { BrutalCursor } from '@/components/BrutalCursor'

/**
 * HomeV2 — page de prévisualisation du redesign en cours.
 * Accessible sur /nouveau pendant la Phase A.
 * Sera promue à la racine en Phase B (étape 10).
 */
export function HomeV2() {
  return (
    <>
      <BrutalCursor />
      <Hero />
    </>
  )
}
