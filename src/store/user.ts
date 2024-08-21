import { defineStore } from 'pinia'
import { StoreId } from '@/utils/enums'
import { getUserInfoApi, loginApi, LoginRequestData } from '@/api/user'
import { useLocalStorage } from '@vueuse/core'
import { TOKEN_KEY } from '@/utils/constants'

export interface UserInfo {
  id: number
  name: string
  roles: string[]
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
    const { id, name } = await getUserInfoApi()
    userInfo.value = {
      id,
      name,
      roles: []
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
