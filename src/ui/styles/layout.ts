import {ViewStyle, Dimensions} from 'react-native'
import {portrait as safeAreaPortrait} from 'safe-area'

export const safeArea = safeAreaPortrait
export const window = Dimensions.get('window')

export const padding = {
  xxl: 32,
  xl:  20,
  l:   16,
  m:   10,
  s:   6,
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