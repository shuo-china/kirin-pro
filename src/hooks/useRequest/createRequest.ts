import { InititalState, Options, PluginType, Service } from './type'

function createRequest<R = any, P extends unknown[] = any>(
  service: Service<R, P>,
  options: Options<R, P>,
  initialState?: InititalState<R, P>
) {
  const { onSuccess, onError, onBefore, onAfter } = options

  const loading = ref(initialState?.loading ?? false)
  const data = shallowRef<Nullable<R>>(initialState?.data ?? null)
  const error = shallowRef(initialState?.error)
  const params = ref(initialState?.params) as Ref<P>
  const plugins: PluginType<R, P>[] = []

  const emit = (event: keyof PluginType<R, P>, ...args: any[]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    plugins.map(i => i[event]?.(...args))
  }

  const runAsync = async (...args: P): Promise<R> => {
    emit('onBefore', args)
    onBefore?.(args)

    loading.value = true
    params.value = args

    try {
      const res = await service(...params.value)
      data.value = res
      error.value = undefined
      loading.value = false

      emit('onSuccess', res, args)
      onSuccess?.(res, args)

      emit('onAfter', args, res, undefined)
      onAfter?.(args)

      return res
    } catch (err) {
      error.value = err as Error
      loading.value = false

      emit('onError', err, args)
      onError?.(err as Error, args)

      emit('onAfter', args, undefined, err)
      onAfter?.(args)

      throw err
    }
  }

  const run = (...args: P) => {
    runAsync(...args)
  }

  const cancel = () => {
    loading.value = false
    emit('onCancel')
  }

  const refresh = () => {
    run(...(params.value || []))
  }

  const refreshAsync = () => {
    return runAsync(...(params.value || []))
  }

  return {
    loading,
    data,
    error,
    params,
    plugins,
    run,
    runAsync,
    refresh,
    refreshAsync,
    cancel
  }
}

export default createRequest
