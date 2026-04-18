import { Hero3D } from '../three/Hero3D'
import { basics } from '../data/resume'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="blueprint" aria-hidden />
      <div className="tick-margin tick-margin--l" aria-hidden />
      <div className="tick-margin tick-margin--r" aria-hidden />

      <div className="shell hero__content">
        <div className="hero__meta">
          <div className="hero__meta-cell">
            <span className="label">Specimen · Nº 01</span>
            <span className="value">Backend Architect</span>
          </div>
          <div className="hero__meta-cell">
            <span className="label">Based in</span>
            <span className="value">{basics.location}</span>
          </div>
          <div className="hero__meta-cell">
            <span className="label">Status · Open to Work</span>
            <span className="value">
              Available <em style={{ color: 'var(--flare)' }}>Q2 · 2026</em>
            </span>
          </div>
        </div>

        <div className="hero__grid">
          <div className="hero__copy">
            <h1 className="hero__title">
              <span className="line">
                <span>
                  <span className="hero__title-index">01</span>Ashvin
                </span>
              </span>
              <span className="line">
                <span>
                  <em>Jangid</em>
                </span>
              </span>
              <span className="line">
                <span>— engineer.</span>
              </span>
            </h1>

            <div className="hero__stack">
              <p className="hero__kicker">
                Backend-focused full-stack developer building{' '}
                <em>maintainable APIs</em> and quietly elegant systems in{' '}
                <em>Go, Node.js, React</em>, and SQL/NoSQL databases.
              </p>
              <a href="#contact" className="hero__cta" data-cursor="hover">
                <span className="dot" />
                Let’s build something
              </a>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__canvas-frame">
              <Hero3D />
            </div>
            <div className="hero__visual-label">
              <span>[ 001 ]</span>
              <span>Obsidian / amber core</span>
              <span>R3F · three.js</span>
            </div>
          </div>
        </div>
      </div>

      <span className="scroll-hint">Scroll · 02</span>
    </section>
  )
}
