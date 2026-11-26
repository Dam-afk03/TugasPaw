
export type Game = 'Free Fire' | 'Mobile Legends' | 'PUBG Mobile' | 'eFootball'
export type Status = 'Tersedia' | 'Terjual'
export type FilterGame = 'Semua' | Game
export type Urutan = 'baru' | 'murah' | 'mahal'

export const GAMES: Game[] = ['Free Fire', 'Mobile Legends', 'PUBG Mobile', 'eFootball']


export interface Account {
  id: number
  judul: string
  game: Game
  rank: string
  level: number
  harga: number
  status: Status
  deskripsi: string
}

export type NewAccount = Omit<Account, 'id' | 'status'>
