<template>
  <ProTable :request="getUserListApi">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="Name" />
  </ProTable>
</template>

<script setup lang="ts">
import { getUserListApi } from '@/api/user'
</script>

<style lang="scss" scoped></style>
