<template>
  <el-breadcrumb>
    <el-breadcrumb-item
      v-for="breadcrumb in menuStore.activeMenuPath"
      :key="breadcrumb.key"
      :to="{ path: breadcrumb.path }"
      >{{ breadcrumb.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/store/menu'

const menuStore = useMenuStore()
</script>

<style lang="scss" scoped></style>
