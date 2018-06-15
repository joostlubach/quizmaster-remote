import * as React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {layout, colors} from '@ui/styles'
import {Label} from '@ui/components'
import {withNavigation, NavigationInjectedProps} from 'react-navigation'
import {images} from '@res'

export interface Props {
  left?:  React.ReactNode
  title?: React.ReactNode
  right?: React.ReactNode
}

interface State {
  leftWidth?: number
  rightWidth?: number
}

class Header extends React.Component<Props & NavigationInjectedProps, State> {

  state: State = {
  }

  render() {
    return (
      <View style={$.header}>
        {this.renderLeft()}
        {this.renderTitle()}
        {this.renderRight()}
      </View>
    )
  }

  renderLeft() {
    return (
      <View style={$.left} onLayout={e => { this.setState({leftWidth: e.nativeEvent.layout.width}) }}>
        {this.props.left}
        {!this.props.left && this.renderBackButton()}
      </View>
    )
  }

  renderTitle() {
    const {leftWidth = 0, rightWidth = 0} = this.state
    const paddingLeft  = Math.max(leftWidth, rightWidth) + layout.padding.m
    const paddingRight = Math.max(leftWidth, rightWidth) + layout.padding.m

    const title = typeof this.props.title === 'string'
      ? <Label large>{this.props.title}</Label>
      : this.props.title

    return (
      <View style={[$.title, {paddingLeft, paddingRight}]}>
        {title}
      </View>
    )
  }

  renderRight() {
    return (
      <View style={$.right} onLayout={e => { this.setState({rightWidth: e.nativeEvent.layout.width}) }}>
        {this.props.right}
      </View>
    )
  }

  renderBackButton() {
    return (
      <TouchableOpacity style={$.backButton} onPress={() => { this.props.navigation.goBack() }}>
        <images.chevronLeft style={$.backIcon}/>
        <Label>Back</Label>
      </TouchableOpacity>
    )
  }

}

const $ = StyleSheet.create({
  header: {
    backgroundColor: colors.green,
    padding:         layout.padding.m,
    paddingTop:      layout.safeArea.top + layout.padding.m,
    height:          layout.headerHeight,

    justifyContent: 'flex-end'
  },

  left: {
    position: 'absolute',
    bottom:   0,
    left:     0,
    height:   layout.headerHeight - layout.safeArea.top,

    flexDirection: 'row',
    alignItems:    'center'
  },

  title: {
    alignSelf: 'center'
  },

  right: {
    position: 'absolute',
    bottom:   0,
    right:    0,
    height:   layout.headerHeight - layout.safeArea.top,

    flexDirection: 'row',
    alignItems:    'center'
  },

  backButton: {
    flexDirection: 'row',
    alignItems:    'center',
    padding:       layout.padding.s
  },

  backIcon: {
    marginRight: layout.padding.s
  }
})

export default withNavigation(Header)