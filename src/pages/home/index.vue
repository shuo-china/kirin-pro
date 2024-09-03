<template>
  <div>
    {{ loading }}
    {{ data }}
    <button @click="run">开始</button>
    <button @click="cancel">取消</button>
  </div>
</template>

<script setup lang="ts">
import useRequest from '@/hooks/useRequest'
import { getUserInfoApi } from '@/api/user'

const { data, loading, run, cancel } = useRequest(getUserInfoApi, { pollingInterval: 5000 })
</script>
