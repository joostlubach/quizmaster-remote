import {observable, action, computed, toJS} from 'mobx'
import {SocketError} from 'socket.io-promise'
import socketStore from './socketStore'

export interface LoadResult<T> {
  data: T
}

export interface SaveResult<T> {
  data: T
}

export default class Document<T> {

  constructor(readonly resource: string) {}

  @observable
  data: T | null = null

  @computed
  get isSet() {
    return this.data != null
  }

  @observable
  loading: boolean = false

  @observable
  saving: boolean = false

  @observable
  loadError: Error | null = null

  @observable
  saveError: Error | null = null

  build(data: T) {
    this.data = data
  }

  load(id: string) {
    this.loading = true
    this.data = null
    this.loadError = null

    const promise = socketStore.socket.emitPromise(`${this.resource}:load`, id)
    return promise.then(this.onLoadSuccess, this.onLoadError)
  }

  onLoadSuccess = action((result: LoadResult<T>) => {
    this.data      = result.data
    this.loadError = null
    this.loading   = false
  })

  onLoadError = action((errorData: any) => {
    this.loadError = SocketError.deserialize(errorData)
    this.loading    = false
  })

  save() {
    this.saving = true
    this.saveError = null

    const promise = socketStore.socket.emitPromise(`${this.resource}:save`, toJS(this.data))
    return promise.then(this.onSaveSuccess, this.onSaveError)
  }

  onSaveSuccess = action((result: SaveResult<T>) => {
    this.data      = result.data
    this.saveError = null
    this.saving   = false
  })

  onSaveError = action((errorData: any) => {
    this.saveError = SocketError.deserialize(errorData)
    this.saving    = false
  })

  get<K extends keyof T>(key: K): T[K] | null {
    if (this.data == null) { return null }
    return this.data[key]
  }

  set<K extends keyof T>(key: K, value: T[K]) {
    if (this.data == null) { return }
    this.data[key] = value
  }

  update(data: Partial<T>) {
    if (this.data == null) { return }

    Object.assign(this.data, data)
    return this.save()
  }

}