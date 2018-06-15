import * as React from 'react' // tslint:disable-line
import {Text, StyleSheet, TextProperties} from 'react-native'
import {colors, fonts} from '@ui/styles'

export interface Props extends TextProperties {
  children?:         React.ReactNode,
  style?:            TextStyleProp,
  linkStyle?:        TextStyleProp,
  allowFontScaling?: boolean,

  italic?: boolean
  dim?:    boolean
  center?: boolean
  large?:  boolean
  huge?:   boolean
  small?:  boolean
}

export default function Label(props: Props) {
  const {
    style     = null,
    allowFontScaling = false,

    dim = false,
    center = false,
    italic = false,
    small = false,
    large = false,
    huge = false,

    children,
  } = props

  const styles: TextStyleProp = [
    $.label,
    style,
    dim && $.dim,
    center && $.center,

    !large && !huge && !small && $.normal,
    !large && !huge && !small && italic && $.normalItalic,
    small && $.small,
    small && italic && $.smallItalic,
    large && $.large,
    large && italic && $.largeItalic,
    huge && $.huge,
    huge && italic && $.hugeItalic
  ]

  return (
    <Text
      style={styles}
      allowFontScaling={allowFontScaling}
      children={children}
    />
  )
}

const $ = StyleSheet.create({
  label: {
    backgroundColor: 'transparent',
    color:           colors.fg.normal,
  },

  dim: {
    color: colors.fg.dim
  },

  center: {
    textAlign: 'center'
  },

  normal: {
    ...fonts.normal,
    paddingTop: fonts.normal.fontSize * 0.2
  },

  normalItalic: {
    ...fonts.normalItalic
  },

  small: {
    ...fonts.small,
    paddingTop: fonts.small.fontSize * 0.2
  },

  smallItalic: {
    ...fonts.smallItalic
  },

  large: {
    ...fonts.large,
    paddingTop: fonts.large.fontSize * 0.2
  },

  largeItalic: {
    ...fonts.largeItalic
  },

  huge: {
    ...fonts.huge,
    paddingTop: fonts.huge.fontSize * 0.2
  },

  hugeItalic: {
    ...fonts.hugeItalic
  },
})