import {ViewStyle} from 'react-native'
import {portrait as safeAreaPortrait} from 'safe-area'

export const safeArea = safeAreaPortrait

export const padding = {
  xxl: 64,
  xl:  40,
  l:   20,
  m:   16,
  s:   8,
  xs:  4
}

export const overlay: ViewStyle = {
  position: 'absolute',
  top:      0,
  left:     0,
  right:    0,
  bottom:   0
}

export const center: ViewStyle = {
  alignItems:     'center',
  justifyContent: 'center'
}