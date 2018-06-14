import {Styles} from '.'

export default function dumpStyles(styles: Styles): string {
  const clauses = []
  for (const key of Object.keys(styles)) {
    clauses.push(`${kebab(key)}: ${styles[key]}`)
  }
  return clauses.join(';')
}

function kebab(string: string): string {
  return string
    .replace(/[^A-Z0-9]/gi, '-')
    .replace(/([a-z0-9])([A-Z])/g, (_, a, b) => `${a}-${b.toLowerCase()}`)
}