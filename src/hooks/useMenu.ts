import { RouteRecordRaw } from "vue-router";
import { resolve } from "path-browserify";
import { routes } from "@/router";
import { UserInfo, useUserStore } from "@/store/user";
import access from "@/router/access";

type Menu = {
  title: string;
  icon: string;
  path: string;
  level: number;
  parent: Nullable<Menu>;
  key: string;
  children?: Menu[];
  __isFlattened: boolean;
};

function generateMenus(userInfo: Nullable<UserInfo>) {
  if (!userInfo) {
    return [];
  }
  return generateMenusByRoutes(routes, (route) => access(userInfo, route));
}

function generateMenusByRoutes(
  routes: RouteRecordRaw[],
  checkPermission: (route: RouteRecordRaw) => boolean,
  parentMenu: Nullable<Menu> = null,
  level = 1
) {
  const menus: Menu[] = [];

  for (const route of routes) {
    if (route.meta?.hideInMenu) continue;
    if (!checkPermission(route)) continue;

    let menu = generateMenuByRoute(route, parentMenu, level);

    if (route.children?.some((child) => !child.meta?.hideInMenu)) {
      const children = generateMenusByRoutes(
        route.children,
        checkPermission,
        menu,
        level + 1
      );

      if (isFlattenable(children)) {
        const child = children[0];
        child.parent = menu.parent;
        child.level = menu.level;
        child.__isFlattened = true;
        menu = child;
      } else {
        menu.children = children;
      }
    }

    menus.push(menu);
  }

  return menus;
}

function generateMenuByRoute(
  route: RouteRecordRaw,
  parentMenu: Nullable<Menu>,
  level: number
): Menu {
  const { path, meta, name } = route;

  return {
    title: meta?.title || path,
    icon: "",
    path: resolve(parentMenu?.path || "", path),
    level,
    key: name as string,
    parent: parentMenu,
    __isFlattened: false,
  };
}

function isFlattenable(subMenus: Menu[]) {
  return (
    subMenus.length === 1 && !subMenus[0].children && !subMenus[0].__isFlattened
  );
}

function getActiveMenu(key: string, menus: Menu[]) {
  function dfs(menu: Menu): Nullable<Menu> {
    if (menu.key === key) {
      return menu;
    }

    if (menu.children) {
      for (const child of menu.children) {
        const found = dfs(child);
        if (found) {
          return found;
        }
      }
    }

    return null;
  }

  for (const menu of menus) {
    const found = dfs(menu);
    if (found) {
      return found;
    }
  }

  return null;
}

function getActiveMenuPath(key: string, menus: Menu[]) {
  const path: Menu[] = [];

  let currentMenu = getActiveMenu(key, menus);

  while (currentMenu) {
    path.unshift(currentMenu);
    currentMenu = currentMenu.parent;
  }

  return path;
}

function getActiveMenuKeyPath(key: string, menus: Menu[]) {
  const menuPath = getActiveMenuPath(key, menus);
  return menuPath.map((m) => m.key);
}

export function useMenus() {
  const userStore = useUserStore();

  const menus = computed(() => generateMenus(userStore.userInfo));

  const route = useRoute();

  const updateExpandedKeys = () => {};

  watch(
    () => route.name,
    () => {
      updateExpandedKeys();
    },
    { immediate: true }
  );

  return {
    menus,
  };
}
