<template>
  <Side v-if="appStore.layout === LayoutMode.Side" />
  <Top v-if="appStore.layout === LayoutMode.Top" />
  <Mix v-if="appStore.layout === LayoutMode.Mix" />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { LayoutMode } from '@/utils/enums'
import Side from './Side.vue'
import Top from './Top.vue'
import Mix from './Mix.vue'

const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
