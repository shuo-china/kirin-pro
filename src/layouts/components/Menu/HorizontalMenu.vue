<template>
  <el-menu
    class="h-full border-none!"
    :default-active="activeMenu?.path"
    :unique-opened="true"
    :collapse-transition="false"
    mode="horizontal"
    v-bind="$attrs"
  >
    <MenuItem v-for="menu in menus" :key="menu.path" :menu="menu" />
  </el-menu>
</template>

<script setup lang="ts">
import { Menu } from '@/store/menu'
import MenuItem from './MenuItem.vue'

defineOptions({
  inheritAttrs: false
})

interface Props {
  menus: Menu[]
  activeMenu: Nullable<Menu>
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.el-menu {
  --el-menu-bg-color: transparent;
  --el-menu-item-height: 55px;
}
</style>
