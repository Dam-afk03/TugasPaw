import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { GAMES, type Game, type NewAccount } from '../types'

interface AccountFormProps {
  onTambah: (akun: NewAccount) => void
  onTutup: () => void
}

const AWAL = { judul: '', game: 'Free Fire', rank: '', level: '', harga: '', deskripsi: '' }

export default function AccountForm({ onTambah, onTutup }: AccountFormProps) {
  const [f, setF] = useState(AWAL)

  const ubah = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [e.target.name]: e.target.value })

  const kirim = (e: FormEvent) => {
    e.preventDefault()
    onTambah({
      judul: f.judul.trim(),
      game: f.game as Game,
      rank: f.rank.trim(),
      level: Number(f.level),
      harga: Number(f.harga),
      deskripsi: f.deskripsi.trim(),
    })
    setF(AWAL)
  }

  return (
    <div className="modal-latar" onClick={onTutup}>
      <form
        className="panel modal-kotak"
        onSubmit={kirim}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-kepala">
          <h2>Jual akun baru</h2>
          <button
            type="button"
            className="ikon-btn"
            onClick={onTutup}
            aria-label="Tutup form"
          >
            ✕
          </button>
        </div>

        <div className="form-grid">
          <label className="penuh">Judul akun
            <input name="judul" value={f.judul} onChange={ubah} placeholder="Contoh: Akun Heroic Full Evo" required />
          </label>
          <label>Game
            <select name="game" value={f.game} onChange={ubah}>
              {GAMES.map((g) => <option key={g}>{g}</option>)}
            </select>
          </label>
          <label>Rank
            <input name="rank" value={f.rank} onChange={ubah} placeholder="Contoh: Heroic" required />
          </label>
          <label>Level
            <input name="level" type="number" min="1" value={f.level} onChange={ubah} placeholder="Contoh: 65" required />
          </label>
          <label>Harga (Rp)
            <input name="harga" type="number" min="1000" value={f.harga} onChange={ubah} placeholder="Contoh: 450000" required />
          </label>
          <label className="penuh">Deskripsi
            <textarea name="deskripsi" value={f.deskripsi} onChange={ubah} placeholder="Isi akun, skin, dan keunggulannya" rows={2} />
          </label>
        </div>

        <div className="tombol" style={{ display: 'flex', gap: '0.6rem' }}>
          <button className="btn garis" type="button" onClick={onTutup}>
            Batal
          </button>
          <button className="btn" type="submit" style={{ flex: 1 }}>
            Tambah akun
          </button>
        </div>
      </form>
    </div>
  )
}