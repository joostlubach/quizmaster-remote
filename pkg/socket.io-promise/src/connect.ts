import SocketIOClient from 'socket.io-client'
import SocketError from './SocketError'
import {setupLogging} from './logging'

export interface SocketIOPromise extends SocketIOClient.Socket {
  emitPromise(event: string, ...args: any[]): Promise<any>
}

export default function connect(uri: string, opts?: SocketIOClient.ConnectOpts): SocketIOPromise {
  const socket = SocketIOClient(uri, opts) as SocketIOPromise
  setupLogging(socket)

  socket.emitPromise = emitPromise
  return socket
}

function emitPromise<T>(this: SocketIOPromise, event: string, ...args: any[]): Promise<T> {
  return new Promise((resolve, reject) => {
    this.emit(event, ...args, (error?: any, result?: T) => {
      if (error != null) {
        reject(SocketError.deserialize(error))
      } else {
        resolve(result)
      }
    })
  })
}