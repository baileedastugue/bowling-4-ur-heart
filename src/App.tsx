import { Canvas } from '@react-three/fiber'
import BowlingBall from './components/BowlingBall'
import './App.css'

function App() {
  return (
    <div id="canvas-container">
      <Canvas id="canvas" camera={{ position: [0, 0, 5], fov: 100, near: 0.1, far: 50 }}>
        <color attach="background" args={["purple"]} />
        <hemisphereLight groundColor="pink" color="lightblue" intensity={.1} />
        <directionalLight position={[5, 10, 5]} color="white" />
        <BowlingBall />
      </Canvas>
    </div>
  )
}

export default App
