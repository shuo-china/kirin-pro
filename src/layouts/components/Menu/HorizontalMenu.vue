<template>
  <el-menu
    class="h-[calc(theme('height.navigationbar')-1px)] border-none!"
    background-color="transparent"
    :default-active="activeMenu?.path"
    :unique-opened="true"
    :collapse-transition="false"
    router
    mode="horizontal"
    v-bind="attrs"
  >
    <MenuItem v-for="menu in menus" :key="menu.path" :menu="menu" />
  </el-menu>
</template>

<script setup lang="ts">
import { Menu } from '@/store/menu'
import MenuItem from './MenuItem.vue'

const attrs = useAttrs()

interface Props {
  menus: Menu[]
  activeMenu: Nullable<Menu>
}

defineProps<Props>()
</script>

<style lang="scss" scoped></style>
