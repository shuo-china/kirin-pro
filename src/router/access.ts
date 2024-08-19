import { UserInfo } from '@/store/user'
import { RouteLocationNormalizedGeneric, RouteRecordRaw } from 'vue-router'

export default function access(
  userInfo: UserInfo,
  route: RouteRecordRaw | RouteLocationNormalizedGeneric
) {
  if (route.path === '/demo/form') {
    return false
  }
  return true
}
