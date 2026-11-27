import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="container section-block" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
        Alamat halaman yang kamu buka tidak tersedia di katalog ScentVault.
      </p>
      <Link to="/" className="btn btn-primary btn-md">
        Kembali ke Beranda
      </Link>
    </div>
  )
}