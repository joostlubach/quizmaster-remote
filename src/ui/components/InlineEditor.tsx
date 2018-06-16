import * as React from 'react'
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native'
import {Label} from '@ui/components'
import {colors, layout, fonts} from '@ui/styles'
import {pick} from 'lodash'

export interface Props {
  value:    string
  onCommit: (value: string) => any

  editOnPress?:      boolean
  editing?:          boolean
  initiallyEditing?: boolean

  center?: boolean
  small?:  boolean
  large?:  boolean
}

interface State {
  editing: boolean
  value:   string
}

export default class InlineEditor extends React.Component<Props, State> {

  state: State = {
    editing: false,
    value:   ''
  }

  textInput: TextInput | null = null

  focusSoon() {
    setTimeout(() => {
      if (this.textInput) {
        this.textInput.focus()
      }
    }, 0)
  }

  componentWillMount() {
    if (this.props.initiallyEditing) {
      this.setState({editing: true})
    }
    this.setState({value: this.props.value})
  }

  componentDidMount() {
    if (this.isEditing && this.textInput) {
      this.focusSoon()
    }
  }

  componentWillReceiveProps(props: Props) {
    if (props.value !== this.props.value) {
      this.setState({value: props.value})
    }

    const willBeEditing = props.editing != null ? props.editing : this.state.editing
    if (!this.isEditing && willBeEditing) {
      this.focusSoon()
    }
  }

  private get isEditing() {
    if (this.props.editing != null) {
      return this.props.editing
    } else {
      return this.state.editing
    }
  }

  render() {
    const {editOnPress = true} = this.props
    const Component = editOnPress && !this.isEditing ? TouchableOpacity : View
    const pressProps = editOnPress && !this.isEditing ? {onPress: this.onPress} : {}

    const styles: ViewStyleProp = [
      $.editor,
      this.props.center && {alignSelf: 'center'},
      this.isEditing && {alignSelf: 'stretch'}
    ]

    return (
      <Component style={styles} {...pressProps}>
        {!this.isEditing && this.renderViewMode()}
        {this.isEditing && this.renderEditMode()}
      </Component>
    )
  }

  renderViewMode() {
    return (
      <View style={$.viewMode}>
        <Label {...pick(this.props, 'small', 'large', 'huge')}>
          {this.props.value}
        </Label>
      </View>
    )
  }

  renderEditMode() {
    const styles: TextStyleProp = [
      $.textInput,
      this.props.center && {textAlign: 'center'},
      this.props.small && $.textInputSmall,
      this.props.large && $.textInputLarge
    ]

    return (
      <View style={$.editMode}>
        <TextInput
          style={styles}
          ref={el => { this.textInput = el }}

          {...this.props}
          value={this.state.value}
          onChangeText={this.onChangeText}
          selectTextOnFocus={true}
          returnKeyType='done'
          onBlur={this.onBlur}
        />
      </View>
    )
  }

  onPress = () => {
    this.setState({editing: true}, () => {
      this.focusSoon()
    })
  }

  onChangeText = (value: string) => {
    this.setState({value})
  }

  onBlur = () => {
    this.props.onCommit(this.state.value)
    this.setState({editing: false})
  }

}

const $ = StyleSheet.create({
  editor: {

  },

  viewMode: {
  },

  editMode: {
    backgroundColor: colors.white.alpha(0.35),
    borderWidth:     1,
    borderColor:     colors.white,
    borderRadius:    layout.radius.s,

    margin:         -layout.padding.s - 1,
  },

  textInput: {
    backgroundColor: 'transparent',
    color:           colors.fg.normal,

    ...fonts.normal,
    padding:       layout.padding.s,
    paddingBottom: layout.padding.s - fonts.normal.fontSize * 0.2,
    height:        fonts.normal.fontSize + 2 * layout.padding.s - fonts.normal.fontSize * 0.2
  },

  label: {

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