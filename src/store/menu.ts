import { StoreId } from '@/utils/enums'
import { defineStore } from 'pinia'
import { RouteMeta, RouteRecordRaw } from 'vue-router'
import { resolve } from 'path-browserify'
import { routes } from '@/router'
import { UserInfo, useUserStore } from '@/store/user'
import access from '@/router/access'
import { isExternal } from '@/utils/validate'

export type Menu = {
  title: string
  icon?: string
  path: string
  level: number
  parent: Nullable<Menu>
  key: string
  children?: Menu[]
  __isFlattened: boolean
}

function generateMenus(userInfo: Nullable<UserInfo>) {
  if (!userInfo) {
    return []
  }
  return generateMenusByRoutes(routes, (path, meta) => access(userInfo, meta, path))
}

function generateMenusByRoutes(
  routes: RouteRecordRaw[],
  checkPermission: (path: string, meta?: RouteMeta) => boolean,
  parentMenu: Nullable<Menu> = null,
  level = 1
) {
  const menus: Menu[] = []

  for (const route of routes) {
    if (route.meta?.hideInMenu) continue

    let menu = generateMenuByRoute(route, parentMenu, level)
    if (!checkPermission(menu.path, route.meta)) continue

    if (route.children?.some(child => !child.meta?.hideInMenu)) {
      const children = generateMenusByRoutes(route.children, checkPermission, menu, level + 1)

      if (isFlattenable(children)) {
        const child = children[0]
        child.parent = menu.parent
        child.level = menu.level
        child.__isFlattened = true
        menu = child
      } else {
        menu.children = children
      }
    }

    menus.push(menu)
  }

  return menus
}

function generateMenuByRoute(
  route: RouteRecordRaw,
  parentMenu: Nullable<Menu>,
  level: number
): Menu {
  const { path, meta, name } = route

  return {
    title: meta?.title || path,
    icon: meta?.icon,
    path: isExternal(path) ? path : resolve(parentMenu?.path || '', path),
    level,
    key: name as string,
    parent: parentMenu,
    __isFlattened: false
  }
}

function isFlattenable(subMenus: Menu[]) {
  return subMenus.length === 1 && !subMenus[0].children && !subMenus[0].__isFlattened
}

function getActiveMenu(key: string, menus: Menu[]) {
  function dfs(menu: Menu): Nullable<Menu> {
    if (menu.key === key) {
      return menu
    }

    if (menu.children) {
      for (const child of menu.children) {
        const found = dfs(child)
        if (found) {
          return found
        }
      }
    }

    return null
  }

  for (const menu of menus) {
    const found = dfs(menu)
    if (found) {
      return found
    }
  }

  return null
}

function getActiveMenuPath(activeMenu: Nullable<Menu>) {
  const path: Menu[] = []

  while (activeMenu) {
    path.unshift(activeMenu)
    activeMenu = activeMenu.parent
  }

  return path
}

export const useMenuStore = defineStore(StoreId.Menu, () => {
  const route = useRoute()
  const userStore = useUserStore()

  const menus = computed(() => generateMenus(userStore.userInfo))

  const activeMenu = computed(() => getActiveMenu(route.name as string, menus.value))

  const activeMenuPath = computed(() => getActiveMenuPath(activeMenu.value))

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const firstLevelMenus = computed(() => menus.value.map(({ children, ...m }) => m))
  const firstLevelActiveMenu = computed(() =>
    activeMenuPath.value.length ? activeMenuPath.value[0] : null
  )

  const secondLevelMenus = computed(() => firstLevelActiveMenu.value?.children || [])

  return {
    menus,
    activeMenu,
    activeMenuPath,
    firstLevelMenus,
    firstLevelActiveMenu,
    secondLevelMenus
  }
})
