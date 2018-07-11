import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import {colors} from '@ui/styles'
import {Header} from '@ui/components'

export interface Props {
  style?:       ViewStyleProp
  header?:      React.ReactNode
  title?:       React.ReactNode
  headerLeft?:  React.ReactNode
  headerRight?: React.ReactNode
}

export default class Screen extends React.Component<Props> {

  render() {
    const {style, header, title, headerLeft, headerRight} = this.props
    const implicitHeader = !header && (title || headerLeft || headerRight)

    return (
      <View style={[$.screen, style]}>
        {!implicitHeader && header}
        {implicitHeader && <Header title={title} left={headerLeft} right={headerRight}/>}
        <View style={$.body}>
          {this.props.children}
        </View>
      </View>
    )
  }

}

const $ = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg.normal
  },

  body: {
    flex: 1
  }
})