import resumeJson from '../../resume.json'

export type SkillGroup = {
  id: string
  name: string
  keywords: string[]
}

export type Project = {
  id: string
  name: string
  description: string
  links: { label: string; url: string }[]
  tags: string[]
}

export type Education = {
  id: string
  school: string
  degree: string
  area: string
  grade: string
  location: string
  period: string
  url: string
}

export type Profile = {
  network: string
  username: string
  url: string
}

/* ----------------------------- utilities ----------------------------- */

function stripHtml(input: string): string {
  return input
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<li>\s*<p>/gi, '• ')
    .replace(/<\/p>\s*<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function extractLinks(html: string): { label: string; url: string }[] {
  const links: { label: string; url: string }[] = []
  const re = /<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    links.push({ label: m[2].trim(), url: m[1].trim() })
  }
  return links
}

/* ------------------------------ derived ------------------------------ */

export const basics = {
  name: resumeJson.basics.name,
  headline: resumeJson.basics.headline,
  email: resumeJson.basics.email,
  phone: resumeJson.basics.phone,
  location: resumeJson.basics.location,
}

export const summary = stripHtml(resumeJson.summary.content)

export const profiles: Profile[] = resumeJson.sections.profiles.items.map(
  (p) => ({
    network: p.network,
    username: p.username,
    url: p.website.url,
  }),
)

export const skills: SkillGroup[] = resumeJson.sections.skills.items.map(
  (s) => ({
    id: s.id,
    name: s.name,
    keywords: s.keywords,
  }),
)

/** Best-effort heuristic that tags each project with technologies. */
function tagsFor(name: string, desc: string): string[] {
  const haystack = `${name} ${desc}`.toLowerCase()
  const tags: string[] = []
  const map: Array<[RegExp, string]> = [
    [/\b(go|golang)\b/, 'Go'],
    [/\bnode\.?js\b/, 'Node.js'],
    [/\breact\b/, 'React'],
    [/\btauri\b/, 'Tauri'],
    [/\bpostgres(ql)?\b/, 'PostgreSQL'],
    [/\bmongo(db)?\b/, 'MongoDB'],
    [/\bmysql\b/, 'MySQL'],
    [/\brest\b/, 'REST API'],
    [/\bauth(entication)?\b/, 'Auth'],
    [/\brate[- ]limit(ing)?\b/, 'Rate Limit'],
    [/\btemplate(s)?\b/, 'Templates'],
    [/\bmiddleware\b/, 'Middleware'],
    [/\bdesktop\b/, 'Desktop'],
    [/\bsession(s)?\b/, 'Sessions'],
    [/\brouting\b/, 'Routing'],
    [/\bpagination\b/, 'Pagination'],
    [/\bhook(s|-based)\b/, 'Hooks'],
    [/\btypescript\b/, 'TypeScript'],
  ]
  for (const [re, tag] of map) {
    if (re.test(haystack) && !tags.includes(tag)) tags.push(tag)
  }
  return tags.slice(0, 6)
}

export const projects: Project[] = resumeJson.sections.projects.items.map(
  (p) => {
    const desc = stripHtml(p.description)
    const links = extractLinks(p.description)
    if (p.website.url) {
      links.unshift({
        label: p.website.label || 'Repository',
        url: p.website.url,
      })
    }
    const dedupedLinks = Array.from(
      new Map(links.map((l) => [l.url, l])).values(),
    )
    return {
      id: p.id,
      name: p.name,
      description: desc,
      links: dedupedLinks,
      tags: tagsFor(p.name, desc),
    }
  },
)

export const education: Education[] = resumeJson.sections.education.items.map(
  (e) => ({
    id: e.id,
    school: e.school,
    degree: e.degree,
    area: e.area,
    grade: e.grade,
    location: e.location,
    period: e.period,
    url: e.website.url,
  }),
)

export const allStack = Array.from(
  new Set(skills.flatMap((s) => s.keywords)),
)
