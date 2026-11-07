export type Status = "Belum Selesai" | "Selesai";            // type alias + union
export type Prioritas = "Rendah" | "Sedang" | "Tinggi";
export type Filter = "semua" | Status;   // union type untuk filter daftar

export interface Tugas {                                      // interface
  id: number;                                                 // number
  judul: string;                                              // string
  matkul: string;
  deadline: string;
  prioritas: Prioritas;
  status: Status;
}