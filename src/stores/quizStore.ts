import socketStore from './socketStore'

export interface ConnectRequest {
  uuid: string
}

export class QuizStore {

  async connectRequest(): Promise<ConnectRequest> {
    const {socket} = socketStore
    return await socket.emitPromise('connect-request')
  }

}

export default new QuizStore()