<template>
  <ProTable :request="getUserListApi">
    <ProTableColumn prop="id" :label="label" />
    <ProTableColumn prop="depart.depart_name" label="部门" />
    <ProTableColumn
      prop="name"
      label="姓名万岁"
      search
      search-type="select"
      :search-options="options"
    />
    <ProTableColumn prop="last_login_ip" label="末次登录IP" />
    <ProTableColumn prop="create_time" label="创建时间啊啊" search search-type="date-picker" />
  </ProTable>
</template>

<script setup lang="ts">
import { getUserListApi } from '@/api/user'

const label = ref('ID')

const options = ref<any>([])

const handleClick = () => {
  options.value = [
    {
      label: 1,
      value: 1
    }
  ]
}
</script>
