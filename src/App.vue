<template>
  <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from "./store/user";

const userStore = useUserStore();
</script>

<style scoped></style>
