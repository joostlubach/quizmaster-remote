declare module 'react-native-qrcode-scanner' {
  import React from 'react'
  import {NodeHandle, StyleProp, ViewStyle} from 'react-native'
  
  export interface ReadEvent {
    target: NodeHandle
    type:   string
    data:   string
    bounds: {
      origin: {x: number, y: number}
      size:   {width: number, height: number}
    }
  }

  interface Props {
    onRead: (event: ReadEvent) => void

    fadeIn?:     boolean

    reactivate?: boolean
    reactivateTimeout?: number

    topContent?:    React.ReactNode
    bottomContent?: React.ReactNode

    containerStyle?:  StyleProp<ViewStyle>
    cameraStyle?:     StyleProp<ViewStyle>
    topViewStyle?:    StyleProp<ViewStyle>
    bottomViewStyle?: StyleProp<ViewStyle>

    showMarker?: boolean

    notAuthorizedView?:        React.ReactNode
    checkAndroid6Permissions?: boolean
    permissionDialogTitle?:    string
    permissionDialogMessage?:  string
  }

  export default class QRCodeScanner extends React.Component<Props> {
    reactivate(): void
  }
}