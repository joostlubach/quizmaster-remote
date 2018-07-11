import * as React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {layout, colors} from '@ui/styles'
import {Circle} from '@ui/components'
import {Team} from '@src/stores'
import * as teamImages from '@res/team-images'

export interface Props {
  team:   Team
  size:   number
  style?: ViewStyleProp
}

export default function TeamBadge(props: Props) {
  const {size, style} = props
  const {color, image} = props.team

  const sizeStyle = {
    width:  size,
    height: size
  }
  const imageStyle = {
    width:      size - 2 * layout.padding.xs,
    height:     size - 2 * layout.padding.xs,
    marginLeft: -(size - 2 * layout.padding.xs) / 2
  }

  return (
    <View style={[$.badge, style, sizeStyle]}>
      <Circle style={[$.circle, {backgroundColor: color}, sizeStyle]}/>
      <Image style={[$.image, imageStyle]} source={teamImages[image]}/>
    </View>
  )
}

const $ = StyleSheet.create({
  badge: {
    marginBottom: layout.padding.l - 2 * layout.padding.xs
  },

  circle: {
    position: 'absolute',
    backgroundColor: colors.white.alpha(0.1),
    borderWidth:     2,
    borderColor:     colors.white,
    ...layout.center
  },

  image: {
    position: 'absolute',
    top:      layout.padding.l,
    left:     '50%'
  }

})