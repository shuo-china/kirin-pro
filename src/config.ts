import { LayoutMode } from './utils/enums'

// const isDev = import.meta.env.MODE === 'development'

const apiBaseURL = 'https://api.yuanjiazc.com/admin'

export const pagination = {
  defaultPageSize: 10,
  requestPageKey: 'page',
  requestPageSizeKey: 'list_rows',
  responseTotalKey: 'total',
  responseDataKey: 'data'
} as const

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

const config: Config = {
  title: 'Kirin Pro',
  logo: '/logo.svg',
  layout: LayoutMode.Side,
  apiBaseURL,
  pagination,
  upload
}

export default config
