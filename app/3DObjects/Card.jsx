import { useSpring, animated, config } from '@react-spring/three'
import { useTexture } from '@react-three/drei'

const Card = ({ cardid, active }) => {
  const springs = useSpring({ rotation: active ? 0 : Math.PI })
  const { rotation } = useSpring({
    rotation: active ? 0 : Math.PI,
    config: config.molasses,
  })

  let pic = ''
  if (cardid === 1) {
    pic = 'tarotdeck/05-TheHierophant.png'
  }
  if (cardid === 2) {
    pic = 'tarotdeck/10-WheelOfFortune.png'
  }
  if (cardid === 3) {
    pic = 'tarotdeck/17-TheStar.png'
  }

  const frontTexture = useTexture(pic)
  const backTexture = useTexture('tarotdeck/backside.jpg')

  return (
    <animated.mesh rotation-y={rotation} position={[0, 0, 0]}>
      <boxGeometry args={[1.2, 2, 0.02]} />
      <meshBasicMaterial attach='material-0' color={'black'} />
      <meshBasicMaterial attach='material-1' color={'black'} />
      <meshBasicMaterial attach='material-2' color={'black'} />
      <meshBasicMaterial attach='material-3' color={'black'} />
      <meshBasicMaterial attach='material-5' map={backTexture} />
      <meshBasicMaterial attach='material-4' map={frontTexture} />
    </animated.mesh>
  )
}

export default Card
