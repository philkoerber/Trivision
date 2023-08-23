'use client'

import SpaceScene from './3DObjects/SpaceScene'
import Altar from './3DObjects/Altar'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import useStore from './useStore'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <div className='flex w-screen h-screen flex-col items-center justify-center bg-black'></div>,
})

const AltarScene = () => {
  const map = useTexture('/texture.jpg')
  return (
    <mesh>
      <sphereGeometry args={[8, 8, 8]} />
      <meshStandardMaterial map={map} side={THREE.BackSide} />
    </mesh>
  )
}

export default function Scene() {
  const { reading } = useStore()
  const readingState = useStore((state) => state.readingState)

  useEffect(() => {}, [reading])

  const altars = reading?.cards.map((card, index) => (
    <Altar key={index} altarNr={index + 1} readingState={readingState} card={card.card} />
  ))

  if (reading) {
    return (
      <View orbit className='relative h-screen w-screen bg-black'>
        <spotLight position={[0, 0, 20]} />
        <ambientLight />
        <pointLight />
        <SpaceScene />
        {altars}
      </View>
    )
  } else return null
}
