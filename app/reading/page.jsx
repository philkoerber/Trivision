'use client'

import React, { useEffect, useState } from 'react'
import useStore from '@/useStore'

function Reading(props) {
  const reading = useStore((state) => state.reading)
  const setReading = useStore((state) => state.setReading)
  const [awaitingMeaning, setAwaitingMeaning] = useState(false)

  useEffect(() => {
    setAwaitingMeaning(true)
    const randomToken = Math.random().toString(36).substring(7) // Generate a random token

    async function fetchData() {
      try {
        const response = await fetch(`/api?token=${randomToken}`)

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`)
        }

        const data = await response.json()
        setReading(data)
      } catch (error) {
        console.error(error)
      } finally {
      }
    }

    fetchData()
  }, []) // Empty dependency array to trigger only on mount

  useEffect(() => {
    if (awaitingMeaning) {
      setAwaitingMeaning(false)
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
            const meaningData = await fetchData(card, 'card')
            return {
              card,
              meaning: meaningData,
            }
          }),
        )

        // Fetch data for threeCards and update the meaning
        const threeCards = reading.cards.map((card) => card.card).join()
        const readingMeaning = await fetchData(threeCards, 'reading')

        setReading({
          ...reading,
          cards: updatedCards,
          meaning: readingMeaning,
        })
      }

      fetchCardDataAndUpdateMeanings()
    }
  }, [reading])

  return <></>
}

export default Reading
