import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import type { Mesh } from 'three'

type ShapeKind = 'knot' | 'torus' | 'box' | 'octa' | 'sphere' | 'tet' | 'dodeca'

type Props = {
  kind: ShapeKind
  wireframe?: boolean
}

function Geometry({ kind, wireframe }: Props) {
  const ref = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.4
    ref.current.rotation.y += delta * 0.55
    const t = state.clock.elapsedTime
    ref.current.position.y = Math.sin(t * 1.2) * 0.08
  })

  return (
    <mesh ref={ref} scale={1.15}>
      {kind === 'knot' && <torusKnotGeometry args={[0.65, 0.22, 200, 32]} />}
      {kind === 'torus' && <torusGeometry args={[0.8, 0.26, 24, 80]} />}
      {kind === 'box' && <boxGeometry args={[1.1, 1.1, 1.1]} />}
      {kind === 'octa' && <octahedronGeometry args={[1, 0]} />}
      {kind === 'sphere' && <sphereGeometry args={[0.9, 48, 48]} />}
      {kind === 'tet' && <tetrahedronGeometry args={[1.1, 0]} />}
      {kind === 'dodeca' && <dodecahedronGeometry args={[0.95, 0]} />}
      <meshStandardMaterial
        color="#0b0b0d"
        emissive="#ff4d0a"
        emissiveIntensity={wireframe ? 0.55 : 0.14}
        metalness={0.75}
        roughness={0.28}
        wireframe={wireframe}
      />
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
            intensity={0.4}
            color="#ff4d0a"
          />
          <Geometry {...props} />
        </Canvas>
      )}
    </div>
  )
}
