<template>
  <el-menu
    class="border-none"
    :default-active="activeMenu?.path"
    :unique-opened="true"
    :collapse-transition="false"
    router
    v-bind="attrs"
  >
    <MenuItem v-for="menu in menus" :key="menu.path" :menu="menu"></MenuItem>
  </el-menu>
</template>

<script setup lang="ts">
import { Menu } from '@/hooks/useMenus'
import MenuItem from './MenuItem.vue'

const attrs = useAttrs()

interface Props {
  menus: Menu[]
  activeMenu: Nullable<Menu>
}

defineProps<Props>()
</script>

<style lang="scss" scoped></style>
