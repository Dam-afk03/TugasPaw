import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/badge'
import { Button } from '../components/Button'
import { InputField } from '../components/inputField'
import { StateMessage } from '../components/stateMessage'
import { useStore } from '../context/storeContext'

interface FormValues {
  namaParfum: string
  merek: string
  kategori: string
  budgetMaksimal: string
  catatan: string
}

interface FormErrors {
  namaParfum?: string
  merek?: string
  budgetMaksimal?: string
  catatan?: string
}

export function WishlistPage() {
  const { wishlist, toggleWishlist, notes, addNote, deleteNote } = useStore()

  // Form State (Controlled Components)
  const [form, setForm] = useState<FormValues>({
    namaParfum: '',
    merek: '',
    kategori: 'fragrances',
    budgetMaksimal: '',
    catatan: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [successMsg, setSuccessMsg] = useState('')

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {}

    if (!form.namaParfum.trim()) {
      nextErrors.namaParfum = 'Nama parfum wajib diisi.'
    } else if (form.namaParfum.trim().length < 3) {
      nextErrors.namaParfum = 'Nama parfum minimal 3 karakter.'
    }

    if (!form.merek.trim()) {
      nextErrors.merek = 'Nama merek/brand wajib diisi.'
    }

    const budgetNum = Number(form.budgetMaksimal)
    if (!form.budgetMaksimal.trim()) {
      nextErrors.budgetMaksimal = 'Target budget wajib diisi.'
    } else if (Number.isNaN(budgetNum) || budgetNum <= 0) {
      nextErrors.budgetMaksimal = 'Budget harus berupa angka lebih dari 0.'
    }

    if (!form.catatan.trim()) {
      nextErrors.catatan = 'Catatan aroma atau ukuran wajib diisi.'
    } else if (form.catatan.trim().length < 10) {
      nextErrors.catatan = 'Catatan minimal 10 karakter agar jelas.'
    }

    return nextErrors
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSuccessMsg('')

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    addNote({
      namaParfum: form.namaParfum.trim(),
      merek: form.merek.trim(),
      kategori: form.kategori,
      budgetMaksimal: Number(form.budgetMaksimal),
      catatan: form.catatan.trim(),
    })

    setForm({
      namaParfum: '',
      merek: '',
      kategori: 'fragrances',
      budgetMaksimal: '',
      catatan: '',
    })
    setSuccessMsg('Catatan request parfum berhasil ditambahkan!')
  }

  return (
    <div className="container section-block">
      <div className="page-header">
        <h1>Wishlist &amp; Catatan Request Parfum</h1>
        <p>Kelola produk favorit dari katalog atau tambahkan catatan parfum incaranmu.</p>
      </div>

      <div className="wishlist-layout">
        {/* Kolom Kiri: Formulir Tambah Catatan / Request Parfum */}
        <section className="form-card">
          <h2>Tambah Catatan / Request Parfum</h2>
          <p className="form-subtitle">
            Catat nama parfum, target harga ($), dan preferensi aroma yang ingin dicari.
          </p>

          {successMsg && <div className="alert-success">{successMsg}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <InputField
              id="namaParfum"
              label="Nama Parfum / Produk *"
              placeholder="Contoh: Bleu de Chanel Eau de Parfum"
              value={form.namaParfum}
              error={errors.namaParfum}
              onChange={(e) => setForm({ ...form, namaParfum: e.target.value })}
            />

            <InputField
              id="merek"
              label="Merek / Brand *"
              placeholder="Contoh: Chanel"
              value={form.merek}
              error={errors.merek}
              onChange={(e) => setForm({ ...form, merek: e.target.value })}
            />

            <div className="form-group">
              <label htmlFor="kategori" className="form-label">
                Kategori
              </label>
              <select
                id="kategori"
                className="form-select"
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
              >
                <option value="fragrances">Parfum (Fragrances)</option>
                <option value="skin-care">Skincare</option>
                <option value="beauty">Kosmetik (Beauty)</option>
              </select>
            </div>

            <InputField
              id="budgetMaksimal"
              label="Target Budget Maksimal (USD) *"
              type="number"
              placeholder="Contoh: 150"
              value={form.budgetMaksimal}
              error={errors.budgetMaksimal}
              onChange={(e) => setForm({ ...form, budgetMaksimal: e.target.value })}
            />

            <div className="form-group">
              <label htmlFor="catatan" className="form-label">
                Catatan Aroma / Ukuran *
              </label>
              <textarea
                id="catatan"
                rows={3}
                className={`form-input ${errors.catatan ? 'input-error' : ''}`}
                placeholder="Tuliskan notes aroma (woody, fresh, floral) atau ukuran botol..."
                value={form.catatan}
                onChange={(e) => setForm({ ...form, catatan: e.target.value })}
              />
              {errors.catatan && <span className="error-text">{errors.catatan}</span>}
            </div>

            <Button type="submit" variant="primary" style={{ width: '100%' }}>
              + Simpan Catatan Parfum
            </Button>
          </form>
        </section>

        {/* Kolom Kanan: Daftar Catatan & Produk Wishlist */}
        <div className="saved-column">
          <section className="saved-block">
            <h2>Daftar Catatan Request ({notes.length})</h2>
            {notes.length === 0 ? (
              <StateMessage
                type="empty"
                title="Belum Ada Catatan"
                description="Gunakan formulir di samping untuk menambahkan daftar parfum incaranmu."
              />
            ) : (
              <div className="notes-list">
                {notes.map((item) => (
                  <div key={item.id} className="note-card">
                    <div className="note-top">
                      <div>
                        <Badge variant="gold">{item.kategori}</Badge>
                        <h3>{item.namaParfum}</h3>
                        <span className="note-meta">
                          Brand: <strong>{item.merek}</strong> • Budget:{' '}
                          <strong>${item.budgetMaksimal}</strong> • {item.tanggal}
                        </span>
                      </div>
                      <Button variant="danger" size="sm" onClick={() => deleteNote(item.id)}>
                        Hapus
                      </Button>
                    </div>
                    <p className="note-body">{item.catatan}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="saved-block">
            <h2>Produk Favorit dari Katalog ({wishlist.length})</h2>
            {wishlist.length === 0 ? (
              <StateMessage
                type="empty"
                title="Wishlist Katalog Kosong"
                description="Klik tombol 'Simpan' pada kartu produk di halaman Katalog untuk menyimpannya di sini."
              />
            ) : (
              <div className="wishlist-items">
                {wishlist.map((prod) => (
                  <div key={prod.id} className="wish-row">
                    <img src={prod.thumbnail} alt={prod.title} />
                    <div className="wish-info">
                      <Link to={`/katalog/${prod.id}`}>
                        <strong>{prod.title}</strong>
                      </Link>
                      <span>
                        {prod.brand || 'ScentVault'} • ${prod.price.toFixed(2)}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => toggleWishlist(prod)}>
                      Hapus
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}