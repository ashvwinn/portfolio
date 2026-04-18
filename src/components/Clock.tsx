import { useEffect, useState } from 'react'

export function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  })

  return (
    <span className="nav__clock">
      <span>Jaipur ·</span>
      <span>{time} IST</span>
    </span>
  )
}
