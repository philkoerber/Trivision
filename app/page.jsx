'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Environment, MeshPortalMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

const Scene = () => {
  const map = useTexture('/texture.jpg')
  return (
    <mesh>
      <sphereGeometry args={[20, 10, 10]} />
      <meshStandardMaterial map={map} side={THREE.BackSide} />
    </mesh>
  )
}

const SpaceScene = () => {
  const map = useTexture('/space.jpg')
  return (
    <mesh>
      <sphereGeometry args={[100, 32, 32]} />
      <meshStandardMaterial map={map} side={THREE.BackSide} />
    </mesh>
  )
}

const Card = ({ cardid }) => {
  let pic = ''
  if (cardid === 1) {
    pic = '/tarotdeck/lovers.png'
  }
  if (cardid === 2) {
    pic = '/tarotdeck/magician.png'
  }
  if (cardid === 3) {
    pic = '/tarotdeck/popess.png'
  }

  const texture = useTexture(pic)

  return (
    <mesh position={[0, 0, -0.4]}>
      <planeGeometry args={[1.2, 2]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

const Altar = ({ altarNr }) => {
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
    <mesh position={position} rotation-y={rotate}>
      <planeGeometry args={[2, 3]} />

      <MeshPortalMaterial>
        <Scene />
        <ambientLight />
        <Card cardid={altarNr} />
      </MeshPortalMaterial>
    </mesh>
  )
}

export default function Page() {
  return (
    <div className='relative'>
      <View orbit className='relative h-screen w-screen bg-neutral-400'>
        {/* <ambientLight />
        <SpaceScene /> */}
        <Altar altarNr={1} />
        <Altar altarNr={2} />
        <Altar altarNr={3} />
      </View>
    </div>
  )
}
