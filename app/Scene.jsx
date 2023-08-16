'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { MeshPortalMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import useStore from './useStore'

import { useSpring, animated, config } from '@react-spring/three'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <div className='flex w-screen h-screen flex-col items-center justify-center bg-black'></div>,
})

const AltarScene = () => {
  const map = useTexture('/texture.jpg')
  return (
    <mesh>
      <sphereGeometry args={[20, 8, 8]} />
      <meshStandardMaterial map={map} side={THREE.BackSide} />
    </mesh>
  )
}

// const SpaceScene = () => {
//   const map = useTexture('/space.jpg')
//   return (
//     <mesh>
//       <sphereGeometry args={[50, 16, 16]} />
//       <meshStandardMaterial map={map} side={THREE.BackSide} />
//     </mesh>
//   )
// }

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

const Altar = ({ altarNr, isRevealed }) => {
  // const springs = useSpring({ scale: active ? 1.5 : 1 })
  // const { rotation } = useSpring({
  //   scale: active ? 1.5 : 1,
  //   config: config.wobbly,
  // })

  let position = null
  let rotate = null
  if (altarNr === 1) {
    position = [-3, 0, 0.5]
    rotate = 0.2
  }

  if (altarNr === 2) {
    position = [0, 0, 0]
    rotate = 0
  }
  if (altarNr === 3) {
    position = [3, 0, 0.5]
    rotate = -0.2
  }

  return (
    <animated.mesh position={position} rotation-y={rotate}>
      <planeGeometry args={[2, 3]} />
      <MeshPortalMaterial>
        <AltarScene />
        <ambientLight />
        {/* <Card cardid={altarNr} /> */}
      </MeshPortalMaterial>
    </animated.mesh>
  )
}

export default function Scene() {
  const readingState = useStore((state) => state.readingState)

  useEffect(() => {
    console.log(readingState)
  }, [readingState])

  return (
    <View className='relative h-screen w-screen bg-black'>
      {/* <ambientLight />
        <SpaceScene /> */}
      <Altar altarNr={1} />
      <Altar altarNr={2} />
      <Altar altarNr={3} />
    </View>
  )
}
