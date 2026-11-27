import { Link } from 'react-router-dom'
import { useStore } from '../context/storeContext'
import type { Product } from '../types/product'
import { Badge } from './badge'
import { Button } from './Button'

interface ProductCardProps {
  product: Product
}

const CATEGORY_LABELS: Record<string, string> = {
  fragrances: 'Parfum',
  'skin-care': 'Skincare',
  beauty: 'Kosmetik',
}

export function ProductCard({ product }: ProductCardProps) {
  const { isWishlisted, toggleWishlist } = useStore()
  const saved = isWishlisted(product.id)

  return (
    <article className="product-card">
      <div className="card-media">
        <Badge variant="gold">{CATEGORY_LABELS[product.category] ?? product.category}</Badge>
        {product.discountPercentage > 0 && (
          <Badge variant="rose">-{Math.round(product.discountPercentage)}%</Badge>
        )}
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>

      <div className="card-body">
        <span className="card-brand">{product.brand || 'Original'}</span>
        <h3 className="card-title">
          <Link to={`/katalog/${product.id}`}>{product.title}</Link>
        </h3>

        <div className="card-meta">
          <span>★ {product.rating.toFixed(1)}</span>
          <span>•</span>
          <span>Stok: {product.stock}</span>
        </div>

        <div className="card-footer">
          <div className="card-price">${product.price.toFixed(2)}</div>
          <div className="card-actions">
            <Link to={`/katalog/${product.id}`} className="btn btn-outline btn-sm">
              Detail
            </Link>
            <Button
              variant={saved ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => toggleWishlist(product)}
              title={saved ? 'Hapus dari Wishlist' : 'Simpan ke Wishlist'}
            >
              {saved ? '♥ Ter Wishlist' : '♡ Wishlist'}
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}