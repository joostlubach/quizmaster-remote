import Color from 'color'

export const black      = new Color('black')
export const lightBlack = new Color('#2E3641')
export const green      = new Color('#34B778')
export const red        = new Color('#AE2013')
export const blue       = new Color('#54ACDD')
export const white      = new Color('white')

export const teams = [
  new Color('#FFA91B'),
  new Color('#7CD0FF'),
  new Color('#57FFAE'),
  new Color('#BA2AD8'),
  new Color('#84EDE7'),
  new Color('#FF609C'),
  new Color('#CD0019'),
  new Color('#FFF46A'),
  new Color('#B8E986'),
  new Color('#4F6AFF')
]

export const shadow = black

export const bg = {
  normal: lightBlack
}

export const fg = {
  normal: white,
  dim:    white.alpha(0.3)
}