'use client'

import SpaceScene from './3DObjects/SpaceScene'
import CardParent from './3DObjects/CardParent'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import useStore from './useStore'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <div className='flex w-screen h-screen flex-col items-center justify-center bg-black'></div>,
})

export default function Scene() {
  const { reading } = useStore()
  const clickACard = useStore((state) => state.clickACard)

  // Extract the clickedCardsList from the store
  const clickedCardsList = useStore((state) => state.clickedCards.clickedCardsList)

  const isCardActive = (cardNr) => {
    // Check if the card number is in the clickedCardsList
    return clickedCardsList.includes(cardNr)
  }

  const [viewportWidth, setViewportWidth] = useState(1100)

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const scale = Math.min(viewportWidth / 900, 1) // for scaling the cards based on viewport

  const handleClickEvent = (nr) => {
    clickACard(nr)
  }

  return (
    <View className='h-screen w-screen bg-black'>
      <ambientLight />
      <SpaceScene />
      {reading ? (
        <mesh position={[0, 1, 0]} scale={scale}>
          {reading?.cards.map((card, index) => (
            <CardParent
              key={index}
              cardNr={index + 1}
              active={isCardActive(index + 1)}
              card={card.card}
              onClick={handleClickEvent}
            />
          ))}
        </mesh>
      ) : null}
    </View>
  )
}
