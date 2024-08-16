<template>
  <el-button @click="handleLogout">退出登录</el-button>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped></style>
