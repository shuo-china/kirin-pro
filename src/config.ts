import { LayoutMode } from './utils/enums'
import logoSvg from '@/assets/logo.svg'

interface Config {
  title: string
  logo: string
  layout: LayoutMode
  apiBaseURL: string
}

const config: Config = {
  title: 'Kirin Pro',
  logo: logoSvg,
  layout: LayoutMode.Side,
  apiBaseURL: 'https://api.yuanjiazc.com/admin'
}

export default config
