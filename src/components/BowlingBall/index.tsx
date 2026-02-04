import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {Mesh, LineSegments, SphereGeometry, MathUtils, Group} from 'three'

const BowlingBall = () => {
  const [targetZ, setTargetZ] = useState(0)
  const currentZ = useRef(0)
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const edgesRef = useRef<LineSegments>(null)

  const toggleTargetZ = () => {
    setTargetZ(targetZ === 0 ? 3 : 0)
  }

  useFrame((state, delta) => {
    // Smoothly interpolate position
    if (groupRef.current) {
      currentZ.current = MathUtils.lerp(currentZ.current, targetZ, delta * .5)
      groupRef.current.position.z = currentZ.current
    }
    
    // Rotation
    if (meshRef.current) {
      meshRef.current.rotation.x = -state.clock.elapsedTime * 2
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x = -state.clock.elapsedTime * 2
    }
  })

  return (
    <group ref={groupRef} position={[0, -1, 2]} onClick={() => toggleTargetZ()}>
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