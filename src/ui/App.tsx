import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import {layout} from '@ui/styles'
import AppNavigator from './AppNavigator'
import LinearGradient from 'react-native-linear-gradient'
import {socketStore} from '@src/stores'

export default class App extends React.Component {

  componentWillMount() {
    socketStore.connect()
  }

  componentWillUnmount() {
    socketStore.disconnect()
  }

  render() {
    return (
      <View style={$.app}>
        {this.renderRoot()}
        {this.renderOverlay()}
      </View>
    )
  }

  renderRoot() {
    return <AppNavigator/>
  }

  renderOverlay() {
    return (
      <LinearGradient
        style={$.overlay}
        colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        locations={[0, 0.3]}
        pointerEvents='none'
      />
    )
  }

}

const $ = StyleSheet.create({
  app: {
    flex: 1
  },

  overlay: {
    ...layout.overlay,
    opacity: 0.15
  }
})