interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'rose' | 'neutral' | 'success'
}

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return <span className={`badge badge-${variant}`}>{children}</span>
}