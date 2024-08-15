import type { App } from "vue";
import router from "@/router";
import pinia from "@/store";

export async function registerPlugins(app: App) {
  app.use(pinia);
  app.use(router);
  await router.isReady();
}
