import { skills } from '../data/resume'

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="shell">
        <header className="section__head">
          <div>
            <div className="section__index">§ 02 · Stack</div>
            <h2 className="section__title">
              The <em>tools</em> I reach for.
            </h2>
          </div>
          <div className="section__kicker">
            Languages · databases · systems · primitives
          </div>
        </header>
      </div>

      <div className="shell">
        <ul className="skills" aria-label="Skills">
          {skills.map((group, i) => (
            <li
              key={group.id}
              className="skill"
              data-idx={String(i + 1).padStart(2, '0')}
              data-cursor="hover"
            >
              <h3 className="skill__name">
                {group.name.includes(' ') ? (
                  <>
                    {group.name.split(' ').slice(0, -1).join(' ')}{' '}
                    <em>{group.name.split(' ').slice(-1)}</em>
                  </>
                ) : (
                  <em>{group.name}</em>
                )}
              </h3>
              <ul className="skill__keywords">
                {group.keywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
