import { summary } from '../data/resume'

export function Summary() {
  return (
    <section className="section" id="about">
      <div className="shell">
        <header className="section__head">
          <div>
            <div className="section__index">§ 01 · Manifesto</div>
            <h2 className="section__title">
              On <em>backends</em>.
            </h2>
          </div>
          <div className="section__kicker">
            Quiet systems · clean architecture · honest code
          </div>
        </header>

        <div className="manifesto">
          <aside className="manifesto__aside">
            <span>— Approach</span>
            <span>— Tools: Go · Node · SQL</span>
            <span>— Practice since 2023</span>
          </aside>

          <p className="manifesto__text">
            <span>/* */ </span>
            Backend-focused developer with hands-on experience in{' '}
            <em>Go, Node.js, React</em>, and SQL/NoSQL databases. I build{' '}
            <em>maintainable APIs</em> and full-stack applications with
            emphasis on <em>clean architecture</em>, performance, and
            practical product development.
          </p>
        </div>

        <p style={{ display: 'none' }}>{summary}</p>
      </div>
    </section>
  )
}
