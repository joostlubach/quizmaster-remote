import * as React from 'react'
import {observer} from 'mobx-react'
import {StyleSheet} from 'react-native'
import QRCodeScanner, {ReadEvent} from 'react-native-qrcode-scanner'
import {quizStore} from '@src/stores'
import {Screen, Header, InlineEditor} from '@ui/components'
import {NavigationScreenProps} from 'react-navigation'

export interface Params {
  id: string | null
}

export interface Props extends NavigationScreenProps<Params> {

}

@observer
export default class QuizScreen extends React.Component<Props> {

  scanner: QRCodeScanner | null = null

  get id(): string | null {
    return this.props.navigation.getParam('id')
  }

  get isNew() {
    return this.id == null
  }

  get quiz() {
    return quizStore.quiz.data
  }

  componentDidMount() {
    if (this.id != null) {
      quizStore.quiz.load(this.id)
    } else {
      quizStore.quiz.new({
        title: "New quiz"
      })
    }
  }

  render() {
    return (
      <Screen style={$.screen}>
        <Header
          title={this.renderTitle()}
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

  renderTitle() {
    if (this.quiz == null) { return }

    return (
      <InlineEditor
        value={this.quiz.title}
        onCommit={title => { quizStore.quiz.update({title}) }}
        initiallyEditing
        center
        large
      />
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