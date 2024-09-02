export type Service<R, P extends unknown[]> = (...args: P) => Promise<R>

export type Options<P extends unknown[]> = {
  manual?: boolean
  defaultParams?: P
}

function useRequest<R = any, P extends unknown[] = any>(
  service: Service<R, P>,
  options: Options<P> = {}
) {
  const { manual = false, defaultParams = [] as unknown as P } = options

  const loading = ref(false)
  const data = shallowRef<Nullable<R>>(null)
  const error = shallowRef()
  const params = ref() as Ref<P>

  const runAsync = async (...args: P): Promise<R> => {
    loading.value = true
    params.value = args

    try {
      const res = await service(...params.value)
      data.value = res
      error.value = undefined
      loading.value = false
      return res
    } catch (err) {
      error.value = err
      loading.value = false
      throw err
    }
  }

  const run = (...args: P) => {
    runAsync(...args)
  }

  const refresh = () => {
    run(...(params.value || []))
  }

  const refreshAsync = () => {
    return runAsync(...(params.value || []))
  }

  if (!manual) {
    run(...defaultParams)
  }

  return {
    data,
    loading,
    error,
    params,
    run,
    runAsync,
    refresh,
    refreshAsync
  }
}

export default useRequest
