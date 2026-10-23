import { Component, lazy, Suspense, useEffect, useRef, type ReactNode } from 'react'
import { about, awards, certifications, education, experience, profile, projects, skills } from './content'
import { useStationTracking } from './scroll'

const Scene = lazy(() => import('./components/Scene'))

const SECTIONS = ['home', 'about', 'experience', 'work', 'skills', 'contact']
const NAV = SECTIONS.slice(1)

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const progress = useRef<HTMLDivElement>(null)
  useStationTracking(SECTIONS, progress)
  useReveal()

  return (
    <>
      <div className="scene" aria-hidden="true">
        <SceneBoundary>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </SceneBoundary>
      </div>

      <div className="progress" ref={progress} />

      <header className="nav">
        <a href="#home" className="brand" aria-label="Back to top">
          NK
        </a>
        <nav>
          {NAV.map((id) => (
            <a key={id} href={`#${id}`}>
              {id}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="home" className="section hero">
          <div className="hero-inner reveal">
            <p className="eyebrow">
              {profile.role} · {profile.location}
            </p>
            <h1>
              Hi, I'm <span className="grad">{profile.name.split(' ')[0]}</span>.
            </h1>
            <p className="lead">{profile.tagline}</p>
            <div className="actions">
              <a className="btn primary" href="#work">
                See my work
              </a>
              <a className="btn" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
          <a href="#about" className="scroll-cue" aria-label="Scroll to About">
            <span />
          </a>
        </section>

        <section id="about" className="section">
          <div className="panel reveal">
            <p className="eyebrow">01 · About</p>
            <h2>Building systems that people rely on.</h2>
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="stats">
              {about.stats.map((s) => (
                <div key={s.label} className="stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="panel reveal">
            <p className="eyebrow">02 · Experience</p>
            <h2>Where I've worked.</h2>
            <ol className="timeline">
              {experience.map((job) => (
                <li key={job.role + job.org}>
                  <div className="job-head">
                    <h3>{job.role}</h3>
                    <span className="muted">{job.dates}</span>
                  </div>
                  <p className="org">
                    {job.org} · <span className="muted">{job.place}</span>
                  </p>
                  <ul>
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="work" className="section">
          <div className="panel reveal">
            <p className="eyebrow">03 · Selected work</p>
            <h2>Things I've built.</h2>
            <div className="cards">
              {projects.map((p) => (
                <article key={p.title} className="card">
                  <div className="card-top">
                    <span className="muted small">{p.context}</span>
                    <span className="metric">{p.metric}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <ul className="chips">
                    {p.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="panel reveal">
            <p className="eyebrow">04 · Skills & credentials</p>
            <h2>What I work with.</h2>
            <div className="skill-groups">
              {skills.map((g) => (
                <div key={g.group}>
                  <h3 className="small-head">{g.group}</h3>
                  <ul className="chips">
                    {g.items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="creds">
              <div>
                <h3 className="small-head">Certifications</h3>
                <ul className="plain">
                  {certifications.map((c) => (
                    <li key={c.code}>
                      <span className="code">{c.code}</span> {c.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="small-head">Honors</h3>
                <ul className="plain">
                  {awards.map((a) => (
                    <li key={a.name}>
                      <strong>{a.name}</strong>
                      <span className="muted"> · {a.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="small-head">Education</h3>
                <ul className="plain">
                  <li>
                    <strong>{education.degree}</strong>
                    <span className="muted">
                      {' '}
                      · {education.school}, {education.dates}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="panel reveal">
            <p className="eyebrow">05 · Contact</p>
            <h2>Let's build something together.</h2>
            <p>
              I'm open to conversations about Power Platform, Azure, and case management projects, as well as
              new opportunities. The fastest way to reach me is email.
            </p>
            <div className="actions">
              <a className="btn primary" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
            <div className="socials">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
          </div>
          <footer className="muted small">
            © {new Date().getFullYear()} {profile.name} · Built with React Three Fiber
          </footer>
        </section>
      </main>
    </>
  )
}
