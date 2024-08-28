import { LayoutMode } from './utils/enums'

// const isDev = import.meta.env.MODE === 'development'

const apiBaseURL = 'https://api.yuanjiazc.com/admin'

export const pagination = {
  defaultPageSize: 15,
  requestPageKey: 'page',
  requestPageSizeKey: 'list_rows',
  responseTotalKey: 'total',
  responseDataKey: 'data'
} as const

const config: Config = {
  title: 'Kirin Pro',
  logo: '/logo.svg',
  layout: LayoutMode.Side,
  apiBaseURL,
  uploadURL: `${apiBaseURL}/files`,
  pagination
}

export default config
