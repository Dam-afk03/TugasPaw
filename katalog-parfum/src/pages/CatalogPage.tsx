import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { Pagination } from '../components/Pagination'
import { ProductCard } from '../components/ProductCard'
import { StateMessage } from '../components/stateMessage'
import { useDebounce } from '../hooks/useDebounce'
import { fetchAllStoreProducts } from '../services/productApi'
import type { Product } from '../types/product'

const ITEMS_PER_PAGE = 6

export function CatalogPage() {
  // Server State
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // URL State: menyimpan query pencarian, kategori, urutan, dan nomor halaman di URL
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParam = searchParams.get('q') ?? ''
  const categoryParam = searchParams.get('category') ?? 'all'
  const sortParam = searchParams.get('sort') ?? 'default'
  const pageParam = Math.max(1, Number(searchParams.get('page') ?? '1'))

  // Local State untuk input search sebelum di-debounce ke URL
  const [searchInput, setSearchInput] = useState(queryParam)
  const debouncedSearch = useDebounce(searchInput, 350)

  const updateParams = (updates: Record<string, string>) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, val]) => {
      if (!val || val === 'all' || val === 'default' || (key === 'page' && val === '1')) {
        next.delete(key)
      } else {
        next.set(key, val)
      }
    })
    setSearchParams(next)
  }

  // Sinkronkan hasil debounce ke URL parameter ?q=
  useEffect(() => {
    if (debouncedSearch !== queryParam) {
      updateParams({ q: debouncedSearch.trim(), page: '1' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchAllStoreProducts()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat katalog.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // Filter, Search, dan Sorting
  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (categoryParam !== 'all') {
      result = result.filter((p) => p.category === categoryParam)
    }

    if (queryParam.trim() !== '') {
      const kw = queryParam.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(kw) ||
          (p.brand && p.brand.toLowerCase().includes(kw)) ||
          p.description.toLowerCase().includes(kw)
      )
    }

    switch (sortParam) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return result
  }, [products, categoryParam, queryParam, sortParam])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))
  const safePage = Math.min(pageParam, totalPages)
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  const handleReset = () => {
    setSearchInput('')
    setSearchParams({})
  }

  return (
    <div className="container section-block">
      <div className="page-header">
        <h1>Katalog Parfum &amp; Skincare</h1>
        <p>Cari aroma favorit, saring berdasarkan kategori, dan urutkan sesuai kebutuhanmu.</p>
      </div>

      {/* Bar Kontrol: Search, Filter Kategori, Sorting */}
      <div className="filter-bar">
        <input
          type="search"
          className="form-input search-input"
          placeholder="Cari nama parfum atau merek (misal: Chanel, Dior, Calvin)..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <select
          className="form-select"
          value={categoryParam}
          onChange={(e) => updateParams({ category: e.target.value, page: '1' })}
          aria-label="Filter Kategori"
        >
          <option value="all">Semua Kategori</option>
          <option value="fragrances">Parfum (Fragrances)</option>
          <option value="skin-care">Skincare</option>
          <option value="beauty">Kosmetik (Beauty)</option>
        </select>

        <select
          className="form-select"
          value={sortParam}
          onChange={(e) => updateParams({ sort: e.target.value, page: '1' })}
          aria-label="Urutkan Produk"
        >
          <option value="default">Urutan Default</option>
          <option value="price-asc">Harga: Terendah - Tertinggi</option>
          <option value="price-desc">Harga: Tertinggi - Terendah</option>
          <option value="rating-desc">Rating Tertinggi</option>
          <option value="name-asc">Nama: A - Z</option>
        </select>

        {(queryParam || categoryParam !== 'all' || sortParam !== 'default') && (
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset Filter
          </Button>
        )}
      </div>

      {/* State Handling: Loading, Error, Empty, & List Data */}
      {loading && (
        <StateMessage
          type="loading"
          title="Mengambil Katalog Produk..."
          description="Mohon tunggu sebentar, sedang memuat data parfum dari API."
        />
      )}

      {!loading && error && (
        <StateMessage
          type="error"
          title="Koneksi API Gagal"
          description={error}
          onRetry={loadProducts}
        />
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <StateMessage
          type="empty"
          title="Produk Tidak Ditemukan"
          description="Tidak ada parfum atau skincare yang cocok dengan kata kunci maupun filter yang dipilih."
          onRetry={handleReset}
        />
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <>
          <p className="result-info">
            Menampilkan <strong>{paginatedProducts.length}</strong> dari{' '}
            <strong>{filteredProducts.length}</strong> produk (Halaman {safePage} dari {totalPages})
          </p>

          <div className="product-grid">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={(page) => updateParams({ page: String(page) })}
          />
        </>
      )}
    </div>
  )
}