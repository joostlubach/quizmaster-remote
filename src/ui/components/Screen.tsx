import * as React from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {colors} from '@ui/styles'

export interface Props extends ViewProps {}

export default class Screen extends React.Component<Props> {

  render() {
    const {style, ...props} = this.props
    return <View style={[$.screen, style]} {...props}/>
  }

}

const $ = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg.normal
  }
})