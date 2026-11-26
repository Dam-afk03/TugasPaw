import { useState, useEffect } from 'react'

interface NavbarProps {
  nama: string
  nim: string
  jumlahKeranjang: number
  modalAktif: 'tambah' | 'keranjang' | null
  onBukaForm: () => void
  onBukaKeranjang: () => void
}

export default function Navbar({
  nama,
  nim,
  jumlahKeranjang,
  modalAktif,
  onBukaForm,
  onBukaKeranjang,
}: NavbarProps) {
  const [aktif, setAktif] = useState('beranda')
  const inisial = nama.split(' ').map((k) => k[0]).join('')
  const menuAktif = modalAktif ?? aktif

  useEffect(() => {
    const daftarSection = [
      { id: 'atas', menu: 'beranda' },
      { id: 'katalog', menu: 'katalog' },
    ]

    const cekPosisiScroll = () => {
      const posisiScroll = window.scrollY + window.innerHeight / 3

      for (const item of daftarSection) {
        const elemen = document.getElementById(item.id)
        if (elemen) {
          const atas = elemen.offsetTop
          const tinggi = elemen.offsetHeight
          if (posisiScroll >= atas && posisiScroll < atas + tinggi) {
            setAktif(item.menu)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', cekPosisiScroll, { passive: true })
    cekPosisiScroll()

    return () => window.removeEventListener('scroll', cekPosisiScroll)
  }, [])

  return (
    <header className="nav">
      <div className="wadah nav-isi">
        <a className="merek" href="#atas" onClick={() => setAktif('beranda')}>
          <span className="logo">GV</span>GameVault
        </a>

        <nav className="menu" aria-label="Navigasi utama">
          <a
            href="#atas"
            className={menuAktif === 'beranda' ? 'aktif' : ''}
            onClick={() => setAktif('beranda')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
            </svg>
            <span>Beranda</span>
          </a>

          <a
            href="#katalog"
            className={menuAktif === 'katalog' ? 'aktif' : ''}
            onClick={() => setAktif('katalog')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span>Katalog</span>
          </a>

          <a
            href="#tambah"
            className={menuAktif === 'tambah' ? 'aktif' : ''}
            onClick={(e) => {
              e.preventDefault()
              onBukaForm()
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v8M8 12h8" />
            </svg>
            <span>Jual akun</span>
          </a>

          <a
            href="#keranjang"
            className={menuAktif === 'keranjang' ? 'aktif' : ''}
            onClick={(e) => {
              e.preventDefault()
              onBukaKeranjang()
            }}
          >
            <div className="nav-ikon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M2 3h3l2.4 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.5L22 7H6" />
              </svg>
              {jumlahKeranjang > 0 && (
                <em className="nav-badge">{jumlahKeranjang}</em>
              )}
            </div>
            <span>Keranjang</span>
          </a>
        </nav>

        <div className="identitas">
          <span className="avatar">{inisial}</span>
          <span>
            <strong>{nama}</strong>
            <small>NIM {nim}</small>
          </span>
        </div>
      </div>
    </header>
  )
}