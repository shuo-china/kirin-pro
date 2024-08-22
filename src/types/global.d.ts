import { pagination } from '@/config'

export {}

declare global {
  type Nullable<T> = null | T

  type ApiErrorData = {
    code: string
    message: string
  }

  interface Config {
    title: string
    logo: string
    layout: LayoutMode
    apiBaseURL: string
    pagination: typeof pagination
  }

  type Pagination<T = any> = Record<Config['pagination']['responseTotalKey'], number> & {
    [k in Config['pagination']['responseDataKey']]: T[]
  }
}
