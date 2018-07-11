import * as React from 'react' // tslint:disable-line
import {Text, StyleSheet, TextProperties} from 'react-native'
import {colors, fonts} from '@ui/styles'

export interface Props extends TextProperties {
  children?:         React.ReactNode
  style?:            TextStyleProp
  linkStyle?:        TextStyleProp
  allowFontScaling?: boolean

  italic?: boolean
  strong?: boolean
  dim?:    boolean
  center?: boolean
  large?:  boolean
  small?:  boolean
  score?:  boolean
}

export default function Label(props: Props) {
  const {
    style     = null,
    allowFontScaling = false,

    dim    = false,
    center = false,
    italic = false,
    strong = false,
    small  = false,
    large  = false,
    score  = false,

    children,
  } = props

  const styles: TextStyleProp = [
    $.label,
    style,
    dim && $.dim,
    center && $.center,

    !large && !small && $.normal,
    !large && !small && italic && $.normalItalic,
    small && $.small,
    small && italic && $.smallItalic,
    large && $.large,
    large && italic && $.largeItalic,

    strong && $.strong,
    score && $.score
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

  strong: {
    fontWeight: '500'
  },

  score: {
    ...fonts.score
  }

})