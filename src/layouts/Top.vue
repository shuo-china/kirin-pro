<template>
  <el-container class="h-full">
    <el-header class="h-auto px-0">
      <NavigationBar />
    </el-header>
    <el-main class="p-0">
      <AppMain />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import AppMain from '@/layouts/components/AppMain.vue'
import NavigationBar from '@/layouts/components/NavigationBar/index.vue'
</script>

<style lang="scss" scoped></style>
