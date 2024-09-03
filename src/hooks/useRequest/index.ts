import createRequest from './createRequest'
import usePollingPlugin from './plugins/usePollingPlugin'
import { InititalState, Options, PluginImplementType, Service } from './type'

function useRequest<R = any, P extends unknown[] = any>(
  service: Service<R, P>,
  options: Options<R, P> = {},
  initialState: InititalState<R, P> = {}
) {
  const { manual = false, defaultParams = [] as unknown as P } = options

  const requestInstance = createRequest(service, options, initialState)

  const plugins: PluginImplementType<R, P>[] = [usePollingPlugin]

  plugins.forEach(p => {
    requestInstance.plugins.push(p(requestInstance, options))
  })

  if (!manual) {
    requestInstance.run(...defaultParams)
  }

  onUnmounted(() => {
    requestInstance.cancel()
  })

  return {
    loading: requestInstance.loading,
    data: requestInstance.data,
    error: requestInstance.error,
    params: requestInstance.params,
    cancel: requestInstance.cancel,
    refresh: requestInstance.refresh,
    refreshAsync: requestInstance.refreshAsync,
    run: requestInstance.run,
    runAsync: requestInstance.runAsync
  }
}

export default useRequest
