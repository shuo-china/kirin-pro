<template>
  <ProTable :request="getUserListApi">
    <ProTableColumn prop="id" label="id" search />
    <ProTableColumn prop="name" label="姓名" search />
    <ProTableColumn prop="last_login_ip" label="IP" />
  </ProTable>
</template>

<script setup lang="ts">
import { getUserListApi } from '@/api/user'
</script>

<style lang="scss" scoped></style>
