import { LayoutMode } from './utils/enums'

// const isDev = import.meta.env.MODE === 'development'

const apiBaseURL = 'https://api.yuanjiazc.com/admin'

// 分页配置
export const pagination = {
  defaultPageSize: 10,
  requestPageKey: 'page',
  requestPageSizeKey: 'list_rows',
  responseTotalKey: 'total',
  responseDataKey: 'data'
} as const

// 上传配置
const upload = {
  image: {
    apiURL: `${apiBaseURL}/files`,
    limitExt: [],
    // 单位:KB
    limitSize: 0
  },
  file: {
    apiURL: `${apiBaseURL}/files`,
    limitExt: [],
    // 不限制
    limitSize: 0
  }
}

// 微信配置
const wechat = {
  appid: 'wx1595d2298d8fe48c',
  redirectUri: 'https://yuanjiazc.com/callback'
}

const config: Config = {
  title: 'Kirin Pro',
  logo: '/logo.svg',
  layout: LayoutMode.Side,
  apiBaseURL,
  pagination,
  upload,
  wechat
}

export default config
