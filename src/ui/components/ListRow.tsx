import * as React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  LayoutChangeEvent
} from 'react-native'
import {images} from '@res'
import {Label} from '@ui/components'
import {layout, colors} from '@ui/styles'
import Color from 'color'

export interface Props {
  icon?:      React.ReactNode
  caption:    React.ReactNode
  detail?:    React.ReactNode
  accessory?: React.ReactNode

  actions?:   Action[]

  onPress?: () => any

  onSwipeStart?: () => any
  onSwipeEnd?:   () => any
}

export interface Action {
  color:   Color
  icon:    string
  label:   string
  onPress: () => any
}

interface State {
  actionsWidth: number
  actionsOpen:  boolean
  pan:          Animated.Value
}

export default class ListRow extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      actionsWidth: 0,
      actionsOpen:  false,
      pan:          new Animated.Value(0)
    }
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (e, state) => {
        return Math.abs(state.dx) > Math.abs(state.dy)
      },

      onPanResponderGrant: props.onSwipeStart,
      onPanResponderEnd:   props.onSwipeEnd,

      onPanResponderMove:      this.onPanResponderMove,
      onPanResponderRelease:   this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderTerminate
    })
  }

  panResponder: PanResponderInstance

  get actionsStart(): number {
    return this.state.actionsOpen ? -this.state.actionsWidth : 0
  }

  onPanResponderMove = (event: any, state: PanResponderGestureState) => {
    let pan = Math.min(0, this.actionsStart + state.dx)

    let overshoot = -pan - this.state.actionsWidth
    let v = overshoot < 0 ? 1 : Math.max(0, 150 - overshoot / 5) / 200
    overshoot *= v

    this.state.pan.setValue(-this.state.actionsWidth - overshoot)
  }

  onPanResponderRelease = () => {
    this.state.pan.stopAnimation(pan => {
      const actionsWidth = this.state.actionsWidth
      const actionsOpen = pan < -actionsWidth * 0.8

      const toValue = actionsOpen ? -actionsWidth : 0
      const anim = Animated.spring(this.state.pan, {toValue})
      anim.start()

      this.setState({actionsOpen})
    })
  }

  onPanResponderTerminate = () => {
    this.state.pan.stopAnimation(pan => {
      const actionsOpen = false
      const anim = Animated.spring(this.state.pan, {toValue: 0})
      anim.start()

      this.setState({actionsOpen})
    })
  }

  render() {
    return (
      <View>
        <View style={$.row}>
          {this.renderActions()}
          {this.renderBody()}
        </View>
      </View>
    )
  }

  get bodyAnimStyle() {
    return {
      transform: [
        {translateX: this.state.pan}
      ]
    }
  }

  renderBody() {
    const {onPress} = this.props
    // const onPress = null

    const Component = onPress == null ? View : TouchableOpacity
    const pressProps = onPress == null ? {} : {onPress}

    return (
      <Animated.View style={[$.body, this.bodyAnimStyle]} {...this.panResponder.panHandlers}>
        <Component style={$.button} {...pressProps}>
          {this.renderIcon()}
          <View style={$.labels}>
            {this.renderCaption()}
            {this.renderDetail()}
          </View>
          {this.renderAccessory()}
        </Component>
      </Animated.View>
    )
  }

  renderIcon() {
    const {icon} = this.props
    if (icon == null) { return null }

    if (typeof icon === 'string') {
      return React.createElement((images as any)[icon], {style: $.icon})
    } else {
      return <View style={$.icon}>{icon}</View>
    }
  }

  renderCaption() {
    const {caption} = this.props
    if (caption == null) { return null }

    return (
      <Label style={$.caption}>
        {caption}
      </Label>
    )
  }

  renderDetail() {
    const {detail} = this.props
    if (detail == null) { return null }

    return (
      <Label style={$.detail}>
        {detail}
      </Label>
    )
  }

  renderAccessory() {
    const {accessory} = this.props
    if (accessory == null) { return null }

    if (typeof accessory === 'string') {
      return React.createElement((images as any)[accessory], {style: $.accessory})
    } else {
      return <View style={$.accessory}>{accessory}</View>
    }
  }

  renderActions() {
    const {actions} = this.props
    if (actions == null) { return null }

    return (
      <View style={[$.actionsContainer, {backgroundColor: actions[0].color.string()}]}>
        <View style={$.actions} onLayout={this.onActionsLayout}>
          {actions.map((action, index) => this.renderAction(action, index))}
        </View>
      </View>
    )
  }

  renderAction(action: Action, index: number) {
    const {color, icon, label, onPress} = action

    return (
      <TouchableHighlight
        key={index}
        underlayColor={color.darken(0.1).string()}
        style={[$.action, {backgroundColor: color.string()}]}
        onPress={onPress}
      >
        <View style={$.actionContent}>
          {React.createElement((images as any)[icon], {style: $.actionIcon, color: colors.fg.normal})}
          <Label style={$.actionLabel} small>{label}</Label>
        </View>
      </TouchableHighlight>
    )
  }

  onActionsLayout = (e: LayoutChangeEvent) => {
    this.setState({actionsWidth: e.nativeEvent.layout.width})
  }

}

const $ = StyleSheet.create({
  row: {
  },

  body: {
    backgroundColor: colors.bg.normal,
    marginLeft:  -100,
    paddingLeft: 100
  },

  button: {
    flex:          1,
    flexDirection: 'row',
    alignItems:    'center',
    padding:       layout.padding.l,
  },

  icon: {
    marginRight: layout.padding.l
  },

  labels: {
    flex: 1
  },

  caption: {

  },

  detail: {
    marginTop: layout.padding.xs
  },

  accessory: {
    marginLeft:  layout.padding.l,
    marginRight: layout.padding.m - layout.padding.l
  },

  actionsContainer: {
    ...layout.overlay,
    flexDirection:  'row',
    justifyContent: 'flex-end'
  },

  actions: {
    flexDirection:  'row',
  },

  action: {

  },

  actionContent: {
    flex:           1,
    padding:        layout.padding.s,
    alignItems:     'center',
    justifyContent: 'center'
  },

  actionIcon: {
    width:     20,
    height:    20
  },

  actionLabel: {
    marginTop: layout.padding.s
  }

})