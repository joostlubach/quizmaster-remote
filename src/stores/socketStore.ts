import {observable} from 'mobx'
import {connect as connectSocket, SocketIOPromise} from 'socket.io-promise'
import Logger from 'logger'

const logger = new Logger('SocketStore')

// const uri = __DEV__ ? 'http://localhost:3003/remote' : 'https://connect.quizmaster.app/remote'
// const uri = __DEV__ ? 'http://192.168.178.179:3003/remote' : 'https://connect.quizmaster.app/remote'
const uri = __DEV__ ? 'http://172.20.10.3:3003/remote' : 'https://connect.quizmaster.app/remote'

export class SocketStore {

  @observable
  socket!: SocketIOPromise

  connect() {
    this.socket = connectSocket(uri)
    this.socket.once('connected', () => { logger.info("Connected") })
    this.socket.on('disconnect', this.onDisconnect)
  }

  disconnect() {
    if (this.socket == null) { return }

    this.socket.removeEventListener('disconnect', this.onDisconnect)
    this.socket.disconnect()
  }

  onDisconnect = () => {
    // If ever the socket gets hard disconnected, reconnect - we keep trying.
    setTimeout(() => { this.connect() }, 1000)
  }

}

export default new SocketStore()