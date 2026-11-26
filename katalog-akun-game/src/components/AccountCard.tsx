import { useState } from 'react'
import type { Account } from '../types'
import Badge from './Badge'

interface AccountCardProps {
  akun: Account
  sudahDikeranjang: boolean
  onTambahkeranjang: () => void
  onToggleStatus: (id: number) => void
  onDelete: (id: number) => void
}

const IKON = { 'Free Fire': '🔥', 'Mobile Legends': '⚔️', 'PUBG Mobile': '🎯', eFootball: '⚽' } as const

export default function AccountCard({
  akun,
  sudahDikeranjang,
  onTambahkeranjang,
  onToggleStatus,
  onDelete,
}: AccountCardProps) {
  const [terbuka, setTerbuka] = useState(false)
  const terjual = akun.status === 'Terjual'
  const slug = akun.game.toLowerCase().replace(/\s+/g, '-')
  const tidakTersedia = terjual || sudahDikeranjang

  return (
    <article className={`akun ${terjual ? 'terjual' : ''}`}>
      <div className={`sampul sampul-${slug}`}>
        <Badge teks={akun.game} />
        <Badge teks={akun.status} warna={akun.status.toLowerCase()} />
        <span className="ikon" aria-hidden="true">{IKON[akun.game]}</span>
      </div>
      <div className="isi">
        <h3>{akun.judul}</h3>
        <p className="meta">Rank {akun.rank} | Level {akun.level}</p>
        <p className="harga">Rp {akun.harga.toLocaleString('id-ID')}</p>
        {terbuka && <p className="detail">{akun.deskripsi}</p>}

        <div className="aksi">
          <button type="button" className="btn garis" onClick={() => setTerbuka(!terbuka)}>
            {terbuka ? 'Tutup' : 'Detail'}
          </button>
          <button
            type="button"
            className="btn garis"
            title={terjual ? 'Tandai sebagai tersedia' : 'Tandai sebagai terjual'}
            onClick={() => onToggleStatus(akun.id)}
          >
            {terjual ? 'Tersedia' : 'Terjual'}
          </button>
          <button
            type="button"
            className="btn btn-keranjang"
            disabled={tidakTersedia}
            onClick={onTambahkeranjang}
            style={{
              opacity: tidakTersedia ? 0.55 : 1,
              cursor: tidakTersedia ? 'not-allowed' : 'pointer',
            }}
          >
            {terjual
              ? 'Terjual'
              : sudahDikeranjang
                ? 'Di Keranjang'
                : '+ Keranjang'}
          </button>
          <button
            type="button"
            className="ikon-btn"
            aria-label="Hapus akun"
            title="Hapus akun"
            onClick={() => onDelete(akun.id)}
          >
            🗑
          </button>
        </div>
      </div>
    </article>
  )
}