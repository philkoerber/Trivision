'use client'

import Card from './3DObjects/Card'
import SpaceScene from './3DObjects/SpaceScene'
import Altar from './3DObjects/Altar'
import { Globals } from '@react-spring/shared'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { MeshPortalMaterial, useTexture, Text } from '@react-three/drei'
import * as THREE from 'three'
import useStore from './useStore'
import { useRef } from 'react'

import { useSpring, animated, config } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'

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
Globals.assign({
  frameLoop: 'always',
})
export default function Scene() {
  const readingState = useStore((state) => state.readingState)

  return (
    <View orbit className='relative h-screen w-screen bg-black'>
      <ambientLight />
      <pointLight position={[0, 0, 20]} />
      <SpaceScene />
      <Altar altarNr={1} readingState={readingState} />
      <Altar altarNr={2} readingState={readingState} />
      <Altar altarNr={3} readingState={readingState} />
    </View>
  )
}
