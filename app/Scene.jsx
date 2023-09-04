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
  const readingState = useStore((state) => state.readingState)

  const [viewportWidth, setViewportWidth] = useState(1100)

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scale = Math.min(viewportWidth / 900, 1) // Adjust the divisor as needed

  return (
    <View className='h-screen w-screen bg-black'>
      <ambientLight />
      <SpaceScene />
      {reading ? (
        <mesh position={[0, 0.9, 0]} scale={scale}>
          {reading?.cards.map((card, index) => (
            <CardParent key={index} altarNr={index + 1} readingState={readingState} card={card.card} />
          ))}
        </mesh>
      ) : null}
    </View>
  )
}
