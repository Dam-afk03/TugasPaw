# Katalog Parfum & Skincare

- Nama: Adam Halawi
- NIM: 1247050024
- Kelas: A
- Mata kuliah: Pengembangan Aplikasi Web, Pertemuan 8
- Website: https://adamh.my.id/katalog-parfum/dist/
- Repository: https://github.com/Dam-afk03/TugasPaw/tree/main/katalog-parfum

Katalog parfum dan perawatan kulit ini menampilkan produk DummyJSON dalam bahasa Indonesia. Pengguna bisa mencari dan menyaring produk berdasarkan kategori, mengurutkan hasil, membuka halaman detail, menyimpan produk ke wishlist, dan menulis catatan request parfum. Harga ditampilkan sebagai estimasi rupiah, bukan harga resmi ritel.

## Teknologi

- React dan TypeScript
- React Router (`HashRouter`)
- Vite
- CSS Custom Properties (Responsive Grid & Mobile Bottom Navigation)
- ESLint

## Fitur

- Beranda menampilkan pengantar etalase dan empat produk pilihan dari katalog parfum dan skincare.
- Katalog menyediakan pencarian real-time, filter kategori (`Parfum`, `Skincare`, `Kosmetik`), serta pengurutan berdasarkan harga terendah, harga tertinggi, rating tertinggi, dan nama A–Z.
- Katalog membagi hasil enam produk per halaman menggunakan komponen `Pagination`.
- Halaman detail menampilkan gambar utama, pilihan thumbnail galeri, merek, kategori, status stok, diskon, ulasan pembeli, estimasi harga rupiah, dan tombol simpan wishlist.
- Wishlist produk dan catatan request parfum tersimpan di `localStorage` dan dapat ditambah atau dihapus.
- Formulir catatan request menggunakan *controlled components* dengan validasi kolom wajib, batas minimal karakter, dan validasi nominal budget.
- Setiap halaman yang mengambil data API memiliki kondisi memuat (`loading`), pesan gagal dengan tombol muat ulang (`error`), dan keadaan kosong (`empty`).

## Routing

`HashRouter` di `src/App.tsx` membungkus seluruh aplikasi di dalam `StoreProvider`. Rute induk memakai komponen `MainLayout` dengan `<Outlet />`, sehingga navbar atas, bottom navigation mobile, dan footer tetap tampil di semua halaman.

| Rute | Halaman | Isi |
| --- | --- | --- |
| `/` | `HomePage` | Etalase utama dan empat produk pilihan |
| `/katalog` | `CatalogPage` | Pencarian, filter kategori, urutan, dan pagination |
| `/katalog/:id` | `DetailPage` | Detail satu produk berdasarkan parameter `id` pada URL |
| `/wishlist` | `WishlistPage` | Formulir catatan request parfum dan daftar produk tersimpan |
| `*` | `NotFoundPage` | Halaman fallback saat rute tidak dikenal |

`CatalogPage` memakai `useSearchParams` untuk menyimpan parameter pencarian (`q`), kategori (`category`), urutan (`sort`), dan nomor halaman (`page`) di URL. Penggunaan `HashRouter` dan `base: './'` di `vite.config.ts` membuat aplikasi tetap berjalan normal saat dimuat ulang dari folder statis GitHub Pages.

## State management

Wishlist produk dan daftar catatan merupakan data global. `StoreProvider` di `src/context/StoreContext.tsx` menyimpan `wishlist` dan `notes` lewat `useLocalStorage` dengan kunci `parfumery_wishlist` dan `parfumery_notes`. Komponen yang membutuhkan data tersebut memanggil `useStore()` untuk memakai `toggleWishlist`, `isWishlisted`, `addNote`, dan `deleteNote`.

State lokal tetap berada di komponen masing-masing. `CatalogPage` menyimpan nilai input pencarian sementara (`searchInput`). `DetailPage` menyimpan URL gambar galeri yang sedang dipilih (`selectedImg`). `WishlistPage` menyimpan nilai input formulir (`form`), pesan validasi (`errors`), dan notifikasi berhasil (`successMsg`).

Filter katalog disimpan langsung sebagai URL state. `useSearchParams` mengelola parameter `q`, `category`, `sort`, dan `page` di alamat URL, sementara `useDebounce` menunda pembaruan kata kunci pencarian selama 350 ms agar penyaringan tidak berjalan pada setiap ketikan tombol.

## API

`src/services/productApi.ts` memakai `fetch` dengan endpoint dasar `https://dummyjson.com/products`.

`fetchAllStoreProducts()` mengambil data produk dari tiga kategori, yaitu `fragrances`, `skin-care`, dan `beauty` secara paralel menggunakan `Promise.all`, lalu menggabungkannya menjadi satu daftar produk. `fetchProductById(id)` mengambil detail satu produk berdasarkan ID.

`formatRupiah()` mengalikan harga USD dari API dengan kurs estimasi `15500` dan membulatkannya ke ribuan terdekat, lalu memformatnya ke mata uang `IDR` (`Rp`).

## Custom hooks

| Hook | Fungsi |
| --- | --- |
| `useDebounce` | Menunda pembaruan nilai input pencarian selama jeda tertentu (350 ms) |
| `useLocalStorage` | Membaca dan menyimpan state ke `localStorage` browser secara otomatis |

## Struktur folder

```text
katalog-parfum/
├── docs/
│   ├── home.png
│   ├── detail.png
│   └── interaktif.png
├── public/
├── src/
│   ├── components/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── InputField.tsx
│   │   ├── MainLayout.tsx
│   │   ├── Pagination.tsx
│   │   ├── ProductCard.tsx
│   │   └── StateMessage.tsx
│   ├── context/
│   │   └── StoreContext.tsx
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   ├── pages/
│   │   ├── CatalogPage.tsx
│   │   ├── DetailPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NotFoundPage.tsx
│   │   └── WishlistPage.tsx
│   ├── services/
│   │   └── productApi.ts
│   ├── types/
│   │   └── product.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts

## Tampilan Aplikasi
**Bedanda**
![Beranda](..assets/Beranda.png)

**Detail Produk**
![Detail produk](..assets/detail.png)

**Fitur Interaktif**
![Fitur interaktif](..assets/interaktif.png)

## Menjalankan

