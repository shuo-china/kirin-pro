import { AxiosRequestConfig } from 'axios'
import { pagination as paginationConfig } from '@/config'

interface PaginationType {
  pageKey: string
  pageSizeKey: string
  totalKey: string
  dataKey: string
}

export type Service<T = any> = (options?: AxiosRequestConfig) => Promise<Pagination<T>>

export type Options = AxiosRequestConfig & {
  pagination?: PaginationType
}

const defaultPaginationOptions: PaginationType = {
  // reuqest keys
  pageKey: paginationConfig.requestPageKey,
  pageSizeKey: paginationConfig.requestPageSizeKey,
  // response keys
  totalKey: paginationConfig.responseTotalKey,
  dataKey: paginationConfig.responseDataKey
}

function usePagination<T = any>(service: Service<T>, options: Options = {}) {
  const responseData = ref<Pagination<T>>()
  const loading = ref(false)

  const { pagination, params: paramsOptions, ...restOptions } = options

  const { pageKey, pageSizeKey, totalKey, dataKey } = Object.assign(
    {},
    defaultPaginationOptions,
    pagination
  )

  const params = ref({
    [pageKey]: 1,
    [pageSizeKey]: paginationConfig.defaultPageSize,
    ...paramsOptions
  })

  const paging = (paginationParams?: Record<string, any>) => {
    loading.value = true
    if (paginationParams) {
      params.value = Object.assign({}, params.value, paginationParams)
    }
    const axiosRequestConfig = Object.assign({ params: params.value }, restOptions)
    service(axiosRequestConfig)
      .then(res => (responseData.value = res))
      .finally(() => {
        loading.value = false
      })
  }

  const changePage = (page: number) => {
    paging({ [pageKey]: page })
  }

  const changePageSize = (pageSize: number) => {
    paging({ [pageSizeKey]: pageSize })
  }

  const total = computed(
    () => responseData.value?.[totalKey as PaginationConfig['responseTotalKey']] || 0
  )

  const data = computed(
    () => responseData.value?.[dataKey as PaginationConfig['responseDataKey']] || []
  )

  const currentPage = computed({
    get: () => params.value[pageKey],
    set(val: number) {
      changePage(val)
    }
  })

  const pageSize = computed({
    get: () => params.value[pageSizeKey],
    set(val: number) {
      changePageSize(val)
    }
  })

  onMounted(() => {
    paging()
  })

  return {
    loading,
    data,
    currentPage,
    pageSize,
    total,
    paging
  }
}

export default usePagination
