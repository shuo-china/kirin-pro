import { pagination } from '@/config'

export {}

declare global {
  type Nullable<T> = null | T

  type ApiErrorData = {
    code: string
    message: string
  }

  type PaginationConfig = typeof pagination

  type UploadConfigKey = 'image' | 'file'

  type UploadConfigItem = {
    apiURL: string
    limitExt: string | string[]
    limitSize: number
  }

  type UploadConfig = {
    [K in UploadConfigKey]: UploadConfigItem
  }

  type WechatConfig = {
    appid: string
    redirectUri: string
  }

  interface Config {
    title: string
    logo: string
    layout: LayoutMode
    apiBaseURL: string
    pagination: PaginationConfig
    upload: UploadConfig
    wechat: WechatConfig
  }

  type Pagination<T = any> = Record<PaginationConfig['responseTotalKey'], number> & {
    [k in PaginationConfig['responseDataKey']]: T[]
  }

  type UnRef<T> = T extends Ref<infer V> ? V : T

  type UploadResult = {
    id: number
    name: string
    path: string
    size: string
  }
}
