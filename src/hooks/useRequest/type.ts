import { ShallowRef } from 'vue'

export type PluginImplementType<R, P extends unknown[]> = (
  queryInstance: Request<R, P>,
  config: Options<R, P>
) => PluginType<R, P>

export type Service<R, P extends unknown[]> = (...args: P) => Promise<R>

export type Options<R, P extends unknown[]> = {
  manual?: boolean
  pollingInterval?: number
  defaultParams?: P
  onSuccess?: (data: R, params: P) => void
  onError?: (error: Error, params: P) => void
  onBefore?: (params: P) => void
  onAfter?: (params: P) => void
}

export type PluginType<R, P extends unknown[]> = {
  onSuccess?(data: R, params: P): void
  onBefore?(params: P): void
  onError?(error: Error, params: P): void
  onAfter?(params: P, data: R, error: Error): void
  onCancel?(): void
}

export type State<R, P> = {
  loading: Ref<boolean>
  data: ShallowRef<R | null>
  error: ShallowRef<Error | undefined>
  params: Ref<P>
}

export interface FunctionContext<R, P extends unknown[]> {
  runAsync: (...arg: P) => Promise<R>
  run: (...arg: P) => void
  cancel: () => void
  refresh: () => void
  refreshAsync: () => Promise<R>
}
export interface Request<R, P extends unknown[]> extends State<R, P>, FunctionContext<R, P> {
  plugins: PluginType<R, P>[]
}

export type InititalState<R, P> = {
  [K in keyof State<R, P>]?: UnRef<State<R, P>[K]>
}
