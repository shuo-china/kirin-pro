import { LayoutMode } from './utils/enums'
import logoSvg from '@/assets/logo.svg'

export const pagination = {
  defaultPageSize: 15,
  requestPageKey: 'page',
  requestPageSizeKey: 'list_rows',
  responseTotalKey: 'total',
  responseDataKey: 'data'
} as const

const config: Config = {
  title: 'Kirin Pro',
  logo: logoSvg,
  layout: LayoutMode.Side,
  apiBaseURL: 'https://api.yuanjiazc.com/admin',
  pagination
}

export default config
