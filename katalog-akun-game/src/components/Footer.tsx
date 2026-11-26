interface FooterProps {
  nama: string
  nim: string
}

export default function Footer({ nama, nim }: FooterProps) {
  return (
    <footer className="footer">
      <div className="wadah">
        <p>&copy; 2026 {nama} (NIM {nim}).</p>
      </div>
    </footer>
  )
}
