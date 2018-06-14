import socketStore from './socketStore'

export interface ConnectRequest {
  uuid: string
}

export class QuizStore {

  async connectToScreen(uuid: string): Promise<ConnectRequest> {
    const {socket} = socketStore
    return await socket.emitPromise('remote-connect', uuid)
  }

}

export default new QuizStore()