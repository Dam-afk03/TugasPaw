import { useState, useEffect } from 'react'
import type { Account, FilterGame, Game, NewAccount, Urutan } from './types'
import { AKUN_AWAL } from './data/accounts'
import { useLocalStorage } from './hooks/useLocalStorage'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import GameFilter from './components/GameFilter'
import AccountForm from './components/AccountForm'
import AccountList from './components/AccountList'
import CartModal from './components/Cartmodal'
import Footer from './components/Footer'

const NAMA = 'Adam Halawi'
const NIM = '1247050024'

export default function App() {
  const [akun, setAkun] = useLocalStorage<Account[]>('akun-game', AKUN_AWAL)
  const [keranjangIds, setKeranjangIds] = useState<number[]>([])
  const [kata, setKata] = useState('')
  const [game, setGame] = useState<FilterGame>('Semua')
  const [urut, setUrut] = useState<Urutan>('baru')

  const [bukaForm, setBukaForm] = useState(false)
  const [bukaKeranjang, setBukaKeranjang] = useState(false)
  const [toastTeks, setToastTeks] = useState<string | null>(null)
  const [pesanCheckout, setPesanCheckout] = useState<string | null>(null)

  useEffect(() => {
    if (!toastTeks) return
    const timer = setTimeout(() => setToastTeks(null), 3500)
    return () => clearTimeout(timer)
  }, [toastTeks])

  const handleTambah = (baru: NewAccount) => {
    setAkun([{ ...baru, id: Date.now(), status: 'Tersedia' }, ...akun])
    setBukaForm(false)
  }

  const handleToggle = (id: number) => {
    setAkun(akun.map((a): Account =>
      a.id === id ? { ...a, status: a.status === 'Tersedia' ? 'Terjual' : 'Tersedia' } : a,
    ))
    setKeranjangIds((prev) => prev.filter((itemId) => itemId !== id))
  }

  const handleHapus = (id: number) => {
    setAkun(akun.filter((a) => a.id !== id))
    setKeranjangIds((prev) => prev.filter((itemId) => itemId !== id))
  }

  const handleTambahKeranjang = (item: Account) => {
    if (item.status !== 'Tersedia' || keranjangIds.includes(item.id)) return
    setKeranjangIds([...keranjangIds, item.id])
    setToastTeks(`${item.judul} ditambahkan`)
  }

  const handleCheckout = () => {
    const itemBeli = akun.filter((a) => keranjangIds.includes(a.id))
    const total = itemBeli.reduce((sum, a) => sum + a.harga, 0)

    setAkun(
      akun.map((a): Account =>
        keranjangIds.includes(a.id) ? { ...a, status: 'Terjual' } : a,
      ),
    )
    setKeranjangIds([])
    setToastTeks(null)
    setPesanCheckout(`Pesanan diproses. Total: Rp ${total.toLocaleString('id-ID')}`)
  }

  const itemKeranjang = akun.filter(
    (a) => keranjangIds.includes(a.id) && a.status === 'Tersedia',
  )

  const q = kata.trim().toLowerCase()
  const tampil = akun
    .filter((a) => (game === 'Semua' || a.game === game) && `${a.judul} ${a.rank}`.toLowerCase().includes(q))
    .sort((a, b) => (urut === 'murah' ? a.harga - b.harga : urut === 'mahal' ? b.harga - a.harga : 0))

  const hitung = (g: Game) => akun.filter((a) => a.game === g).length
  const jumlah: Record<FilterGame, number> = {
    Semua: akun.length,
    'Free Fire': hitung('Free Fire'),
    'Mobile Legends': hitung('Mobile Legends'),
    'PUBG Mobile': hitung('PUBG Mobile'),
    eFootball: hitung('eFootball'),
  }

  return (
    <div>
      <Navbar
        nama={NAMA}
        nim={NIM}
        jumlahKeranjang={itemKeranjang.length}
        modalAktif={bukaForm ? 'tambah' : bukaKeranjang ? 'keranjang' : null}
        onBukaForm={() => setBukaForm(true)}
        onBukaKeranjang={() => {
          setPesanCheckout(null)
          setBukaKeranjang(true)
        }}
      />

      <main className="wadah">
        <div id="atas">
          <Hero
            total={akun.length}
            tersedia={akun.filter((a) => a.status === 'Tersedia').length}
            onBukaForm={() => setBukaForm(true)}
          />
        </div>

        <section id="katalog">
          <div className="panel">
            <div className="panel-kepala">
              <h2>Katalog akun</h2>
              <span>Menampilkan {tampil.length} dari {akun.length} akun</span>
            </div>
            <div className="baris-alat">
              <SearchBar value={kata} onChange={setKata} />
              <select value={urut} onChange={(e) => setUrut(e.target.value as Urutan)}>
                <option value="baru">Terbaru</option>
                <option value="murah">Harga termurah</option>
                <option value="mahal">Harga termahal</option>
              </select>
            </div>
            <GameFilter aktif={game} onChange={setGame} jumlah={jumlah} />
          </div>

          <AccountList
            akun={tampil}
            adaFilter={q !== '' || game !== 'Semua'}
            keranjangIds={keranjangIds}
            onTambahKeranjang={handleTambahKeranjang}
            onToggleStatus={handleToggle}
            onDelete={handleHapus}
          />
        </section>
      </main>

      {bukaForm && (
        <AccountForm
          onTambah={handleTambah}
          onTutup={() => setBukaForm(false)}
        />
      )}

      {bukaKeranjang && (
        <CartModal
          items={itemKeranjang}
          pesanSukses={pesanCheckout}
          onHapusPesan={() => setPesanCheckout(null)}
          onHapusItem={(id) => setKeranjangIds(keranjangIds.filter((x) => x !== id))}
          onKosongkan={() => setKeranjangIds([])}
          onCheckout={handleCheckout}
          onTutup={() => setBukaKeranjang(false)}
        />
      )}

      {toastTeks && (
        <div className="toast-notif">
          <span>{toastTeks}</span>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setToastTeks(null)
              setPesanCheckout(null)
              setBukaKeranjang(true)
            }}
          >
            Lihat keranjang
          </button>
        </div>
      )}

      <Footer nama={NAMA} nim={NIM} />
    </div>
  )
}