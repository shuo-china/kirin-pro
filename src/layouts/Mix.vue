<template>
  <el-container class="h-full">
    <el-header>
      <Menu
        :menus="firstLevelMenus"
        :active-menu="firstLevelActiveMenu"
        mode="horizontal"
      ></Menu>
    </el-header>
    <el-container>
      <el-aside width="200px" v-if="secondLevelMenus">
        <Menu :menus="secondLevelMenus" :active-menu="activeMenu"></Menu>
      </el-aside>
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

const { menus, activeMenu, ativeMenuPath } = useMenus();

const firstLevelMenus = computed(() =>
  menus.value.map(({ children, ...m }) => m)
);
const firstLevelActiveMenu = computed(() => ativeMenuPath.value[0]);

const secondLevelMenus = computed(
  () => firstLevelActiveMenu.value?.children || []
);
</script>

<style lang="scss" scoped></style>
