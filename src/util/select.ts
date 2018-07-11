function select<V>(key: string | null, map: {[key: string]: V, default: V}): V
function select<V>(key: string | null, map: {[key: string]: V}): V | null
function select(key: string | null, map: any) {
  if (key && map.hasOwnProperty(key)) {
    return map[key]
  } else if (map.hasOwnProperty('default')) {
    return map.default
  } else {
    return null
  }
}

export default select