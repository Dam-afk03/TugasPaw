import { Link, NavLink, Outlet } from 'react-router-dom'
import { useStore } from '../context/storeContext'

export function MainLayout() {
  const { wishlist, notes } = useStore()
  const totalSaved = wishlist.length + notes.length

  return (
    <div className="app-shell">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="container nav-inner">
          <Link to="/" className="brand">
            <span className="brand-dot" />
            PARFUMERY
          </Link>

          <nav className="nav-links" aria-label="Navigasi Desktop">
            <NavLink to="/" end>
              Beranda
            </NavLink>
            <NavLink to="/katalog">
              Katalog Parfum
            </NavLink>
            <NavLink to="/wishlist">
              Wishlist & Catatan
              {totalSaved > 0 && <span className="nav-badge">{totalSaved}</span>}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>© 2026 PARFUMERY — Katalog Parfum & Skincare</p>
          <p>
            Dibuat oleh <strong>Adam Halawi</strong>
          </p>
        </div>
      </footer>

      {/* Bottom Navbar khusus tampilan Mobile (seperti Pertemuan 7) */}
      <nav className="bottom-nav" aria-label="Navigasi Bawah Mobile">
        <NavLink to="/" end className="bottom-nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Beranda</span>
        </NavLink>

        <NavLink to="/katalog" className="bottom-nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <span>Katalog</span>
        </NavLink>

        <NavLink to="/wishlist" className="bottom-nav-item">
          <div className="bottom-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {totalSaved > 0 && <span className="bottom-badge">{totalSaved}</span>}
          </div>
          <span>Wishlist</span>
        </NavLink>
      </nav>
    </div>
  )
}