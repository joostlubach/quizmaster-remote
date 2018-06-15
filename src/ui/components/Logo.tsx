import * as React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {layout} from '@ui/styles'

const logo = require('@res/logo.png')

export interface Props {
  style?: ImageStyleProp
}

export default function Logo(props: Props) {
  return (
    <View style={$.container}>
      <Image source={logo} style={$.logo}/>
    </View>
  )
}

const logoWidth    = 488
const logoHeight   = 43
const desiredWidth = 320
const logoRight    = Math.min(0, desiredWidth - logoWidth)

const $ = StyleSheet.create({
  container: {
    width:  layout.window.width,
    height: logoHeight
  },

  logo: {
    position:   'absolute',
    top:        0,
    right:      logoRight,
    width:      logoWidth,
    height:     logoHeight,

    resizeMode: 'contain'
  }
})