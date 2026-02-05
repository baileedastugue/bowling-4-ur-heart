import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {Mesh, LineSegments, SphereGeometry, MathUtils, Group} from 'three'

const START_Z = 5
const END_Z = -12

const BowlingBall = () => {
  const [targetZ, setTargetZ] = useState(START_Z)
  const currentZ = useRef(START_Z)
  const rotationOffset = useRef(0)
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const edgesRef = useRef<LineSegments>(null)

  const toggleTargetZ = () => {
    setTargetZ(targetZ === START_Z ? END_Z : START_Z)
  }

  useFrame((_state, delta) => {
    // Smoothly interpolate position
    if (groupRef.current) {
      const previousZ = currentZ.current
      currentZ.current = MathUtils.lerp(currentZ.current, targetZ, delta * .5)
      groupRef.current.position.z = currentZ.current

      
      // Check if ball is moving
      const isMoving = Math.abs(currentZ.current - targetZ) > 0.01
      
      // Only rotate when moving
      if (isMoving) {
        const distanceMoved = Math.abs(currentZ.current - previousZ)
        rotationOffset.current += distanceMoved * 2
      }
      
      // Apply rotation based on movement
      if (meshRef.current) {
        meshRef.current.rotation.x = -rotationOffset.current
      }
      if (edgesRef.current) {
        edgesRef.current.rotation.x = -rotationOffset.current
      }
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, START_Z]} onClick={() => toggleTargetZ()}>
      <mesh ref={meshRef} castShadow>
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