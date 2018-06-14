import {observable} from 'mobx'
import {connect as connectSocket, SocketIOPromise} from 'socket.io-promise'

const uri = __DEV__ ? 'http://localhost:3003/screen' : 'https://connect.quizmaster.app/screen'

export class SocketStore {

  @observable
  socket!: SocketIOPromise

  connect() {
    this.socket = connectSocket(uri)
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