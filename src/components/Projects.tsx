import { projects } from '../data/resume'
import { ProjectShape } from '../three/ProjectShape'

const SHAPES = ['knot', 'octa', 'torus', 'dodeca', 'tet', 'sphere', 'box'] as const

function renderName(name: string, i: number) {
  const words = name.split(' ')
  if (words.length > 1) {
    const head = words.slice(0, -1).join(' ')
    const tail = words[words.length - 1]
    return i % 2 === 0 ? (
      <>
        {head} <em>{tail}</em>
      </>
    ) : (
      <>
        <em>{head}</em> {tail}
      </>
    )
  }
  // single word — italicize the whole thing, alternating color
  return <em>{name}</em>
}

export function Projects() {
  return (
    <section className="section" id="work">
      <div className="shell">
        <header className="section__head">
          <div>
            <div className="section__index">§ 03 · Work</div>
            <h2 className="section__title">
              Selected <em>projects</em>.
            </h2>
          </div>
          <div className="section__kicker">
            {projects.length} artefacts · shipped &amp; open-source
          </div>
        </header>
      </div>

      <div className="shell">
        <div className="projects">
          {projects.map((p, i) => {
            const shape = SHAPES[i % SHAPES.length]
            return (
              <article key={p.id} className="project" data-cursor="hover">
                <div className="project__index">
                  <span>Nº {String(i + 1).padStart(2, '0')}</span>
                  <span>·</span>
                  <span>{new Date().getFullYear() - (i % 2)}</span>
                </div>

                <h3 className="project__name">{renderName(p.name, i)}</h3>

                <div className="project__shape" aria-hidden>
                  <ProjectShape
                    kind={shape}
                    wireframe={i % 3 === 1}
                  />
                </div>

                <p className="project__desc">{p.description}</p>

                {p.tags.length > 0 && (
                  <ul className="project__tags">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}

                {p.links.length > 0 && (
                  <div className="project__links">
                    {p.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                      >
                        {l.label || 'View'}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
