import { defineStore } from 'pinia'
import { LayoutMode, StoreId } from '@/utils/enums'
import { useLocalStorage } from '@vueuse/core'
import { LAYOUT_KEY } from '@/utils/constants'
import config from '@/config'

export const useAppStore = defineStore(StoreId.App, () => {
  const layout = useLocalStorage<LayoutMode>(LAYOUT_KEY, config.layout)

  return { layout }
})
