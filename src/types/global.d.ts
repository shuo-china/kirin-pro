import { pagination } from '@/config'

export {}

declare global {
  type Nullable<T> = null | T

  type ApiErrorData = {
    code: string
    message: string
  }

  type PaginationConfig = typeof pagination

  interface Config {
    title: string
    logo: string
    layout: LayoutMode
    apiBaseURL: string
    uploadURL: string
    pagination: PaginationConfig
  }

  type Pagination<T = any> = Record<PaginationConfig['responseTotalKey'], number> & {
    [k in PaginationConfig['responseDataKey']]: T[]
  }

  type UnRef<T> = T extends Ref<infer V> ? V : T
}
