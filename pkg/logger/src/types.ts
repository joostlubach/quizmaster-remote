export type LogLevel = 'info' | 'warning' | 'error'

export type Message = string | StyledMessage
export interface StyledMessage {
  text:   string,
  styles: Styles
}

export type Details  = any
export type Styles = {[key: string]: string}

export type LogListener = (component: string, level: LogLevel, message: string, details?: Details) => void

export interface Subscription {
  remove(): void
}