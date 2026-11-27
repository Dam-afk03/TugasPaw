import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { StateMessage } from '../components/stateMessage'
import { fetchAllStoreProducts } from '../services/productApi'
import type { Product } from '../types/product'

export function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadFeatured = async () => {
    try {
      setLoading(true)
      setError(null)
      const all = await fetchAllStoreProducts()
      setFeatured(all.slice(0, 4))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat koleksi unggulan.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeatured()
  }, [])

  return (
    <div>
      <section className="hero" style={{ padding: '2.5rem 0' }}>
        <div className="container hero-inner">
          <h1>Etalase Parfum & Skincare</h1>
          <p>
            Daftar produk parfum, skincare, dan kosmetik dari berbagai brand lengkap dengan
            harga, rating, serta fitur simpan wishlist.
          </p>
          <div className="hero-actions">
            <Link to="/katalog" className="btn btn-primary btn-md">
              Buka Semua Katalog
            </Link>
            <Link to="/wishlist" className="btn btn-outline btn-md">
              Wishlist & Catatan
            </Link>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-head">
          <div>
            <h2>Produk Pilihan</h2>
            <p>Beberapa produk parfum dan perawatan yang tersedia</p>
          </div>
          <Link to="/katalog" className="link-arrow">
            Lihat Semua →
          </Link>
        </div>

        {loading && (
          <StateMessage
            type="loading"
            title="Memuat Koleksi..."
            description="Mengambil data produk dari server DummyJSON API."
          />
        )}

        {!loading && error && (
          <StateMessage
            type="error"
            title="Gagal Mengambil Data"
            description={error}
            onRetry={loadFeatured}
          />
        )}

        {!loading && !error && (
          <div className="product-grid">
            {featured.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}