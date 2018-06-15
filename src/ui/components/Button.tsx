import * as React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {colors, layout} from '@ui/styles'
import {Label} from '@ui/components'
import Color from 'color'
import {images} from '@res'

export interface Props {
  style?: ViewStyleProp
  color?: Color
  size?:  Size

  label?:   string
  icon?:    string
  onPress?: () => any
}

interface State {
  active: boolean
}

export default class Button extends React.Component<Props> {

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
        <View style={[active && $.active, this.props.style]}>
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
    const {label, icon} = this.props
    const Icon = icon == null ? null : (images as any)[icon]

    return (
      <View style={$.content}>
        {Icon != null && <Icon style={$.icon}/>}
        {label != null && <Label small>{label}</Label>}
      </View>
    )
  }

}

const $ = StyleSheet.create({
  active: {
    shadowColor: 'white',
    shadowOpacity: 0.6,
    shadowRadius:  10
  },

  background: {
    ...layout.overlay,
  },

  content: {
    ...layout.center,
    padding: layout.padding.m
  },

  icon: {
    marginBottom: layout.padding.m
  }
})