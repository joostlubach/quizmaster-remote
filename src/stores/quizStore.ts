import {observable} from 'mobx'
import socketStore from './socketStore'
import Collection from './Collection'

export interface ConnectRequest {
  uuid: string
}

export interface Quiz {
  id:    string
  title: string
}

export class QuizStore {

  @observable
  readonly quizzes: Collection<Quiz> = new Collection<Quiz>('quizzes')

  async joinSession(uuid: string): Promise<ConnectRequest> {
    const {socket} = socketStore
    return await socket.emitPromise('session:join', uuid)
  }

}

export default new QuizStore()