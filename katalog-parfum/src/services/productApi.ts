import type { Product, ProductResponse } from '../types/product'

const BASE_URL = 'https://dummyjson.com/products'

// Kategori khusus toko parfum & kecantikan
export const STORE_CATEGORIES = ['fragrances', 'skin-care', 'beauty'] as const

export async function fetchAllStoreProducts(): Promise<Product[]> {
  const requests = STORE_CATEGORIES.map(async (cat) => {
    const res = await fetch(`${BASE_URL}/category/${cat}?limit=30`)
    if (!res.ok) {
      throw new Error(`Gagal memuat kategori ${cat} (Status: ${res.status})`)
    }
    const data: ProductResponse = await res.json()
    return data.products
  })

  const results = await Promise.all(requests)
  return results.flat()
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) {
    throw new Error('Produk parfum tidak ditemukan atau server bermasalah.')
  }
  return res.json()
}
