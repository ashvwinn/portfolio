import { Canvas, useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import type { Mesh } from 'three'
import { useTheme } from '../theme'

/**
 * Only faceted polyhedra here — on purpose. Smooth primitives (torus,
 * knot, sphere) render dozens of triangle edges through drei's <Edges>
 * and read as a dense mesh; polyhedra render only their true geometric
 * edges and stay clean, matching the hero obsidian.
 *
 * Note: icosahedron is intentionally reserved for the hero obsidian so
 * the marquee shape isn't repeated in the project grid.
 */
type ShapeKind = 'octa' | 'box' | 'dodeca' | 'tet'

type Props = {
  kind: ShapeKind
}

function Geometry({ kind }: Props) {
  const theme = useTheme()
  const isDark = theme === 'dark'
  // Project cards use var(--paper) as background, which flips with theme.
  // The shape body must contrast against whichever side of the flip we're on.
  const bodyColor = isDark ? '#ede6d1' : '#0b0b0d'
  const bodyMetalness = isDark ? 0.55 : 0.85
  const bodyRoughness = isDark ? 0.35 : 0.28

  const ref = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.35
    ref.current.rotation.y += delta * 0.5
    const t = state.clock.elapsedTime
    ref.current.position.y = Math.sin(t * 1.2) * 0.08
  })

  const geom = (() => {
    switch (kind) {
      case 'octa':
        return <octahedronGeometry args={[1.05, 0]} />
      case 'box':
        return <boxGeometry args={[1.15, 1.15, 1.15]} />
      case 'dodeca':
        return <dodecahedronGeometry args={[0.95, 0]} />
      case 'tet':
        return <tetrahedronGeometry args={[1.05, 0]} />
    }
  })()

  return (
    <mesh ref={ref}>
      {geom}
      <meshStandardMaterial
        color={bodyColor}
        metalness={bodyMetalness}
        roughness={bodyRoughness}
        envMapIntensity={0.9}
      />
      <Edges threshold={1} color="#ff4d0a" scale={1.008} />
    </mesh>
  )
}

export function ProjectShape(props: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // One-shot mount: the Canvas is expensive to spin up (WebGL context,
  // shader compile), so once it's been visible we keep it mounted.
  // Toggling `visible` on every scroll was causing brief blank frames
  // as the context was torn down and rebuilt.
  useEffect(() => {
    if (!wrapRef.current) return
    const el = wrapRef.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0, rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 3.8], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          frameloop="always"
        >
          <ambientLight intensity={0.45} />
          <directionalLight position={[3, 4, 2]} intensity={1.1} />
          <directionalLight
            position={[-3, -2, -2]}
            intensity={0.45}
            color="#ff4d0a"
          />
          <pointLight position={[0, 0, 3]} intensity={0.35} color="#ff9a3c" />
          <Geometry {...props} />
        </Canvas>
      )}
    </div>
  )
}
