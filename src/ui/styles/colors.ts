import Color from 'color'

export const lightBlack = new Color('#2E3641')
export const green = new Color('#34B778')
export const blue = new Color('#54ACDD')
export const white = new Color('white')

export const bg = {
  normal: lightBlack
}

export const fg = {
  normal: white,
  dim:    white.alpha(0.6)
}