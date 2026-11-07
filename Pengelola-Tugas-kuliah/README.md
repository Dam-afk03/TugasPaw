# Daftar Tugas Kuliah

Aplikasi web sederhana untuk mengelola daftar tugas kuliah, dibuat menggunakan **TypeScript** dan **Vite** sebagai tugas mata kuliah.

- **Nama:** Adam Halawi
- **NIM:** 1247050024
- **Program Studi:** Informatika, UIN Sunan Gunung Djati Bandung

## Tautan

| Keterangan | Link |
|---|---|
| Aplikasi online | https://dam-afk03.github.io/todo-kuliah/ |
| Website pribadi | (isi dengan link website pribadi) |
| Repository | https://github.com/Dam-afk03/todo-kuliah |

## Fitur

- Menampilkan daftar tugas kuliah (diurutkan otomatis berdasarkan deadline)
- Menambah tugas baru (judul, mata kuliah, deadline, prioritas)
- Mengedit dan menghapus tugas (dengan konfirmasi hapus)
- Status tugas: **Belum Selesai** / **Selesai**
- Statistik, progress bar, filter status, dan pencarian
- Label deadline otomatis (Hari ini, Terlambat, dan sebagainya)
- Tampilan rapi dan responsif (desktop dan HP)
- Data tersimpan di `localStorage` browser

## Teknologi

- TypeScript
- Vite
- npm
- Git dan GitHub
- GitHub Pages (hosting)

## Struktur Proyek

```
todo-kuliah/
├── public/
├── src/
│   ├── main.ts          # logika aplikasi dan tampilan
│   ├── storage.ts       # simpan/muat data (generics)
│   ├── types.ts         # interface, type alias, union type
│   ├── style.css        # styling
│   └── vite-env.d.ts    # tipe untuk environment variables
├── .env.example         # contoh konfigurasi
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Cara Menjalankan

Pastikan **Node.js** dan **Git** sudah terinstal.

```bash
git clone https://github.com/Dam-afk03/todo-kuliah.git
cd todo-kuliah
npm install
copy .env.example .env
npm run dev
```

Buka alamat yang muncul di terminal (biasanya `http://localhost:5173`).

> Di macOS/Linux, ganti `copy` dengan `cp`.

## Perintah npm

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server development |
| `npm run build` | Memeriksa tipe TypeScript dan membuat build ke folder `dist` |
| `npm run preview` | Melihat hasil build secara lokal |
| `npm run deploy` | Build lalu publikasi ke GitHub Pages |

## Environment Variables

Konfigurasi disimpan di file `.env` (tidak diunggah ke GitHub). Salin dari `.env.example`:

| Variabel | Keterangan | Contoh |
|---|---|---|
| `VITE_APP_NAME` | Nama aplikasi | `Pengelola Tugas Kuliah` |
| `VITE_APP_VERSION` | Versi aplikasi | `1.0.0` |

Variabel berawalan `VITE_` akan terlihat di browser, sehingga hanya dipakai untuk data non-rahasia. Password atau API key tidak boleh disimpan di sini.

## Penggunaan TypeScript

| Konsep | Contoh di kode |
|---|---|
| Primitive types | `string`, `number`, `boolean` pada `Tugas`, `namaApp`, `sedangEdit` |
| Array | `Tugas[]` |
| Interface | `interface Tugas` |
| Type alias dan union type | `Status`, `Prioritas`, `Filter` |
| Generics | `simpan<T>()`, `muat<T>()` |

## Alur Git yang Dilakukan

- Membuat repository GitHub dan file `.gitignore`
- Lebih dari 5 commit dengan pesan yang jelas
- Branch: `main`, `feature/crud-tugas`, `feature/styling`, `feature/readme`, dan lainnya
- Merge branch fitur ke `main`
- Menyelesaikan merge conflict
- Push dan pull ke GitHub
- Membuat Pull Request

## Peran Tools Build

- **Compiler (`tsc`)**: memeriksa tipe TypeScript sebelum build.
- **Transpiler (esbuild)**: mengubah TypeScript menjadi JavaScript yang bisa dijalankan browser.
- **Bundler (Rollup)**: menggabungkan seluruh modul menjadi file yang dioptimalkan di folder `dist`.
- **Vite**: server development yang cepat dan pengelola proses build.

## Deploy ke GitHub Pages

```bash
npm run deploy
```

Lalu aktifkan di **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**.