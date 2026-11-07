import type { Tugas } from "./types";

const KEY = "daftar-tugas";

export function simpan<T>(data: T[]): void {                  // generics
  localStorage.setItem(KEY, JSON.stringify(data));
}
export function muat<T>(): T[] {
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as T[]) : [];
}
export const muatTugas = (): Tugas[] => muat<Tugas>();