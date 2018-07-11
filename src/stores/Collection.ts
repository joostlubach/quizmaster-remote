import {observable, action, computed} from 'mobx'
import {SocketError} from 'socket.io-promise'
import socketStore from './socketStore'

interface Model {
  id?: string
}

export interface FetchResult<T extends Model> {
  data:  T[]
  next:  number | null
  total: number
}

export interface DeleteResult {
  deletedIDs: string[]
}

export default class Collection<T extends Model> {

  constructor(readonly resource: string) {}

  @observable
  data: T[] = []

  @computed
  get empty() {
    return this.data.length === 0
  }

  @observable
  loading: boolean = false

  @observable
  updating: boolean = false

  @observable
  fetchError: Error | null = null

  @observable
  deleteError: Error | null = null

  fetch(offset: number = 0) {
    this.loading = true
    this.fetchError = null

    const promise = socketStore.socket.emitPromise(`${this.resource}:fetch`, offset)
    return promise.then(this.onFetchSuccess, this.onFetchError)
  }

  onFetchSuccess = action((result: FetchResult<T>) => {
    this.data       = result.data
    this.fetchError = null
    this.loading    = false
  })

  onFetchError = action((errorData: any) => {
    this.fetchError = SocketError.deserialize(errorData)
    this.loading    = false
  })

  delete(id: string) {
    this.updating = true
    this.deleteError = null

    const promise = socketStore.socket.emitPromise(`${this.resource}:delete`, id)
    return promise.then(this.onDeleteSuccess, this.onDeleteError)

  }

  onDeleteSuccess = action((result: DeleteResult) => {
    this.data = this.data.filter(quiz => !result.deletedIDs.includes(quiz.id!))

    this.deleteError = null
    this.updating    = false
  })

  onDeleteError = action((errorData: any) => {
    this.deleteError = SocketError.deserialize(errorData)
    this.updating    = false
  })

}