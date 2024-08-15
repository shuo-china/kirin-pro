<template>
  <div>
    <AppMain />
  </div>
</template>

<script setup lang="ts">
import AppMain from "./components/AppMain.vue";

const route = useRoute();
console.log(route.path);
console.log(route.fullPath);
console.log("--------------");
</script>

<style lang="scss" scoped></style>
