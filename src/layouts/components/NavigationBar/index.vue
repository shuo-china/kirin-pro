<template>
  <div class="h-navigationbar flex items-center border-b border-b-black/7 border-b-style-solid">
    <div class="w-sidebar flex-shrink-0 px-5">
      <Breadcrumb v-if="layout === LayoutMode.Side" />
      <Logo v-else />
    </div>
    <div class="flex-grow">
      <HorizontalMenu v-if="layout === LayoutMode.Top" :menus="menus" :active-menu="activeMenu" />
      <HorizontalMenu
        v-if="layout === LayoutMode.Mix"
        :menus="firstLevelMenus"
        :active-menu="firstLevelActiveMenu"
      />
    </div>
    <div class="flex-shrink-0 px-5">
      <AvatarDropdown />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/layouts/components/Breadcrumb/index.vue'
import AvatarDropdown from '@/layouts/components/AvatarDropdown/index.vue'
import Logo from '@/layouts/components/Logo/index.vue'
import HorizontalMenu from '@/layouts/components/Menu/HorizontalMenu.vue'
import { LayoutMode } from '@/utils/enums'
import { useAppStore } from '@/store/app'
import { useMenuStore } from '@/store/menu'
import { storeToRefs } from 'pinia'

const { layout } = storeToRefs(useAppStore())
const { menus, activeMenu, firstLevelMenus, firstLevelActiveMenu } = storeToRefs(useMenuStore())
</script>

<style lang="scss" scoped></style>
