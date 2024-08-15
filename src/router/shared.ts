import { RouteRecordRaw } from "vue-router";
import { resolve } from "path-browserify";

export type Menu = {
  title: string;
  icon: string;
  path: string;
  children?: Menu[];
};

export function generateMenusByRoutes(
  routes: RouteRecordRaw[],
  parentPath: string = ""
) {
  const menus: Menu[] = [];

  routes.forEach((route) => {
    if (!route.meta?.hideInMenu) {
      const menu = generateMenuByRoute(route, parentPath);

      if (route.children?.some((child) => !child.meta?.hideInMenu)) {
        menu.children = generateMenusByRoutes(route.children, menu.path);
      }

      menus.push(menu);
    }
  });

  return menus;
}

function generateMenuByRoute(route: RouteRecordRaw, parentPath: string): Menu {
  const { path, meta } = route;

  return {
    title: meta?.title || path,
    icon: "",
    path: resolve(parentPath, path),
  };
}
