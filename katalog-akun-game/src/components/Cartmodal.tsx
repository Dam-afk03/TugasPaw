import type { Account } from '../types'

interface CartModalProps {
  items: Account[]
  pesanSukses: string | null
  onHapusPesan: () => void
  onHapusItem: (id: number) => void
  onKosongkan: () => void
  onCheckout: () => void
  onTutup: () => void
}

export default function CartModal({
  items,
  pesanSukses,
  onHapusPesan,
  onHapusItem,
  onKosongkan,
  onCheckout,
  onTutup,
}: CartModalProps) {
  const totalHarga = items.reduce((sum, item) => sum + item.harga, 0)

  return (
    <div className="modal-latar" onClick={onTutup}>
      <section className="panel modal-kotak" onClick={(e) => e.stopPropagation()}>
        <div className="panel-kepala">
          <div>
            <h2>Keranjang akun</h2>
            <span>{items.length} akun siap dibeli</span>
          </div>
          <button
            type="button"
            className="ikon-btn"
            onClick={onTutup}
            aria-label="Tutup keranjang"
          >
            ✕
          </button>
        </div>

        {pesanSukses && (
          <div className="notif-berhasil">
            <span>{pesanSukses}</span>
            <button type="button" onClick={onHapusPesan} aria-label="Tutup pesan">
              ✕
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <p className="kosong">
            Keranjang masih kosong. Klik tombol <strong>+ Keranjang</strong> pada akun yang tersedia.
          </p>
        ) : (
          <>
            <div className="list-keranjang">
              {items.map((item) => (
                <div key={item.id} className="item-keranjang">
                  <div className="item-keranjang-kiri">
                    <span
                      className="badge"
                      style={{ background: 'var(--aksen-muda)', color: 'var(--aksen-gelap)' }}
                    >
                      {item.game}
                    </span>
                    <h3>{item.judul}</h3>
                    <p className="meta">
                      Rank {item.rank} | Level {item.level}
                    </p>
                  </div>

                  <div className="item-keranjang-kanan">
                    <strong className="harga-kecil">
                      Rp {item.harga.toLocaleString('id-ID')}
                    </strong>
                    <button
                      type="button"
                      className="ikon-btn"
                      onClick={() => onHapusItem(item.id)}
                      title="Hapus dari keranjang"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="ringkasan-keranjang">
              <span>Total pembayaran</span>
              <strong>Rp {totalHarga.toLocaleString('id-ID')}</strong>
            </div>

            <div className="tombol" style={{ display: 'flex', gap: '0.6rem' }}>
              <button type="button" className="btn garis" onClick={onKosongkan}>
                Kosongkan
              </button>
              <button
                type="button"
                className="btn"
                style={{ flex: 1 }}
                onClick={onCheckout}
              >
                Checkout sekarang
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}