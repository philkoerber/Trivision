import { motion } from 'framer-motion-3d'
import { useTexture } from '@react-three/drei'
import { generateCardLink, tarotDeck } from './tarotDeckArray'

const Card = ({ card, active }) => {
  const rotation = active ? 0 : Math.PI

  const pic = generateCardLink(card)
  const frontTexture = useTexture(pic)

  const backTexture = useTexture(
    'https://pnzrzewseaycfpwvtswx.supabase.co/storage/v1/object/public/RiderWaiteTarot/Backside?t=2023-08-23T08%3A26%3A43.111Z',
  )

  return (
    <motion.mesh
      initial={{ rotateY: rotation }}
      animate={{ rotateY: rotation }}
      transition={{ duration: 2, ease: 'easeInOut' }}
      position={[0, 0, 0]}
    >
      <boxGeometry args={[1.75, 3, 0.04]} />
      <meshBasicMaterial attach='material-0' color={'black'} />
      <meshBasicMaterial attach='material-1' color={'black'} />
      <meshBasicMaterial attach='material-2' color={'black'} />
      <meshBasicMaterial attach='material-3' color={'black'} />
      {/* backside */}
      <meshStandardMaterial attach='material-5' map={backTexture} />
      {/* frontside */}
      <meshBasicMaterial attach='material-4' map={frontTexture} />
    </motion.mesh>
  )
}

export default Card
