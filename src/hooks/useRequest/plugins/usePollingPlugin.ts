import { isNumber } from 'lodash'
import { definePlugin } from '../definePlugin'

export default definePlugin((requestInstance, { pollingInterval }) => {
  let pollingClearTimeout: undefined | (() => void) = undefined
  const pollingIntervalRef = computed(() => unref(pollingInterval))

  const polling = (pollingFunc: () => void) => {
    let timerId: number

    if (isNumber(pollingIntervalRef.value) && pollingIntervalRef.value >= 0) {
      timerId = setTimeout(pollingFunc, pollingIntervalRef.value)
    }

    return () => timerId && clearTimeout(timerId)
  }

  watch(pollingIntervalRef, () => {
    if (pollingClearTimeout) {
      pollingClearTimeout()
      pollingClearTimeout = polling(requestInstance.refresh)
    }
  })

  return {
    onBefore() {
      pollingClearTimeout?.()
    },
    onCancel() {
      pollingClearTimeout?.()
    },
    onAfter() {
      pollingClearTimeout = polling(requestInstance.refresh)
    }
  }
})
