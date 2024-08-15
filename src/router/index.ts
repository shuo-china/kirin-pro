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
    component: () => import("@/pages/exception/403.vue"),
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/pages/exception/404.vue"),
    alias: "/:pathMatch(.*)*",
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/pages/home/index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "bar",
        component: () => import("@/pages/bar/index.vue"),
        meta: {
          title: "BAR",
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
