import { basics, profiles } from '../data/resume'

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact__eyebrow">§ 05 · Contact · Let’s talk</div>

        <h2 className="contact__headline">
          Got a <em>system</em> to build?<br />
          I listen well.
        </h2>

        <a
          className="contact__mail"
          href={`mailto:${basics.email}`}
          data-cursor="hover"
        >
          {basics.email}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M7 17L17 7M17 7H9M17 7V15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <div className="contact__grid">
          <div className="contact__cell">
            <label>Direct</label>
            <a href={`tel:${basics.phone.replace(/\s+/g, '')}`} data-cursor="hover">
              {basics.phone}
            </a>
          </div>
          <div className="contact__cell">
            <label>Location</label>
            <span>{basics.location}</span>
          </div>
          {profiles.map((p) => (
            <div key={p.network} className="contact__cell">
              <label>{p.network}</label>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
              >
                @{p.username} ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
