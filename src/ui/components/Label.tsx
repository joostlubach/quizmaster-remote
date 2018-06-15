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

    !large && !huge && !small && !italic && $.normal,
    !large && !huge && !small && italic && $.normalItalic,
    small && !italic && $.small,
    small && italic && $.smallItalic,
    large && !italic && $.large,
    large && italic && $.largeItalic,
    huge && !italic && $.huge,
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
    ...fonts.normal
  },

  normalItalic: {
    ...fonts.normalItalic
  },

  small: {
    ...fonts.small
  },

  smallItalic: {
    ...fonts.smallItalic
  },

  large: {
    ...fonts.large
  },

  largeItalic: {
    ...fonts.largeItalic
  },

  huge: {
    ...fonts.huge
  },

  hugeItalic: {
    ...fonts.hugeItalic
  },
})