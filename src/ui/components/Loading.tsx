import * as React from 'react'
import {StyleSheet, View, ActivityIndicator} from 'react-native'
import {layout} from '@ui/styles'

export interface Props {
}

export default function Loading(props: Props) {
  return (
    <View style={$.loading}>
      <ActivityIndicator size='large'/>
    </View>
  )
}

const $ = StyleSheet.create({
  loading: {
    flex: 1,
    ...layout.center
  }
})