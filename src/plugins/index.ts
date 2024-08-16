import type { App } from "vue";
import router from "@/router";
import "@/router/permission";
import pinia from "@/store";
import elementIcons from "./element-icons";

export async function registerPlugins(app: App) {
  app.use(pinia);
  app.use(router);
  app.use(elementIcons);
  await router.isReady();
}
