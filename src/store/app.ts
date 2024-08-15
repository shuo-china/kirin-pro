import { defineStore } from "pinia";
import { LayoutMode, StoreId } from "@/utils/enums";

export const useAppStore = defineStore(StoreId.App, () => {
  const layout = ref(LayoutMode.Side);

  return { layout };
});
