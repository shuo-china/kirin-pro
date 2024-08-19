<template>
  <div class="flex gap-4">
    <button @click="layout = LayoutMode.Top">top</button>
    <button @click="layout = LayoutMode.Side">side</button>
    <button @click="layout = LayoutMode.Mix">mix</button>
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
