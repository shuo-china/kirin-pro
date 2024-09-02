import { isNumber } from 'lodash'

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

function useRequest<R = any, P extends unknown[] = any>(
  service: Service<R, P>,
  options: Options<R, P> = {}
) {
  const {
    manual = false,
    defaultParams = [] as unknown as P,
    pollingInterval,
    onSuccess,
    onError,
    onBefore,
    onAfter
  } = options

  const loading = ref(false)
  const data = shallowRef<Nullable<R>>(null)
  const error = shallowRef()
  const params = ref() as Ref<P>
  const pollingClearTimeout = ref()
  const pollingIntervalRef = computed(() => unref(pollingInterval))

  const runAsync = async (...args: P): Promise<R> => {
    loading.value = true
    params.value = args

    handleBefore?.(args)

    try {
      const res = await service(...params.value)
      data.value = res
      error.value = undefined
      loading.value = false

      onSuccess?.(res, args)
      onAfter?.(args)
      handleAfter(args)

      return res
    } catch (err) {
      error.value = err
      loading.value = false

      onError?.(err as Error, args)
      handleAfter(args)

      throw err
    }
  }

  const polling = (pollingFunc: () => void) => {
    let timerId: number

    if (isNumber(pollingIntervalRef.value) && pollingIntervalRef.value >= 0) {
      timerId = setTimeout(pollingFunc, pollingIntervalRef.value)
    }

    return () => timerId && clearTimeout(timerId)
  }

  const handleBefore = (params: P) => {
    onBefore?.(params)
    pollingClearTimeout.value?.()
  }

  const handleAfter = (params: P) => {
    onAfter?.(params)
    pollingClearTimeout.value = polling(refresh)
  }

  watch(pollingIntervalRef, () => {
    if (pollingClearTimeout.value) {
      pollingClearTimeout.value()
      pollingClearTimeout.value = polling(refresh)
    }
  })

  const cancel = () => {
    loading.value = false
    pollingClearTimeout.value?.()
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
    cancel,
    runAsync,
    refresh,
    refreshAsync
  }
}

export default useRequest
