import Card from './Card'

const CardParent = ({ altarNr, readingState, card }) => {
  let position = null
  let rotate = null
  if (altarNr === 1) {
    position = [-2, 0, 0.4]
    rotate = 0.2
  }

  if (altarNr === 2) {
    position = [0, 0, 0]
    rotate = 0
  }
  if (altarNr === 3) {
    position = [2, 0, 0.4]
    rotate = -0.2
  }

  return (
    <mesh position={position} rotation-y={rotate}>
      <Card card={card} active={altarNr <= readingState} />
    </mesh>
  )
}

export default CardParent
