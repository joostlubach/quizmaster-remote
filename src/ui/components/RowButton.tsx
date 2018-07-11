import * as React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
// @ts-ignore
import Platform from 'Platform'
import {colors, layout} from '@ui/styles'
import {Label} from '@ui/components'
import Color from 'color'

export interface Props {
  style?: ViewStyleProp
  large?: boolean
  color?: Color

  label?:   string
  onPress?: () => any
}

interface State {
  active: boolean
}

export default class RowButton extends React.Component<Props> {

  state: State = {
    active: false
  }

  render() {
    const active = this.state.active && Platform.isTV

    return (
      <TouchableOpacity
        style={[$.button, active && $.active, this.props.style]}
        activeOpacity={Platform.isTV ? 1 : 0.6}
        onPressIn={() => { this.setState({active: true}) }}
        onPressOut={() => { this.setState({active: false}) }}
        onPress={this.props.onPress}
      >
        <View style={$.container}>
          {this.renderBackground()}
          {this.renderContent()}
        </View>
      </TouchableOpacity>
    )
  }

  renderBackground() {
    const {color = colors.green} = this.props
    const style = {backgroundColor: color.string()}

    return (
      <View
        style={[$.background, style]}
      />
    )
  }

  renderContent() {
    const {label, large} = this.props
    const padding = large ? layout.padding.m : layout.padding.s

    return (
      <View style={[$.content, {padding, paddingBottom: padding - 2}]}>
        {label != null && <Label large={large}>{label}</Label>}
      </View>
    )
  }

}

const $ = StyleSheet.create({
  button: {
    alignSelf: 'stretch'
  },

  container: {
  },

  active: {
    shadowColor: 'white',
    shadowOpacity: 0.6,
    shadowRadius:  10
  },

  background: {
    ...layout.overlay,
  },

  content: {
    alignItems: 'center'
  }
})