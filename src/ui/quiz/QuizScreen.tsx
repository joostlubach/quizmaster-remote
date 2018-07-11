import * as React from 'react'
import {observer} from 'mobx-react'
import {StyleSheet, View} from 'react-native'
import {quizStore} from '@src/stores'
import {Screen, TextField, Label, Switcher, HeaderButton, Loading} from '@ui/components'
import {NavigationScreenProps} from 'react-navigation'
import TeamList from './TeamList'
import TeamEditor from './TeamEditor'
import {layout} from '@ui/styles'

export interface Params {
  id: string | null
}

export interface Props extends NavigationScreenProps<Params> {

}

interface State {
  editedTeamID: string | null
}

@observer
export default class QuizScreen extends React.Component<Props, State> {

  state: State = {
    editedTeamID: null
  }

  get isNew() {
    const id = this.props.navigation.getParam('id')
    return id == null
  }

  get quiz() {
    return quizStore.quiz.data
  }

  async createQuiz(title: string) {
    await quizStore.quiz.update({title})

    if (this.quiz != null && this.quiz.id != null) {
      this.props.navigation.setParams({id: this.quiz.id})
    }
  }

  async loadQuiz(id: string | null) {
    if (id != null) {
      await quizStore.quiz.load(id)
    } else {
      await quizStore.quiz.build()
    }
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id')
    this.loadQuiz(id)
  }

  componentWillReceiveProps(props: Props) {
    const oldID = this.props.navigation.getParam('id')
    const newID = props.navigation.getParam('id')

    if (oldID !== newID) {
      this.loadQuiz(newID)
    }
  }

  get activeStep(): string {
    if (this.isNew) {
      return 'title'
    }
    if (this.state.editedTeamID != null) {
      return 'team'
    }
    return 'rest'
  }

  render() {
    return (
      <Screen
        style={$.screen}
        title={this.quiz ? this.quiz.title : ''}
        headerLeft={this.renderHeaderLeft()}
        headerRight={this.renderHeaderRight()}
      >
        {quizStore.quiz.loading && this.renderLoading()}

        {!quizStore.quiz.loading && (
          <Switcher activeStep={this.activeStep}>
            <Switcher.Step name='title'>
              {this.renderTitleEntry()}
            </Switcher.Step>
            <Switcher.Step name='team'>
              {this.renderTeamEditor()}
            </Switcher.Step>
            <Switcher.Step name='rest'>
              {this.renderRest()}
            </Switcher.Step>
          </Switcher>
        )}
      </Screen>
    )
  }

  renderLoading() {
    return (
      <Loading/>
    )
  }

  renderHeaderLeft() {
    if (this.activeStep === 'team') {
      return (
        <HeaderButton
          label='Cancel'
          onPress={() => { this.setState({editedTeamID: null}) }}
        />
      )
    }
  }

  renderHeaderRight() {
    return null
  }

  renderTitleEntry() {
    const {quiz} = this
    if (quiz == null) { return }

    return (
      <View style={$.titleEntry}>
        <Label small>
          Enter a name for your quiz
        </Label>
        <TextField
          style={$.titleField}
          value={quiz.title}
          center
          autoFocus
          onCommit={this.onTitleCommit}
        />
      </View>
    )
  }

  renderTeamEditor() {
    const {editedTeamID} = this.state
    if (editedTeamID == null) { return null }

    return (
      <TeamEditor
        id={editedTeamID === 'new' ? null : editedTeamID}
        onDone={() => { this.setState({editedTeamID: null}) }}
      />
    )
  }

  renderRest() {
    return (
      <>
        <TeamList
          style={$.teamList}
          editable
          onEditTeam={team => {
            this.setState({editedTeamID: team.id!})
          }}
          onNewTeam={() => {
            this.setState({editedTeamID: 'new'})
          }}
        />
      </>
    )
  }

  onTitleCommit = (title: string) => {
    this.createQuiz(title)
  }

}

const $ = StyleSheet.create({
  screen: {
    flex: 1
  },

  titleEntry: {
    flex: 1,
    ...layout.center,
    padding:       layout.padding.l,
    paddingBottom: layout.padding.l + layout.keyboardHeight
  },

  titleField: {
    alignSelf: 'stretch',
    marginTop: layout.padding.s
  },

  teamList: {
    flex: 1
  }
})