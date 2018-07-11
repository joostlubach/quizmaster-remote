import * as React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Label} from '@ui/components'
import {layout} from '@ui/styles'

export interface Props {
  label:   string
  onPress: () => any
  style?:  ViewStyleProp
}

export default function HeaderButton(props: Props) {
  return (
    <TouchableOpacity style={[$.button, props.style]} onPress={props.onPress}>
      <Label small>{props.label}</Label>
    </TouchableOpacity>
  )
}

const $ = StyleSheet.create({
  button: {
    padding: layout.padding.s
  }
})