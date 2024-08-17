<template>
  <el-container class="h-full">
    <el-header>
      <Menu :menus="firstLevelMenus" :active-menu="firstLevelActiveMenu" mode="horizontal" />
    </el-header>
    <el-container>
      <el-aside v-if="secondLevelMenus" width="200px">
        <Menu :menus="secondLevelMenus" :active-menu="activeMenu" />
      </el-aside>
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useMenus } from '@/hooks/useMenus'
import AppMain from '@/layouts/components/AppMain.vue'
import Menu from '@/layouts/components/Menu/index.vue'

const { menus, activeMenu, activeMenuPath } = useMenus()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firstLevelMenus = computed(() => menus.value.map(({ children, ...m }) => m))
const firstLevelActiveMenu = computed(() => activeMenuPath.value[0])

const secondLevelMenus = computed(() => firstLevelActiveMenu.value?.children || [])
</script>

<style lang="scss" scoped></style>
