<template>
  <div class="h-full flex items-center border-b border-b-black/7 border-b-style-solid px-4">
    <slot name="left"></slot>
    <div class="flex-grow"></div>
    <AvatarDropdown></AvatarDropdown>
  </div>
</template>

<script setup lang="ts">
import AvatarDropdown from '@/layouts/components/AvatarDropdown/index.vue'
</script>

<style lang="scss" scoped></style>
