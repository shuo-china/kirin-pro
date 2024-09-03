import { PluginImplementType } from './type'

export const definePlugin = <R = any, P extends unknown[] = any>(val: PluginImplementType<R, P>) =>
  val
