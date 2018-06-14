import * as React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {colors, layout} from '@ui/styles'
import {Label} from '@ui/components'
import Color from 'color'

export interface Props {
  style?: ViewStyleProp
  large?: boolean
  huge?:  boolean
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
    const {active} = this.state

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => { this.setState({active: true}) }}
        onPressOut={() => { this.setState({active: false}) }}
        onPress={this.props.onPress}
      >
        <View style={[$.container, active && $.active, this.props.style]}>
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
    const {label, large, huge} = this.props
    const padding = huge ? layout.padding.xl : large ? layout.padding.l : layout.padding.m

    return (
      <View style={[$.content, {padding}]}>
        {label != null && <Label large={large} huge={huge}>{label}</Label>}
      </View>
    )
  }

}

const $ = StyleSheet.create({
  container: {
    alignSelf: 'stretch'
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