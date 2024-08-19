<template>
  <div
    class="h-full flex flex-col justify-between border-r border-r-black/7 border-r-style-solid"
    :class="[sidebarCollapsed ? 'w-sidebar-collapsed' : 'w-sidebar']"
  >
    <div
      v-if="layout === LayoutMode.Side"
      class="h-navigationbar flex flex-shrink-0 items-center overflow-hidden px-5"
    >
      <Logo :show-title="sidebarCollapsed ? false : true" />
    </div>
    <div class="relative flex-grow">
      <el-scrollbar>
        <VerticalMenu v-if="layout === LayoutMode.Side" :menus="menus" :active-menu="activeMenu" />
        <VerticalMenu
          v-if="layout === LayoutMode.Mix"
          :menus="secondLevelMenus"
          :active-menu="activeMenu"
        />
      </el-scrollbar>
      <div
        class="absolute top-5 z-10 h-6 w-6 flex cursor-pointer items-center justify-center rounded-full bg-white text-black/25 shadow -right-3 hover:text-black/65"
        @click="() => appStore.toggleSidebarCollapsed()"
      >
        <ArrowLeftBold v-show="sidebarCollapsed === false" class="h-3 w-3" />
        <ArrowRightBold v-show="sidebarCollapsed === true" class="h-3 w-3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Logo from '@/layouts/components/Logo/index.vue'
import VerticalMenu from '@/layouts/components/Menu/VerticalMenu.vue'
import { useMenuStore } from '@/store/menu'
import { useAppStore } from '@/store/app'
import { LayoutMode } from '@/utils/enums'

const appStore = useAppStore()
const { layout, sidebarCollapsed } = storeToRefs(appStore)
const { menus, activeMenu, secondLevelMenus } = storeToRefs(useMenuStore())
</script>

<style lang="scss" scoped></style>
