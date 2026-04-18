const PHRASES = [
  'Go',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'React',
  'Tauri',
  'REST APIs',
  'Linux',
  'Docker',
  'Prisma',
  'Express',
  'MySQL',
]

export function Marquee() {
  const items = [...PHRASES, ...PHRASES]
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {items.map((p, i) => (
          <span key={i} className="marquee__item">
            {i % 3 === 0 ? <em>{p}</em> : p}
          </span>
        ))}
      </div>
    </div>
  )
}
