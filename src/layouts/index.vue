<template>
  <div class="app-bg h-full">
    <Side v-if="appStore.layout === LayoutMode.Side" />
    <Top v-if="appStore.layout === LayoutMode.Top" />
    <Mix v-if="appStore.layout === LayoutMode.Mix" />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { LayoutMode } from '@/utils/enums'
import Side from './Side.vue'
import Top from './Top.vue'
import Mix from './Mix.vue'

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.app-bg {
  background: linear-gradient(#fff, #f5f5f5 100px);
}
</style>
