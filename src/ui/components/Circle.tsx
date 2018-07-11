import * as React from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'

export interface Props extends ViewProps {
}

export default function Circle(props: Props) {
  const {style, ...other} = props
  const {width, height} = StyleSheet.flatten(style) || ({} as AnyObject)
  if (typeof width !== 'number' || typeof height !== 'number') {
    throw new Error("Circle: Need explicit width and height")
  }

  const borderRadius = Math.max(width, height) / 2
  return (
    <View style={[style, {borderRadius}]} {...other}/>
  )
}