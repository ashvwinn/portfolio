import { Clock } from './Clock'
import { ThemeToggle } from './ThemeToggle'

export function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav__brand">
        Ashvin Jangid
      </a>
      <nav className="nav__links" aria-label="Section navigation">
        <a href="#work">Work</a>
        <a href="#skills">Stack</a>
        <a href="#education">Record</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="nav__end">
        <ThemeToggle />
        <Clock />
      </div>
    </header>
  )
}
