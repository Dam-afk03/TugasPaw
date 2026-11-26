import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, awal: T) {
  const [nilai, setNilai] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : awal
    } catch {
      return awal
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(nilai))
    } catch {
    }
  }, [key, nilai])

  return [nilai, setNilai] as const
}
