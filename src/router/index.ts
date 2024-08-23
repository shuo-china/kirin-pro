import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/403',
    component: Layout,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: '',
        component: () => import('@/pages/exception/403.vue')
      }
    ]
  },
  {
    path: '/404',
    component: Layout,
    alias: '/:pathMatch(.*)*',
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: '',
        component: () => import('@/pages/exception/404.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'house'
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    meta: {
      title: '用户管理',
      icon: 'files'
    },
    children: [
      {
        path: 'list',
        name: 'userList',
        component: () => import('@/pages/user/list/index.vue'),
        meta: {
          title: '用户列表',
          icon: 'document'
        }
      }
    ]
  },
  {
    path: '/link',
    children: [
      {
        path: 'https://www.baidu.com',
        component: () => {},
        name: 'Link',
        meta: {
          title: '外链',
          icon: 'link'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
