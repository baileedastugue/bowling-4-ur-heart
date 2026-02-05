import { Canvas } from '@react-three/fiber'
import BowlingBall from './components/BowlingBall'
import Plane from './components/Plane'
import './App.css'

function App() {
  return (
    <div id="canvas-container">
      <Canvas id="canvas" camera={{ position: [0, 3, 5], fov: 100, near: 0.1, far: 50 }} shadows>
        <color attach="background" args={["black"]} />
        <directionalLight 
          position={[5, 10, 5]} 
          color="white" 
          castShadow 
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-camera-near={0.1}
          shadow-camera-far={50}
        />
        <Plane />
        <BowlingBall />
      </Canvas>
    </div>
  )
}

export default App
