import { Button } from './Button'

interface StateMessageProps {
  type: 'loading' | 'error' | 'empty'
  title: string
  description: string
  onRetry?: () => void
}

export function StateMessage({ type, title, description, onRetry }: StateMessageProps) {
  return (
    <div className={`state-box state-${type}`}>
      {type === 'loading' && <div className="spinner" aria-hidden="true" />}
      <h3>{title}</h3>
      <p>{description}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Muat Ulang Data
        </Button>
      )}
    </div>
  )
}