import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const useUiStore = create(immer((set) => ({
    expandAllCards: false,
    setExpandAllCards: (val) => set((state) => {
        state.expandAllCards = val
    }),

    showDebugCard: false,
    setShowDebugCard: (val) => set((state) => {
        state.showDebugCard = val
    })
})))
