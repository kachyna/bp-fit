import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false

export const useUiStore = create(immer((set) => ({
    expandAllCards: isMobile,
    setExpandAllCards: (val) => set((state) => {
        state.expandAllCards = val
    }),

    showDebugCard: false,
    setShowDebugCard: (val) => set((state) => {
        state.showDebugCard = val
    })
})))
