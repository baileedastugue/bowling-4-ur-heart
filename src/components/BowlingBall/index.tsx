import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {Mesh, LineSegments, SphereGeometry, MathUtils, Group} from 'three'

const BowlingBall = () => {
  const [targetY, setTargetY] = useState(0)
  const currentY = useRef(0)
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const edgesRef = useRef<LineSegments>(null)

  useFrame((state, delta) => {
    // Smoothly interpolate position
    if (groupRef.current) {
      currentY.current = MathUtils.lerp(currentY.current, targetY, delta * 5)
      groupRef.current.position.y = currentY.current
    }
    
    // Rotation
    if (meshRef.current) {
      meshRef.current.rotation.x = -state.clock.elapsedTime * .7
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x = -state.clock.elapsedTime * .7
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} onClick={() => setTargetY(2)}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 30, 30]} />
        <meshPhongMaterial color="white" shininess={150} />
      </mesh>
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new SphereGeometry(1, 30, 30)]} />
        <lineBasicMaterial color="black" />
      </lineSegments>
    </group>
  )
}

export default BowlingBall