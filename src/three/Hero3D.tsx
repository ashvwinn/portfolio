import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Edges, Environment } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import type { Mesh, Group } from 'three'
import * as THREE from 'three'
import { useTheme } from '../theme'

/**
 * Obsidian core — the main piece. Dark metallic icosahedron with
 * a glowing amber wireframe overlay + a tiny amber core nested inside.
 */
function Obsidian() {
  const theme = useTheme()
  const isDark = theme === 'dark'
  // In dark mode, a near-black obsidian disappears against the ink background.
  // Flip to a warm bone/cream body so the piece still reads as a solid mass,
  // keeping the amber edges + inner core for continuity.
  const bodyColor = isDark ? '#e8dfc6' : '#0b0b0d'
  const bodyMetalness = isDark ? 0.55 : 0.9
  const bodyRoughness = isDark ? 0.35 : 0.22

  const groupRef = useRef<Group>(null!)
  const innerRef = useRef<Mesh>(null!)
  const edgesRef = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.12
      groupRef.current.rotation.y += delta * 0.18
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.12
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.5
      innerRef.current.rotation.z += delta * 0.6
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08
      innerRef.current.scale.setScalar(s)
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x += delta * 0.12
      edgesRef.current.rotation.y += delta * 0.18
    }
  })

  return (
    <group ref={groupRef}>
      {/* solid obsidian body */}
      <mesh>
        <icosahedronGeometry args={[1.75, 0]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={bodyMetalness}
          roughness={bodyRoughness}
          envMapIntensity={1.2}
        />
        <Edges threshold={1} color="#ff4d0a" scale={1.01} />
      </mesh>

      {/* inner glowing amber tetra, visible through facets */}
      <mesh ref={innerRef}>
        <tetrahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#ff4d0a"
          emissive="#ff4d0a"
          emissiveIntensity={1.6}
          metalness={0.1}
          roughness={0.5}
        />
      </mesh>
    </group>
  )
}

type Orbiter = {
  radius: number
  speed: number
  phase: number
  height: number
  size: number
  kind: 'box' | 'torus' | 'tet' | 'octa' | 'cyl'
  wire: boolean
}

function Orbiter({ data }: { data: Orbiter }) {
  const theme = useTheme()
  const isDark = theme === 'dark'
  const orbiterSolid = isDark ? '#d4cbac' : '#1f1d22'
  const orbiterWire = isDark ? '#ede6d1' : '#0b0b0d'
  const ref = useRef<Mesh>(null!)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * data.speed + data.phase
    ref.current.position.x = Math.cos(t) * data.radius
    ref.current.position.z = Math.sin(t) * data.radius * 0.6
    ref.current.position.y =
      data.height + Math.sin(t * 1.4 + data.phase) * 0.18
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.014
  })
  return (
    <mesh ref={ref} scale={data.size}>
      {data.kind === 'box' && <boxGeometry args={[1, 1, 1]} />}
      {data.kind === 'torus' && <torusGeometry args={[0.7, 0.22, 20, 60]} />}
      {data.kind === 'tet' && <tetrahedronGeometry args={[1, 0]} />}
      {data.kind === 'octa' && <octahedronGeometry args={[1, 0]} />}
      {data.kind === 'cyl' && <cylinderGeometry args={[0.35, 0.35, 1, 24]} />}
      <meshStandardMaterial
        color={data.wire ? orbiterWire : orbiterSolid}
        wireframe={data.wire}
        metalness={0.8}
        roughness={0.3}
        emissive={data.wire ? '#ff4d0a' : '#000000'}
        emissiveIntensity={data.wire ? 0.25 : 0}
      />
    </mesh>
  )
}

function Orbiters() {
  const orbiters = useMemo<Orbiter[]>(
    () => [
      { radius: 2.6, speed: 0.35, phase: 0, height: 0.9, size: 0.18, kind: 'box', wire: true },
      { radius: 2.9, speed: 0.28, phase: 1.9, height: -0.5, size: 0.14, kind: 'torus', wire: false },
      { radius: 2.4, speed: 0.42, phase: 3.1, height: 0.2, size: 0.16, kind: 'tet', wire: true },
      { radius: 2.7, speed: 0.24, phase: 4.8, height: -0.8, size: 0.15, kind: 'octa', wire: false },
      { radius: 2.5, speed: 0.38, phase: 5.7, height: 0.7, size: 0.12, kind: 'cyl', wire: true },
    ],
    [],
  )
  return (
    <group>
      {orbiters.map((o, i) => (
        <Orbiter key={i} data={o} />
      ))}
    </group>
  )
}

function Parallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null!)
  useFrame((state) => {
    if (!ref.current) return
    const x = state.pointer.x
    const y = state.pointer.y
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      x * 0.35,
      0.06,
    )
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -y * 0.2,
      0.06,
    )
  })
  return <group ref={ref}>{children}</group>
}

export function Hero3D() {
  const theme = useTheme()
  const isDark = theme === 'dark'

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.2, 5.2], fov: 40 }}
    >
      <ambientLight intensity={isDark ? 0.55 : 0.4} />
      <directionalLight position={[4, 6, 4]} intensity={isDark ? 1.1 : 1.4} />
      <directionalLight position={[-5, -2, -3]} intensity={isDark ? 0.7 : 0.5} color="#ff4d0a" />
      <pointLight position={[0, 0, 3]} intensity={0.6} color="#ff9a3c" />

      <Parallax>
        <Obsidian />
        <Orbiters />
      </Parallax>

      <ContactShadows
        position={[0, -2.35, 0]}
        opacity={isDark ? 0.55 : 0.3}
        scale={5}
        blur={2.6}
        far={2.4}
        color={isDark ? '#000000' : '#0b0b0d'}
      />

      <Environment preset={isDark ? 'night' : 'city'} environmentIntensity={isDark ? 0.35 : 0.6} />
    </Canvas>
  )
}
