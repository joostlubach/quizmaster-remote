import {ImageProperties, StyleProp as RNStyleProp, ViewStyle, TextStyle, ImageStyle} from 'react-native'
import {StyleSheet} from 'react-native'

declare global {
  type ViewStyleProp = RNStyleProp<ViewStyle>
  type TextStyleProp = RNStyleProp<TextStyle>
  type ImageStyleProp = RNStyleProp<ImageStyle>
  type ImageSource = ImageProperties['source']
}

declare module 'react-native' {
  export namespace StyleSheet {
    // Override this to prevent having to convert everything to ViewStyle etc.
    export function create<T extends {}>(styles: T): {
      [P in keyof T]: RegisteredStyle<any>
    }
  }
}