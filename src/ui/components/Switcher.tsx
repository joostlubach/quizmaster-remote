import * as React from 'react'
import {StyleSheet, View, Animated} from 'react-native'
import {layout} from '@ui/styles'

export interface Props {
  activeStep: string
  style?:     ViewStyleProp
}

export interface StepProps {
  name:      string
  children?: React.ReactNode
  style?:    ViewStyleProp
}

interface State {
  currentStepIndex: number | null
  nextStepIndex:    number | null
  switchValue:      Animated.Value
}

export default class Switcher extends React.Component<Props, State> {

  static Step = Step

  state: State = {
    currentStepIndex: null,
    nextStepIndex:    null,
    switchValue:      new Animated.Value(0)
  }

  animation: Animated.CompositeAnimation | null = null

  animStyleForStep(value: Animated.Value | Animated.AnimatedInterpolation) {
    return {
      opacity:   value.interpolate({inputRange: [0, 1], outputRange: [1, 0]}),
      transform: [
        {translateY: Animated.multiply(value, -40)}
      ]
    }
  }

  findStep(name: string) {
    return this.steps.find(step => step.props.name === name)
  }

  findStepIndex(name: string) {
    return this.steps.findIndex(step => step.props.name === name)
  }

  get steps(): React.ReactElement<StepProps>[] {
    const {currentStepIndex, nextStepIndex, switchValue} = this.state

    const steps: React.ReactElement<StepProps>[] = []
    let index = 0

    React.Children.forEach(this.props.children, child => {
      if (!React.isValidElement(child)) { return }
      if (child.type !== Step) { return }

      const props: any = {...child.props}
      props.key = props.name
      if (index === currentStepIndex) {
        props.animStyle = this.animStyleForStep(switchValue)
      }
      if (index === nextStepIndex) {
        props.animStyle = this.animStyleForStep(switchValue.interpolate({
          inputRange:  [0, 1],
          outputRange: [1, 0]
        }))
      }

      steps.push(React.cloneElement(child, props) as any)
      index++
    })

    return steps
  }

  switch(nextStep: string) {
    if (this.animation) {
      this.animation.stop()
    }

    const nextStepIndex = this.findStepIndex(nextStep)
    this.setState({
      nextStepIndex
    }, () => {
      this.state.switchValue.setValue(0)
      this.animation = Animated.timing(this.state.switchValue, {
        toValue:         1,
        duration:        300,
        useNativeDriver: true
      })

      this.animation.start(() => {
        this.setState({
          currentStepIndex: nextStepIndex,
          nextStepIndex:    null,
          switchValue:      new Animated.Value(0)
        })
      })
    })
  }

  componentWillMount() {
    this.setState({
      currentStepIndex: this.findStepIndex(this.props.activeStep)
    })
  }

  componentWillReceiveProps(props: Props) {
    if (props.activeStep !== this.props.activeStep) {
      this.switch(props.activeStep)
    }
  }

  render() {
    const {currentStepIndex, nextStepIndex} = this.state

    return (
      <View style={$.switcher}>
        {currentStepIndex != null && this.steps[currentStepIndex]}
        {nextStepIndex != null && this.steps[nextStepIndex]}
      </View>
    )
  }

}

export function Step(props: StepProps) {
  const {animStyle} = props as any

  return (
    <Animated.View style={[$.step, props.style, animStyle]}>
      {props.children}
    </Animated.View>
  )
}

const $ = StyleSheet.create({
  switcher: {
    flex: 1
  },

  step: {
    ...layout.overlay
  }
})