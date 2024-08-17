<template>
  <el-breadcrumb>
    <el-breadcrumb-item
      v-for="breadcrumb in breadcrumbs"
      :key="breadcrumb.key"
      :to="{ path: breadcrumb.path }"
      >{{ breadcrumb.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { Menu } from '@/hooks/useMenus'

interface Props {
  breadcrumbs: Menu[]
}

defineProps<Props>()
</script>

<style lang="scss" scoped></style>
