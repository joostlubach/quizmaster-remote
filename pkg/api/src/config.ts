import {APIError, Headers} from '.'

export interface Config {
  baseURL:      string | null,
  extraHeaders: Headers,

  onError:      (error: APIError) => any
  onLogRequest: (level: string, message: string, details: string[]) => any
}

const config: Config = {
  baseURL:      null,
  extraHeaders: {},

  onError:      () => void 0,
  onLogRequest: () => void 0
}

export default config

export function configure(cfg: Partial<Config>) {
  Object.assign(config, cfg)
}