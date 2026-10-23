import { useEffect, type RefObject } from 'react'

export const scrollState = { station: 0 }

// Holds the camera at a section while it fills the viewport, then flies to the next one
// over the last viewport-height of scrolling.
export function useStationTracking(ids: string[], progressRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight
      const center = window.scrollY + vh / 2
      const rects = ids.map((id) => {
        const r = document.getElementById(id)!.getBoundingClientRect()
        return { top: r.top + window.scrollY, h: r.height }
      })
      const anchor = (i: number) => rects[i].top + Math.min(rects[i].h, vh) / 2

      let station = ids.length - 1
      for (let i = 0; i < ids.length - 1; i++) {
        const start = Math.max(anchor(i), rects[i + 1].top - vh / 2)
        const end = anchor(i + 1)
        if (center < end) {
          station = i + Math.min(Math.max((center - start) / (end - start), 0), 1)
          break
        }
      }
      scrollState.station = station

      const max = document.documentElement.scrollHeight - vh
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids, progressRef])
}
