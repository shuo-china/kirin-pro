import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layouts/index.vue";

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
          icon: "house",
        },
      },
    ],
  },
  {
    path: "/demo",
    component: Layout,
    redirect: "/demo/list",
    meta: {
      title: "示例展示",
      icon: "files",
    },
    children: [
      {
        path: "list",
        name: "List",
        component: () => import("@/pages/demo/list.vue"),
        meta: {
          title: "列表示例",
          icon: "document",
        },
      },
      {
        path: "form",
        name: "Form",
        component: () => import("@/pages/demo/form.vue"),
        meta: {
          title: "表单示例",
          icon: "tickets",
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
