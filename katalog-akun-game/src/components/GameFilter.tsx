import { GAMES, type FilterGame } from '../types'

interface GameFilterProps {
  aktif: FilterGame
  onChange: (f: FilterGame) => void
  jumlah: Record<FilterGame, number>
}

const PILIHAN: FilterGame[] = ['Semua', ...GAMES]
const IKON: Record<FilterGame, string> = {
  Semua: '🎮', 'Free Fire': '🔥', 'Mobile Legends': '⚔️', 'PUBG Mobile': '🎯', eFootball: '⚽',
}

export default function GameFilter({ aktif, onChange, jumlah }: GameFilterProps) {
  return (
    <div className="chips">
      {PILIHAN.map((p) => (
        <button key={p} className={`chip ${aktif === p ? 'aktif' : ''}`} onClick={() => onChange(p)}>
          <span aria-hidden="true">{IKON[p]}</span> {p} <b>{jumlah[p]}</b>
        </button>
      ))}
    </div>
  )
}
