<template>
  <el-dropdown>
    <div class="flex cursor-pointer items-center rounded p-2.5 outline-none hover:bg-black/3">
      <el-avatar shape="circle" :size="28" :src="defaultAvatarPng"></el-avatar>
      <span class="pl-2 text-black/45">
        {{ userStore.userInfo?.name ? userStore.userInfo?.name : '' }}
      </span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
import defaultAvatarPng from '@/assets/default_avatar.png'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped></style>
