import { skills } from '../data/resume'

function splitLastWord(name: string) {
  const words = name.split(' ')
  if (words.length <= 1) return { head: '', tail: name }
  return {
    head: words.slice(0, -1).join(' '),
    tail: words[words.length - 1],
  }
}

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
        <div className="skills-table" aria-label="Skills by category">
          <div className="skills-table__head">
            <span>Idx</span>
            <span>Category</span>
            <span>Items</span>
            <span>Count</span>
          </div>

          {skills.map((group, i) => {
            const { head, tail } = splitLastWord(group.name)
            return (
              <div
                key={group.id}
                className="skills-row"
                data-cursor="hover"
              >
                <span className="skills-row__idx">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="skills-row__name">
                  {head && <>{head} </>}
                  <em>{tail}</em>
                </h3>
                <ul className="skills-row__items">
                  {group.keywords.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
                <span className="skills-row__count">
                  {String(group.keywords.length).padStart(2, '0')}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
