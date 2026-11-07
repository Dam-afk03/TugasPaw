import "./style.css";
import type { Tugas, Prioritas, Filter } from "./types";
import { muatTugas, simpan } from "./storage";

const el = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;

// Primitive types + env
const namaApp: string = import.meta.env.VITE_APP_NAME;
const versiApp: string = import.meta.env.VITE_APP_VERSION;
el("judul-app").textContent = namaApp;
el("versi-app").textContent = `v${versiApp}`;
document.title = namaApp;

// State (array, union type, number | null, boolean)
let tugas: Tugas[] = muatTugas();
let filterAktif: Filter = "semua";
let kataKunci = "";
let idEdit: number | null = null;

const form = el<HTMLFormElement>("form-tugas");
const daftar = el<HTMLUListElement>("daftar");

// Cegah HTML dari input pengguna
function esc(teks: string): string {
  const d = document.createElement("div");
  d.textContent = teks;
  return d.innerHTML;
}

function tglIndo(s: string): string {
  return new Date(s + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function infoDeadline(t: Tugas): { teks: string; kelas: string } {
  if (t.status === "Selesai") return { teks: tglIndo(t.deadline), kelas: "" };
  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);
  const dl = new Date(t.deadline + "T00:00:00");
  const selisih = Math.round((dl.getTime() - hariIni.getTime()) / 86400000);
  if (selisih < 0) return { teks: `Terlambat ${-selisih} hari`, kelas: "telat" };
  if (selisih === 0) return { teks: "Hari ini", kelas: "segera" };
  if (selisih <= 2) return { teks: `${selisih} hari lagi`, kelas: "segera" };
  return { teks: tglIndo(t.deadline), kelas: "" };
}

function kartu(t: Tugas): string {
  const d = infoDeadline(t);
  const selesai: boolean = t.status === "Selesai";
  return `
    <li class="item ${selesai ? "selesai" : ""} p-${t.prioritas.toLowerCase()}">
      <button class="cek" data-aksi="toggle" data-id="${t.id}" aria-label="Ubah status">${selesai ? "✓" : ""}</button>
      <div class="isi">
        <strong>${esc(t.judul)}</strong>
        <div class="meta">
          <span class="chip">📚 ${esc(t.matkul)}</span>
          <span class="chip prioritas">${t.prioritas}</span>
          <span class="chip tgl ${d.kelas}">📅 ${d.teks}</span>
        </div>
        <span class="badge ${selesai ? "ok" : "pending"}">${t.status}</span>
      </div>
      <div class="aksi">
        <button class="ikon" data-aksi="edit" data-id="${t.id}" aria-label="Edit">✏️</button>
        <button class="ikon bahaya" data-aksi="hapus" data-id="${t.id}" aria-label="Hapus">🗑</button>
      </div>
    </li>`;
}

function render(): void {
  const total : number = tugas.length;
  const selesai = tugas.filter((t) => t.status === "Selesai").length;
  const persen : number = total ? Math.round((selesai / total) * 100) : 0;

  el("stat-total").textContent = String(total);
  el("stat-belum").textContent = String(total - selesai);
  el("stat-selesai").textContent = String(selesai);
  el("progress-bar").style.width = `${persen}%`;
  el("progress-teks").textContent = `${persen}% tugas selesai`;

  const tampil = tugas
    .filter((t) => filterAktif === "semua" || t.status === filterAktif)
    .filter((t) => `${t.judul} ${t.matkul}`.toLowerCase().includes(kataKunci))
    .sort(
      (a, b) =>
        Number(a.status === "Selesai") - Number(b.status === "Selesai") ||
        a.deadline.localeCompare(b.deadline)
    );

  daftar.innerHTML = tampil.length
    ? tampil.map(kartu).join("")
    : `<li class="kosong">📭<p>Belum ada tugas di sini.</p></li>`;
}

function resetForm(): void {
  form.reset();
  idEdit = null;
  el("judul-form").textContent = "Tambah Tugas";
  el("btn-simpan").textContent = "Tambah";
  el("btn-batal").hidden = true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    judul: el<HTMLInputElement>("judul").value.trim(),
    matkul: el<HTMLInputElement>("matkul").value.trim(),
    deadline: el<HTMLInputElement>("deadline").value,
    prioritas: el<HTMLSelectElement>("prioritas").value as Prioritas,
  };
  if (idEdit !== null) {
    tugas = tugas.map((t) => (t.id === idEdit ? { ...t, ...data } : t));
  } else {
    tugas.push({ id: Date.now(), status: "Belum Selesai", ...data });
  }
  simpan<Tugas>(tugas);   // generics
  resetForm();
  render();
});

el("btn-batal").addEventListener("click", resetForm);

// Modal konfirmasi hapus
let idHapus: number | null = null;
const modal = el("modal-hapus");

function bukaModal(t: Tugas): void {
  idHapus = t.id;
  el("modal-teks").textContent = `Tugas "${t.judul}" akan dihapus permanen.`;
  modal.hidden = false;
}

function tutupModal(): void {
  idHapus = null;
  modal.hidden = true;
}

el("modal-batal").addEventListener("click", tutupModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) tutupModal();   // klik area gelap = batal
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") tutupModal();
});

el("modal-ya").addEventListener("click", () => {
  if (idHapus === null) return;
  tugas = tugas.filter((x) => x.id !== idHapus);
  if (idEdit === idHapus) resetForm();
  simpan<Tugas>(tugas);
  tutupModal();
  render();
});

daftar.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("button");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const t = tugas.find((x) => x.id === id);
  if (!t) return;

  if (btn.dataset.aksi === "toggle") {
    t.status = t.status === "Selesai" ? "Belum Selesai" : "Selesai";
  } else if (btn.dataset.aksi === "hapus") {
    bukaModal(t);
    return;
  } else if (btn.dataset.aksi === "edit") {
    idEdit = t.id;
    el<HTMLInputElement>("judul").value = t.judul;
    el<HTMLInputElement>("matkul").value = t.matkul;
    el<HTMLInputElement>("deadline").value = t.deadline;
    el<HTMLSelectElement>("prioritas").value = t.prioritas;
    el("judul-form").textContent = "Edit Tugas";
    el("btn-simpan").textContent = "Simpan Perubahan";
    el("btn-batal").hidden = false;
    form.scrollIntoView({ behavior: "smooth" });
    return;
  }
  simpan<Tugas>(tugas);
  render();
});

el("tabs").addEventListener("click", (e) => {
  const tab = (e.target as HTMLElement).closest<HTMLButtonElement>(".tab");
  if (!tab) return;
  filterAktif = tab.dataset.filter as Filter;
  document.querySelectorAll(".tab").forEach((b) => b.classList.remove("aktif"));
  tab.classList.add("aktif");
  render();
});

el<HTMLInputElement>("cari").addEventListener("input", (e) => {
  kataKunci = (e.target as HTMLInputElement).value.toLowerCase();
  render();
});

render();