import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    hideInMenu?: boolean
    roles?: string[]
  }
}
