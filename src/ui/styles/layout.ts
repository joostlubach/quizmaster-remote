import {Platform, ViewStyle, Dimensions} from 'react-native'
import {portrait as safeAreaPortrait} from 'safe-area'

export const window = Dimensions.get('window')
export const safeArea = safeAreaPortrait
export const headerHeight = safeArea.top + (Platform.OS === 'ios' ? 44 : 52)
export const keyboardHeight = Platform.OS === 'ios' ? 216 : 0

export const padding = {
  xxl: 64,
  xl:  32,
  l:   24,
  m:   16,
  s:   10,
  xs:  6
}

export const radius = {
  l: 8,
  m: 4,
  s: 2
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