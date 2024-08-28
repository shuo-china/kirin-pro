<template>
  <ProTable :request="getUserListApi">
    <ProTableColumn prop="id" label="ID" />
    <ProTableColumn prop="depart.depart_name" label="部门" search />
    <ProTableColumn prop="name" label="姓名" search />
    <ProTableColumn prop="last_login_ip" label="末次登录IP" search />
    <ProTableColumn prop="create_time" label="创建时间" search search-type="date-picker" />
  </ProTable>
</template>

<script setup lang="ts">
import { getUserListApi } from '@/api/user'
</script>
