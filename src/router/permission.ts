import router from '@/router'
import access from '@/router/access'
import { useUserStore } from '@/store/user'
import { isTokenInvalidError } from '@/utils/request'

const unAuthenticatedWhiteList = ['/login']
const authenticatedWhiteList = ['/403', '/404']

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore()

  if (!userStore.token) {
    if (unAuthenticatedWhiteList.includes(to.path)) {
      return next()
    } else {
      return next('/login')
    }
  }

  if (to.path === '/login') {
    return next('/')
  }

  if (!userStore.hasUserInfo) {
    try {
      await userStore.getUserInfo()
    } catch (error) {
      if (!isTokenInvalidError(error)) {
        userStore.logout()
        return next('/login')
      }
    }
  }

  if (authenticatedWhiteList.includes(to.path)) {
    return next()
  }

  for (const route of to.matched) {
    if (!access(userStore.userInfo!, route.path, route.meta)) {
      return next('/403')
    }
  }

  return next()
})
