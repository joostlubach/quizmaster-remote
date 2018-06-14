import * as React from 'react'
import {StyleSheet, View} from 'react-native'

export interface Props {

}

export default class QuizScreen extends React.Component<Props> {

  render() {
    return (
      <View style={$.screen}>
        <View/>
      </View>
    )
  }

}

const $ = StyleSheet.create({
  screen: {
    flex: 1
  }
})