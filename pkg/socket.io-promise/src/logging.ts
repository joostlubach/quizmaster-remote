import * as SocketIOClient from 'socket.io-client'
import Logger from 'logger'
import {intercept} from './util'
import {isFunction} from 'lodash'

const logger = new Logger('Socket')
const logStyles = {color: '#aaa'}
const errorStyles = {color: '#f00'}

interface Packet {
  data: [string]
}

export function setupLogging(socket: SocketIOClient.Socket) {
  intercept(socket, 'emit', emit)
  intercept(socket, 'onevent', onevent)
}

function onevent(this: SocketIOClient.Socket, packet: Packet) {
  const {data: [...args]} = packet
  const event = args.shift()
  if (event === 'ping' || event === 'pong') { return }

  logger.info({text: `← ${event}`, styles: logStyles}, [`ID: ${this.id}`, 'ARGS:', ...args])
}

function emit(this: SocketIOClient.Socket, event: string, ...args: any[]) {
  if (event === 'ping' || event === 'pong') { return }

  if (isFunction(args[args.length - 1])) {
    return logWithCallback.call(this, event, args)
  } else {
    logger.info({text: `→ ${event}`, styles: logStyles}, [`ID: ${this.id}`, 'ARGS:', ...args])
  }
}

function logWithCallback(this: SocketIOClient.Socket, event: string, args: any[]) {
  const newArgs = [...args]
  const callback = newArgs.pop()

  const details = [
    `ID: ${this.id}`,
    'ARGS:',
    ...newArgs
  ]

  const handleTimeout = setTimeout(() => {
    logger.error({text: `↩ ${event} TIMEOUT`, styles: errorStyles}, details)
  }, 2000)

  const logResult = (error: Error | null, result: any) => {
    clearTimeout(handleTimeout)

    if (error) {
      logger.error({text: `↩ ${event}`, styles: errorStyles}, [...details, 'ERROR:', error])
    } else {
      logger.info({text: `↩ ${event}`, styles: logStyles}, [...details, 'RESULT:', result])
    }
    return callback!(error, result)
  }

  return [event, ...newArgs, logResult]
}