import { useBreakpoints as useVueuseBreakpoints } from '@vueuse/core'

const breakpointsElementPlus = {
  xs: 0,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1920
}

function useBreakpoints() {
  const breakpoints = useVueuseBreakpoints(breakpointsElementPlus)

  return {
    active: breakpoints.active() as ComputedRef<keyof typeof breakpointsElementPlus>
  }
}

export default useBreakpoints
