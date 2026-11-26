interface SearchBarProps {
  value: string
  onChange: (nilai: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="cari">
      <span aria-hidden="true">🔍</span>
      <input
        type="search"
        value={value}
        placeholder="Cari judul atau rank..."
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
