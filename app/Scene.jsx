'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect } from 'react'
import { Environment, MeshPortalMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import useStore from './useStore'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <div className='flex w-screen h-screen flex-col items-center justify-center bg-black'></div>,
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

const AltarScene = () => {
  const map = useTexture('/texture.jpg')
  return (
    <mesh>
      <sphereGeometry args={[20, 8, 8]} />
      <meshStandardMaterial map={map} side={THREE.BackSide} />
    </mesh>
  )
}

const SpaceScene = () => {
  const map = useTexture('/space.jpg')
  return (
    <mesh>
      <sphereGeometry args={[50, 16, 16]} />
      <meshStandardMaterial map={map} side={THREE.BackSide} />
    </mesh>
  )
}

const Card = ({ cardid }) => {
  let pic = ''
  if (cardid === 1) {
    pic = 'tarotdeck/lovers.png'
  }
  if (cardid === 2) {
    pic = 'tarotdeck/magician.png'
  }
  if (cardid === 3) {
    pic = 'tarotdeck/popess.png'
  }

  const texture = useTexture(pic)

  return (
    <mesh position={[0, 0, -0.4]}>
      <planeGeometry args={[1.2, 2]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

const Altar = ({ altarNr, readingState }) => {
  let position = null
  let rotate = null
  if (altarNr === 1) {
    position = [-3, 0, 0.5]
    rotate = 0.2
  }

  if (altarNr === 2) {
    position = [0, 0, 0]
    rotate = readingState / 3
  }
  if (altarNr === 3) {
    position = [3, 0, 0.5]
    rotate = -0.2
  }

  return (
    <mesh position={position} rotation-y={rotate}>
      <planeGeometry args={[2, 3]} />
      <MeshPortalMaterial>
        <AltarScene />
        <ambientLight />
        <Card cardid={altarNr} />
      </MeshPortalMaterial>
    </mesh>
  )
}

export default function Scene() {
  const readingState = useStore((state) => state.readingState)

  useEffect(() => {
    console.log(readingState)
  }, [readingState])

  return (
    <div className='relative'>
      <View className='relative h-screen w-screen bg-black'>
        <ambientLight />
        {/* <SpaceScene /> */}
        {/* <Altar altarNr={1} /> */}
        <Altar altarNr={2} readingState={readingState} />
        {/* <Altar altarNr={3} /> */}
      </View>
    </div>
  )
}
