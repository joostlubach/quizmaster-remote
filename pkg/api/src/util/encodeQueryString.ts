import {StringConvertible} from '..'

export default function encodeQueryString(
  query: {[key: string]: StringConvertible | null | undefined},
  includeNulls: boolean = true
): string {
  const pairs: string[] = []

  for (const key in query) {
    if (query[key] === undefined) { continue }
    if (!includeNulls && query[key] == null) { continue }

    const encodedKey = encodeURIComponent(key)
    const encodedValue = query[key] == null ? '' : encodeURIComponent(valueToString(query[key]!))
    pairs.push(`${encodedKey}=${encodedValue}`)
  }

  return pairs.join('&')
}

function valueToString(value: StringConvertible): string {
  if (value == null) {
    return ''
  } else if (typeof value === 'boolean') {
    return value ? '1' : '0'
  } else {
    return value.toString()
  }
}