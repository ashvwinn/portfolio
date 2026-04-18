import { education } from '../data/resume'

export function EducationSection() {
  return (
    <section className="section" id="education">
      <div className="shell">
        <header className="section__head">
          <div>
            <div className="section__index">§ 04 · Record</div>
            <h2 className="section__title">
              A brief <em>timeline</em>.
            </h2>
          </div>
          <div className="section__kicker">
            Formal education · on-going &amp; prior
          </div>
        </header>

        <ol className="timeline">
          {education.map((e) => (
            <li key={e.id} className="edu" data-cursor="hover">
              <span className="edu__period">{e.period || '—'}</span>
              <div>
                <h3 className="edu__school">
                  {e.url ? (
                    <a href={e.url} target="_blank" rel="noopener noreferrer">
                      {splitTail(e.school)}
                    </a>
                  ) : (
                    splitTail(e.school)
                  )}
                </h3>
                <p className="edu__meta">
                  {[e.degree, e.area].filter(Boolean).join(' · ')}
                  {e.location ? ` — ${e.location}` : ''}
                </p>
              </div>
              {e.grade ? <span className="edu__grade">{e.grade}</span> : <span />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function splitTail(text: string) {
  const parts = text.split(' ')
  if (parts.length < 2) return <em>{text}</em>
  const head = parts.slice(0, -1).join(' ')
  const tail = parts[parts.length - 1]
  return (
    <>
      {head} <em>{tail}</em>
    </>
  )
}
