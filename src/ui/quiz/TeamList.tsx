import * as React from 'react'
import {observer} from 'mobx-react'
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native'
import {quizStore, Team} from '@src/stores'
import {layout, colors, fonts} from '@ui/styles'
import {Label, Circle} from '@ui/components'
import TeamView from './TeamView'
import {images} from '@res'

export interface Props {
  editable?:   boolean
  showScores?: boolean
  style?:      ViewStyleProp

  onNewTeam?:  () => any
  onEditTeam?: (team: Team) => any
}

@observer
export default class TeamList extends React.Component<Props> {

  get teams(): Team[] {
    return quizStore.quiz.get('teams') || []
  }

  render() {
    const {style, editable} = this.props

    return (
      <ScrollView style={[$.teamList, style]} contentContainerStyle={$.scrollContent}>
        <View style={$.content}>
          {this.teams.map(team => this.renderTeam(team))}
          {editable && this.renderNewTeamButton()}
        </View>
      </ScrollView>
    )
  }

  renderTeam(team: Team) {
    return (
      <TeamView
        style={$.team}
        key={team.id}
        team={team}
        score={this.props.showScores ? 0 : undefined}
        onPress={this.props.editable && this.props.onEditTeam ? this.props.onEditTeam.bind(null, team) : undefined}
      />
    )
  }

  renderNewTeamButton() {
    const {onNewTeam} = this.props
    if (onNewTeam == null) { return null }

    const align = this.teams.length % 2 === 1

    return (
      <View style={$.team}>
        <TouchableOpacity style={$.newTeamButton} onPress={onNewTeam}>
          <Circle style={[$.newTeamCircle, align && $.newTeamCircleAlign]}>
            <images.plus/>
          </Circle>
          <Label style={$.teamLabel}>Add a team</Label>
        </TouchableOpacity>
      </View>
    )
  }

}

const $ = StyleSheet.create({
  teamList: {

  },

  scrollContent: {
    flexGrow:       1,
    justifyContent: 'center'
  },

  content: {
    flexShrink:     1,
    flexDirection:  'row',
    flexWrap:       'wrap',
    padding:        layout.padding.xl,
    marginBottom:   -layout.padding.l,
    justifyContent: 'center'
  },

  team: {
    width:        (layout.window.width - 2 * layout.padding.xl) / 2,
    marginBottom: layout.padding.l
  },

  newTeamButton: {
    alignItems:    'center'
  },

  newTeamCircle: {
    width:           96,
    height:          96,
    backgroundColor: colors.white.alpha(0.1),
    borderWidth:     2,
    borderColor:     colors.white,
    ...layout.center
  },

  newTeamCircleAlign: {
    marginTop: fonts.normal.fontSize * 1.4 + layout.padding.s,
  },

  teamLabel: {
    marginTop: layout.padding.s
  }
})