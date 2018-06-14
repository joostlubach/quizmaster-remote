import {Dimensions, Platform} from 'react-native'

// Taken from react-native-safe-area-view, but kept only the functions, not the SafeAreaView.

// See https://mydevice.io/devices/ for device dimensions
const X_WIDTH    = 375
const X_HEIGHT   = 812
const PAD_WIDTH  = 768

const {height: D_HEIGHT, width: D_WIDTH} = Dimensions.get('window')

export const isIPhoneX = (() => {
  if (Platform.OS === 'web') { return false }

  return (
    Platform.OS === 'ios' &&
    ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
      (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
  )
})()

export const isIPad = (() => {
  if (Platform.OS !== 'ios' || isIPhoneX) { return false }

  // if portrait and width is smaller than iPad width
  if (D_HEIGHT > D_WIDTH && D_WIDTH < PAD_WIDTH) {
    return false
  }

  // if landscape and height is smaller that iPad height
  if (D_WIDTH > D_HEIGHT && D_HEIGHT < PAD_WIDTH) {
    return false
  }

  return true
})()

function top(landscape: boolean) {
  if (Platform.OS === 'android') {
    return 0
  }

  if (isIPhoneX) {
    return landscape ? 0 : 44
  }

  if (isIPad) {
    return 20
  }

  return landscape ? 0 : 20
}

function bottom(landscape: boolean) {
  return isIPhoneX ? (landscape ? 24 : 34) : 0
}

export const portrait = {top: top(false), bottom: bottom(false)}
export const landscape = {top: top(true), bottom: bottom(true)}