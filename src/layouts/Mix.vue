<template>
  <el-container class="h-full">
    <el-header class="h-auto px-0">
      <NavigationBar />
    </el-header>
    <el-container>
      <el-aside v-if="secondLevelMenus.length" class="w-auto overflow-visible">
        <Sidebar />
      </el-aside>
      <el-main class="p-0">
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/store/menu'
import AppMain from '@/layouts/components/AppMain.vue'
import NavigationBar from '@/layouts/components/NavigationBar/index.vue'
import Sidebar from '@/layouts/components/Sidebar/index.vue'

const { secondLevelMenus } = storeToRefs(useMenuStore())
</script>

<style lang="scss" scoped></style>
