import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let rafId = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      }
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      }
      rafId = requestAnimationFrame(loop)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const hoverable = target.closest(
        'a, button, .project, .skill, .edu, [data-cursor="hover"]',
      )
      if (ringRef.current) {
        ringRef.current.classList.toggle('is-hover', !!hoverable)
      }
    }

    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = '0'
      if (dotRef.current) dotRef.current.style.opacity = '0'
    }
    const onEnter = () => {
      if (ringRef.current) ringRef.current.style.opacity = '1'
      if (dotRef.current) dotRef.current.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  )
}
