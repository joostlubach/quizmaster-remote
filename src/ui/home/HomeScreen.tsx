import * as React from 'react'
import {observer} from 'mobx-react'
import {StyleSheet} from 'react-native'
import {Screen, Logo, RowButton, ButtonRow, Button} from '@ui/components'
import {colors, layout} from '@ui/styles'
import QuizList from './QuizList'

export interface Props {

}

@observer
export default class HomeScreen extends React.Component<Props> {

  render() {
    return (
      <Screen style={$.screen}>
        <Logo/>
        <QuizList style={$.list}/>

        {this.renderCreateQuizButton()}
        {this.renderFooterButtons()}
      </Screen>
    )
  }

  renderCreateQuizButton() {
    return (
      <RowButton
        color={colors.blue}
        label="CREATE QUIZ"
        large
      />
    )
  }

  renderFooterButtons() {
    return (
      <ButtonRow style={$.footer}>
        <Button icon='cog' label="SETTINGS"/>
        <Button icon='app' label="SCREEN"/>
        <Button icon='info' label="ABOUT"/>
        <Button icon='heart' label="SHARE"/>
      </ButtonRow>
    )
  }

}

const $ = StyleSheet.create({
  screen: {
    paddingTop: layout.safeArea.top + layout.padding.xxl
  },

  list: {
    marginTop:      layout.padding.l,
    borderTopColor: colors.green,
    borderTopWidth: 4
  },

  footer: {
    paddingBottom: layout.safeArea.bottom
  }
})