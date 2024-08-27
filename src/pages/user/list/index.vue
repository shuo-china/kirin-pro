<template>
  <ProTable :request="getUserListApi">
    <ProTableColumn prop="id" label="ID" search />
    <ProTableColumn prop="name" label="姓名" search />
  </ProTable>
</template>

<script setup lang="ts">
import { getUserListApi } from '@/api/user'
</script>

<style lang="scss" scoped></style>
