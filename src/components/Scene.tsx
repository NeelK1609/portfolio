import { useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Line, MeshDistortMaterial, Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from '../scroll'

type Vec3 = [number, number, number]

const STATIONS: { pos: Vec3; bg: string; accent: string }[] = [
  { pos: [0, 0, 0], bg: '#07061a', accent: '#8b5cf6' },
  { pos: [5, 1.2, -16], bg: '#041521', accent: '#22d3ee' },
  { pos: [-2, -1, -32], bg: '#080d24', accent: '#60a5fa' },
  { pos: [4, 0.8, -48], bg: '#13071f', accent: '#f472b6' },
  { pos: [-3, -0.6, -64], bg: '#04161a', accent: '#34d399' },
  { pos: [1, 0, -80], bg: '#0b0718', accent: '#a78bfa' },
]

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const SPIN = reducedMotion ? 0 : 1

const ease = (t: number) => t * t * (3 - 2 * t)

function CameraRig() {
  const focus = useRef(new THREE.Vector3(...STATIONS[0].pos))
  const target = useMemo(() => new THREE.Vector3(), [])
  const next = useMemo(() => new THREE.Vector3(), [])
  const colorA = useMemo(() => new THREE.Color(), [])
  const colorB = useMemo(() => new THREE.Color(), [])
  const scene = useThree((s) => s.scene)
  const width = useThree((s) => s.size.width)

  useFrame((state, dt) => {
    const s = THREE.MathUtils.clamp(scrollState.station, 0, STATIONS.length - 1)
    const i = Math.min(Math.floor(s), STATIONS.length - 2)
    const f = ease(s - i)
    const a = STATIONS[i]
    const b = STATIONS[i + 1]

    target.set(...a.pos).lerp(next.set(...b.pos), f)
    focus.current.lerp(target, 1 - Math.exp(-dt * (reducedMotion ? 30 : 4)))

    const wide = width > 900
    const offset = wide ? 2.6 : 0
    const lift = wide ? 0 : -2.4
    const p = focus.current
    state.camera.position.set(
      p.x - offset + state.pointer.x * 0.4 * SPIN,
      p.y + lift + state.pointer.y * 0.25 * SPIN,
      p.z + (wide ? 8 : 12),
    )
    state.camera.lookAt(p.x - offset, p.y + lift, p.z)

    colorA.set(a.bg).lerp(colorB.set(b.bg), f)
    if (scene.background instanceof THREE.Color) scene.background.copy(colorA)
    if (scene.fog) scene.fog.color.copy(colorA)
  })
  return null
}

function HeroCore({ color }: { color: string }) {
  const ringA = useRef<THREE.Mesh>(null!)
  const ringB = useRef<THREE.Mesh>(null!)
  useFrame((_, dt) => {
    ringA.current.rotation.x += dt * 0.4 * SPIN
    ringB.current.rotation.y += dt * 0.3 * SPIN
  })
  return (
    <Float speed={2 * SPIN} floatIntensity={SPIN} rotationIntensity={0.4 * SPIN}>
      <mesh>
        <icosahedronGeometry args={[1.5, 24]} />
        <MeshDistortMaterial color={color} distort={0.4} speed={2 * SPIN} roughness={0.15} metalness={0.4} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.4, 0.015, 16, 160]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={ringB} rotation={[0, Math.PI / 3, 0.4]}>
        <torusGeometry args={[2.9, 0.01, 16, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>
    </Float>
  )
}

function AboutKnot({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.25 * SPIN
    ref.current.rotation.x += dt * 0.1 * SPIN
  })
  return (
    <group ref={ref}>
      <mesh>
        <torusKnotGeometry args={[1.2, 0.35, 220, 32]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.6} />
      </mesh>
      <mesh scale={1.18}>
        <torusKnotGeometry args={[1.2, 0.35, 120, 16]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

const FLOW_NODES: Vec3[] = [
  [-2.2, -1, 0],
  [-0.8, 0.9, 0.4],
  [0.8, -0.7, -0.4],
  [2.2, 1, 0],
]

function ExperienceFlow({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null!)
  const pulse = useRef<THREE.Mesh>(null!)
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(FLOW_NODES.map((n) => new THREE.Vector3(...n))),
    [],
  )
  const points = useMemo(() => curve.getPoints(100), [curve])
  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.35 * SPIN
    pulse.current.position.copy(curve.getPointAt((state.clock.elapsedTime * 0.2) % 1))
  })
  return (
    <group ref={group}>
      <Line points={points} color={color} lineWidth={2} transparent opacity={0.7} />
      {FLOW_NODES.map((n, i) => (
        <Float key={i} speed={1.5 * SPIN} floatIntensity={0.4 * SPIN} rotationIntensity={SPIN}>
          <mesh position={n}>
            <octahedronGeometry args={[0.34]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} flatShading />
          </mesh>
        </Float>
      ))}
      <mesh ref={pulse} visible={!reducedMotion}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

function WorkShards({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.3 * SPIN
  })
  const geometries = [
    <boxGeometry args={[0.6, 0.6, 0.6]} />,
    <octahedronGeometry args={[0.45]} />,
    <dodecahedronGeometry args={[0.42]} />,
    <tetrahedronGeometry args={[0.5]} />,
    <icosahedronGeometry args={[0.42]} />,
  ]
  return (
    <group rotation={[0.35, 0, 0.1]}>
      <group ref={ref}>
        {geometries.map((g, i) => {
          const a = (i / geometries.length) * Math.PI * 2
          return (
            <Float key={i} speed={2 * SPIN} rotationIntensity={2 * SPIN} floatIntensity={0.6 * SPIN}>
              <mesh position={[Math.cos(a) * 2, 0, Math.sin(a) * 2]}>
                {g}
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.5} flatShading />
              </mesh>
            </Float>
          )
        })}
      </group>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={1.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.008, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

const SKILL_POINTS = 160

function SkillsCloud({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null!)
  const dots = useRef<THREE.InstancedMesh>(null!)
  useLayoutEffect(() => {
    const o = new THREE.Object3D()
    for (let i = 0; i < SKILL_POINTS; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / SKILL_POINTS)
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
      o.position.setFromSphericalCoords(2, phi, theta)
      o.updateMatrix()
      dots.current.setMatrixAt(i, o.matrix)
    }
    dots.current.instanceMatrix.needsUpdate = true
  }, [])
  useFrame((_, dt) => {
    group.current.rotation.y += dt * 0.15 * SPIN
    group.current.rotation.z += dt * 0.05 * SPIN
  })
  return (
    <group ref={group}>
      <instancedMesh ref={dots} args={[undefined, undefined, SKILL_POINTS]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={color} />
      </instancedMesh>
      <mesh>
        <icosahedronGeometry args={[1.95, 2]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial color={color} flatShading roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  )
}

function ContactPortal({ color }: { color: string }) {
  const ring = useRef<THREE.Mesh>(null!)
  useFrame((_, dt) => {
    ring.current.rotation.z += dt * 0.2 * SPIN
  })
  return (
    <group>
      <mesh ref={ring}>
        <torusGeometry args={[2, 0.12, 32, 200]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.2} metalness={0.7} />
      </mesh>
      <Float speed={1.5 * SPIN} floatIntensity={0.5 * SPIN}>
        <mesh>
          <sphereGeometry args={[0.9, 64, 64]} />
          <MeshDistortMaterial color={color} distort={0.3} speed={1.5 * SPIN} roughness={0.1} metalness={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

const STATION_OBJECTS = [HeroCore, AboutKnot, ExperienceFlow, WorkShards, SkillsCloud, ContactPortal]

function Station({ index, children }: { index: number; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame(() => {
    ref.current.visible = Math.abs(scrollState.station - index) < 1.2
  })
  return (
    <group ref={ref} position={STATIONS[index].pos}>
      {children}
    </group>
  )
}

export default function Scene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 8] }} gl={{ antialias: true }}>
      <color attach="background" args={[STATIONS[0].bg]} />
      <fog attach="fog" args={[STATIONS[0].bg, 9, 30]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} />
      <Stars radius={120} depth={80} count={3500} factor={4} fade speed={SPIN} />
      {STATIONS.map((s, i) => {
        const Obj = STATION_OBJECTS[i]
        return (
          <Station key={i} index={i}>
            <pointLight position={[2.5, 2.5, 3]} color={s.accent} intensity={40} distance={14} />
            <pointLight position={[-3, -2, 1]} color="#ffffff" intensity={10} distance={10} />
            <Obj color={s.accent} />
            <Sparkles count={40} scale={7} size={2.5} speed={0.3 * SPIN} color={s.accent} />
          </Station>
        )
      })}
      <CameraRig />
    </Canvas>
  )
}
