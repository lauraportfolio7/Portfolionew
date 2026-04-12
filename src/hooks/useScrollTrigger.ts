import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Hook that wraps GSAP animations in a gsap.context() for safe cleanup,
 * compatible with React 19 StrictMode.
 */
export function useScrollTrigger(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = [],
) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      callback(ctx!)
    }, containerRef.current)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}
