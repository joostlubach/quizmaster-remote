import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import {ColorSelector, ImageSelector, RowButton, TextField, TeamBadge} from '@ui/components'
import TeamView from './TeamView'
import {observer} from 'mobx-react'
import {Team, TeamImage, quizStore} from '@src/stores'
import {layout, colors} from '@ui/styles'

export interface Props {
  id:     string | null
  onDone: () => any
}

interface State {
  team: Team | null
}

@observer
export default class TeamEditor extends React.Component<Props, State> {

  loadTeam() {
    if (this.props.id == null) {
      this.setState({team: quizStore.quiz.newTeam()})
    } else {
      const team = quizStore.quiz.getTeam(this.props.id)
      this.setState({team: team == null ? null : {...team}})
    }
  }

  async saveTeam() {
    const {team} = this.state
    if (team == null) { return }

    await quizStore.quiz.updateTeam(this.props.id, team)
    this.props.onDone()
  }

  async removeTeam() {
    if (this.props.id == null) { return }
    await quizStore.quiz.removeTeam(this.props.id)
    this.props.onDone()
  }

  componentWillMount() {
    this.loadTeam()
  }

  render() {
    return (
      <View style={$.editor}>
        {this.renderPreview()}
        {this.renderColorSelector()}
        {this.renderImageSelector()}
        {this.renderSaveButton()}
        {this.props.id != null && this.renderRemoveButton()}
      </View>
    )
  }

  renderPreview() {
    const {team} = this.state
    if (team == null) { return null }

    return (
      <View style={$.preview}>
        <TextField
          style={$.nameField}
          value={team.name}
          onChange={this.onNameChange}
          autoFocus={this.props.id == null}
          center
        />
        <TeamBadge team={team} size={120}/>
      </View>
    )
  }

  renderColorSelector() {
    const {team} = this.state
    if (team == null) { return null }

    return (
      <ColorSelector
        style={$.colorSelector}
        color={team.color}
        onChange={this.onColorChange}
      />
    )
  }

  renderImageSelector() {
    const {team} = this.state
    if (team == null) { return null }

    return (
      <ImageSelector
        style={$.imageSelector}
        image={team.image}
        onChange={this.onImageChange}
      />
    )
  }

  renderSaveButton() {
    return (
      <RowButton
        style={$.saveButton}
        label={this.props.id == null ? "ADD TEAM" : "SAVE"}
        color={colors.blue}
        onPress={this.onSavePress}
      />
    )
  }

  renderRemoveButton() {
    return (
      <RowButton
        style={$.removeButton}
        label="REMOVE TEAM"
        color={colors.red}
        onPress={this.onRemovePress}
      />
    )
  }

  //------
  // Events

  onNameChange = (name: string) => {
    const {team} = this.state
    if (team == null) { return }

    this.setState({team: {...team, name}})
  }

  onColorChange = (color: string) => {
    const {team} = this.state
    if (team == null) { return }

    this.setState({team: {...team, color}})
  }

  onImageChange = (image: TeamImage) => {
    const {team} = this.state
    if (team == null) { return }

    this.setState({team: {...team, image}})
  }

  onSavePress = () => {
    this.saveTeam()
  }

  onRemovePress = () => {
    this.removeTeam()
  }

}

const $ = StyleSheet.create({
  editor: {
    ...layout.overlay,
    alignItems: 'center',
  },

  preview: {
    alignSelf:    'stretch',
    alignItems:   'center',
    margin:       layout.padding.l,
    marginBottom: 0
  },

  nameField: {
    alignSelf:    'stretch',
    marginBottom: layout.padding.l
  },

  colorSelector: {
    margin:       layout.padding.l,
    marginBottom: 0
  },

  imageSelector: {
    flex:      1,
    marginTop: layout.padding.l,
  },

  saveButton: {
    marginTop: layout.padding.l,
  },

  removeButton: {

  }
})