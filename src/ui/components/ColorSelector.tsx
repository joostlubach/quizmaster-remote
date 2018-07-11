import * as React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { colors, shadows, layout } from '@ui/styles'

export interface Props {
  color:    string
  onChange: (color: string) => any

  style?: ViewStyleProp
}

export default class ColorSelector extends React.Component<Props> {

  render() {
    const {style} = this.props

    return (
      <View style={[$.colorSelector, style]}>
        <View style={$.buttons}>
          {colors.teams.map(color => this.renderButton(color.string()))}
        </View>
      </View>
    )
  }

  renderButton(color: string) {
    const selected = color === this.props.color

    return (
      <TouchableOpacity
        key={color}
        style={[$.button, selected && $.buttonSelected, {backgroundColor: color}]}
        onPress={this.props.onChange.bind(null, color)}
      />
    )
  }

}

const buttonSize = 46
const columns = 5
const gap = layout.padding.m

const $ = StyleSheet.create({
  colorSelector: {
  },

  buttons: {
    flexDirection:  'row',
    flexWrap:       'wrap',
    marginRight:    -gap,
    marginBottom:   -gap,
    width:          buttonSize * columns + gap * columns,
  },

  button: {
    width:        buttonSize,
    height:       buttonSize,
    borderRadius: buttonSize / 2,
    marginRight:  gap,
    marginBottom: gap
  },

  buttonSelected: {
    borderWidth: 2,
    borderColor: colors.white,
    ...shadows.depth(2)
  }
})