<template>
  <el-sub-menu v-if="menu.children" :index="menu.path">
    <template #title>
      <slot name="title" :item="menu"></slot>
      <component :is="menu.icon" v-if="menu.icon" class="mr-3 w-4 text-lg" />
      <span>{{ menu.title }}</span>
    </template>
    <MenuItem v-for="child in menu.children" :key="child.path" :menu="child"></MenuItem>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.path">
    <slot name="title2" :item="menu"></slot>
    <component :is="menu.icon" v-if="menu.icon" class="mr-3 w-4 text-lg" />
    <span>{{ menu.title }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
import type { Menu } from '@/hooks/useMenus'

interface Props {
  menu: Menu
}

defineProps<Props>()
</script>

<style lang="scss" scoped></style>
