interface Size {
  width:  number,
  height: number
}

interface Bounds extends Size {
  top:  number
  left: number
}

interface Rect extends Size {
  x: number
  y: number
}

interface Coordinate {
  latitude:  number
  longitude: number
}