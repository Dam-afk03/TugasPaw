import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '../components/badge'
import { Button } from '../components/Button'
import { StateMessage } from '../components/stateMessage'
import { useStore } from '../context/storeContext'
import { fetchProductById } from '../services/productApi'
import type { Product } from '../types/product'

export function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImg, setSelectedImg] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { isWishlisted, toggleWishlist } = useStore()

  const loadDetail = async () => {
    if (!id) return
    try {
      setLoading(true)
      setError(null)
      const data = await fetchProductById(id)
      setProduct(data)
      setSelectedImg(data.image?.[0] || data.thumbnail)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat detail produk.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (loading) {
    return (
      <div className="container section-block">
        <StateMessage
          type="loading"
          title="Memuat Detail Parfum..."
          description="Mengambil spesifikasi lengkap produk berdasarkan ID."
        />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container section-block">
        <StateMessage
          type="error"
          title="Produk Tidak Ditemukan"
          description={error || 'Data produk dengan ID tersebut tidak tersedia.'}
          onRetry={loadDetail}
        />
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/katalog" className="btn btn-outline btn-md">
            ← Kembali ke Katalog
          </Link>
        </div>
      </div>
    )
  }

  const saved = isWishlisted(product.id)

  return (
    <div className="container section-block">
      <div className="breadcrumb">
        <Link to="/katalog">← Kembali ke Katalog</Link>
      </div>

      <div className="detail-grid">
        <div className="detail-gallery">
          <div className="detail-main-img">
            <img src={selectedImg || product.thumbnail} alt={product.title} />
          </div>
          {product.image && product.image.length > 1 && (
            <div className="detail-thumbs">
              {product.image.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumb-btn ${selectedImg === img ? 'active' : ''}`}
                  onClick={() => setSelectedImg(img)}
                >
                  <img src={img} alt={`${product.title} ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <div className="detail-badges">
            <Badge variant="gold">{product.category}</Badge>
            <Badge variant={product.stock > 0 ? 'success' : 'rose'}>
              {product.stock > 0 ? `Stok Tersedia (${product.stock})` : 'Stok Habis'}
            </Badge>
          </div>

          <p className="detail-brand">{product.brand || 'ScentVault Signature'}</p>
          <h1>{product.title}</h1>

          <div className="detail-rating">
            <span>★ {product.rating.toFixed(2)} / 5.0</span>
            <span>•</span>
            <span>Diskon {product.discountPercentage}%</span>
          </div>

          <div className="detail-price">${product.price.toFixed(2)}</div>

          <p className="detail-desc">{product.description}</p>

          <div className="detail-actions">
            <Button
              variant={saved ? 'primary' : 'outline'}
              onClick={() => toggleWishlist(product)}
            >
              {saved ? '♥ Tersimpan di Wishlist' : '♡ Simpan ke Wishlist'}
            </Button>
            <Link to="/wishlist" className="btn btn-ghost btn-md">
              Lihat Daftar Wishlist →
            </Link>
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <div className="reviews-box">
              <h3>Ulasan Pembeli ({product.reviews.length})</h3>
              <div className="review-list">
                {product.reviews.map((rev, i) => (
                  <div key={i} className="review-item">
                    <div className="review-top">
                      <strong>{rev.reviewerName}</strong>
                      <span>★ {rev.rating}/5</span>
                    </div>
                    <p>{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}