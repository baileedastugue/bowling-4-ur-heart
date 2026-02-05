const Plane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[10, 40]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
  )
}

export default Plane
