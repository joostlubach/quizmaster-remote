import {observable} from 'mobx'
import socketStore from './socketStore'
import Collection from './Collection'
import Document from './Document'
import {colors} from '@ui/styles'
import {sample} from 'lodash'
import uuid from 'uuid/v4'
import * as teamImages from '@res/team-images'

export interface ConnectRequest {
  uuid: string
}

export interface Quiz {
  id?:   string
  title: string
  teams: Team[]
}

export interface Team {
  id?:   string
  name:  string
  color: string
  image: TeamImage
}

export type TeamImage = keyof typeof teamImages

class QuizDocument extends Document<Quiz> {

  constructor() {
    super('quizzes')
  }

  build() {
    super.build({
      title: "New quiz",
      teams: []
    })
  }

  getTeam(id: string): Team | null {
    const teams = this.get('teams')
    if (teams == null) { return null }

    return teams.find(team => team.id === id) || null
  }

  updateTeam(id: string | null, data: Team): Promise<void>
  updateTeam(id: string, data: Partial<Team>): Promise<void>
  async updateTeam(id: string | null, data: Team) {
    let teams = this.get('teams') || []

    if (id == null) {
      teams = [...teams, {id: uuid(), ...data}]
    } else {
      teams = teams.map(t => t.id === id ? {...t, ...data} : t)
    }

    await this.update({teams})
  }

  async removeTeam(id: string) {
    let teams = this.get('teams')
    if (teams == null) { return }

    teams = teams.filter(t => t.id !== id)
    await this.update({teams})
  }

  newTeam() {
    return {
      name:  "New team",
      color: sample(colors.teams)!.string(),
      image: sample(Object.keys(teamImages))!
    }
  }

}

export class QuizStore {

  @observable
  readonly quizzes: Collection<Quiz> = new Collection<Quiz>('quizzes')

  @observable
  readonly quiz: QuizDocument = new QuizDocument()

  async joinSession(uuid: string): Promise<ConnectRequest> {
    const {socket} = socketStore
    return await socket.emitPromise('session:join', uuid)
  }

}

export default new QuizStore()