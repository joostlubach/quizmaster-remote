import * as SocketIOClient from 'socket.io-client'
import {SocketIOPromise} from './connect'

export default function isPromiseSocket(socket: SocketIOClient.Socket): socket is SocketIOPromise {
  return typeof (socket as SocketIOPromise).emitPromise === 'function'
}