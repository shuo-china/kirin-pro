<template>
  <el-container class="h-full">
    <el-aside width="200px">
      <Menu :menus="menus" :active-menu="activeMenu"></Menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useMenus } from "@/hooks/useMenus";
import AppMain from "@/layouts/components/AppMain.vue";
import Menu from "@/layouts/components/Menu/index.vue";

const { menus, activeMenu } = useMenus();
</script>

<style lang="scss" scoped></style>
