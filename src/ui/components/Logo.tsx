import * as React from 'react'
import {StyleSheet, Image} from 'react-native'

const logo = require('@res/logo.png')

export interface Props {
  size?:  Size
  style?: ImageStyleProp
}

export default function Logo(props: Props) {
  return (
    <Image source={logo} style={[$.logo, props.size, props.style]}/>
  )
}

const $ = StyleSheet.create({
  logo: {
    resizeMode: 'contain'
  }
})