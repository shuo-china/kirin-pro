<template>
  <el-container class="h-full">
    <el-header>
      <Menu :menus="menus" :active-menu="activeMenu" mode="horizontal" />
    </el-header>
    <el-main>
      <AppMain />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import Menu from '@/layouts/components/Menu/index.vue'
import AppMain from '@/layouts/components/AppMain.vue'
import { useMenus } from '@/hooks/useMenus'

const { menus, activeMenu } = useMenus()
</script>

<style lang="scss" scoped></style>
