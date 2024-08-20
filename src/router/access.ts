import { UserInfo } from '@/store/user'
import { RouteMeta } from 'vue-router'

export default function access(userInfo: UserInfo, path: string, meta?: RouteMeta) {
  // if (path === 'xxx') {
  //   return false
  // }
  return true
}
