import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserState, Annotation, UserNote, PurchaseRecord } from '../types'

interface AppStore extends UserState {
  // Actions
  setUser: (name: string, email: string) => void
  addPurchase: (record: PurchaseRecord) => void
  isOwned: (ebookId: string) => boolean
  addAnnotation: (annotation: Annotation) => void
  removeAnnotation: (annotationId: string) => void
  getAnnotationsForPage: (ebookId: string, pageNumber: number) => Annotation[]
  addNote: (note: UserNote) => void
  updateNote: (noteId: string, text: string) => void
  removeNote: (noteId: string) => void
  setReadingProgress: (ebookId: string, page: number) => void
  getReadingProgress: (ebookId: string) => number
  toggleFavorite: (ebookId: string) => void
  isFavorite: (ebookId: string) => boolean
  // Session
  isLoggedIn: boolean
  login: (name: string, email: string) => void
  logout: () => void
  // UI state
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      name: '',
      email: '',
      avatar: undefined,
      purchases: [],
      annotations: [],
      notes: [],
      readingProgress: {},
      favorites: [],
      isLoggedIn: false,
      activeTab: 'inicio',

      setUser: (name, email) => set({ name, email }),

      addPurchase: (record) =>
        set((state) => ({
          purchases: [
            ...state.purchases.filter((p) => p.ebookId !== record.ebookId),
            record,
          ],
        })),

      isOwned: (ebookId) => {
        const state = get()
        // Free ebooks are always "owned"
        return state.purchases.some((p) => p.ebookId === ebookId)
      },

      addAnnotation: (annotation) =>
        set((state) => ({
          annotations: [...state.annotations, annotation],
        })),

      removeAnnotation: (annotationId) =>
        set((state) => ({
          annotations: state.annotations.filter((a) => a.id !== annotationId),
        })),

      getAnnotationsForPage: (ebookId, pageNumber) => {
        return get().annotations.filter(
          (a) => a.ebookId === ebookId && a.pageNumber === pageNumber,
        )
      },

      addNote: (note) =>
        set((state) => ({
          notes: [...state.notes, note],
        })),

      updateNote: (noteId, text) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === noteId ? { ...n, note: text } : n,
          ),
        })),

      removeNote: (noteId) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== noteId),
        })),

      setReadingProgress: (ebookId, page) =>
        set((state) => ({
          readingProgress: { ...state.readingProgress, [ebookId]: page },
        })),

      getReadingProgress: (ebookId) => get().readingProgress[ebookId] ?? 1,

      toggleFavorite: (ebookId) =>
        set((state) => ({
          favorites: state.favorites.includes(ebookId)
            ? state.favorites.filter((id) => id !== ebookId)
            : [...state.favorites, ebookId],
        })),

      isFavorite: (ebookId) => get().favorites.includes(ebookId),

      login: (name, email) => set({ name, email, isLoggedIn: true }),

      logout: () =>
        set({
          name: '',
          email: '',
          isLoggedIn: false,
          purchases: [],
          annotations: [],
          notes: [],
          readingProgress: {},
          favorites: [],
        }),

      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'oura-kids-storage',
      partialize: (state) => ({
        name: state.name,
        email: state.email,
        isLoggedIn: state.isLoggedIn,
        purchases: state.purchases,
        annotations: state.annotations,
        notes: state.notes,
        readingProgress: state.readingProgress,
        favorites: state.favorites,
      }),
    },
  ),
)

// Helper: Hotmart purchase callback (called after successful purchase)
export function registerHotmartPurchase(ebookId: string, transactionId?: string) {
  const store = useStore.getState()
  store.addPurchase({
    ebookId,
    purchasedAt: new Date().toISOString(),
    transactionId,
  })
}
