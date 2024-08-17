<template>
  <el-container class="h-full bg-white/900">
    <el-aside class="w-50">
      <Sidebar>
        <Menu :menus="menus" :active-menu="activeMenu"></Menu>
      </Sidebar>
    </el-aside>
    <el-container>
      <el-header class="h-14 px-0">
        <NavigationBar>
          <template #left>
            <Breadcrumb :breadcrumbs="activeMenuPath"></Breadcrumb>
          </template>
        </NavigationBar>
      </el-header>
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
import Sidebar from '@/layouts/components/Sidebar/index.vue'
import NavigationBar from '@/layouts/components/NavigationBar/index.vue'
import Breadcrumb from '@/layouts/components/Breadcrumb/index.vue'

const { menus, activeMenu, activeMenuPath } = useMenus()
</script>

<style lang="scss" scoped></style>
