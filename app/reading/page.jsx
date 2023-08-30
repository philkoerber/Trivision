'use client'

import React, { useEffect } from 'react'
import useStore from '@/useStore'

function Reading(props) {
  const reading = useStore((state) => state.reading)
  const setReading = useStore((state) => state.setReading)
  const readingState = useStore((state) => state.readingState)

  useEffect(() => {
    async function fetchData(card, readingMeaning) {
      try {
        const response = await fetch(`/api/meaning?card=${card}&readingMeaning=${readingMeaning}`)

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`)
        }

        const data = await response.json()
        return data
      } catch (error) {
        console.error(error)
      }
    }

    async function fetchCardDataAndUpdateMeanings() {
      const updatedCards = await Promise.all(
        reading.cards.map(async ({ card }) => {
          console.log(card)
          const meaningData = await fetchData(card, false)
          return {
            card,
            meaning: meaningData,
          }
        }),
      )

      setReading({
        ...reading,
        cards: updatedCards,
      })
    }

    fetchCardDataAndUpdateMeanings()

    // const threeCards = []
    // reading.cards.map((card) => {
    //   threeCards.push(card.card)
    // })

    // fetchData(threeCards.join(), true).then((readingMeaning) =>
    //   setReading((prevReading) => {
    //     setReading({ ...prevReading, meaning: readingMeaning })
    //   }),
    // )
  }, [])

  return <div></div>
}

export default Reading
