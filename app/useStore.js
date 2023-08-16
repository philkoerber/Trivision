import { create } from 'zustand'

const useStore = create((set) => ({
  readingState: 0,
  setReadingState: (input) => set({ readingState: input }),
}))

export default useStore
