<template>
  <div class="flex items-center">
    <img :src="config.logo" alt="logo" class="h-[22px] w-auto" />
    <h1 v-if="showTitle" class="ml-2 text-lg text-black/88">{{ config.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import config from '@/config'

interface Props {
  showTitle?: boolean
}

withDefaults(defineProps<Props>(), {
  showTitle: true
})
</script>

<style lang="scss" scoped></style>
