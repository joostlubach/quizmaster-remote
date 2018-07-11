import * as React from 'react'
import {Image, ViewProperties, ImageProperties} from 'react-native'
import Color from 'color'

import * as imageSources from './images'

type OtherImageProperties = Omit<ImageProperties, 'source'> & {color?: Color}
type BoundImageComponent = React.SFC<Omit<ViewProperties, 'style'> & OtherImageProperties>

export const images = createImageSFCs(imageSources)

function createImageSFCs<K extends string>(sources: {[k in K]: any}): {[key in K]: BoundImageComponent} {
  const components: {[key in K]?: BoundImageComponent} = {}

  for (const key of (Object.keys(sources) as Array<K>)) {
    const source = sources[key]
    components[key] = (props: OtherImageProperties) => {
      const {style, color, ...other} = props
      return <Image source={source} style={[style, {tintColor: color == null ? undefined : color.string()}]} {...other}/>
    }
  }

  return components as {[key in K]: BoundImageComponent}
}