import router from "@/router";
import access from "@/router/access";
import { getToken } from "@/utils/token";
import { useUserStore } from "@/store/user";
import { isTokenInvalidError } from "@/utils/request";

const whiteList = ["/login"];

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();
  const token = getToken();

  if (!token) {
    if (whiteList.includes(to.path)) {
      return next();
    } else {
      return next("/login");
    }
  }

  if (to.path === "/login") {
    return next("/");
  }

  if (!userStore.hasUserInfo) {
    try {
      await userStore.getUserInfo();
    } catch (error) {
      if (!isTokenInvalidError(error)) {
        userStore.logout();
        return next("/login");
      }
    }
  }

  if (!access(userStore.userInfo!, to)) {
    return next("/403");
  }

  return next();
});
