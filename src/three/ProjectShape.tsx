import { Canvas, useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import type { Mesh } from 'three'

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
        return <tetrahedronGeometry args={[1.2, 0]} />
    }
  })()

  return (
    <mesh ref={ref}>
      {geom}
      <meshStandardMaterial
        color="#0b0b0d"
        metalness={0.85}
        roughness={0.28}
        envMapIntensity={0.9}
      />
      <Edges threshold={1} color="#ff4d0a" scale={1.008} />
    </mesh>
  )
}

export function ProjectShape(props: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!wrapRef.current) return
    const el = wrapRef.current
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 3.2], fov: 40 }}
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
