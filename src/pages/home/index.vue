<template>
  <div>
    <router-link to="/bar">home</router-link>
    <div @click="layout = LayoutMode.Top">top</div>
    <div @click="layout = LayoutMode.Side">side</div>
    <div @click="layout = LayoutMode.Mix">mix</div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { LayoutMode } from '@/utils/enums'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()

const { layout } = storeToRefs(appStore)
</script>

<style lang="scss" scoped></style>
