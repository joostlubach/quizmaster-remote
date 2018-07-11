import * as React from 'react'
import {StyleSheet, View, TouchableOpacity, Image, ScrollView, LayoutChangeEvent} from 'react-native'
import {shadows, layout} from '@ui/styles'
import * as images from '@res/team-images'
import {times} from 'lodash'
import {TeamImage} from '@src/stores'

export interface Props {
  image:    TeamImage
  onChange: (image: TeamImage) => any

  style?: ViewStyleProp
}

interface State {
  size:       Size | null
  rowCount:   number | null
  buttonSize: number | null
}

export default class ImageSelector extends React.Component<Props> {

  state: State = {
    size:       null,
    rowCount:   null,
    buttonSize: null
  }

  setSize(size: Size) {
    // Measure optimal button size and row count.
    const sizeChanged   = this.state.size == null || size.width === this.state.size.width || size.height !== this.state.size.height
    const heightChanged = this.state.size == null || size.height !== this.state.size.height

    if (sizeChanged) {
      this.setState({size})
    }
    if (heightChanged) {
      this.measure(size)
    }
  }

  measure(size: Size) {
    // Calculate the row count and the actual button size if we make the buttons as large as possible.
    let rowCount:   number
    for (
      rowCount = Math.ceil((size.height + gap) / (maxButtonSize + gap));
      rowCount > 1;
      rowCount--
    ) {
      const buttonSize = (size.height + gap) / rowCount - gap

      // If this is larger than the minimum button size, we're done.
      if (buttonSize > minButtonSize) {
        break
      }
    }

    this.setState({
      rowCount,
      buttonSize: (size.height + gap) / rowCount - gap
    })
  }

  get columnCount(): number {
    const {rowCount} = this.state
    if (rowCount == null) { return 0 }

    return Math.ceil(Object.keys(images).length / rowCount)
  }

  render() {
    const {style} = this.props

    return (
      <View style={[$.imageSelector, style]} onLayout={this.onLayout}>
        <ScrollView
          horizontal
          contentContainerStyle={$.buttonsContent}
          showsHorizontalScrollIndicator={false}
        >
          {times(this.columnCount, column => this.renderButtonColumn(column))}
        </ScrollView>
      </View>
    )
  }

  renderButtonColumn(column: number) {
    const {rowCount} = this.state
    if (rowCount == null) { return null }

    const imageKeys = Object.keys(images)
    const start     = column * rowCount
    const end       = (column + 1) * rowCount

    return (
      <View style={$.buttonColumn} key={column}>
        {imageKeys.slice(start, end).map(key => this.renderButton(key))}
      </View>
    )
  }

  renderButton(imageKey: TeamImage) {
    const {buttonSize} = this.state
    if (buttonSize == null) { return null }

    const image    = images[imageKey]
    const selected = image === this.props.image

    const buttonStyle = {
      width:        buttonSize,
      height:       buttonSize,
      borderRadius: buttonSize / 2
    }
    const imageStyle = {
      width:  buttonSize,
      height: buttonSize,
    }

    return (
      <TouchableOpacity
        key={imageKey}
        style={[$.button, selected && $.buttonSelected, buttonStyle]}
        onPress={this.props.onChange.bind(null, imageKey)}
      >
        <Image source={image} style={[$.image, imageStyle]}/>
      </TouchableOpacity>
    )
  }

  onLayout = (event: LayoutChangeEvent) => {
    this.setSize(event.nativeEvent.layout)
  }

}

const minButtonSize = 54
const maxButtonSize = 64
const gap = layout.padding.m

const $ = StyleSheet.create({
  imageSelector: {
    flexDirection: 'column',
    alignItems:    'center',
  },

  buttonsContent: {
    flexDirection: 'row',
    paddingLeft:   layout.padding.l,
    paddingRight:  layout.padding.l - gap,
  },

  buttonColumn: {
    marginRight:     gap,
    marginBottom:    -gap
  },

  button: {
    marginBottom: gap
  },

  buttonSelected: {
    ...shadows.depth(2)
  },

  image: {
  }
})