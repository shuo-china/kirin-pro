<template>
  <el-menu
    class="border-none!"
    background-color="transparent"
    :default-active="activeMenu?.path"
    :unique-opened="true"
    :collapse-transition="false"
    :collapse="appStore.sidebarCollapsed"
    router
    mode="vertical"
    v-bind="attrs"
  >
    <MenuItem v-for="menu in menus" :key="menu.path" :menu="menu" />
  </el-menu>
</template>

<script setup lang="ts">
import { Menu } from '@/store/menu'
import MenuItem from './MenuItem.vue'
import { useAppStore } from '@/store/app'

const attrs = useAttrs()

interface Props {
  menus: Menu[]
  activeMenu: Nullable<Menu>
}

defineProps<Props>()

const appStore = useAppStore()
</script>
