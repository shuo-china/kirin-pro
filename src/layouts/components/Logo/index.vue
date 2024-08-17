<template>
  <div class="flex items-center">
    <img :src="logo" alt="logo" class="h-[22px] w-auto" />
    <h1 class="ml-2 text-lg text-black/88">{{ config.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg'
import config from '@/config'
</script>

<style lang="scss" scoped></style>
