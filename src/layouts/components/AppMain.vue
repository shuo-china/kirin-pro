<template>
  <el-scrollbar class="h-[calc(100vh-theme('height.navigationbar'))] p-5">
    <router-view />
    <Footer />
  </el-scrollbar>
</template>

<script setup lang="ts">
import Footer from '@/layouts/components/Footer/index.vue'
</script>

<style lang="scss" scoped></style>
