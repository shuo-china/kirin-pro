import { defineStore } from 'pinia'
import { StoreId } from '@/utils/enums'
import { getUserInfoApi, loginApi, LoginRequestData } from '@/api/user'
import { useLocalStorage } from '@vueuse/core'
import { TOKEN_KEY } from '@/utils/constants'

export interface UserInfo {
  name: string
}

export const useUserStore = defineStore(StoreId.User, () => {
  const token = useLocalStorage<Nullable<string>>(TOKEN_KEY, null)
  const userInfo = ref<Nullable<UserInfo>>(null)

  const hasUserInfo = computed(() => userInfo.value !== null)

  const login = async (data: LoginRequestData) => {
    const result = await loginApi(data)
    token.value = result.access_token
  }

  const getUserInfo = async () => {
    const result = await getUserInfoApi()
    userInfo.value = {
      name: result.name
    }
  }

  const logout = () => {
    token.value = null
    userInfo.value = null
  }

  return {
    token,
    userInfo,
    hasUserInfo,
    login,
    getUserInfo,
    logout
  }
})
