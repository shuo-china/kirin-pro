<template>
  <a v-if="isExternal(to)" :href="to" target="_blank">
    <slot />
  </a>
  <router-link v-else :to="to">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'

interface Props {
  to: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped></style>
