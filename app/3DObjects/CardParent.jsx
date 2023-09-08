import Card from './Card'

const CardParent = ({ cardNr, active, card, onClick }) => {
  let position = null
  let rotate = null
  if (cardNr === 1) {
    position = [-2, 0, 0.4]
    rotate = 0.2
  }

  if (cardNr === 2) {
    position = [0, 0, 0]
    rotate = 0
  }
  if (cardNr === 3) {
    position = [2, 0, 0.4]
    rotate = -0.2
  }

  return (
    <mesh position={position} rotation-y={rotate} onClick={() => onClick(cardNr)}>
      <Card card={card} active={active} />
    </mesh>
  )
}

export default CardParent
