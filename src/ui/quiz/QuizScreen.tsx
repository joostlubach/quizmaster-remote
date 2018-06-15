import * as React from 'react'
import {StyleSheet} from 'react-native'
import QRCodeScanner, {ReadEvent} from 'react-native-qrcode-scanner'
import {quizStore} from '@src/stores'
import {Screen, Header} from '@ui/components'
import {NavigationScreenProps} from 'react-navigation'

export interface Params {
  id: string | null
}

export interface Props extends NavigationScreenProps<Params> {

}

export default class QuizScreen extends React.Component<Props> {

  scanner: QRCodeScanner | null = null

  get id(): string | null {
    return this.props.navigation.getParam('id')
  }

  get isNew() {
    return this.id == null
  }

  render() {
    return (
      <Screen style={$.screen}>
        <Header
          title="New quiz"
        />
        <QRCodeScanner
          ref={el => { this.scanner = el }}
          onRead={this.onQRRead}
          showMarker={true}
          fadeIn={false}
        />
      </Screen>
    )
  }

  onQRRead = async (event: ReadEvent) => {
    await quizStore.joinSession(event.data)

    setTimeout(() => {
      this.scanner!.reactivate()
    }, 2000)
  }

}

const $ = StyleSheet.create({
  screen: {
    flex: 1
  }
})