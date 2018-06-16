import * as React from 'react'
import {observer} from 'mobx-react'
import {StyleSheet} from 'react-native'
import {Screen, Logo, RowButton, ButtonRow, Button} from '@ui/components'
import {colors, layout} from '@ui/styles'
import QuizList from './QuizList'
import {NavigationScreenProps} from 'react-navigation'

export interface Props extends NavigationScreenProps {

}

@observer
export default class HomeScreen extends React.Component<Props> {

  render() {
    return (
      <Screen style={$.screen}>
        <Logo/>
        <QuizList
          style={$.list}
          onQuizPress={quiz => { this.props.navigation.navigate('quiz', {id: quiz.id}) }}
        />

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
        large={true}
        onPress={() => { this.props.navigation.navigate('quiz', {id: null}) }}
      />
    )
  }

  renderFooterButtons() {
    return (
      <ButtonRow style={$.footer} footer>
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
    marginTop: 1
  }
})