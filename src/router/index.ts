import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { generateMenus } from "./shared";

const Layout = () => import("@/layouts/index.vue");

export const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/pages/login/index.vue"),
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/403",
    component: Layout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "",
        component: () => import("@/pages/exception/403.vue"),
      },
    ],
  },
  {
    path: "/404",
    component: Layout,
    alias: "/:pathMatch(.*)*",
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "",
        component: () => import("@/pages/exception/404.vue"),
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/pages/home/index.vue"),
        meta: {
          title: "首页",
        },
      },
    ],
  },
  {
    path: "/table",
    component: Layout,
    redirect: "/table/element-plus",
    name: "Table",
    meta: {
      title: "表格",
      elIcon: "Grid",
    },
    children: [
      {
        path: "element-plus",
        component: () => import("@/pages/home/index.vue"),
        name: "ElementPlus",
        meta: {
          title: "Element Plus",
        },
      },
      {
        path: "vxe-table",
        component: () => import("@/pages/home/index.vue"),
        name: "VxeTable",
        meta: {
          title: "Vxe Table",
        },
      },
    ],
  },
  {
    path: "/menu",
    component: Layout,
    redirect: "/menu/menu1",
    name: "Menu",
    meta: {
      title: "多级路由",
      svgIcon: "menu",
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/pages/home/index.vue"),
        redirect: "/menu/menu1/menu1-1",
        name: "Menu1",
        meta: {
          title: "menu1",
        },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/pages/home/index.vue"),
            name: "Menu1-1",
            meta: {
              title: "menu1-1",
            },
            children: [
              {
                path: "menu1-1-1",
                component: () => import("@/pages/home/index.vue"),
                name: "Menu1-1-1",
                meta: {
                  title: "menu1-1-1",
                },
              },
            ],
          },
          {
            path: "menu1-2",
            component: () => import("@/pages/home/index.vue"),
            redirect: "/menu/menu1/menu1-2/menu1-2-1",
            name: "Menu1-2",
            meta: {
              title: "menu1-2",
            },
            children: [
              {
                path: "menu1-2-1",
                component: () => import("@/pages/home/index.vue"),
                name: "Menu1-2-1",
                meta: {
                  title: "menu1-2-1",
                },
              },
              {
                path: "menu1-2-2",
                component: () => import("@/pages/home/index.vue"),
                name: "Menu1-2-2",
                meta: {
                  title: "menu1-2-2",
                },
              },
            ],
          },
          {
            path: "menu1-3",
            component: () => import("@/pages/home/index.vue"),
            name: "Menu1-3",
            meta: {
              title: "menu1-3",
            },
          },
        ],
      },
      {
        path: "menu2",
        component: () => import("@/pages/home/index.vue"),
        name: "Menu2",
        meta: {
          title: "menu2",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
