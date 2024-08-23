<template>
  <div class="h-full flex flex-col overflow-auto">
    <div class="flex-grow p-6">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '@/layouts/components/Footer/index.vue'
</script>

<style lang="scss" scoped></style>
