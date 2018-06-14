import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import { colors } from '@ui/styles'

export interface Props {

}

export default class HomeScreen extends React.Component<Props> {

  render() {
    return (
      <View style={$.screen}/>
    )
  }

}

const $ = StyleSheet.create({
  screen: {
    flex:             1,
    backgroundColor: colors.bg.normal
  }
})