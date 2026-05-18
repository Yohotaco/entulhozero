import { useEffect, useState } from 'react'
import { useSettings } from '../settings/SettingsContext'

export function useDbTick() {
  const [tick, setTick] = useState(0)
  const { settings } = useSettings()

  useEffect(() => {
    const onChange = () => {
      if (settings.devShowDbEvents) {
        console.debug('[EntulhoZero] dbchange', new Date().toISOString())
      }
      setTick((t) => t + 1)
    }
    window.addEventListener('entulhozero:dbchange', onChange as EventListener)
    return () => window.removeEventListener('entulhozero:dbchange', onChange as EventListener)
  }, [settings.devShowDbEvents])

  return tick
}

