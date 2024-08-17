<template>
  <div class="h-full flex flex-col justify-between border-r border-r-black/7 border-r-style-solid">
    <div class="h-14 flex flex-shrink-0 items-center px-5">
      <Logo />
    </div>
    <el-scrollbar class="flex-grow">
      <slot></slot>
    </el-scrollbar>
    <div class="flex-shrink-0 px-5 py-3">footer</div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/layouts/components/Logo/index.vue'
</script>

<style lang="scss" scoped></style>
