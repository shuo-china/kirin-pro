<template>
  <el-menu
    class="border-none!"
    :default-active="activeMenu?.path"
    :unique-opened="true"
    :collapse-transition="false"
    :collapse="appStore.sidebarCollapsed"
    mode="vertical"
    v-bind="$attrs"
  >
    <MenuItem v-for="menu in menus" :key="menu.path" :menu="menu" />
  </el-menu>
</template>

<script setup lang="ts">
import { Menu } from '@/store/menu'
import MenuItem from './MenuItem.vue'
import { useAppStore } from '@/store/app'

defineOptions({
  inheritAttrs: false
})

interface Props {
  menus: Menu[]
  activeMenu: Nullable<Menu>
}

defineProps<Props>()

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.el-menu {
  --el-menu-bg-color: transparent;
}
</style>
