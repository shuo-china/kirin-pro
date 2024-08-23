import { LayoutMode } from './utils/enums'

// const isDev = import.meta.env.MODE === 'development'

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
  apiBaseURL: 'https://api.yuanjiazc.com/admin',
  pagination
}

export default config
