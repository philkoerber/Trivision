import { create } from 'zustand'

const useStore = create((set) => ({
  // The reading, what cards are in the reading, etc.
  reading: null,
  setReading: (input) => set({ reading: input }),

  // Store clicked cards state
  clickedCards: { lastClickedCard: null, clickedCardsList: [] },

  // Function to update clicked cards
  clickACard: (nr) =>
    set((state) => {
      // If the card hasn't been clicked before, add it to the clickedCardsList array
      if (!state.clickedCards.clickedCardsList.includes(nr)) {
        return {
          clickedCards: {
            lastClickedCard: nr,
            clickedCardsList: [...state.clickedCards.clickedCardsList, nr],
          },
        }
      }

      // If the card has been clicked before, just update the lastClickedCard
      return {
        clickedCards: {
          lastClickedCard: nr,
          clickedCardsList: state.clickedCards.clickedCardsList,
        },
      }
    }),
}))

export default useStore
