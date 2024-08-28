import { useWindowSize } from '@vueuse/core'

const breakpoints = {
  xl: 1920,
  lg: 1200,
  md: 992,
  sm: 768,
  xs: 0
}

type Size = keyof typeof breakpoints

function useScreenSize() {
  const { width } = useWindowSize()

  const size = computed(() => {
    for (const [k, v] of Object.entries(breakpoints)) {
      if (width.value >= v) {
        return k as Size
      }
    }
    return 'xs'
  })

  return { size }
}

export default useScreenSize
