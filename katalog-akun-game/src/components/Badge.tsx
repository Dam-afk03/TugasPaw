interface BadgeProps {
  teks: string
  warna?: string
}

export default function Badge({ teks, warna = 'netral' }: BadgeProps) {
  return <span className={`badge badge-${warna}`}>{teks}</span>
}
