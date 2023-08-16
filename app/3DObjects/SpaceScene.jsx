import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const SpaceScene = () => {
  const controls = useRef()
  useFrame((_, delta) => {
    controls.current.rotation.y += 0.0001
  })
  const map = useTexture('/space.jpg')

  return (
    <mesh ref={controls}>
      <sphereGeometry args={[500, 16, 16]} />
      <meshStandardMaterial map={map} side={THREE.BackSide} />
    </mesh>
  )
}

export default SpaceScene
