import { defineStore } from 'pinia'
import { LayoutMode, StoreId } from '@/utils/enums'
import { useLocalStorage, useToggle } from '@vueuse/core'
import { LAYOUT_KEY, SIDEBAR_COLLAPSED_KEY } from '@/utils/constants'
import config from '@/config'

export const useAppStore = defineStore(StoreId.App, () => {
  const layout = useLocalStorage<LayoutMode>(LAYOUT_KEY, config.layout)

  const sidebarCollapsed = useLocalStorage(SIDEBAR_COLLAPSED_KEY, true)

  const toggleSidebarCollapsed = useToggle(sidebarCollapsed)

  return { layout, sidebarCollapsed, toggleSidebarCollapsed }
})
