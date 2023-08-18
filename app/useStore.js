import { create } from 'zustand'

const useStore = create((set) => ({
  //the 'stage' of the reading (0, 1, 2 or 3)
  readingState: 0,
  setReadingState: (input) => set({ readingState: input }),

  //the reading, what cards are in the reading etc.
  reading: {
    initialized: false,
    cards: [],
  },
  setReading: (input) => set({ reading: input }),
}))

export default useStore
