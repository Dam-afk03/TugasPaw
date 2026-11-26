# GameVault — Katalog Akun Game

- **Nama:** Adam Halawi
- **NIM:** 1247050024
- **Mata Kuliah:** Pengembangan Aplikasi Web, Pertemuan 7
- **Website:** https://www.adamh.my.id/
- **Repository:** https://github.com/Dam-afk03/TugasPaw

Aplikasi web katalog dan jual-beli akun game (**Free Fire**, **Mobile Legends**, **PUBG Mobile**, dan **eFootball**). Fitur utamanya meliputi pencarian akun, filter kategori game, pengurutan harga, tambah akun baru, ubah status ketersediaan, hapus akun, keranjang belanja, dan checkout otomatis. Nama dan NIM tampil permanen pada bagian header navigasi.

## Teknologi
- React 19 dan TypeScript
- Vite
- CSS3 Kustom (Responsive CSS Grid & Flexbox)

---

## 1. Komponen React

| Komponen | Fungsi |
| :--- | :--- |
| **`Header` / `Navbar`** | Navbar responsif berisi brand **GameVault**, tombol navigasi (Beranda, Katalog, Jual Akun, Keranjang dengan badge jumlah item), serta identitas Nama dan NIM. |
| **`Hero`** | Bagian pembuka halaman yang menampilkan ringkasan statistik jumlah total akun dan akun yang masih tersedia. |
| **`SearchBar`** | Input pencarian akun secara *real-time* berdasarkan judul atau rank akun. |
| **`GameFilter`** | Tombol *chip* filter kategori (`Semua`, `Free Fire`, `Mobile Legends`, `PUBG Mobile`, dan `eFootball`) beserta jumlah akun di tiap kategori. |
| **`AccountList`** | Menampilkan daftar kartu akun dalam tata letak grid responsif atau pesan khusus saat hasil pencarian/filter kosong. |
| **`AccountCard`** | Komponen kartu *reusable* untuk satu akun berisi game, status, rank, level, harga, detail deskripsi, ubah status, hapus, dan tombol `+ Keranjang`. |
| **`Badge`** | Komponen label kecil *reusable* untuk menampilkan kategori game dan status ketersediaan (`Tersedia` / `Terjual`). |
| **`AccountForm`** | Modal formulir tambah/jual akun baru. |
| **`CartModal`** | Modal keranjang belanja berisi daftar akun terpilih, total pembayaran, tombol kosongkan keranjang, dan checkout. |
| **`Footer`** | Bagian penutup halaman yang menampilkan informasi pembuat aplikasi beserta NIM. |

`App.tsx` berperan sebagai komponen *root* yang merangkai seluruh komponen di atas serta mengelola notifikasi *toast* saat akun berhasil dimasukkan ke keranjang.

---

## 2. Props
- `App` mengirim `akun`, `adaFilter`, `keranjangIds`, `onTambahKeranjang`, `onToggleStatus`, dan `onDelete` ke `AccountList`, lalu diteruskan ke setiap `AccountCard`. Status apakah akun sudah masuk keranjang dikirim melalui prop `sudahDikeranjang`.
- `App` mengirim `aktif`, `jumlah`, dan `onChange` ke `GameFilter`. `SearchBar` menerima `value` dan `onChange`.
- `App` mengirim `items`, `pesanSukses`, `onHapusPesan`, `onHapusItem`, `onKosongkan`, `onCheckout`, dan `onTutup` ke `CartModal`.
- `Navbar` menerima `nama`, `nim`, `jumlahKeranjang`, `modalAktif`, `onBukaForm`, dan `onBukaKeranjang`.
- `Badge` menerima `teks` dan `warna` sehingga dapat digunakan ulang untuk kategori game maupun status akun.
- Seluruh *props* didefinisikan menggunakan `interface` TypeScript.

---

## 3. State dengan `useState` & Custom Hook
- **Di `App.tsx`:** `akun` (menggunakan custom hook `useLocalStorage` berbasis `useState`), `keranjangIds`, `kata`, `game`, `urut`, `bukaForm`, `bukaKeranjang`, `toastTeks`, dan `pesanCheckout`.
- **Di `AccountCard.tsx`:** *Local state* `terbuka` untuk membuka dan menutup detail deskripsi akun.
- **Di `AccountForm.tsx`:** *Local state* `f` untuk menampung nilai seluruh *field* input formulir.
- **Di `Navbar.tsx`:** *Local state* `aktif` untuk melacak posisi section pada navigasi (*scroll spy*).
- Data utama disimpan di komponen induk (`App`), sedangkan komponen anak menerima data melalui *props* dan memicu perubahan lewat *callback* (**lifting state up**).
- Keranjang hanya menyimpan array ID (`keranjangIds: number[]`), sementara rincian akun diambil langsung dari state `akun` agar tidak terjadi duplikasi data.

---

## 4. Event Handling
- **`onClick`:** Digunakan pada tombol `+ Keranjang`, buka/tutup modal keranjang dan form, hapus item keranjang, kosongkan keranjang, checkout pesanan, ubah status `Tersedia`/`Terjual`, hapus akun, buka/tutup detail akun, serta pemilihan filter kategori.
- **`onChange`:** Digunakan pada kolom pencarian (`SearchBar`), pilihan pengurutan harga, dan seluruh input formulir (`AccountForm`) sebagai **controlled component**.
- **`onSubmit`:** Digunakan pada formulir tambah akun (`AccountForm`) dengan `e.preventDefault()` untuk mencegah *reload* halaman dan menambahkan data baru ke state utama.

---

## 5. Conditional Rendering
- Modal keranjang (`CartModal`) hanya dirender saat `bukaKeranjang` bernilai `true`, dan menampilkan pesan khusus apabila keranjang masih kosong.
- Modal formulir (`AccountForm`) hanya dirender saat `bukaForm` bernilai `true`.
- Deskripsi detail akun di dalam `AccountCard` muncul atau tersembunyi sesuai nilai state `terbuka`.
- Tombol `+ Keranjang` otomatis nonaktif dan berubah teksnya menjadi `Di Keranjang` atau `Terjual` berdasarkan status stok akun.
- Pesan *"Tidak ada akun yang cocok dengan pencarian atau filter"* tampil bersyarat saat hasil filter kosong, serta notifikasi *toast* dan pesan sukses checkout tampil sesuai kondisi transaksi.

---

## 6. List Rendering
- `akun.map()` dipakai di `AccountList` untuk merender daftar `AccountCard`.
- `items.map()` dipakai di `CartModal` untuk merender daftar akun di dalam keranjang.
- `LIST_FILTER.map()` dan `GAMES.map()` dipakai pada `GameFilter` serta `AccountForm`.
- Seluruh elemen daftar menggunakan `key` unik berupa `id` atau nama kategori.

---

## 7. Fitur Interaktif
- Mencari akun berdasarkan judul atau rank secara *real-time*.
- Memfilter akun berdasarkan 4 kategori game beserta jumlah akun di masing-masing kategori.
- Mengurutkan daftar akun berdasarkan terbaru, harga termurah, dan harga termahal.
- Menambahkan akun ke keranjang dengan notifikasi *toast* otomatis selama 3,5 detik.
- Menghapus item tertentu di keranjang, mengosongkan keranjang, dan melakukan *checkout* yang otomatis mengubah status akun menjadi `Terjual`.
- Menambah akun baru melalui modal formulir dan menyimpannya secara permanen ke `localStorage`.
- Mengubah status ketersediaan akun (`Tersedia` / `Terjual`), menghapus akun, serta menampilkan/menyembunyikan detail deskripsi.

---

## Struktur `src/`
```text
src/
├── components/
│   ├── AccountCard.tsx
│   ├── AccountForm.tsx
│   ├── AccountList.tsx
│   ├── Badge.tsx
│   ├── CartModal.tsx
│   ├── Footer.tsx
│   ├── GameFilter.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   └── SearchBar.tsx
├── data/
│   └── accounts.ts
├── hooks/
│   └── useLocalStorage.ts
├── App.tsx
├── index.css
├── main.tsx
└── types.ts