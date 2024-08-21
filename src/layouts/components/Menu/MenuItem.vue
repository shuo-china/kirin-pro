<template>
  <el-sub-menu v-if="menu.children" :index="menu.path">
    <template #title>
      <component :is="menu.icon" v-if="menu.icon" class="mr-3 w-4 text-lg" />
      <span>{{ menu.title }}</span>
    </template>
    <MenuItem v-for="child in menu.children" :key="child.path" :menu="child" />
  </el-sub-menu>
  <MenuItemLink v-else :to="menu.path">
    <el-menu-item :index="menu.path">
      <component :is="menu.icon" v-if="menu.icon" class="mr-3 w-4 text-lg" />
      <span>{{ menu.title }}</span>
    </el-menu-item>
  </MenuItemLink>
</template>

<script setup lang="ts">
import type { Menu } from '@/store/menu'
import MenuItemLink from '@/layouts/components/Menu/MenuItemLink.vue'

interface Props {
  menu: Menu
}

defineProps<Props>()
</script>

<style lang="scss" scoped></style>
