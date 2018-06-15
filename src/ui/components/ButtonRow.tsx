import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import Button, {Props as ButtonProps} from '@ui/components/Button'
import {layout} from '@ui/styles'

export interface Props {
  style?:    ViewStyleProp
  footer?:   boolean
  children?: React.ReactNode
}

export default class ButtonRow extends React.Component<Props> {

  get buttons(): React.ReactElement<ButtonProps>[] {
    const children = React.Children.toArray(this.props.children)

    return children.filter(child => {
      if (!React.isValidElement(child)) { return false }
      return child.type === Button
    }) as React.ReactElement<ButtonProps>[]
  }

  render() {
    const {style, footer} = this.props

    const buttonSize = (layout.window.width + 1) / this.buttons.length - 1
    const buttons = this.buttons.map((button, index) => {
      return React.cloneElement(button, {
        style: [
          button.props.style,
          {
            width:      buttonSize,
            height:     buttonSize + (footer ? layout.padding.l - layout.padding.m : 0),
            marginLeft: index === 0 ? 0 : 1
          }
        ],
        footer
      })
    })

    return (
      <View style={[$.buttonRow, style]}>
        {buttons}
      </View>
    )
  }

}

const $ = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row'
  }
})