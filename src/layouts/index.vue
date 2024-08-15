<template>
  <div>
    <Side v-if="appStore.layout === LayoutMode.Side" />
    <el-button @click="handleLogout">退出登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { useUserStore } from "@/store/user";
import { LayoutMode } from "@/utils/enums";
import Side from "./Side.vue";

const appStore = useAppStore();
const userStore = useUserStore();
const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped></style>
