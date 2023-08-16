import { useSpring, animated, config } from '@react-spring/three'
import { useTexture } from '@react-three/drei'
import { generateCardLink, tarotDeck } from './tarotDeckArray'

const Card = ({ cardid, active }) => {
  const springs = useSpring({ rotation: active ? 0 : Math.PI })
  const { rotation } = useSpring({
    rotation: active ? 0 : Math.PI,
    config: config.molasses,
  })

  let pic = ''
  if (cardid === 1) {
    pic = generateCardLink(tarotDeck[2])
  }
  if (cardid === 2) {
    pic = generateCardLink(tarotDeck[28])
  }
  if (cardid === 3) {
    pic = generateCardLink(tarotDeck[9])
  }

  const frontTexture = useTexture(pic)

  return (
    <animated.mesh rotation-y={rotation} position={[0, 0, 0]}>
      <boxGeometry args={[1.2, 2, 0.02]} />
      <meshBasicMaterial attach='material-0' color={'black'} />
      <meshBasicMaterial attach='material-1' color={'black'} />
      <meshBasicMaterial attach='material-2' color={'black'} />
      <meshBasicMaterial attach='material-3' color={'black'} />
      {/* backside */}
      <meshStandardMaterial attach='material-5' color={'#ffd700'} metalness={1} roughness={0.2} />
      {/* frontside */}
      <meshBasicMaterial attach='material-4' map={frontTexture} />
    </animated.mesh>
  )
}

export default Card
