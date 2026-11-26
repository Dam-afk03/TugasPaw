import { GAMES } from '../types'

interface HeroProps {
  total: number
  tersedia: number
  onBukaForm: () => void
}

export default function Hero({ total, tersedia, onBukaForm }: HeroProps) {
  return (
    <section className="hero">
      <div>
        <h1>Temukan akun game <span>impianmu</span> dengan mudah.</h1>
        <p className="sub">
          Jelajahi akun Free Fire, Mobile Legends, PUBG Mobile, dan eFootball, lalu kelola daftar jualmu sendiri dalam satu tempat.
        </p>
        <div className="hero-aksi">
          <a className="btn" href="#katalog">Lihat katalog</a>
          <button type="button" className="btn garis" onClick={onBukaForm}>
            Jual akun
          </button>
        </div>
      </div>
      <dl className="statistik">
        <div><dt>Total akun</dt><dd>{total}</dd></div>
        <div><dt>Tersedia</dt><dd>{tersedia}</dd></div>
        <div><dt>Game</dt><dd>{GAMES.length}</dd></div>
      </dl>
    </section>
  )
}
