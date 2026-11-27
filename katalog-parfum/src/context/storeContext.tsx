import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalstorage'
import type { Notrequest, Product } from '../types/product'

interface StoreContextType {
  wishlist: Product[]
  toggleWishlist: (product: Product) => void
  isWishlisted: (id: number) => boolean
  notes: Notrequest[]
  addNote: (note: Omit<Notrequest, 'id' | 'tanggal'>) => void
  deleteNote: (id: number) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useLocalStorage<Product[]>('scentvault_wishlist', [])
  const [notes, setNotes] = useLocalStorage<Notrequest[]>('aromaku_notes', [
    {
      id: 1,
      namaParfum: 'Dior Sauvage EDP',
      merek: 'Dior',
      kategori: 'fragrances',
      budgetMaksimal: 150,
      catatan: 'Cari yang ukuran 60ml atau 100ml untuk dipakai harian.',
      tanggal: '27/11/2026',
    },
  ])

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [product, ...prev]
    )
  }

  const isWishlisted = (id: number) => wishlist.some((item) => item.id === id)

  const addNote = (note: Omit<Notrequest, 'id' | 'tanggal'>) => {
    const newNote: Notrequest = {
      ...note,
      id: Date.now(),
      tanggal: new Date().toLocaleDateString('id-ID'),
    }
    setNotes((prev) => [newNote, ...prev])
  }

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <StoreContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted, notes, addNote, deleteNote }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore harus digunakan di dalam StoreProvider')
  }
  return context
}