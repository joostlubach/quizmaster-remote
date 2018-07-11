import * as React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Team as TeamModel} from '@src/stores'
import {Label, TeamBadge} from '@ui/components'
import {layout, fonts} from '@ui/styles'
import {omit} from 'lodash'

export interface Props {
  team:       TeamModel
  score?:     number
  badgeSize?: number

  onPress?: () => any

  style?: ViewStyleProp
}

export default class TeamView extends React.Component<Props> {

  constructor(props: Props) {
    super(props)

    this.state = omit(props.team, 'id')
  }

  render() {
    const {style, onPress, team, score, badgeSize = 96} = this.props

    const Component  = onPress ? TouchableOpacity : View
    const pressProps = onPress ? {onPress} : {}

    return (
      <Component style={[$.team, style]} {...pressProps}>
        <Label style={$.name}>{team.name}</Label>
        <TeamBadge style={$.badge} team={team} size={badgeSize}/>
        {score != null && <Label score>{score}</Label>}
      </Component>
    )
  }

}

const $ = StyleSheet.create({
  team: {
    alignItems: 'center'
  },

  name: {
    height: fonts.normal.fontSize * 1.4,
  },

  badge: {
    marginTop: layout.padding.s,
  },
})