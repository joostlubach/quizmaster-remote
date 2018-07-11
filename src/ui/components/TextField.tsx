import * as React from 'react'
import {StyleSheet, View, TextInput} from 'react-native'
import {colors, layout, fonts} from '@ui/styles'
import {omit} from 'lodash'

export interface Props {
  value:     string
  onChange?: (value: string) => any
  onCommit?: (value: string) => any

  autoFocus?: boolean

  center?: boolean
  small?:  boolean
  large?:  boolean
  style?:  ViewStyleProp
}

interface State {
  value: string
}

export default class TextField extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {value: props.value}
  }

  textInput: TextInput | null = null

  focusSoon() {
    setTimeout(() => {
      if (this.textInput) {
        this.textInput.focus()
      }
    }, 0)
  }

  componentWillReceiveProps(props: Props) {
    if (props.value !== this.props.value && props.value !== this.state.value) {
      this.setState({value: props.value})
    }
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focusSoon()
    }
  }

  render() {
    const props = omit(this.props, 'style', 'value', 'onChange', 'onCommit', 'center', 'small', 'large')
    const styles: TextStyleProp = [
      $.textInput,
      this.props.center && {textAlign: 'center'},
      this.props.small && $.textInputSmall,
      this.props.large && $.textInputLarge
    ]

    return (
      <View style={[$.editor, this.props.style]}>
        <TextInput
          style={styles}
          ref={el => { this.textInput = el }}

          value={this.state.value}
          onChangeText={this.onChangeText}
          onBlur={this.onBlur}
          selectTextOnFocus={true}
          returnKeyType='done'
          {...props as any}
        />
      </View>
    )
  }

  onChangeText = (text: string) => {
    this.setState({value: text})
    if (this.props.onChange) {
      this.props.onChange(text)
    }
  }

  onBlur = () => {
    if (this.props.onCommit) {
      this.props.onCommit(this.state.value)
    }
  }

}

const $ = StyleSheet.create({
  editor: {
    backgroundColor: colors.white.alpha(0.1),
  },

  textInput: {
    backgroundColor: 'transparent',
    color:           colors.fg.normal,

    ...fonts.normal,
    padding:       layout.padding.s,
    paddingBottom: layout.padding.s - fonts.normal.fontSize * 0.2,
    height:        fonts.normal.fontSize + 2 * layout.padding.s - fonts.normal.fontSize * 0.2
  },

  textInputSmall: {
    ...fonts.small,
    paddingBottom: layout.padding.s - fonts.small.fontSize * 0.2,
    height:        fonts.small.fontSize + 2 * layout.padding.s - fonts.small.fontSize * 0.2
  },

  textInputLarge: {
    ...fonts.large,
    paddingBottom: layout.padding.s - fonts.large.fontSize * 0.2,
    height:        fonts.large.fontSize + 2 * layout.padding.s - fonts.large.fontSize * 0.2
  },
})