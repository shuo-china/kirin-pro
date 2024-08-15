import { defineStore } from "pinia";
import { StoreId } from "@/utils/enums";
import { getToken, removeToken, setToken } from "../utils/token";
import { getUserInfoApi, loginApi, LoginRequestData } from "../api/user";

interface UserInfo {
  username: string;
}

export const useUserStore = defineStore(StoreId.User, () => {
  const token = ref<Nullable<string>>(getToken() || null);
  const userInfo = ref<Nullable<UserInfo>>(null);

  const hasUserInfo = computed(() => userInfo.value !== null);

  const login = async (data: LoginRequestData) => {
    const result = await loginApi(data);
    setToken(result.access_token);
    token.value = result.access_token;
  };

  const getUserInfo = async () => {
    const result = await getUserInfoApi();
    userInfo.value = {
      username: result.username,
    };
  };

  const logout = () => {
    removeToken();
    token.value = null;
    userInfo.value = null;
  };

  return {
    hasUserInfo,
    login,
    getUserInfo,
    logout,
  };
});
