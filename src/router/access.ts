import { UserInfo } from '@/store/user'
import { RouteMeta } from 'vue-router'

export default function access(userInfo: UserInfo, meta: RouteMeta | undefined, path: string) {
  return true
}
