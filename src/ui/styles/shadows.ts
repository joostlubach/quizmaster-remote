import {Platform} from 'react-native'
import * as colors from './colors'

export type Shadow = {
  shadowOffset:  {width: number, height: number},
  shadowRadius:  number,
  shadowColor:   typeof colors.shadow,
  shadowOpacity: number,

  elevation?:         number
  borderBottomColor?: string
  borderBottomWidth?: number
}

export function depth(depth: number): Shadow {
  const shadow: Shadow = {
    shadowOffset:  {width: 0, height: 1 + 1.5 * (depth - 1)},
    shadowRadius:  1 + 2 * (depth - 1),
    shadowColor:   colors.shadow,
    shadowOpacity: 0.3
  }

  if (Platform.OS === 'android') {
    if (Platform.Version >= 21) {
      // Android: use elevation API. It's less specific, but that's their problem.
      shadow.elevation = Math.ceil(1 + 1.5 * (depth - 1))
    } else {
      // Old android: just show border
      shadow.borderBottomColor = colors.border.medium.string(),
      shadow.borderBottomWidth = 1
    }
  }

  return shadow
}

export const float      = depth(3)