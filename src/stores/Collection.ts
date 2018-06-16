import {observable, action, computed} from 'mobx'
import {SocketError} from 'socket.io-promise'
import socketStore from './socketStore'

export interface FetchResult<T> {
  data:  T[]
  next:  number | null
  total: number
}

export default class Collection<T> {

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
  fetchError: Error | null = null

  fetch(offset: number = 0) {
    this.loading = true
    this.fetchError = null

    const promise = socketStore.socket.emitPromise(`${this.resource}:fetch`, offset)
    promise.then(this.onFetchSuccess, this.onFetchError)
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

}