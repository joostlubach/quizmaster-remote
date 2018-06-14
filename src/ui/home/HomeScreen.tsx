import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import {colors} from '@ui/styles'
import QRCodeScanner, {ReadEvent} from 'react-native-qrcode-scanner'
import {quizStore} from '@src/stores'

export interface Props {

}

export default class HomeScreen extends React.Component<Props> {

  scanner: QRCodeScanner | null = null

  render() {
    return (
      <View style={$.screen}>
        <QRCodeScanner
          ref={el => { this.scanner = el }}
          onRead={this.onQRRead}
          showMarker={true}
        />
      </View>
    )
  }

  onQRRead = async (event: ReadEvent) => {
    await quizStore.connectToScreen(event.data)

    setTimeout(() => {
      this.scanner!.reactivate()
    }, 2000)
  }

}

const $ = StyleSheet.create({
  screen: {
    flex:             1,
    backgroundColor: colors.bg.normal
  },

  scanner: {
  }
})