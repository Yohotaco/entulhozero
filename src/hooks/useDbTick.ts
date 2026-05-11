import { useEffect, useState } from 'react'

export function useDbTick() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const onChange = () => setTick((t) => t + 1)
    window.addEventListener('entulhozero:dbchange', onChange as EventListener)
    return () => window.removeEventListener('entulhozero:dbchange', onChange as EventListener)
  }, [])

  return tick
}

