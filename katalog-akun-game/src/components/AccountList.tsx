import type { Account } from '../types'
import AccountCard from './AccountCard'

interface AccountListProps {
  akun: Account[]
  adaFilter: boolean
  keranjangIds: number[]
  onTambahKeranjang: (item: Account) => void
  onToggleStatus: (id: number) => void
  onDelete: (id: number) => void
}

export default function AccountList({ 
  akun, 
  adaFilter,
  keranjangIds,
  onTambahKeranjang,
  onToggleStatus,
  onDelete 
}: AccountListProps) {
  return (
    <div className="daftar">
      {akun.length === 0 ? (
        <p className="kosong">
          {adaFilter ? 'Tidak ada akun yang cocok dengan pencarian atau filter.' : 'Belum ada akun. Tambahkan lewat formulir.'}
        </p>
      ) : (
        akun.map((a) => (
          <AccountCard 
            key={a.id}
            akun={a} 
            sudahDikeranjang={keranjangIds.includes(a.id)}
            onTambahkeranjang={() => onTambahKeranjang(a)}
            onToggleStatus={onToggleStatus} 
            onDelete={onDelete} 
          />
        ))
      )}
    </div>
  )
}